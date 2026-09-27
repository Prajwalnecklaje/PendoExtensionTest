import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import {
  BarChart3,
  BookOpen,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  FolderKanban,
  HelpCircle,
  LayoutDashboard,
  LifeBuoy,
  Mail,
  PanelLeftClose,
  PanelLeftOpen,
  ReceiptText,
  Settings2,
  ShieldCheck,
  Sparkles,
  UsersRound,
  X,
} from 'lucide-react'
import { Avatar } from '../ui/Avatar'
import { IconButton } from '../ui/Button'
import { cn } from '../ui/cn'

export const DEFAULT_USER = {
  name: 'Maya Chen',
  email: 'maya@asterhq.com',
  role: 'Workspace owner',
  status: 'online',
}

export const DEFAULT_NAV_GROUPS = [
  {
    label: 'Overview',
    items: [
      { label: 'Dashboard', to: '/dashboard', icon: LayoutDashboard, end: true },
    ],
  },
  {
    label: 'Workspace',
    items: [
      { label: 'Projects', to: '/projects', icon: FolderKanban },
      { label: 'Analytics', to: '/analytics', icon: BarChart3 },
      { label: 'Reports', to: '/reports', icon: ReceiptText, badge: '3' },
      { label: 'Embedded content', to: '/embedded-content', icon: PanelLeftOpen, testId: 'nav-embedded-content' },
    ],
  },
  {
    label: 'Manage',
    items: [
      { label: 'Team & users', to: '/team', icon: UsersRound },
      { label: 'Billing', to: '/billing', icon: CreditCard },
      {
        label: 'Settings',
        to: '/settings',
        icon: Settings2,
        children: [
          { label: 'Profile', to: '/profile' },
          { label: 'Account', to: '/settings' },
          { label: 'Security', to: '/settings/security' },
          { label: 'Notifications', to: '/settings/notifications' },
        ],
      },
    ],
  },
  {
    label: 'Support',
    items: [
      { label: 'Help & docs', to: '/help', icon: BookOpen },
      { label: 'Contact us', to: '/contact', icon: Mail },
    ],
  },
]

function isActivePath(item, pathname) {
  if (item.children?.some((child) => pathname === child.to || pathname.startsWith(`${child.to}/`))) return true
  return pathname === item.to || (!item.end && item.to !== '/' && pathname.startsWith(`${item.to}/`))
}

