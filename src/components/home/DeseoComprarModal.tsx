'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { PropertyIntentSearch } from '@/components/properties/PropertyIntentSearch'
import type { PropertyMapPoint } from '@/lib/property-map'

type Props = {
  triggerClassName?: string
  triggerLabel?: string
  mapPoints?: PropertyMapPoint[]
}

export function DeseoComprarModal({
  triggerClassName = '',
  triggerLabel = 'Deseo comprar',
  mapPoints = [],
}: Props) {
  const [mounted, setMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!isOpen) return
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeModal()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen])

  const closeModal = () => setIsOpen(false)

  return (
    <>
      <button type="button" onClick={() => setIsOpen(true)} className={triggerClassName}>
        {triggerLabel}
      </button>

      {mounted &&
        isOpen &&
        createPortal(
          <div className="lead-modal-overlay" onClick={closeModal}>
            <div className="lead-modal lead-modal--wide" onClick={(e) => e.stopPropagation()}>
              <button type="button" onClick={closeModal} className="lead-modal-close" aria-label="Cerrar modal">
                ×
              </button>

              <div className="lead-modal-hero">
                <h3 className="lead-modal-title">Encuentre su próximo hogar</h3>
                <p className="lead-modal-subtitle">
                  Indique dónde le gustaría vivir, el tipo de vivienda y explore las opciones en el mapa.
                </p>
              </div>

              <div className="lead-modal-body">
                <PropertyIntentSearch mode="buy" mapPoints={mapPoints} variant="modal" onClose={closeModal} />
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  )
}
