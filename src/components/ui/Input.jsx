import { forwardRef, useId } from 'react'
import { AlertCircle } from 'lucide-react'
import { cn } from './cn'

const controlClass = 'block w-full rounded-xl border border-[var(--line-strong)] bg-[var(--surface)] text-sm text-[var(--text)] placeholder:text-ink-400 shadow-sm outline-none transition duration-200 focus:border-brand-500 focus:ring-4 focus:ring-brand-100 disabled:cursor-not-allowed disabled:opacity-60 dark:focus:ring-brand-900/35'

export const Input = forwardRef(function Input(
  {
    id,
    label,
    description,
    error,
    required,
    icon: Icon,
    trailing,
    className,
    inputClassName,
    containerClassName,
    ...props
  },
  ref,
) {
  const reactId = useId()
  const inputId = id || `field-${reactId}`
  const hintId = description || error ? `${inputId}-hint` : undefined

  return (
    <div className={cn('space-y-1.5', containerClassName)}>
      {label && (
        <label htmlFor={inputId} className="flex items-center gap-1 text-sm font-medium text-[var(--text)]">
          {label}
          {required && <span className="text-rose-500" aria-hidden="true">*</span>}
        </label>
      )}
      <div className="relative">
        {Icon && <Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" aria-hidden="true" />}
        <input
          id={inputId}
          ref={ref}
          required={required}
          aria-invalid={Boolean(error) || undefined}
          aria-describedby={hintId}
          className={cn(controlClass, 'h-10 px-3', Icon && 'pl-9', trailing && 'pr-10', error && 'border-rose-400 focus:border-rose-500 focus:ring-rose-100 dark:focus:ring-rose-950/35', inputClassName, className)}
          {...props}
        />
        {trailing && <div className="absolute right-2 top-1/2 -translate-y-1/2">{trailing}</div>}
      </div>
      {(description || error) && (
        <p id={hintId} className={cn('flex items-center gap-1 text-xs', error ? 'text-rose-600 dark:text-rose-400' : 'text-[var(--muted)]')}>
          {error && <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />}
          {error || description}
        </p>
      )}
    </div>
  )
})

export const Textarea = forwardRef(function Textarea(
  { id, label, description, error, required, className, containerClassName, ...props },
  ref,
) {
  const reactId = useId()
  const inputId = id || `textarea-${reactId}`
  const hintId = description || error ? `${inputId}-hint` : undefined
  return (
    <div className={cn('space-y-1.5', containerClassName)}>
      {label && <label htmlFor={inputId} className="text-sm font-medium text-[var(--text)]">{label}{required && <span className="ml-1 text-rose-500">*</span>}</label>}
      <textarea
        id={inputId}
        ref={ref}
        required={required}
        aria-invalid={Boolean(error) || undefined}
        aria-describedby={hintId}
        className={cn(controlClass, 'min-h-24 resize-y px-3 py-2.5', error && 'border-rose-400 focus:border-rose-500 focus:ring-rose-100 dark:focus:ring-rose-950/35', className)}
        {...props}
      />
      {(description || error) && <p id={hintId} className={cn('text-xs', error ? 'text-rose-600 dark:text-rose-400' : 'text-[var(--muted)]')}>{error || description}</p>}
    </div>
  )
})
