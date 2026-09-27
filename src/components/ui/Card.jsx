import { cn } from './cn'

export function Card({ className, children, ...props }) {
  return (
    <section className={cn('app-card', className)} {...props}>
      {children}
    </section>
  )
}

export function CardHeader({ className, children, ...props }) {
  return (
    <header className={cn('flex items-start justify-between gap-4 px-5 pb-0 pt-5 sm:px-6 sm:pt-6', className)} {...props}>
      {children}
    </header>
  )
}

export function CardTitle({ className, children, ...props }) {
  return <h3 className={cn('text-[15px] font-semibold tracking-[-0.01em] text-[var(--text)]', className)} {...props}>{children}</h3>
}

export function CardDescription({ className, children, ...props }) {
  return <p className={cn('mt-1 text-sm leading-5 text-[var(--muted)]', className)} {...props}>{children}</p>
}

export function CardContent({ className, children, ...props }) {
  return <div className={cn('p-5 sm:p-6', className)} {...props}>{children}</div>
}

export function CardFooter({ className, children, ...props }) {
  return <footer className={cn('flex items-center gap-3 border-t border-[var(--line)] px-5 py-4 sm:px-6', className)} {...props}>{children}</footer>
}
