import Link from 'next/link'
import { LegalPageShell } from '@/components/legal/LegalPageShell'
import { AGENT, CONTACT, LEGAL, hasEmail } from '@/lib/contact'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

export const metadata = {
  title: `Política de privacidad | ${AGENT.name}`,
  description: `Política de privacidad y protección de datos de ${AGENT.name}.`,
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-xl md:text-2xl text-stone-900 mb-4 text-left">{title}</h2>
      <div className="space-y-3">{children}</div>
    </section>
  )
}

export default function PoliticaPrivacidadPage() {
  return (
    <LegalPageShell eyebrow="Legal" title="Política de privacidad">
      <Section title="Política de privacidad">
        <p>
          Es compromiso de <strong>{AGENT.name}</strong> informar a los usuarios de este sitio web sobre el
          tratamiento y la protección de los datos personales que puedan recabarse con motivo de la navegación
          o del uso de los servicios ofrecidos en el mismo.
        </p>
        <p>
          Por dato personal se entiende cualquier información concerniente a una persona física identificada o
          identificable.
        </p>
      </Section>

      <Section title="¿Quién es el responsable del tratamiento?">
        <p>
          De conformidad con el Reglamento (UE) 2016/679 (RGPD) y la normativa española de protección de datos,
          le informamos de que el responsable del tratamiento de los datos personales facilitados a través de{' '}
          <a href={SITE_URL} className="text-brand-red hover:underline">
            {SITE_URL.replace(/^https?:\/\//, '')}
          </a>{' '}
          es:
        </p>
        <p>
          <strong>{LEGAL.ownerName}</strong>, {LEGAL.legalForm}.
          <br />
          DNI/NIF: {LEGAL.taxId}.
          <br />
          Domicilio profesional: {LEGAL.address}.
          <br />
          Denominación comercial: <strong>{AGENT.name}</strong>.
          {hasEmail && (
            <>
              <br />
              Correo de contacto:{' '}
              <a href={`mailto:${CONTACT.email}`} className="text-brand-red hover:underline">
                {CONTACT.email}
              </a>
            </>
          )}
        </p>
        <p>
          {AGENT.name} será responsable de la confidencialidad y seguridad de los datos tratados para las
          finalidades indicadas en esta política, sin perjuicio de las responsabilidades que puedan
          corresponder a proveedores tecnológicos que actúen como encargados del tratamiento fuera del ámbito
          directo de la web.
        </p>
      </Section>

      <Section title="¿Está obligado a facilitar sus datos personales?">
        <p>
          La simple visita a la web no obliga a facilitar datos personales. No obstante, el uso de los
          formularios de contacto o de solicitud de valoración inmobiliaria requiere facilitar determinados
          datos para poder atender su petición.
        </p>
        <p>
          Los datos solicitados en cada formulario son los estrictamente necesarios para la finalidad indicada.
          La negativa a facilitar los datos marcados como obligatorios impedirá tramitar adecuadamente su
          solicitud.
        </p>
      </Section>

      <Section title="¿Para qué utilizamos sus datos personales?">
        <p>Los datos personales que nos facilite serán tratados con las siguientes finalidades:</p>
        <ul className="list-disc pl-5 space-y-2 text-left">
          <li>
            <strong>Formulario de contacto:</strong> atender su consulta, responder a su mensaje y mantener la
            comunicación relacionada con los servicios inmobiliarios de {AGENT.name}.
          </li>
          <li>
            <strong>Formulario de valoración gratuita («Quiero vender»):</strong> gestionar su solicitud de
            valoración del inmueble, contactar con usted para ofrecerle una orientación de mercado y, en su
            caso, tramitar los servicios inmobiliarios que nos solicite.
          </li>
          <li>
            <strong>Contacto por teléfono, correo electrónico o WhatsApp:</strong> dar respuesta a las
            solicitudes que nos dirija por estos medios en relación con nuestros servicios.
          </li>
        </ul>
        <p>
          <strong>No utilizamos sus datos para el envío de comunicaciones comerciales no solicitadas</strong>{' '}
          distintas de la respuesta a su propia consulta o solicitud, salvo que usted nos autorice expresamente
          a ello o exista una relación comercial previa conforme a la normativa aplicable.
        </p>
        <p>
          El acceso al panel de administración de la web utiliza una cookie técnica de sesión. Puede consultar
          más información en la{' '}
          <Link href="/politica-cookies" className="text-brand-red hover:underline">
            Política de cookies
          </Link>
          .
        </p>
      </Section>

      <Section title="¿Cuál es la legitimación del tratamiento?">
        <p>
          El tratamiento de sus datos se basa en el consentimiento que nos presta al enviar los formularios, en
          la ejecución de medidas precontractuales a petición suya y, cuando proceda, en el interés legítimo de
          {AGENT.name} en atender las solicitudes recibidas.
        </p>
        <p>
          Puede retirar su consentimiento en cualquier momento, sin que ello afecte a la licitud del
          tratamiento realizado con anterioridad.
        </p>
      </Section>

      <Section title="¿Qué categorías de datos se tratan?">
        <p>Según el servicio utilizado, podemos tratar las siguientes categorías de datos:</p>
        <ul className="list-disc pl-5 space-y-2 text-left">
          <li>Datos identificativos: nombre y apellidos.</li>
          <li>Datos de contacto: teléfono y correo electrónico.</li>
          <li>Datos incluidos en su mensaje o consulta.</li>
          <li>
            En el formulario de valoración: tipo de inmueble, ubicación, superficie, habitaciones, baños,
            estado, plazo de venta y demás información que decida facilitarnos.
          </li>
        </ul>
      </Section>

      <Section title="¿Durante cuánto tiempo conservamos los datos?">
        <p>
          Los datos se conservarán durante el tiempo necesario para atender su solicitud y mantener la relación
          derivada de la misma, así como durante los plazos legalmente exigibles para atender posibles
          responsabilidades.
        </p>
        <p>
          A título orientativo, y cuando resulte de aplicación, los datos podrán conservarse durante los plazos
          previstos en la normativa mercantil, fiscal o civil (por ejemplo, documentación contractual o
          contable durante los años exigidos por la legislación vigente).
        </p>
      </Section>

      <Section title="¿A qué destinatarios se comunican los datos?">
        <p>
          Sus datos no se cederán a terceros salvo obligación legal o cuando sea necesario para prestar el
          servicio solicitado.
        </p>
        <p>
          Para el funcionamiento de la web y la gestión de consultas, {AGENT.name} puede apoyarse en
          proveedores que actúan como encargados del tratamiento, como plataformas de alojamiento web y
          servicios de envío de correo electrónico para la notificación de solicitudes recibidas.
        </p>
        <p>
          Estos proveedores únicamente tratarán los datos siguiendo nuestras instrucciones y con las garantías
          exigidas por la normativa de protección de datos.
        </p>
      </Section>

      <Section title="¿Qué responsabilidad tiene el usuario?">
        <p>
          Usted garantiza que los datos facilitados son veraces, exactos y están actualizados, respondiendo de
          la inexactitud o falsedad de los mismos y de los perjuicios que pudieran causarse a {AGENT.name} o a
          terceros.
        </p>
      </Section>

      <Section title="¿Qué derechos tiene el usuario?">
        <p>
          Puede ejercer gratuitamente los derechos de acceso, rectificación, supresión, oposición, limitación
          del tratamiento y portabilidad, así como retirar el consentimiento prestado, mediante solicitud
          escrita dirigida a {LEGAL.ownerName} a la dirección {LEGAL.address}
          {hasEmail && (
            <>
              {' '}
              o al correo{' '}
              <a href={`mailto:${CONTACT.email}`} className="text-brand-red hover:underline">
                {CONTACT.email}
              </a>
            </>
          )}
          , acompañando copia de un documento que acredite su identidad.
        </p>
        <p>
          Asimismo, puede presentar una reclamación ante la Agencia Española de Protección de Datos (
          <a
            href="https://www.aepd.es"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-red hover:underline"
          >
            www.aepd.es
          </a>
          ) si considera que el tratamiento no se ajusta a la normativa vigente.
        </p>
      </Section>

      <Section title="¿Es seguro facilitar datos personales?">
        <p>
          {AGENT.name} adopta las medidas técnicas y organizativas razonables para proteger sus datos frente a
          accesos no autorizados, pérdida, alteración o tratamiento ilícito, de acuerdo con el estado de la
          tecnología y la naturaleza de los datos tratados.
        </p>
      </Section>

      <Section title="¿Puede cambiar esta política de privacidad?">
        <p>
          Nos reservamos el derecho a modificar la presente política para adaptarla a novedades legislativas o
          cambios en los servicios ofrecidos. Cuando ello sea relevante, se publicará la versión actualizada
          en esta página.
        </p>
      </Section>
    </LegalPageShell>
  )
}
