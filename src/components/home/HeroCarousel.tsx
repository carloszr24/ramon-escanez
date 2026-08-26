'use client'

import Image from 'next/image'

export function HeroCarousel() {
  return (
    <div className="absolute inset-0 z-0">
      <Image
        src="/images/ramon.png"
        alt="Ramón Escánez"
        fill
        priority
        quality={80}
        sizes="100vw"
        className="object-cover object-[70%_center] brightness-[0.88] saturate-[0.95]"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-stone-950/85 via-stone-950/40 to-stone-950/10"
        aria-hidden="true"
      />
    </div>
  )
}
