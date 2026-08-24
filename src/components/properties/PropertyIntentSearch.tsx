'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'
import { PropertyMap } from '@/components/maps/PropertyMapLoader'
import { LocationSearchInput, type LocationSuggestion } from '@/components/properties/LocationSearchInput'
import { TYPE_LABELS } from '@/lib/utils'
import type { PropertyMapPoint } from '@/lib/property-map'
import { cn } from '@/lib/utils'

const SEARCH_TYPES = ['casa', 'piso', 'local', 'terreno'] as const

const TYPE_TO_VALORACION: Record<string, string> = {
  casa: 'Casa',
  piso: 'Piso',
  local: 'Local',
  terreno: 'Terreno',
}

type Props = {
  mode: 'buy' | 'sell'
  mapPoints?: PropertyMapPoint[]
  onSellContextChange?: (ctx: { location: string; propertyType: string }) => void
  variant?: 'page' | 'modal'
  onClose?: () => void
}

export function PropertyIntentSearch({
  mode,
  mapPoints = [],
  onSellContextChange,
  variant = 'page',
  onClose,
}: Props) {
  const router = useRouter()
  const [location, setLocation] = useState('')
  const [focusCenter, setFocusCenter] = useState<{ latitude: number; longitude: number; zoom?: number } | null>(
    null
  )
  const [pin, setPin] = useState<{ latitude: number; longitude: number } | null>(null)
  const [propertyType, setPropertyType] = useState<string>('')

  const isBuy = mode === 'buy'
  const isModal = variant === 'modal'

  const searchHref = useMemo(() => {
    const params = new URLSearchParams()
    params.set('operation', 'venta')
    if (propertyType) params.set('type', propertyType)
    return `/propiedades?${params.toString()}`
  }, [propertyType])

  const navigateAway = (href: string) => {
    onClose?.()
    router.push(href)
  }

  const handleSearch = () => {
    navigateAway(searchHref)
  }

  const applyLocation = (item: LocationSuggestion) => {
    setFocusCenter({ latitude: item.latitude, longitude: item.longitude, zoom: 14 })
    setPin({ latitude: item.latitude, longitude: item.longitude })
    if (!isBuy && onSellContextChange) {
      onSellContextChange({ location: item.displayName, propertyType: TYPE_TO_VALORACION[propertyType] || '' })
    }
  }

  const handleTypeChange = (type: string) => {
    const next = propertyType === type ? '' : type
    setPropertyType(next)
    if (!isBuy && onSellContextChange) {
      onSellContextChange({
        location,
        propertyType: next ? TYPE_TO_VALORACION[next] || '' : '',
      })
    }
  }

  const handleLocationText = (value: string) => {
    setLocation(value)
    if (!isBuy && onSellContextChange) {
      onSellContextChange({
        location: value,
        propertyType: propertyType ? TYPE_TO_VALORACION[propertyType] || '' : '',
      })
    }
  }

  return (
    <div className={isModal ? 'w-full' : 'mx-auto max-w-7xl'}>
      <div className={cn('grid grid-cols-1 gap-10', isModal ? 'lg:grid-cols-2 lg:gap-8' : 'lg:grid-cols-5 lg:gap-12')}>
        <div className={cn('space-y-8', isModal ? '' : 'lg:col-span-2')}>
          <div>
            <label className="mb-2 block text-[10px] font-light uppercase tracking-[0.18em] text-stone-500">
              {isBuy ? '¿Dónde busca?' : '¿Dónde está la vivienda?'}
            </label>
            <LocationSearchInput
              value={location}
              onChange={handleLocationText}
              onSelect={applyLocation}
              placeholder={isBuy ? 'Barrio, calle o pueblo…' : 'Dirección o zona de la vivienda…'}
            />
            <p className="mt-2 text-xs font-light text-stone-400">
              Escriba y elija una sugerencia para situar la zona en el mapa.
            </p>
          </div>

          <div>
            <p className="mb-3 text-[10px] font-light uppercase tracking-[0.18em] text-stone-500">
              {isBuy ? '¿Qué busca?' : '¿Qué tipo de inmueble es?'}
            </p>
            <div className="flex flex-wrap gap-2">
              {SEARCH_TYPES.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => handleTypeChange(type)}
                  className={cn(
                    'border px-4 py-2 text-xs font-light uppercase tracking-[0.1em] transition-colors',
                    propertyType === type
                      ? 'border-brand-burgundy bg-brand-burgundy text-white'
                      : 'border-stone-200 bg-white text-stone-600 hover:border-stone-400'
                  )}
                >
                  {TYPE_LABELS[type] || type}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-2">
            {isBuy ? (
              <button type="button" onClick={handleSearch} className="btn-primary w-full py-3.5 text-xs">
                Ver resultados
              </button>
            ) : null}
            <Link
              href={isBuy ? '/propiedades' : '/contacto'}
              onClick={() => onClose?.()}
              className={cn(
                'inline-flex w-full items-center justify-center border border-stone-300 py-3.5 text-xs font-light uppercase tracking-[0.1em] text-stone-600 transition-colors hover:border-stone-900 hover:text-stone-900',
                !isBuy && 'btn-primary border-transparent text-white hover:text-white'
              )}
            >
              {isBuy ? 'Ver todas las propiedades' : 'Prefiero hablar con alguien'}
            </Link>
          </div>
        </div>

        <div className={isModal ? '' : 'lg:col-span-3'}>
          <PropertyMap
            className={isModal ? 'h-[240px] md:h-[280px]' : 'h-[320px] md:h-[420px]'}
            points={isBuy ? mapPoints : []}
            focusCenter={isBuy ? focusCenter : null}
            draggable={
              !isBuy && pin
                ? {
                    latitude: pin.latitude,
                    longitude: pin.longitude,
                    onMove: (latitude, longitude) => setPin({ latitude, longitude }),
                  }
                : !isBuy
                  ? {
                      latitude: 37.287,
                      longitude: -6.054,
                      onMove: (latitude, longitude) => setPin({ latitude, longitude }),
                    }
                  : null
            }
          />
          <p className="mt-3 text-xs font-light text-stone-400">
            {isBuy
              ? 'Toque un pin para ver la ficha. Ajuste zona y filtros y pulse «Ver resultados».'
              : 'Marque la ubicación aproximada de su vivienda. Puede arrastrar el pin.'}
          </p>
        </div>
      </div>
    </div>
  )
}

export { TYPE_TO_VALORACION }
