import type { Metadata } from 'next'
import { Fraunces, Manrope, Mrs_Saint_Delafield, Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

const sans = Manrope({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500', '600', '700', '800'],
})

const heading = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-heading',
  weight: ['700', '800'],
})

const display = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600'],
})

const signature = Mrs_Saint_Delafield({
  subsets: ['latin'],
  variable: '--font-signature',
  weight: '400',
})

export const metadata: Metadata = {
  title: 'Ramón Escánez | Agente inmobiliario en Granada',
  description:
    'Compra y venta de viviendas en Granada. Ramón Escánez: trato cercano, asesoramiento claro y acompañamiento en cada paso.',
  keywords:
    'ramón escánez, agente inmobiliario granada, comprar piso granada, venta vivienda granada, inmobiliaria granada',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${sans.variable} ${heading.variable} ${display.variable} ${signature.variable}`}>
      <body className="bg-sand-50 text-ink antialiased">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
