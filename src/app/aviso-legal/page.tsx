import Link from 'next/link'
import { LegalPageShell } from '@/components/legal/LegalPageShell'
import { AGENT, CONTACT, LEGAL, hasEmail } from '@/lib/contact'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

export const metadata = {
  title: `Aviso legal | ${AGENT.name}`,
  description: `Aviso legal del sitio web de ${AGENT.name}.`,
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-xl md:text-2xl text-stone-900 mb-4 text-left">{title}</h2>
      <div className="space-y-3">{children}</div>
    </section>
  )
}

export default function AvisoLegalPage() {
  return (
    <LegalPageShell eyebrow="Legal" title="Aviso legal">
      <Section title="Titular del sitio web">
        <p>
          {LEGAL.ownerName}, {LEGAL.legalForm}.
          {LEGAL.taxId ? ` DNI/NIF: ${LEGAL.taxId}.` : ''} Domicilio profesional: {LEGAL.address}.
        </p>
        <p>
          Denominación comercial: <strong>{AGENT.name}</strong>.
        </p>
        {hasEmail && (
          <p>
            Correo de contacto:{' '}
            <a href={`mailto:${CONTACT.email}`} className="text-brand-red hover:underline">
              {CONTACT.email}
            </a>
          </p>
        )}
      </Section>

      <Section title="Objeto">
        <p>
          El sitio web{' '}
          <a href={SITE_URL} className="text-brand-red hover:underline">
            {SITE_URL.replace(/^https?:\/\//, '')}
          </a>{' '}
          tiene carácter informativo y comercial. Su finalidad es presentar los servicios inmobiliarios de{' '}
          {AGENT.name} y facilitar el contacto con personas interesadas en compra, venta, alquiler o
          asesoramiento relacionado con inmuebles.
        </p>
      </Section>

      <Section title="Condiciones de uso">
        <p>
          El acceso y uso de este sitio web atribuye la condición de usuario e implica la aceptación de las
          condiciones aquí recogidas. El usuario se compromete a hacer un uso adecuado de los contenidos y
          servicios ofrecidos, conforme a la ley, la moral, el orden público y las presentes condiciones.
        </p>
      </Section>

      <Section title="Propiedad intelectual">
        <p>
          Los contenidos de este sitio web, incluidos textos, imágenes, logotipos y diseño, son propiedad de{' '}
          {AGENT.name} o de terceros que han autorizado su uso, quedando prohibida su reproducción sin
          autorización expresa.
        </p>
      </Section>

      <Section title="Protección de datos y cookies">
        <p>
          El tratamiento de datos personales y el uso de cookies se rigen por documentos específicos:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-left">
          <li>
            <Link href="/politica-privacidad" className="text-brand-red hover:underline">
              Política de privacidad
            </Link>
          </li>
          <li>
            <Link href="/politica-cookies" className="text-brand-red hover:underline">
              Política de cookies
            </Link>
          </li>
        </ul>
      </Section>
    </LegalPageShell>
  )
}
