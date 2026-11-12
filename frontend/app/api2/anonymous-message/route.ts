import { NextRequest, NextResponse } from 'next/server'
import { getBackendUrl } from '@/lib/api/backendUrl'

const validCategories = ['general', 'complaint', 'suggestion', 'commendation', 'report', 'other']

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { message, fullName, email, phone, category } = body

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return NextResponse.json({ success: false, message: 'Message is required' }, { status: 400 })
    }

    const normalizedCategory = String(category || 'general').toLowerCase()
    if (!validCategories.includes(normalizedCategory)) {
      return NextResponse.json({ success: false, message: 'Invalid category' }, { status: 400 })
    }

    const ipAddress =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      null
    const userAgent = request.headers.get('user-agent') || null

    const backendResponse = await fetch(`${getBackendUrl()}/api2/anonymous-message`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: message.trim(),
        fullName: fullName?.trim() || null,
        email: email?.trim() || null,
        phone: phone?.trim() || null,
        category: normalizedCategory,
        ipAddress,
        userAgent,
      }),
    })

    const backendData = await backendResponse.json().catch(() => ({}))

    if (!backendResponse.ok || !backendData.success) {
      return NextResponse.json(
        {
          success: false,
          message: backendData.message || 'Failed to save your message. Please try again later.',
        },
        { status: backendResponse.status >= 400 ? backendResponse.status : 502 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        message: backendData.message || 'Your message has been received. Thank you for your feedback.',
        messageId: backendData.messageId,
        timestamp: backendData.timestamp || new Date().toISOString(),
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error processing anonymous message:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to process your message. Please try again later.' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({ message: 'Anonymous message API is running' }, { status: 200 })
}
