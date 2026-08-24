import { NextRequest, NextResponse } from 'next/server'
import {
  adminAccessDeniedResponse,
  applyAdminSecurityHeaders,
  isAdminIpAllowed,
} from '@/lib/admin-security'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const touchesAdmin =
    pathname.startsWith('/admin') ||
    pathname.startsWith('/api/admin') ||
    pathname.startsWith('/api/propiedades') ||
    pathname.startsWith('/api/uploads') ||
    pathname.startsWith('/api/leads')

  if (!touchesAdmin) {
    return NextResponse.next()
  }

  if (!isAdminIpAllowed(request)) {
    return adminAccessDeniedResponse(403)
  }

  // La autenticación la validan las API routes (Node). Aquí solo IP + cabeceras.
  return applyAdminSecurityHeaders(NextResponse.next())
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*', '/api/propiedades/:path*', '/api/uploads/:path*', '/api/leads'],
}
