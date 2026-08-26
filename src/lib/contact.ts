export const CONTACT_EMAIL = 'correo@ramonescanez.com'

export const AGENT = {
  name: 'Ramón Escánez',
  title: 'Agente inmobiliario',
  tagline:
    'Agente inmobiliario en Granada. Te acompaño en la compra y venta de tu vivienda con trato cercano y profesional.',
} as const

export const LEGAL = {
  ownerName: 'Ramón Escánez',
  legalForm: 'autónomo',
  taxId: '',
  address: 'Paseo del Violón, 10, 18006 Granada',
} as const

export const OFFICES = {
  primary: {
    label: 'Oficina',
    line1: 'Paseo del Violón, 10',
    line2: '18006 Granada',
    full: 'Paseo del Violón, 10, 18006 Granada',
    mapsQuery: 'Paseo+del+Violon+10,+18006+Granada',
  },
} as const

const contactEmail = (process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? CONTACT_EMAIL).trim()

export const CONTACT = {
  address: OFFICES.primary,
  offices: OFFICES,
  phone: {
    display: '643 82 03 04',
    e164: '+34643820304',
    wa: '34643820304',
    label: 'Teléfono',
  },
  email: contactEmail,
} as const

export const mapsHref = `https://maps.google.com/?q=${CONTACT.address.mapsQuery}`
export const phoneHref = `tel:${CONTACT.phone.e164}`
export const hasEmail = CONTACT.email.length > 0
export const emailHref = hasEmail ? `mailto:${CONTACT.email}` : ''
export const whatsappHref = `https://wa.me/${CONTACT.phone.wa}`
export const whatsappDisplay = `+34 ${CONTACT.phone.display}`
