import 'server-only'
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs'
import { join } from 'path'
import type { Property } from '@/types'
import { normalizeExtraIds, syncLegacyExtraFields } from '@/lib/property-extras'

const DATA_DIR = join(process.cwd(), 'data')
const PROPERTIES_FILE = join(DATA_DIR, 'properties.json')

function ensureDataDir() {
  if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true })
}

type PropertyRow = {
  id: string
  title: string
  price: number
  location: string
  address: string | null
  latitude: number | null
  longitude: number | null
  province: string | null
  type: string
  operation: string
  status: string
  description: string
  images: unknown
  fotocasa_url: string | null
  bedrooms: number | null
  bathrooms: number | null
  sq_meters: number | null
  availability: string | null
  hot_water: string | null
  heating: string | null
  condition: string | null
  property_age: string | null
  floor: string | null
  garage: string | null
  elevator: string | null
  furnished: string | null
  extras: unknown
  energy_rating: string | null
  energy_value: number | null
  emissions_rating: string | null
  emissions_value: number | null
  featured: boolean
  archived: boolean
  sort_order: number
  created_at: string
  updated_at: string
}

function readRows(): PropertyRow[] {
  ensureDataDir()
  if (!existsSync(PROPERTIES_FILE)) return []
  return JSON.parse(readFileSync(PROPERTIES_FILE, 'utf8')) as PropertyRow[]
}

function writeRows(rows: PropertyRow[]) {
  ensureDataDir()
  writeFileSync(PROPERTIES_FILE, `${JSON.stringify(rows, null, 2)}\n`, 'utf8')
}

function rowToProperty(row: PropertyRow): Property {
  return {
    id: row.id,
    title: row.title,
    price: Number(row.price),
    location: row.location,
    address: row.address,
    latitude: row.latitude,
    longitude: row.longitude,
    province: row.province,
    type: row.type,
    operation: row.operation,
    status: row.status,
    description: row.description,
    images: JSON.stringify(Array.isArray(row.images) ? row.images : []),
    fotocasaUrl: row.fotocasa_url,
    bedrooms: row.bedrooms,
    bathrooms: row.bathrooms,
    sqMeters: row.sq_meters != null ? Number(row.sq_meters) : null,
    availability: row.availability,
    hotWater: row.hot_water,
    heating: row.heating,
    condition: row.condition,
    propertyAge: row.property_age,
    floor: row.floor,
    garage: row.garage,
    elevator: row.elevator,
    furnished: row.furnished,
    extras: normalizeExtraIds(row.extras),
    energyRating: row.energy_rating,
    energyValue: row.energy_value != null ? Number(row.energy_value) : null,
    emissionsRating: row.emissions_rating,
    emissionsValue: row.emissions_value != null ? Number(row.emissions_value) : null,
    featured: row.featured,
    archived: row.archived,
    sortOrder: row.sort_order,
    createdAt: new Date(row.created_at),
    updatedAt: new Date(row.updated_at),
  }
}

function parseImagesToArray(images: string): string[] {
  try {
    const parsed = JSON.parse(images)
    return Array.isArray(parsed) ? parsed.map(String) : []
  } catch {
    return images.split('\n').map((s) => s.trim()).filter(Boolean)
  }
}

function propertyToRow(property: Property): PropertyRow {
  return {
    id: property.id,
    title: property.title,
    price: property.price,
    location: property.location,
    address: property.address ?? null,
    latitude: property.latitude ?? null,
    longitude: property.longitude ?? null,
    province: property.province ?? null,
    type: property.type,
    operation: property.operation || 'venta',
    status: property.status,
    description: property.description,
    images: parseImagesToArray(property.images),
    fotocasa_url: property.fotocasaUrl ?? null,
    bedrooms: property.bedrooms ?? null,
    bathrooms: property.bathrooms ?? null,
    sq_meters: property.sqMeters ?? null,
    availability: property.availability ?? null,
    hot_water: property.hotWater ?? null,
    heating: property.heating ?? null,
    condition: property.condition ?? null,
    property_age: property.propertyAge ?? null,
    floor: property.floor ?? null,
    garage: property.garage ?? null,
    elevator: property.elevator ?? null,
    furnished: property.furnished ?? null,
    extras: property.extras ?? [],
    energy_rating: property.energyRating ?? null,
    energy_value: property.energyValue ?? null,
    emissions_rating: property.emissionsRating ?? null,
    emissions_value: property.emissionsValue ?? null,
    featured: property.featured,
    archived: property.archived,
    sort_order: property.sortOrder,
    created_at: property.createdAt.toISOString(),
    updated_at: property.updatedAt.toISOString(),
  }
}

export async function listProperties(): Promise<Property[]> {
  return readRows()
    .slice()
    .sort((a, b) => a.sort_order - b.sort_order)
    .map(rowToProperty)
}

export async function getPropertyRowById(id: string): Promise<Property | null> {
  const row = readRows().find((r) => r.id === id)
  return row ? rowToProperty(row) : null
}

export async function propertyIdExists(id: string): Promise<boolean> {
  return readRows().some((r) => r.id === id)
}

export async function countProperties(): Promise<number> {
  return readRows().length
}

