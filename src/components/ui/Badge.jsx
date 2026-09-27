import { cn } from './cn'

const variants = {
  neutral: 'bg-ink-100 text-ink-600 dark:bg-ink-800 dark:text-ink-300',
  brand: 'bg-brand-100 text-brand-700 dark:bg-brand-900/45 dark:text-brand-200',
  success: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300',
  warning: 'bg-amber-100 text-amber-800 dark:bg-amber-950/45 dark:text-amber-300',
  danger: 'bg-rose-100 text-rose-700 dark:bg-rose-950/45 dark:text-rose-300',
  info: 'bg-sky-100 text-sky-700 dark:bg-sky-950/45 dark:text-sky-300',
}

export function Badge({ className, variant = 'neutral', dot = false, children, ...props }) {
  return (
    <span
      className={cn('inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold leading-none', variants[variant] || variants.neutral, className)}
      {...props}
    >
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />}
      {children}
    </span>
  )
}
