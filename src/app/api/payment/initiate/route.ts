import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { createSSLCommerzInstance } from '@/lib/sslcommerz'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { packageId, quantity = 1 } = body

    if (!packageId) {
      return NextResponse.json({ error: 'Package ID is required' }, { status: 400 })
    }

    // Get package details
    const packageData = await prisma.package.findUnique({
      where: { id: packageId }
    })

    if (!packageData || !packageData.isActive) {
      return NextResponse.json({ error: 'Package not found or inactive' }, { status: 404 })
    }

    // Get user details
    const user = await prisma.user.findUnique({
      where: { id: session.user.id }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Calculate total amount
    const totalAmount = Number(packageData.price) * quantity

    // Create order record
    const sslcommerz = createSSLCommerzInstance()
    const transactionId = sslcommerz.generateTransactionId()

    const order = await prisma.order.create({
      data: {
        userId: user.id,
        packageId: packageData.id,
        quantity,
        totalAmount,
        currency: 'BDT',
        status: 'PENDING',
        sslcommerzTranId: transactionId
      }
    })

    // Prepare payment data for SSL Commerz
    const paymentData = {
      amount: totalAmount,
      currency: 'BDT',
      tran_id: transactionId,
      product_name: packageData.nameEn,
      product_category: 'SMS Package',
      cus_name: user.name,
      cus_email: user.email,
      cus_phone: user.phone,
      cus_add1: user.company || 'N/A',
      cus_city: 'Dhaka',
      cus_country: 'Bangladesh',
      success_url: `${process.env.NEXTAUTH_URL}/api/payment/success`,
      fail_url: `${process.env.NEXTAUTH_URL}/api/payment/fail`,
      cancel_url: `${process.env.NEXTAUTH_URL}/api/payment/cancel`,
      ipn_url: `${process.env.NEXTAUTH_URL}/api/payment/ipn`
    }

    // Initiate payment with SSL Commerz
    const paymentResponse = await sslcommerz.initiatePayment(paymentData)

    if (paymentResponse.status !== 'SUCCESS') {
      // Update order status to failed
      await prisma.order.update({
        where: { id: order.id },
        data: { 
          status: 'CANCELLED',
          paymentData: paymentResponse
        }
      })

      return NextResponse.json({ 
        error: 'Payment initiation failed',
        details: paymentResponse.failedreason 
      }, { status: 400 })
    }

    // Update order with payment session info
    await prisma.order.update({
      where: { id: order.id },
      data: { 
        paymentData: paymentResponse
      }
    })

    return NextResponse.json({
      success: true,
      orderId: order.id,
      paymentUrl: paymentResponse.GatewayPageURL,
      transactionId: transactionId
    })

  } catch (error) {
    console.error('Payment initiation error:', error)
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}