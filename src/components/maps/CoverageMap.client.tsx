'use client'

import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { cn } from '@/lib/utils'
import { MAP_TILE_ATTRIBUTION, MAP_TILE_URL } from '@/lib/leaflet-client'

type Props = {
  className?: string
  geoJsonUrl?: string
}

export function CoverageMap({ className, geoJsonUrl = '/data/cobertura-provincias.geojson' }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const mapRef = useRef<L.Map | null>(null)

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return

    const map = L.map(containerRef.current, {
      scrollWheelZoom: false,
      zoomControl: true,
    })
    mapRef.current = map

    L.tileLayer(MAP_TILE_URL, { attribution: MAP_TILE_ATTRIBUTION, maxZoom: 19 }).addTo(map)

    let cancelled = false
    fetch(geoJsonUrl)
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return
        const layer = L.geoJSON(data, {
          style: {
            color: '#103f91',
            weight: 2,
            fillColor: '#103f91',
            fillOpacity: 0.15,
          },
        }).addTo(map)

        layer.eachLayer((l) => {
          const feature = (l as L.Polygon & { feature?: { properties?: { Texto?: string } } }).feature
          const name = feature?.properties?.Texto
          if (name) l.bindTooltip(name, { sticky: true, className: 'coverage-map-tooltip' })
        })

        const bounds = layer.getBounds()
        if (bounds.isValid()) map.fitBounds(bounds, { padding: [24, 24] })
      })
      .catch(() => {})

    return () => {
      cancelled = true
      map.remove()
      mapRef.current = null
    }
  }, [geoJsonUrl])

  return <div ref={containerRef} className={cn('h-[320px] w-full rounded-sm', className)} />
}
