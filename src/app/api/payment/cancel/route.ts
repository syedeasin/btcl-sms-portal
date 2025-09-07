import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const tranId = formData.get('tran_id') as string

    if (!tranId) {
      return NextResponse.redirect(new URL('/payment/cancelled', request.url))
    }

    // Find and update the order
    const order = await prisma.order.findFirst({
      where: { sslcommerzTranId: tranId }
    })

    if (order) {
      await prisma.order.update({
        where: { id: order.id },
        data: {
          status: 'CANCELLED',
          paymentData: {
            ...(order.paymentData as any),
            cancelledAt: new Date().toISOString(),
            cancelledBy: 'user'
          }
        }
      })
    }

    return NextResponse.redirect(new URL(`/payment/cancelled?order=${order?.id}`, request.url))

  } catch (error) {
    console.error('Payment cancel handler error:', error)
    return NextResponse.redirect(new URL('/payment/cancelled', request.url))
  }
}

export async function GET(request: NextRequest) {
  const url = new URL(request.url)
  const tranId = url.searchParams.get('tran_id')

  if (!tranId) {
    return NextResponse.redirect(new URL('/payment/cancelled', request.url))
  }

  const formData = new FormData()
  url.searchParams.forEach((value, key) => {
    formData.append(key, value)
  })

  const newRequest = new Request(request.url, {
    method: 'POST',
    body: formData
  })

  return POST(newRequest as NextRequest)
}