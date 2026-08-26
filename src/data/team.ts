export type TeamMember = {
  id: string
  name: string
  role: string
  tenure?: string | null
  initials: string
  /** Ruta en public, p. ej. /images/team/asesor.jpg */
  photo?: string | null
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'ramon-escanez',
    name: 'Ramón Escánez',
    role: 'Agente inmobiliario',
    tenure: null,
    initials: 'RE',
    photo: null,
  },
]

export const TEAM_QUOTE = {
  text: 'Hay un sentimiento de pérdida cuando se vende una propiedad. Estoy para minimizarte eso que te preocupa: yo asumo todas las negociaciones y trámites.',
  attribution: 'Ramón Escánez',
  role: 'Agente inmobiliario',
} as const
