import Link from 'next/link'
import { LegalPageShell } from '@/components/legal/LegalPageShell'
import { AGENT, CONTACT, LEGAL, hasEmail } from '@/lib/contact'
import { ADMIN_COOKIE_NAME } from '@/lib/admin-session'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

export const metadata = {
  title: `Política de cookies | ${AGENT.name}`,
  description: `Información sobre el uso de cookies en el sitio web de ${AGENT.name}.`,
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-xl md:text-2xl text-stone-900 mb-4 text-left">{title}</h2>
      <div className="space-y-3">{children}</div>
    </section>
  )
}

export default function PoliticaCookiesPage() {
  return (
    <LegalPageShell eyebrow="Legal" title="Política de cookies">
      <p className="text-stone-500 text-left -mt-4">
        Última actualización: junio de 2026. Esta política se aplica a los ciudadanos y residentes del Espacio
        Económico Europeo.
      </p>

      <Section title="1. Introducción">
        <p>
          Nuestra web,{' '}
          <a href={SITE_URL} className="text-brand-red hover:underline">
            {SITE_URL.replace(/^https?:\/\//, '')}
          </a>{' '}
          (en adelante, «la web»), utiliza cookies y tecnologías similares. En este documento le informamos
          sobre su uso en el sitio de <strong>{AGENT.name}</strong>, de acuerdo con lo que la web utiliza
          actualmente.
        </p>
        <p>
          La navegación ordinaria por la web <strong>no instala cookies de publicidad, estadísticas ni redes
          sociales</strong>. Solo se emplea una cookie técnica de sesión para el acceso al panel de
          administración interno.
        </p>
      </Section>

      <Section title="2. ¿Qué son las cookies?">
        <p>
          Una cookie es un pequeño archivo que se envía junto con las páginas de una web y que su navegador
          puede almacenar en su dispositivo. La información guardada puede devolverse a nuestros servidores o
          a los de terceros durante una visita posterior.
        </p>
      </Section>

      <Section title="3. ¿Qué son los scripts?">
        <p>
          Un script es un fragmento de código que permite que la web funcione correctamente. En nuestro caso,
          la web está desarrollada con Next.js y parte de ese código se ejecuta en nuestro servidor de
          alojamiento y otra parte en su navegador para mostrar contenidos e interactuar con los formularios de
          contacto y valoración.
        </p>
        <p>
          Las tipografías de la web se sirven desde el propio sitio (no cargamos fuentes desde servicios
          externos que instalen cookies en su dispositivo).
        </p>
      </Section>

      <Section title="4. ¿Qué es una baliza web?">
        <p>
          Una baliza web es una pequeña imagen o fragmento invisible que algunos sitios utilizan para medir
          visitas o comportamiento. <strong>{AGENT.name} no utiliza balizas web ni etiquetas de seguimiento</strong>{' '}
          en la versión actual de esta web.
        </p>
      </Section>

      <Section title="5. Cookies">
        <h3 className="font-medium text-stone-900 text-left">5.1 Cookies técnicas o funcionales</h3>
        <p>
          Son necesarias para que determinadas partes de la web funcionen. En la navegación pública de usuarios
          no instalamos cookies de preferencias ni de carrito, ya que la web no dispone de tienda online ni de
          área de clientes.
        </p>
        <p>
          La única cookie propia que utiliza la web es la de sesión del panel de administración, accesible
          únicamente en la ruta <code className="text-stone-800">/admin</code> para personal autorizado.
        </p>

        <h3 className="font-medium text-stone-900 text-left pt-2">5.2 Cookies de estadísticas</h3>
        <p>
          <strong>No utilizamos cookies de estadísticas</strong> (por ejemplo, Google Analytics, Matomo u otras
          herramientas similares) en la versión actual de la web.
        </p>

        <h3 className="font-medium text-stone-900 text-left pt-2">5.3 Cookies de marketing o seguimiento</h3>
        <p>
          <strong>No utilizamos cookies de marketing ni de creación de perfiles publicitarios</strong> en esta
          web.
        </p>

        <h3 className="font-medium text-stone-900 text-left pt-2">5.4 Redes sociales y contenido embebido</h3>
        <p>
          <strong>No incorporamos contenido embebido de redes sociales</strong> (LinkedIn, Facebook, YouTube,
          etc.) ni reproductores de vídeo de terceros dentro de nuestras páginas.
        </p>
        <p>
          Sí existen enlaces externos que usted puede abrir voluntariamente, como WhatsApp, Google Maps,
          Fotocasa o el correo electrónico. Al acceder a esos servicios, el tercero correspondiente podrá
          utilizar sus propias cookies, sobre las que {AGENT.name} no tiene control. Le recomendamos consultar
          las políticas de privacidad y cookies de dichos sitios.
        </p>
      </Section>

      <Section title="6. Cookies utilizadas en esta web">
        <div className="overflow-x-auto text-left">
          <table className="w-full border-collapse border border-stone-200 text-xs md:text-sm">
            <thead>
              <tr className="bg-stone-50">
                <th className="border border-stone-200 px-3 py-2 text-left font-medium text-stone-900">Nombre</th>
                <th className="border border-stone-200 px-3 py-2 text-left font-medium text-stone-900">Tipo</th>
                <th className="border border-stone-200 px-3 py-2 text-left font-medium text-stone-900">Finalidad</th>
                <th className="border border-stone-200 px-3 py-2 text-left font-medium text-stone-900">Duración</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-stone-200 px-3 py-2 align-top">{ADMIN_COOKIE_NAME}</td>
                <td className="border border-stone-200 px-3 py-2 align-top">Técnica / sesión</td>
                <td className="border border-stone-200 px-3 py-2 align-top">
                  Mantener la sesión del panel de administración interno. Solo se instala si un usuario
                  autorizado inicia sesión en <code className="text-stone-800">/admin</code>.
                </td>
                <td className="border border-stone-200 px-3 py-2 align-top">Hasta 7 días</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          El proveedor de alojamiento puede tratar datos técnicos de conexión necesarios para servir la
          web de forma segura. No obstante, en la navegación habitual del usuario no desplegamos herramientas
          adicionales de medición o publicidad.
        </p>
      </Section>

      <Section title="7. Consentimiento">
        <p>
          Dado que la web no utiliza cookies de estadísticas, marketing ni redes sociales embebidas,{' '}
          <strong>no mostramos actualmente un banner de consentimiento de cookies</strong> al visitante medio.
        </p>
        <p>
          La cookie técnica del panel de administración solo se utiliza cuando el propio personal autorizado
          accede a <code className="text-stone-800">/admin</code>, por lo que no afecta a la navegación general
          del sitio.
        </p>
        <p>
          Si en el futuro incorporáramos cookies que requieran consentimiento previo, actualizaremos esta
          política y habilitaremos el mecanismo de gestión correspondiente.
        </p>
      </Section>

      <Section title="8. Activación, desactivación y borrado de cookies">
        <p>
          Puede configurar su navegador para bloquear o eliminar las cookies. Consulte la sección de ayuda de
          su navegador para más información.
        </p>
        <p>
          Tenga en cuenta que, si elimina la cookie de sesión del panel de administración, será necesario volver
          a iniciar sesión en <code className="text-stone-800">/admin</code>. La navegación ordinaria de la web
          no debería verse afectada.
        </p>
      </Section>

      <Section title="9. Sus derechos respecto a los datos personales">
        <p>
          Tiene derecho de acceso, rectificación, supresión, oposición, limitación del tratamiento,
          portabilidad y a retirar el consentimiento cuando el tratamiento se base en este. También puede
          presentar una reclamación ante la Agencia Española de Protección de Datos (
          <a
            href="https://www.aepd.es"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-red hover:underline"
          >
            www.aepd.es
          </a>
          ).
        </p>
        <p>
          Para más información, consulte nuestra{' '}
          <Link href="/politica-privacidad" className="text-brand-red hover:underline">
            Política de privacidad
          </Link>
          .
        </p>
      </Section>

      <Section title="10. Datos de contacto">
        <p>
          Para cualquier consulta sobre esta política de cookies, puede contactar con:
        </p>
        <p>
          <strong>{LEGAL.ownerName}</strong> — <strong>{AGENT.name}</strong>
          <br />
          {LEGAL.address}
          <br />
          España
          <br />
          Web:{' '}
          <a href={SITE_URL} className="text-brand-red hover:underline">
            {SITE_URL.replace(/^https?:\/\//, '')}
          </a>
          {hasEmail && (
            <>
              <br />
              Correo electrónico:{' '}
              <a href={`mailto:${CONTACT.email}`} className="text-brand-red hover:underline">
                {CONTACT.email}
              </a>
            </>
          )}
        </p>
      </Section>
    </LegalPageShell>
  )
}
