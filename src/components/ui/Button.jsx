import { forwardRef } from 'react'
import { LoaderCircle } from 'lucide-react'
import { cn } from './cn'

const variants = {
  primary: 'bg-brand-600 text-white shadow-[0_5px_14px_rgba(104,82,223,.23)] hover:bg-brand-700 active:bg-brand-800 dark:bg-brand-500 dark:hover:bg-brand-400',
  secondary: 'border border-[var(--line-strong)] bg-[var(--surface)] text-[var(--text)] shadow-sm hover:bg-[var(--surface-subtle)]',
  outline: 'border border-brand-200 bg-brand-50 text-brand-700 hover:bg-brand-100 dark:border-brand-700/60 dark:bg-brand-900/25 dark:text-brand-200 dark:hover:bg-brand-900/45',
  soft: 'bg-brand-50 text-brand-700 hover:bg-brand-100 dark:bg-brand-900/30 dark:text-brand-200 dark:hover:bg-brand-900/50',
  ghost: 'bg-transparent text-[var(--muted)] hover:bg-[var(--surface-subtle)] hover:text-[var(--text)]',
  danger: 'bg-rose-600 text-white shadow-[0_5px_14px_rgba(225,29,72,.18)] hover:bg-rose-700 active:bg-rose-800',
  'danger-soft': 'bg-rose-50 text-rose-700 hover:bg-rose-100 dark:bg-rose-950/35 dark:text-rose-300 dark:hover:bg-rose-950/55',
  success: 'bg-mint-600 text-white shadow-[0_5px_14px_rgba(16,139,112,.18)] hover:bg-mint-500',
}

const sizes = {
  xs: 'h-7 gap-1.5 rounded-lg px-2.5 text-xs',
  sm: 'h-8 gap-1.5 rounded-lg px-3 text-xs font-semibold',
  md: 'h-10 gap-2 rounded-xl px-4 text-sm font-semibold',
  lg: 'h-11 gap-2 rounded-xl px-5 text-sm font-semibold',
  xl: 'h-12 gap-2.5 rounded-xl px-6 text-base font-semibold',
}

export const Button = forwardRef(function Button(
  {
    as: Component = 'button',
    className,
    variant = 'primary',
    size = 'md',
    loading = false,
    disabled = false,
    type = 'button',
    children,
    ...props
  },
  ref,
) {
  const isButton = Component === 'button'

  return (
    <Component
      ref={ref}
      {...(isButton ? { type } : {})}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cn(
        'inline-flex shrink-0 items-center justify-center whitespace-nowrap transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--page)] disabled:pointer-events-none disabled:opacity-50',
        variants[variant] || variants.primary,
        sizes[size] || sizes.md,
        className,
      )}
      {...props}
    >
      {loading && <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />}
      {children}
    </Component>
  )
})

export const IconButton = forwardRef(function IconButton(
  { className, label, size = 'md', variant = 'ghost', children, ...props },
  ref,
) {
  const iconSizes = { xs: 'h-7 w-7', sm: 'h-8 w-8', md: 'h-10 w-10', lg: 'h-11 w-11' }
  return (
    <Button
      ref={ref}
      aria-label={label}
      title={label}
      variant={variant}
      className={cn('!p-0', iconSizes[size] || iconSizes.md, className)}
      {...props}
    >
      {children}
    </Button>
  )
})
