import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const tranId = formData.get('tran_id') as string
    const failedReason = formData.get('failedreason') as string

    if (!tranId) {
      return NextResponse.redirect(new URL('/payment/failed', request.url))
    }

    // TODO: Implement Prisma database integration
    // const order = await prisma.order.findFirst({ where: { sslcommerzTranId: tranId } })

    return NextResponse.redirect(new URL(`/payment/failed?reason=${encodeURIComponent(failedReason || 'Payment failed')}`, request.url))

  } catch (error) {
    console.error('Payment fail handler error:', error)
    return NextResponse.redirect(new URL('/payment/failed', request.url))
  }
}

export async function GET(request: NextRequest) {
  const url = new URL(request.url)
  const tranId = url.searchParams.get('tran_id')
  const failedReason = url.searchParams.get('failedreason')

  if (!tranId) {
    return NextResponse.redirect(new URL('/payment/failed', request.url))
  }

  // Convert GET parameters to FormData for consistency
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