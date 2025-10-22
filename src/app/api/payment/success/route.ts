import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const tranId = formData.get('tran_id') as string

    if (!tranId) {
      return NextResponse.redirect(new URL('/payment/failed', request.url))
    }

    // TODO: Implement Prisma database integration and SSL Commerz validation
    // This route requires:
    // 1. Database setup with Prisma
    // 2. SSL Commerz transaction validation
    // 3. Order model

    return NextResponse.redirect(new URL(`/payment/success`, request.url))

  } catch (error) {
    console.error('Payment success handler error:', error)
    return NextResponse.redirect(new URL('/payment/failed', request.url))
  }
}

export async function GET(request: NextRequest) {
  const url = new URL(request.url)
  const tranId = url.searchParams.get('tran_id')

  if (!tranId) {
    return NextResponse.redirect(new URL('/payment/failed', request.url))
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
