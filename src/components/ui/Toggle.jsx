import { useId } from 'react'
import { Check } from 'lucide-react'
import { cn } from './cn'

export function Toggle({ id, checked, defaultChecked, onCheckedChange, disabled, label, description, className, ...props }) {
  const reactId = useId()
  const inputId = id || `toggle-${reactId}`
  return (
    <label htmlFor={inputId} className={cn('flex cursor-pointer items-start justify-between gap-4', disabled && 'cursor-not-allowed opacity-60', className)}>
      {(label || description) && (
        <span className="min-w-0">
          {label && <span className="block text-sm font-medium text-[var(--text)]">{label}</span>}
          {description && <span className="mt-0.5 block text-xs leading-5 text-[var(--muted)]">{description}</span>}
        </span>
      )}
      <span className="relative mt-0.5 inline-flex shrink-0">
        <input
          id={inputId}
          type="checkbox"
          role="switch"
          checked={checked}
          defaultChecked={defaultChecked}
          disabled={disabled}
          onChange={(event) => onCheckedChange?.(event.target.checked, event)}
          className="peer sr-only"
          {...props}
        />
        <span className="flex h-5.5 w-10 items-center rounded-full bg-ink-300 p-0.5 transition-colors peer-checked:bg-brand-600 peer-focus-visible:ring-2 peer-focus-visible:ring-brand-400 peer-focus-visible:ring-offset-2 dark:bg-ink-600">
          <span className="h-4.5 w-4.5 rounded-full bg-white shadow-sm transition-transform peer-checked:translate-x-4.5" />
        </span>
      </span>
    </label>
  )
}

export function Checkbox({ id, checked, defaultChecked, onCheckedChange, label, description, disabled, className, ...props }) {
  const reactId = useId()
  const inputId = id || `checkbox-${reactId}`
  return (
    <label htmlFor={inputId} className={cn('flex cursor-pointer items-start gap-2.5', disabled && 'cursor-not-allowed opacity-60', className)}>
      <span className="relative mt-0.5 flex h-4.5 w-4.5 shrink-0">
        <input
          id={inputId}
          type="checkbox"
          checked={checked}
          defaultChecked={defaultChecked}
          disabled={disabled}
          onChange={(event) => onCheckedChange?.(event.target.checked, event)}
          className="peer sr-only"
          {...props}
        />
        <span className="flex h-4.5 w-4.5 items-center justify-center rounded border border-[var(--line-strong)] bg-[var(--surface)] text-white transition peer-checked:border-brand-600 peer-checked:bg-brand-600 peer-focus-visible:ring-2 peer-focus-visible:ring-brand-400">
          <Check className="h-3.5 w-3.5 opacity-0 transition-opacity peer-checked:opacity-100" strokeWidth={3} aria-hidden="true" />
        </span>
      </span>
      {(label || description) && <span>{label && <span className="block text-sm font-medium text-[var(--text)]">{label}</span>}{description && <span className="mt-0.5 block text-xs leading-5 text-[var(--muted)]">{description}</span>}</span>}
    </label>
  )
}
