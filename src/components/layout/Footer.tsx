import Link from 'next/link'
import {
  AGENT,
  CONTACT,
  OFFICES,
  SOCIAL,
  emailHref,
  hasEmail,
  mapsHref,
  phoneHref,
  whatsappHref,
} from '@/lib/contact'
import { SiteLogo } from '@/components/SiteLogo'

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5" aria-hidden="true">
      <path d="M14 8.5h2V5h-2a4 4 0 0 0-4 4v2H8v3.5h2V21h3.5v-6.5H16l.5-3.5h-3V9c0-.28.22-.5.5-.5Z" />
    </svg>
  )
}

export function Footer() {
  return (
    <footer className="mt-24 border-t border-stone-200 bg-white text-stone-600">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <SiteLogo variant="footer" />
            <p className="mt-5 text-sm font-light leading-relaxed text-stone-500 max-w-md">
              {AGENT.tagline}
              <br />
              <br />
              Oficina en Granada.
            </p>
            <div className="mt-5 flex items-center gap-4">
              <a
                href={SOCIAL.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-stone-500 transition-colors hover:text-stone-900"
              >
                <InstagramIcon />
              </a>
              <a
                href={SOCIAL.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-stone-500 transition-colors hover:text-stone-900"
              >
                <FacebookIcon />
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-stone-900 text-[10px] tracking-[0.18em] uppercase mb-4 font-light">Navegación</h4>
            <ul className="space-y-2 text-sm font-light">
              <li><Link href="/propiedades" className="transition-colors hover:text-stone-900">Propiedades</Link></li>
              <li><Link href="/sobre-nosotros" className="transition-colors hover:text-stone-900">Servicios</Link></li>
              <li><Link href="/contacto" className="transition-colors hover:text-stone-900">Contacto</Link></li>
              <li><Link href="/aviso-legal" className="transition-colors hover:text-stone-900">Aviso legal</Link></li>
              <li><Link href="/politica-privacidad" className="transition-colors hover:text-stone-900">Privacidad</Link></li>
              <li><Link href="/politica-cookies" className="transition-colors hover:text-stone-900">Cookies</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-stone-900 text-[10px] tracking-[0.18em] uppercase mb-4 font-light">Contacto</h4>
            <ul className="space-y-3 text-sm font-light">
              <li>
                <a href={phoneHref} className="transition-colors hover:text-stone-900">
                  {CONTACT.phone.label}: {CONTACT.phone.display}
                </a>
              </li>
              {hasEmail && (
                <li>
                  <a href={emailHref} className="transition-colors hover:text-stone-900">{CONTACT.email}</a>
                </li>
              )}
              <li>
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-stone-900">
                  WhatsApp: +34 {CONTACT.phone.display}
                </a>
              </li>
              <li className="pt-2">
                <p className="text-stone-400 text-xs mb-0.5 font-light">{OFFICES.primary.label}</p>
                <a href={mapsHref} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-stone-900">
                  {OFFICES.primary.full}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-stone-200/80 pt-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2 text-xs font-light text-stone-400">
          <span className="shrink-0">© {new Date().getFullYear()} {AGENT.name}. Todos los derechos reservados.</span>
          <p className="text-[10px] leading-snug text-stone-400 lg:whitespace-nowrap lg:text-right">
            Toda la información contenida en esta web carece de carácter contractual, siendo su contenido meramente informativo.
          </p>
        </div>
      </div>
    </footer>
  )
}
