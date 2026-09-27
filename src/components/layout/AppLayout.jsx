import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { CircleHelp } from 'lucide-react'
import { Button } from '../ui/Button'
import { cn } from '../ui/cn'
import { Breadcrumbs } from './Breadcrumbs'
import { DEFAULT_NAV_GROUPS, DEFAULT_USER, Sidebar } from './Sidebar'
import { Topbar } from './Topbar'

export function AppLayout({
  children,
  navGroups = DEFAULT_NAV_GROUPS,
  user = DEFAULT_USER,
  onLogout,
  onSearch,
  showBreadcrumbs = true,
  breadcrumbs,
  fullBleed = false,
  className,
  contentClassName,
}) {
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(() => window.localStorage.getItem('aster-sidebar-collapsed') === 'true')

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  const changeCollapsed = (next) => {
    setCollapsed(next)
    window.localStorage.setItem('aster-sidebar-collapsed', String(next))
  }

  return (
    <div className={cn('min-h-screen bg-[var(--page)]', className)}>
      <a href="#main-content" className="fixed left-4 top-3 z-[120] -translate-y-16 rounded-lg bg-brand-600 px-3 py-2 text-sm font-semibold text-white shadow-lg transition focus:translate-y-0">Skip to main content</a>
      <Sidebar
        navGroups={navGroups}
        user={user}
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
        onCollapse={changeCollapsed}
        onNavigate={() => setMobileOpen(false)}
      />
      <div className={cn('min-h-screen transition-[padding] duration-300 lg:pl-[252px]', collapsed && 'lg:pl-[78px]')}>
        <Topbar user={user} onMenu={() => setMobileOpen(true)} onLogout={onLogout} onSearch={onSearch} />
        <main id="main-content" className={cn(fullBleed ? '' : 'mx-auto w-full max-w-[1600px] px-4 py-5 sm:px-6 sm:py-6 xl:px-8 xl:py-8', contentClassName)}>
          {showBreadcrumbs && <Breadcrumbs items={breadcrumbs} className={cn(!fullBleed && 'mb-5 sm:mb-6')} />}
          {children || <Outlet />}
        </main>
      </div>
      <Button as="a" href="/help#contact" id="floating-help-button" size="sm" variant="primary" className="fixed bottom-5 left-5 z-20 hidden !rounded-full !px-3.5 shadow-float sm:inline-flex">
        <CircleHelp className="h-4 w-4" /> Need help?
      </Button>
    </div>
  )
}

export function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => window.scrollTo({ top: 0, behavior: 'instant' }), [pathname])
  return null
}