export function Sidebar({
  navGroups = DEFAULT_NAV_GROUPS,
  user = DEFAULT_USER,
  collapsed = false,
  mobileOpen = false,
  onMobileClose,
  onCollapse,
  onNavigate,
  className,
}) {
  const location = useLocation()

  return (
    <>
      {mobileOpen && <button aria-label="Close navigation overlay" className="fixed inset-0 z-40 bg-ink-950/45 backdrop-blur-[1px] lg:hidden" onClick={onMobileClose} />}
      <aside
        id="app-sidebar"
        aria-label="Main navigation"
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-[280px] flex-col overflow-hidden border-r border-white/[0.08] bg-[var(--sidebar)] text-white shadow-float transition-[transform,width] duration-300 lg:translate-x-0 lg:shadow-none',
          mobileOpen ? 'translate-x-0' : '-translate-x-full',
          collapsed ? 'lg:w-[78px]' : 'lg:w-[252px]',
          className,
        )}
      >
        <div className={cn('flex h-16 shrink-0 items-center border-b border-white/[0.08] px-4', collapsed ? 'justify-center lg:px-3' : 'justify-between')}>
          <NavLink to="/dashboard" className="group flex min-w-0 items-center gap-2.5" onClick={onNavigate} aria-label="Aster dashboard">
            <span className="relative flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-brand-400 via-brand-500 to-brand-700 shadow-[0_5px_16px_rgba(125,102,245,.35)]">
              <Sparkles className="h-4 w-4 text-white" strokeWidth={2.5} aria-hidden="true" />
              <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-mint-400 opacity-70 blur-[2px]" />
            </span>
            <span className={cn('overflow-hidden whitespace-nowrap text-[17px] font-bold tracking-[-.04em] transition-all', collapsed && 'lg:w-0 lg:opacity-0')}>
              Aster
            </span>
          </NavLink>
          <IconButton label="Close navigation" size="sm" variant="ghost" className="text-white/75 hover:bg-white/10 hover:text-white lg:hidden" onClick={onMobileClose}>
            <X className="h-4 w-4" />
          </IconButton>
        </div>

        <nav className="min-h-0 flex-1 overflow-y-auto px-3 py-4" aria-label="Workspace">
          {navGroups.map((group, index) => (
            <div key={group.label} className={cn(index > 0 && 'mt-5')}>
              <p className={cn('mb-2 px-2.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--sidebar-muted)] transition-opacity', collapsed && 'lg:opacity-0')}>
                {group.label}
              </p>
              <div className="space-y-1">
                {group.items.map((item) => (
                  <SidebarItem
                    key={item.label}
                    item={item}
                    pathname={location.pathname}
                    collapsed={collapsed}
                    onNavigate={() => {
                      onNavigate?.()
                      onMobileClose?.()
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="shrink-0 border-t border-white/[0.08] p-3">
          <NavLink to="/help" onClick={onNavigate} className={cn('mb-2 flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-sm font-medium text-[var(--sidebar-muted)] transition hover:bg-white/[0.07] hover:text-white', collapsed && 'lg:justify-center lg:px-0')} title={collapsed ? 'Help center' : undefined}>
            <LifeBuoy className="h-[18px] w-[18px] shrink-0" />
            <span className={cn('whitespace-nowrap transition-opacity', collapsed && 'lg:hidden')}>Help center</span>
          </NavLink>
          <NavLink to="/profile" onClick={onNavigate} className={cn('flex items-center gap-2.5 rounded-xl px-2 py-2 transition hover:bg-white/[0.07]', collapsed && 'lg:justify-center lg:px-0')} title={collapsed ? user.name : undefined}>
            <Avatar name={user.name} src={user.avatar} status={user.status} size="sm" className="!text-brand-100" />
            <span className={cn('min-w-0 transition-opacity', collapsed && 'lg:hidden')}>
              <span className="block truncate text-sm font-semibold text-white">{user.name}</span>
              <span className="block truncate text-[11px] text-[var(--sidebar-muted)]">{user.role || user.email}</span>
            </span>
          </NavLink>
        </div>

        <button
          id="sidebar-collapse-toggle"
          type="button"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          onClick={() => onCollapse?.(!collapsed)}
          className="absolute -right-3 top-[82px] hidden h-6 w-6 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--surface)] text-ink-500 shadow-sm transition hover:scale-105 hover:text-brand-600 lg:flex"
        >
          {collapsed ? <ChevronRight className="h-3.5 w-3.5" /> : <ChevronLeft className="h-3.5 w-3.5" />}
        </button>
      </aside>
    </>
  )
}

function SidebarItem({ item, pathname, collapsed, onNavigate }) {
  const hasChildren = Boolean(item.children?.length)
  const isCurrent = isActivePath(item, pathname)
  const [expanded, setExpanded] = useState(isCurrent)
  const Icon = item.icon || HelpCircle

  if (!hasChildren) {
    return (
      <NavLink
        to={item.to}
        end={item.end}
        data-testid={item.testId}
        title={collapsed ? item.label : undefined}
        onClick={onNavigate}
        className={({ isActive }) => cn(
          'group relative flex h-10 items-center gap-2.5 rounded-xl px-2.5 text-sm font-medium text-[var(--sidebar-muted)] transition-all duration-200 hover:bg-white/[0.07] hover:text-white',
          (isActive || isCurrent) && 'bg-brand-500/18 text-white shadow-[inset_0_0_0_1px_rgba(175,160,255,.13)]',
          collapsed && 'lg:justify-center lg:px-0',
        )}
      >
        {({ isActive }) => <>
          {(isActive || isCurrent) && <span className="absolute left-0 h-4 w-0.5 rounded-r-full bg-brand-300" aria-hidden="true" />}
          <Icon className="h-[18px] w-[18px] shrink-0" strokeWidth={isActive || isCurrent ? 2.3 : 1.9} aria-hidden="true" />
          <span className={cn('min-w-0 flex-1 truncate transition-opacity', collapsed && 'lg:hidden')}>{item.label}</span>
          {item.badge && <span className={cn('rounded-md bg-white/[0.1] px-1.5 py-0.5 text-[10px] font-bold text-white', collapsed && 'lg:hidden')}>{item.badge}</span>}
        </>}
      </NavLink>
    )
  }

  return (
    <div>
      <button
        type="button"
        title={collapsed ? item.label : undefined}
        onClick={() => {
          if (collapsed) return
          setExpanded((current) => !current)
        }}
        className={cn('flex h-10 w-full items-center gap-2.5 rounded-xl px-2.5 text-left text-sm font-medium text-[var(--sidebar-muted)] transition hover:bg-white/[0.07] hover:text-white', isCurrent && 'text-white', collapsed && 'lg:justify-center lg:px-0')}
      >
        <Icon className="h-[18px] w-[18px] shrink-0" strokeWidth={isCurrent ? 2.3 : 1.9} aria-hidden="true" />
        <span className={cn('min-w-0 flex-1 truncate', collapsed && 'lg:hidden')}>{item.label}</span>
        <ChevronDown className={cn('h-4 w-4 transition-transform', expanded && 'rotate-180', collapsed && 'lg:hidden')} />
      </button>
      {expanded && !collapsed && (
        <div className="ml-[18px] mt-1 space-y-0.5 border-l border-white/[0.12] py-0.5 pl-3 lg:block">
          {item.children.map((child) => (
            <NavLink
              key={child.to}
              to={child.to}
              end={child.end}
              onClick={onNavigate}
              className={({ isActive }) => cn('flex h-8 items-center rounded-lg px-2.5 text-xs font-medium text-[var(--sidebar-muted)] transition hover:text-white', (isActive || pathname === child.to) && 'bg-white/[0.08] text-white')}
            >
              {child.label}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  )
}
