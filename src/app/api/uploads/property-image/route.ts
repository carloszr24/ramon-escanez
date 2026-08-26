import { NextRequest, NextResponse } from 'next/server'
import { mkdirSync, existsSync, unlinkSync, writeFileSync } from 'fs'
import { join } from 'path'
import { getAdminTokenFromRequest, verifyAdminSessionToken } from '@/lib/admin-session'
import { optimizePropertyImage } from '@/lib/optimize-image'

// Nota: Vercel limita el body de las funciones serverless a ~4.5MB, por eso este
// límite se queda por debajo de eso. Las imágenes ya llegan comprimidas desde el
// navegador (ver src/lib/client-image.ts), así que en la práctica no debería activarse.
const MAX_BYTES = 4 * 1024 * 1024
const ALLOWED_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp'])

const PROPERTIES_DIR = join(process.cwd(), 'public', 'images', 'properties')
const PUBLIC_PREFIX = '/images/properties'

function unauthorized() {
  return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
}

function badRequest(message: string) {
  return NextResponse.json({ error: message }, { status: 400 })
}

function pathFromPublicUrl(url: string): string | null {
  const idx = url.indexOf(PUBLIC_PREFIX)
  if (idx === -1) return null
  const relative = url.slice(idx + PUBLIC_PREFIX.length).replace(/^\/+/, '')
  if (relative.includes('..')) return null
  return relative
}

export async function POST(request: NextRequest) {
  if (!verifyAdminSessionToken(getAdminTokenFromRequest(request))) {
    return unauthorized()
  }

  const propertyId = request.nextUrl.searchParams.get('propertyId')?.trim()
  if (!propertyId) return badRequest('Falta propertyId')

  const form = await request.formData()
  const file = form.get('file')
  if (!(file instanceof File)) return badRequest('Falta file')
  if (!ALLOWED_TYPES.has(file.type)) return badRequest('Tipo no permitido (jpg/png/webp)')
  if (file.size > MAX_BYTES) return badRequest('La imagen supera 4MB')

  const originalBuffer = Buffer.from(await file.arrayBuffer())
  const optimized = await optimizePropertyImage(originalBuffer)

  const relativePath = `${propertyId}/${Date.now()}.${optimized.ext}`
  const targetDir = join(PROPERTIES_DIR, propertyId)
  if (!existsSync(targetDir)) mkdirSync(targetDir, { recursive: true })
  writeFileSync(join(PROPERTIES_DIR, relativePath), optimized.data)

  const url = `${PUBLIC_PREFIX}/${relativePath}`
  return NextResponse.json({ url, path: url })
}

export async function DELETE(request: NextRequest) {
  if (!verifyAdminSessionToken(getAdminTokenFromRequest(request))) {
    return unauthorized()
  }

  let body: { url?: unknown }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'JSON inválido' }, { status: 400 })
  }

  if (typeof body.url !== 'string' || !body.url) {
    return badRequest('Falta url')
  }

  const relativePath = pathFromPublicUrl(body.url)
  if (!relativePath) return badRequest('URL no reconocida')

  const fullPath = join(PROPERTIES_DIR, relativePath)
  if (existsSync(fullPath)) unlinkSync(fullPath)

  return NextResponse.json({ ok: true })
}
