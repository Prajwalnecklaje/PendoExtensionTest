import { Inbox } from 'lucide-react'
import { cn } from './cn'

export function EmptyState({ icon: Icon = Inbox, title = 'Nothing here yet', description, action, className, id = 'empty-state' }) {
  return (
    <div id={id} className={cn('flex min-h-52 flex-col items-center justify-center rounded-2xl border border-dashed border-[var(--line-strong)] bg-[var(--surface-subtle)] px-6 py-10 text-center', className)}>
      <span className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-900/35 dark:text-brand-300"><Icon className="h-5 w-5" /></span>
      <h3 className="text-sm font-semibold text-[var(--text)]">{title}</h3>
      {description && <p className="mt-1 max-w-sm text-sm leading-5 text-[var(--muted)]">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}
