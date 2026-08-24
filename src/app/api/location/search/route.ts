import { NextRequest, NextResponse } from 'next/server'
import { searchAddressSuggestions } from '@/lib/geocode.server'

export async function GET(request: NextRequest) {
  const address = request.nextUrl.searchParams.get('address')?.trim() || ''

  if (address.length < 3) {
    return NextResponse.json({ suggestions: [] })
  }

  const suggestions = await searchAddressSuggestions(address)
  return NextResponse.json({ suggestions })
}
