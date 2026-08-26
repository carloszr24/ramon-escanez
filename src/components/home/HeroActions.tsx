'use client'

import Link from 'next/link'
import { ValoracionGratuitaModal } from '@/components/home/ValoracionGratuitaModal'

export function HeroActions() {
  return (
    <div
      className="flex flex-col sm:flex-row w-full max-w-xl gap-3 animate-fade-up md:-translate-y-2"
      style={{ animationDelay: '0.2s', opacity: 0, animationFillMode: 'forwards' }}
    >
      <ValoracionGratuitaModal
        triggerLabel="¿Cuánto vale tu propiedad?"
        triggerClassName="btn-gold w-full sm:w-auto text-center border border-transparent box-border"
      />
      <Link
        href="/propiedades"
        className="inline-flex items-center justify-center gap-2 rounded-full border border-white/70 bg-transparent px-8 py-4 font-display text-base font-extrabold tracking-tight text-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-white hover:text-brand-burgundy w-full sm:w-auto text-center box-border"
      >
        ¿Buscas vivienda?
      </Link>
    </div>
  )
}
