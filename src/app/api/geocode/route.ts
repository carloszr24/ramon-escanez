import { NextRequest, NextResponse } from 'next/server'
import { getAdminTokenFromRequest, verifyAdminSessionToken } from '@/lib/admin-session'
import { buildGeocodeQuery, geocodeAddress, searchAddressSuggestions } from '@/lib/geocode.server'

function unauthorized() {
  return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
}

export async function GET(request: NextRequest) {
  if (!verifyAdminSessionToken(getAdminTokenFromRequest(request))) {
    return unauthorized()
  }

  const suggest = request.nextUrl.searchParams.get('suggest') === '1'
  const address = request.nextUrl.searchParams.get('address')?.trim() || ''
  const province = request.nextUrl.searchParams.get('province')?.trim() || ''

  if (suggest) {
    if (address.length < 3) {
      return NextResponse.json({ suggestions: [] })
    }

    const suggestions = await searchAddressSuggestions(address, province)
    return NextResponse.json({ suggestions })
  }

  if (address.length < 5) {
    return NextResponse.json({ error: 'Introduce una dirección más completa' }, { status: 400 })
  }

  const query = buildGeocodeQuery(address, province)
  const result = await geocodeAddress(query)

  if (!result) {
    return NextResponse.json({ error: 'No se encontró la dirección. Elija una sugerencia de la lista.' }, { status: 404 })
  }

  return NextResponse.json(result)
}
