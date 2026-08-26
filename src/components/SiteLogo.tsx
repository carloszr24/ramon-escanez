import { cn } from '@/lib/utils'
import { AGENT } from '@/lib/contact'

type Props = {
  className?: string
  variant?: 'header' | 'footer'
  /** 'dark' renders navy text (for light backgrounds), 'light' renders white text (for dark backgrounds). */
  tone?: 'dark' | 'light'
  priority?: boolean
}

export function SiteLogo({ className, variant = 'header', tone = 'dark' }: Props) {
  const isFooter = variant === 'footer'

  return (
    <span
      className={cn(
        'font-signature leading-none',
        isFooter ? 'text-4xl md:text-5xl' : 'text-3xl md:text-4xl',
        tone === 'light' ? 'text-white' : 'text-brand-burgundy',
        className
      )}
    >
      {AGENT.name}
    </span>
  )
}
