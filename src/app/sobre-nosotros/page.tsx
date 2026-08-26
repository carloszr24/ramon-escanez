import Image from 'next/image'
import Link from 'next/link'
import { HOME_EXTRA_SERVICES, type ServiceItem } from '@/data/services'
import { HEADER_OFFSET_CLASS } from '@/lib/logo'

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="h-5 w-5" aria-hidden="true">
      <path d="M3 11.25 12 4l9 7.25" />
      <path d="M5.25 10.5V20h13.5v-9.5" />
      <path d="M9.75 20v-5.5h4.5V20" />
    </svg>
  )
}

function ServiceCard({ service }: { service: ServiceItem }) {
  return (
    <div className="group border border-stone-200 bg-white p-8 transition-colors duration-300 hover:border-brand-burgundy/30">
      <span className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-sm border border-stone-200 text-stone-600 transition-colors group-hover:border-brand-burgundy/30 group-hover:text-brand-burgundy">
        <HomeIcon />
      </span>
      <h3 className="mb-3 font-display text-[16px] md:text-[18px] font-extrabold text-stone-900 transition-colors group-hover:text-brand-burgundy">
        {service.title}
      </h3>
      <p className="text-sm font-light leading-relaxed text-stone-500">{service.desc}</p>
    </div>
  )
}

export default function SobreNosotrosPage() {
  return (
    <div className={HEADER_OFFSET_CLASS}>
      <section className="border-b border-stone-200 px-6 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-7xl">
          <nav className="mb-8 flex items-center gap-2 text-xs font-light text-stone-400">
            <Link href="/" className="transition-colors hover:text-stone-600">
              Inicio
            </Link>
            <span>/</span>
            <span className="text-stone-600">Sobre nosotros</span>
          </nav>

          <div className="max-w-3xl">
            <h1 className="font-display text-[26px] font-extrabold leading-tight text-stone-900 md:text-[40px]">
              Vender su casa no tiene que ser un caos
            </h1>
            <p className="mt-6 text-base font-light leading-relaxed text-stone-500 md:text-lg">
              Sé que decidir vender es una decisión importante, y a veces incómoda. Por eso trabajo con un
              método claro, sin promesas vacías: actúo desde el primer día con un plan, presento su casa para
              que el comprador la sienta suya, y usted sabe en todo momento cómo va el proceso.
            </p>
          </div>

          <div className="my-14 h-px bg-stone-200" />

          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
              <div className="absolute left-1/2 top-[52%] h-[128%] w-[128%] -translate-x-1/2 -translate-y-1/2">
                <Image
                  src="/images/granada-sobre-nosotros.png"
                  alt="Vista de Granada"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>

            <div className="lg:pt-4">
              <h2 className="font-display text-[20px] font-extrabold leading-snug text-stone-900 md:text-[24px]">
                Quién soy
              </h2>
              <div className="mt-6 space-y-5 text-sm font-light leading-relaxed text-stone-600 md:text-base">
                <p>
                  Soy Ramón Escánez, agente inmobiliario en Granada. No trabajo con carteles ni promesas
                  vacías: trabajo con un método, el mismo con cada propiedad, desde la primera valoración
                  hasta la firma en notaría.
                </p>
                <p>
                  Sé que vender una vivienda no es solo una operación, es una decisión que pesa. Por eso mi
                  trabajo es ocuparme de las negociaciones y los trámites, para que usted pueda pensar en lo
                  que viene después.
                </p>
                <p>Usted piensa en su nueva vida. Del resto me ocupo yo.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-stone-50 px-6 py-20 md:px-10 md:py-24">
        <div className="mx-auto max-w-7xl space-y-20">
          <div>
            <div className="mb-10 max-w-2xl">
              <p className="mb-3 text-[10px] font-light uppercase tracking-[0.22em] text-brand-burgundy">
                Cómo trabajo
              </p>
              <h2 className="font-display text-[26px] font-extrabold text-stone-900 md:text-[40px]">
                El método REM, paso a paso
              </h2>
              <p className="mt-4 text-sm font-light leading-relaxed text-stone-500 md:text-base">
                Rapidez, Emocionante, Motivante: así acompaño cada venta, desde la valoración hasta la firma.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {HOME_EXTRA_SERVICES.map((service) => (
                <ServiceCard key={service.title} service={service} />
              ))}
            </div>
          </div>

          <div className="border-l-2 border-brand-burgundy/30 bg-white p-8 md:p-10">
            <p className="mb-3 text-[10px] font-light uppercase tracking-[0.22em] text-brand-burgundy">
              Compromiso personal
            </p>
            <p className="font-display text-xl font-light italic leading-relaxed text-stone-800 md:text-2xl">
              “Hay un sentimiento de pérdida cuando se vende una propiedad. Estoy para minimizarte eso que te
              preocupa: yo asumo todas las negociaciones y trámites.”
            </p>
            <p className="mt-4 text-sm font-light text-stone-400">Ramón Escánez</p>
          </div>
        </div>
      </section>

      <section className="border-t border-stone-200 px-6 py-20 md:px-10 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-start justify-between gap-6 border border-stone-200 bg-white p-8 md:flex-row md:items-center md:p-10">
            <div>
              <h3 className="font-display text-[19px] md:text-[22px] font-extrabold text-stone-900">¿Hablamos?</h3>
              <p className="mt-2 max-w-md text-sm font-light leading-relaxed text-stone-500">
                Si quiere saber cómo aplicaría el método REM a su propiedad, escríbame. Sin compromiso, con calma.
              </p>
            </div>
            <Link
              href="/contacto"
              className="inline-flex shrink-0 items-center gap-2 border border-brand-burgundy px-8 py-3.5 font-display text-[10px] font-extrabold uppercase tracking-[0.14em] text-brand-burgundy transition-colors hover:bg-brand-burgundy hover:text-white"
            >
              Escríbanos
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
