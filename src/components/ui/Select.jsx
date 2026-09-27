import { forwardRef, useId } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from './cn'

export const Select = forwardRef(function Select(
  { id, label, description, error, required, options = [], placeholder, className, containerClassName, children, ...props },
  ref,
) {
  const reactId = useId()
  const selectId = id || `select-${reactId}`
  const hintId = description || error ? `${selectId}-hint` : undefined
  return (
    <div className={cn('space-y-1.5', containerClassName)}>
      {label && <label htmlFor={selectId} className="text-sm font-medium text-[var(--text)]">{label}{required && <span className="ml-1 text-rose-500">*</span>}</label>}
      <div className="relative">
        <select
          id={selectId}
          ref={ref}
          required={required}
          aria-invalid={Boolean(error) || undefined}
          aria-describedby={hintId}
          className={cn('h-10 w-full appearance-none rounded-xl border border-[var(--line-strong)] bg-[var(--surface)] px-3 pr-9 text-sm text-[var(--text)] shadow-sm outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-100 disabled:cursor-not-allowed disabled:opacity-60 dark:focus:ring-brand-900/35', error && 'border-rose-400 focus:border-rose-500 focus:ring-rose-100 dark:focus:ring-rose-950/35', className)}
          {...props}
        >
          {placeholder && <option value="" disabled>{placeholder}</option>}
          {children || options.map((option) => <option key={String(option.value)} value={option.value} disabled={option.disabled}>{option.label}</option>)}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" aria-hidden="true" />
      </div>
      {(description || error) && <p id={hintId} className={cn('text-xs', error ? 'text-rose-600 dark:text-rose-400' : 'text-[var(--muted)]')}>{error || description}</p>}
    </div>
  )
})
