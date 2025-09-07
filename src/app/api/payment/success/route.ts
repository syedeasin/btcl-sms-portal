import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createSSLCommerzInstance } from '@/lib/sslcommerz'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const tranId = formData.get('tran_id') as string
    const valId = formData.get('val_id') as string
    const amount = formData.get('amount') as string
    const cardType = formData.get('card_type') as string
    const status = formData.get('status') as string

    if (!tranId || !valId) {
      return NextResponse.redirect(new URL('/payment/failed', request.url))
    }

    // Find the order
    const order = await prisma.order.findFirst({
      where: { sslcommerzTranId: tranId },
      include: { user: true, package: true }
    })

    if (!order) {
      return NextResponse.redirect(new URL('/payment/failed', request.url))
    }

    // Validate transaction with SSL Commerz
    try {
      const sslcommerz = createSSLCommerzInstance()
      const validation = await sslcommerz.validateTransaction(valId)

      if (validation.status !== 'VALID' || validation.tran_id !== tranId) {
        // Update order status to failed
        await prisma.order.update({
          where: { id: order.id },
          data: { 
            status: 'CANCELLED',
            paymentData: { ...(order.paymentData as any), validation }
          }
        })
        return NextResponse.redirect(new URL('/payment/failed', request.url))
      }

      // Payment is valid, update order status
      const expirationDate = new Date()
      expirationDate.setDate(expirationDate.getDate() + order.package.validityDays)

      await prisma.order.update({
        where: { id: order.id },
        data: {
          status: 'PAID',
          transactionId: valId,
          paymentMethod: cardType,
          activatedAt: new Date(),
          expiresAt: expirationDate,
          paymentData: {
            ...(order.paymentData as any),
            validation,
            cardType,
            completedAt: new Date().toISOString()
          }
        }
      })

      // Redirect to success page
      return NextResponse.redirect(new URL(`/payment/success?order=${order.id}`, request.url))

    } catch (validationError) {
      console.error('Payment validation error:', validationError)
      
      // Update order with error
      await prisma.order.update({
        where: { id: order.id },
        data: { 
          status: 'CANCELLED',
          paymentData: { ...(order.paymentData as any), validationError: (validationError as Error).message }
        }
      })
      
      return NextResponse.redirect(new URL('/payment/failed', request.url))
    }

  } catch (error) {
    console.error('Payment success handler error:', error)
    return NextResponse.redirect(new URL('/payment/failed', request.url))
  }
}

export async function GET(request: NextRequest) {
  // Handle GET request (some payment gateways use GET for success callback)
  const url = new URL(request.url)
  const tranId = url.searchParams.get('tran_id')
  const valId = url.searchParams.get('val_id')

  if (!tranId || !valId) {
    return NextResponse.redirect(new URL('/payment/failed', request.url))
  }

  // Convert GET parameters to FormData for consistency
  const formData = new FormData()
  url.searchParams.forEach((value, key) => {
    formData.append(key, value)
  })

  // Create a new request with FormData
  const newRequest = new Request(request.url, {
    method: 'POST',
    body: formData
  })

  return POST(newRequest as NextRequest)
}