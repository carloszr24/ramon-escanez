import type { Property } from '@/types'
import { parseImages } from '@/lib/utils'

export type PropertyMapPoint = {
  id: string
  title: string
  price: number
  operation?: string | null
  latitude: number
  longitude: number
  imageUrl: string | null
  location: string
}

export function propertyHasMapPoint(property: Property): property is Property & {
  latitude: number
  longitude: number
} {
  return (
    typeof property.latitude === 'number' &&
    Number.isFinite(property.latitude) &&
    typeof property.longitude === 'number' &&
    Number.isFinite(property.longitude)
  )
}

export function toPropertyMapPoint(property: Property): PropertyMapPoint | null {
  if (!propertyHasMapPoint(property)) return null
  const images = parseImages(property.images)
  return {
    id: property.id,
    title: property.title,
    price: property.price,
    operation: property.operation,
    latitude: property.latitude,
    longitude: property.longitude,
    imageUrl: images[0] ?? null,
    location: property.location,
  }
}

export function toPropertyMapPoints(properties: Property[]): PropertyMapPoint[] {
  return properties.map(toPropertyMapPoint).filter((point): point is PropertyMapPoint => point !== null)
}
