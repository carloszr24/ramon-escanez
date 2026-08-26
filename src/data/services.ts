export type ServiceItem = {
  title: string
  desc: string
  partner?: string
  partnerLogo?: string
}

/** Tarjetas principales — «Más que una inmobiliaria». */
export const PRIMARY_SERVICES: ServiceItem[] = [
  {
    title: 'Plusvalía',
    desc: 'Me ocupo de la plusvalía municipal para que conozca sus obligaciones y plazos con total transparencia.',
  },
  {
    title: 'Asesoramiento jurídico',
    desc: 'Orientación en documentación, trámites notariales y registrales, con la máxima diligencia en cada operación.',
  },
]

/** Servicios destacados de valor para compradores y vendedores. */
export const HOME_EXTRA_SERVICES: ServiceItem[] = [
  {
    title: 'Asesoramiento',
    desc: 'Al comprador: le acompaño en todo el proceso, desde la búsqueda del inmueble que desea hasta la finalización de la compra, siempre asesorándolo en lo que necesite.',
  },
  {
    title: 'Propuesta de valor',
    desc: 'La experiencia de las últimas operaciones realizadas y propiedades ofrecidas en la zona dan como resultado el valor estimado para su propiedad, así como las distintas posibilidades de ofrecimiento o usos posibles.',
  },
  {
    title: 'Tasación e informe',
    desc: 'Al vendedor: valoro su inmueble no solo con los parámetros tradicionales, sino considerando también su potencial.',
  },
  {
    title: 'Comunicación y marketing',
    desc: 'Para dar visibilidad real a su propiedad, uso las herramientas de diseño y difusión disponibles en el mercado: websites, redes sociales y portales.',
  },
]

/** Menú de navegación — resumen de servicios. */
export const SERVICE_ITEMS: ServiceItem[] = [
  {
    title: 'Compra y venta',
    desc: 'Acompañamiento integral en operaciones de compraventa en Granada y su provincia.',
  },
  ...HOME_EXTRA_SERVICES,
  {
    title: 'Alquiler',
    desc: 'Gestión de alquileres residenciales con acompañamiento en cada fase del proceso.',
  },
]
