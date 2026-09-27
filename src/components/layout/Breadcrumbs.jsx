import { ChevronRight, Home } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { cn } from '../ui/cn'

const ROUTE_LABELS = {
  dashboard: 'Dashboard',
  projects: 'Projects',
  analytics: 'Analytics',
  reports: 'Reports',
  'embedded-content': 'Embedded content',
  team: 'Team & users',
  billing: 'Billing',
  profile: 'Profile',
  settings: 'Account settings',
  security: 'Security',
  notifications: 'Notifications',
  help: 'Help & documentation',
  contact: 'Contact us',
}

function humanize(segment) {
  return ROUTE_LABELS[segment] || segment.replace(/-/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase())
}

export function Breadcrumbs({ items, className, homeTo = '/dashboard' }) {
  const location = useLocation()
  const generated = location.pathname.split('/').filter(Boolean).map((segment, index, all) => ({
    label: humanize(segment),
    to: `/${all.slice(0, index + 1).join('/')}`,
  }))
  const crumbItems = items || generated

  return (
    <nav aria-label="Breadcrumb" className={cn('flex min-w-0 items-center gap-1.5 overflow-x-auto text-xs font-medium text-[var(--muted)]', className)}>
      <Link to={homeTo} className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md transition hover:bg-[var(--surface-subtle)] hover:text-brand-600" aria-label="Dashboard home">
        <Home className="h-3.5 w-3.5" aria-hidden="true" />
      </Link>
      {crumbItems.map((item, index) => {
        const last = index === crumbItems.length - 1
        return (
          <span key={`${item.to}-${item.label}`} className="flex min-w-0 items-center gap-1.5">
            <ChevronRight className="h-3.5 w-3.5 shrink-0 text-ink-300 dark:text-ink-600" aria-hidden="true" />
            {last || !item.to ? <span className="truncate text-[var(--text)]" aria-current="page">{item.label}</span> : <Link to={item.to} className="shrink-0 transition hover:text-brand-600">{item.label}</Link>}
          </span>
        )
      })}
    </nav>
  )
}

export { ROUTE_LABELS }
