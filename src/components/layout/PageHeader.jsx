import { cn } from '../ui/cn'

export function PageHeader({ eyebrow, title, description, actions, children, className, id = 'page-header' }) {
  return (
    <header id={id} className={cn('flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between', className)}>
      <div className="min-w-0">
        {eyebrow && <p className="mb-1 text-xs font-bold uppercase tracking-[0.1em] text-brand-600 dark:text-brand-300">{eyebrow}</p>}
        {title && <h1 className="text-2xl font-bold tracking-[-0.035em] text-[var(--text)] sm:text-[28px]">{title}</h1>}
        {description && <p className="mt-1.5 max-w-2xl text-sm leading-6 text-[var(--muted)]">{description}</p>}
        {children}
      </div>
      {actions && <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>}
    </header>
  )
}
