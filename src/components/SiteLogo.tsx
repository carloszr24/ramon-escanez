import { cn } from '@/lib/utils'
import { AGENT } from '@/lib/contact'

type Props = {
  className?: string
  variant?: 'header' | 'footer'
  /** 'dark' renders ink text (for light backgrounds), 'light' renders white text (for dark backgrounds). */
  tone?: 'dark' | 'light'
  priority?: boolean
}

export function SiteLogo({ className, variant = 'header', tone = 'dark' }: Props) {
  const isFooter = variant === 'footer'

  return (
    <span
      className={cn(
        'font-display font-extrabold uppercase tracking-[0.04em] leading-none',
        isFooter ? 'text-xl md:text-2xl' : 'text-base md:text-lg',
        tone === 'light' ? 'text-white' : 'text-stone-900',
        className
      )}
    >
      {AGENT.name}
    </span>
  )
}
