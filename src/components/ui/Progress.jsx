import { cn } from './cn'

const colors = {
  brand: 'bg-brand-600',
  success: 'bg-mint-500',
  warning: 'bg-amber-500',
  danger: 'bg-rose-500',
}

export function Progress({ value = 0, max = 100, color = 'brand', showLabel = false, className, barClassName, label }) {
  const percent = Math.max(0, Math.min(100, (value / max) * 100))
  return (
    <div className={cn('w-full', className)}>
      {(showLabel || label) && <div className="mb-1.5 flex justify-between gap-3 text-xs font-medium text-[var(--muted)]"><span>{label}</span><span>{Math.round(percent)}%</span></div>}
      <div className="h-2 overflow-hidden rounded-full bg-ink-100 dark:bg-ink-800" role="progressbar" aria-valuemin={0} aria-valuemax={max} aria-valuenow={value}>
        <div className={cn('h-full rounded-full transition-all duration-500', colors[color] || colors.brand, barClassName)} style={{ width: `${percent}%` }} />
      </div>
    </div>
  )
}
