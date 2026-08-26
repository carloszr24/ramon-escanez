'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { HEADER_HEIGHT_CLASS } from '@/lib/logo'
import { cn } from '@/lib/utils'
import { ValoracionGratuitaModal } from '@/components/home/ValoracionGratuitaModal'

const links = [
  { href: '/', label: 'Inicio' },
  { href: '/propiedades', label: 'Propiedades' },
  { href: '/sobre-nosotros', label: 'Servicios' },
  { href: '/contacto', label: 'Contacto' },
]

export function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const isHome = pathname === '/'
  const transparent = isHome && !scrolled && !open

  useEffect(() => {
    if (!isHome) return
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [isHome])

  if (pathname.startsWith('/admin')) return null

  const navLinkClass = cn(
    'inline-flex items-center leading-none text-[0.68rem] font-medium uppercase tracking-[0.12em] transition-colors duration-200',
    transparent ? 'text-white/90 hover:text-white' : 'text-slate-600 hover:text-slate-900'
  )

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-colors duration-300',
        transparent
          ? 'border-b border-transparent bg-transparent'
          : 'border-b border-stone-200/80 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.04)] backdrop-blur-sm'
      )}
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-7 lg:px-10 xl:px-12">
        <div
          className={cn(
            'flex w-full items-center justify-between',
            HEADER_HEIGHT_CLASS
          )}
        >
          <nav className="hidden shrink-0 items-center gap-6 self-center md:flex lg:gap-7">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  navLinkClass,
                  pathname === link.href && (transparent ? 'text-white' : 'text-slate-900')
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-4">
            <ValoracionGratuitaModal
              triggerLabel="Valoración gratuita"
              triggerClassName="hidden md:inline-flex h-11 shrink-0 items-center justify-center whitespace-nowrap rounded-full bg-brand-burgundy px-5 font-display text-xs font-extrabold uppercase tracking-[0.1em] text-white shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-burgundy-dark hover:shadow-lift"
            />

            <button
              className="p-2 transition-colors md:hidden"
              onClick={() => setOpen(!open)}
              aria-label="Menu"
            >
              <div className="w-5 space-y-1.5">
                <span
                  className={cn(
                    'block h-px transition-all duration-300',
                    transparent ? 'bg-white' : 'bg-stone-900',
                    open && 'translate-y-2 rotate-45'
                  )}
                />
                <span
                  className={cn(
                    'block h-px transition-all duration-300',
                    transparent ? 'bg-white' : 'bg-stone-900',
                    open && 'opacity-0'
                  )}
                />
                <span
                  className={cn(
                    'block h-px transition-all duration-300',
                    transparent ? 'bg-white' : 'bg-stone-900',
                    open && '-translate-y-2 -rotate-45'
                  )}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="space-y-4 border-t border-stone-100 bg-white px-6 py-6 md:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block py-1 text-sm font-light text-stone-600 hover:text-stone-900"
            >
              {link.label}
            </Link>
          ))}
          <ValoracionGratuitaModal
            triggerLabel="Valoración gratuita"
            triggerClassName="btn-primary mt-3 w-full text-center text-xs"
          />
        </div>
      )}
    </header>
  )
}