export async function insertProperty(property: Property): Promise<Property> {
  const rows = readRows()
  const row = propertyToRow(property)
  rows.push(row)
  writeRows(rows)
  return rowToProperty(row)
}

export async function updatePropertyRow(id: string, property: Property): Promise<Property> {
  const rows = readRows()
  const index = rows.findIndex((r) => r.id === id)
  if (index === -1) throw new Error('Error al actualizar propiedad: no encontrada')
  const row = propertyToRow(property)
  rows[index] = row
  writeRows(rows)
  return rowToProperty(row)
}

export async function deletePropertyRow(id: string): Promise<void> {
  const rows = readRows().filter((r) => r.id !== id)
  writeRows(rows)
}

export async function setPropertyArchived(id: string, archived: boolean): Promise<Property | null> {
  const rows = readRows()
  const index = rows.findIndex((r) => r.id === id)
  if (index === -1) return null
  rows[index] = {
    ...rows[index],
    archived,
    featured: archived ? false : rows[index].featured,
    updated_at: new Date().toISOString(),
  }
  writeRows(rows)
  return rowToProperty(rows[index])
}

export async function reorderPropertyRows(ids: string[]): Promise<void> {
  const rows = readRows()
  const now = new Date().toISOString()
  ids.forEach((id, index) => {
    const row = rows.find((r) => r.id === id)
    if (row) {
      row.sort_order = index
      row.updated_at = now
    }
  })
  writeRows(rows)
}

export function slugifyPropertyId(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80) || `propiedad-${Date.now()}`
}

export type PropertyInput = {
  title: string
  price: string | number
  location: string
  address?: string | null
  latitude?: string | number | null
  longitude?: string | number | null
  province?: string | null
  type: string
  operation?: string
  status?: string
  description: string
  images: string | string[]
  fotocasaUrl?: string | null
  bedrooms?: string | number | null
  bathrooms?: string | number | null
  sqMeters?: string | number | null
  availability?: string | null
  hotWater?: string | null
  heating?: string | null
  condition?: string | null
  propertyAge?: string | null
  floor?: string | null
  garage?: string | null
  elevator?: string | null
  furnished?: string | null
  extras?: string[] | null
  energyRating?: string | null
  energyValue?: string | number | null
  emissionsRating?: string | null
  emissionsValue?: string | number | null
  featured?: boolean
}

function parseCoordinate(value: string | number | null | undefined): number | null {
  if (value === undefined || value === null || value === '') return null
  const parsed = typeof value === 'number' ? value : parseFloat(String(value))
  return Number.isFinite(parsed) ? parsed : null
}

export function inputToProperty(input: PropertyInput, existing?: Property, defaultSortOrder = 0): Property {
  const imagesStr = Array.isArray(input.images) ? JSON.stringify(input.images) : String(input.images)
  const extras = normalizeExtraIds(input.extras ?? [])
  const legacyExtras = syncLegacyExtraFields(extras)
  const now = new Date()

  return {
    id: existing?.id ?? slugifyPropertyId(input.title),
    title: input.title,
    price: typeof input.price === 'number' ? input.price : parseFloat(String(input.price)),
    location: input.location,
    address: input.address?.trim() || null,
    latitude: parseCoordinate(input.latitude),
    longitude: parseCoordinate(input.longitude),
    province: input.province?.trim() || null,
    type: input.type,
    operation: input.operation || 'venta',
    status: input.status || 'disponible',
    description: input.description,
    images: imagesStr,
    fotocasaUrl: input.fotocasaUrl?.trim() || null,
    bedrooms:
      input.bedrooms !== undefined && input.bedrooms !== '' && input.bedrooms !== null
        ? parseInt(String(input.bedrooms), 10)
        : null,
    bathrooms:
      input.bathrooms !== undefined && input.bathrooms !== '' && input.bathrooms !== null
        ? parseInt(String(input.bathrooms), 10)
        : null,
    sqMeters:
      input.sqMeters !== undefined && input.sqMeters !== '' && input.sqMeters !== null
        ? parseFloat(String(input.sqMeters))
        : null,
    availability: input.availability || null,
    hotWater: input.hotWater || null,
    heating: input.heating?.trim() || (extras.includes('heating') ? 'Sí' : null),
    condition: input.condition || null,
    propertyAge: input.propertyAge || null,
    floor: input.floor || null,
    garage: input.garage || legacyExtras.garage,
    elevator: input.elevator || legacyExtras.elevator,
    furnished: input.furnished || legacyExtras.furnished,
    extras,
    energyRating: input.energyRating || null,
    energyValue:
      input.energyValue !== undefined && input.energyValue !== '' && input.energyValue !== null
        ? parseFloat(String(input.energyValue))
        : null,
    emissionsRating: input.emissionsRating || null,
    emissionsValue:
      input.emissionsValue !== undefined && input.emissionsValue !== '' && input.emissionsValue !== null
        ? parseFloat(String(input.emissionsValue))
        : null,
    featured: Boolean(input.featured),
    archived: existing?.archived ?? false,
    sortOrder: existing?.sortOrder ?? defaultSortOrder,
    createdAt: existing?.createdAt ?? now,
    updatedAt: now,
  }
}
