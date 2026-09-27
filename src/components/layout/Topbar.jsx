import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Bell,
  CheckCheck,
  ChevronDown,
  CircleHelp,
  Command,
  LogOut,
  Menu,
  Moon,
  Search,
  Settings,
  Sun,
  UserRound,
} from 'lucide-react'
import { Avatar } from '../ui/Avatar'
import { Badge } from '../ui/Badge'
import { IconButton } from '../ui/Button'
import { Dropdown, DropdownDivider, DropdownItem, DropdownLabel } from '../ui/Dropdown'
import { cn } from '../ui/cn'
import { DEFAULT_USER } from './Sidebar'

const DEFAULT_NOTIFICATIONS = [
  { id: 'notification-approval', title: 'Approval needed', detail: 'Avery shared the Q3 Launch brief with you.', time: '2m ago', unread: true, color: 'bg-brand-500' },
  { id: 'notification-export', title: 'Export is ready', detail: 'Your weekly performance report is ready to download.', time: '38m ago', unread: true, color: 'bg-mint-500' },
  { id: 'notification-comment', title: 'New comment', detail: 'Jonah mentioned you in Mobile onboarding.', time: '1h ago', unread: false, color: 'bg-amber-400' },
]

function initialDarkMode() {
  if (typeof window === 'undefined') return false
  const saved = window.localStorage.getItem('aster-theme')
  if (saved) return saved === 'dark'
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches || false
}

export function Topbar({ user = DEFAULT_USER, notifications = DEFAULT_NOTIFICATIONS, onMenu, onLogout, onSearch, className }) {
  const navigate = useNavigate()
  const [dark, setDark] = useState(initialDarkMode)
  const [query, setQuery] = useState('')
  const [noticeItems, setNoticeItems] = useState(notifications)
  const searchRef = useRef(null)
  const unread = noticeItems.filter((notice) => notice.unread).length

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    document.documentElement.style.colorScheme = dark ? 'dark' : 'light'
    window.localStorage.setItem('aster-theme', dark ? 'dark' : 'light')
  }, [dark])

  useEffect(() => {
    const onKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        searchRef.current?.focus()
      }
      if (event.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        event.preventDefault()
        searchRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const submitSearch = (event) => {
    event.preventDefault()
    const trimmed = query.trim()
    if (!trimmed) return
    onSearch?.(trimmed)
    navigate(`/projects?search=${encodeURIComponent(trimmed)}`)
  }

  const handleLogout = () => {
    if (onLogout) {
      onLogout()
    } else {
      navigate('/sign-in')
    }
  }

  return (
    <header id="app-topbar" className={cn('sticky top-0 z-30 flex h-16 items-center border-b border-[var(--line)] bg-[var(--page)] px-4 backdrop-blur-xl sm:px-6', className)}>
      <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
        <IconButton id="mobile-navigation-trigger" label="Open navigation" size="md" className="lg:hidden" onClick={onMenu}>
          <Menu className="h-5 w-5" />
        </IconButton>
        <form onSubmit={submitSearch} className="relative hidden max-w-md flex-1 sm:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" aria-hidden="true" />
          <input
            id="global-search"
            ref={searchRef}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search projects, reports, people…"
            className="h-9 w-full rounded-xl border border-[var(--line)] bg-[var(--surface)] pl-9 pr-16 text-xs text-[var(--text)] placeholder:text-ink-400 shadow-sm outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-100 dark:focus:ring-brand-900/35"
          />
          <span className="pointer-events-none absolute right-2 top-1/2 hidden -translate-y-1/2 items-center gap-0.5 rounded-md border border-[var(--line)] bg-[var(--surface-subtle)] px-1.5 py-0.5 text-[10px] font-medium text-ink-400 lg:flex"><Command className="h-2.5 w-2.5" />K</span>
        </form>
      </div>
      <div className="flex shrink-0 items-center gap-1 sm:gap-1.5">
        <Link to="/help" className="hidden h-9 items-center gap-1.5 rounded-xl px-2.5 text-xs font-semibold text-[var(--muted)] transition hover:bg-[var(--surface)] hover:text-[var(--text)] md:inline-flex" id="topbar-help-link">
          <CircleHelp className="h-4 w-4" /> Help
        </Link>
        <IconButton id="theme-toggle" label={dark ? 'Switch to light mode' : 'Switch to dark mode'} size="sm" onClick={() => setDark((value) => !value)}>
          {dark ? <Sun className="h-4 w-4 text-amber-500" /> : <Moon className="h-4 w-4" />}
        </IconButton>
        <Dropdown
          id="notification-dropdown"
          contentClassName="w-[min(22rem,calc(100vw-2rem))] p-0"
          trigger={(
            <button id="notifications-trigger" type="button" aria-label={`Notifications${unread ? `, ${unread} unread` : ''}`} className="relative flex h-9 w-9 items-center justify-center rounded-xl text-[var(--muted)] transition hover:bg-[var(--surface)] hover:text-[var(--text)]">
              <Bell className="h-4.5 w-4.5" />
              {unread > 0 && <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full border-2 border-[var(--page)] bg-rose-500" />}
            </button>
          )}
        >
          {({ close }) => <>
            <div className="flex items-center justify-between px-4 pb-3 pt-4">
              <div><h3 className="text-sm font-semibold text-[var(--text)]">Notifications</h3><p className="mt-0.5 text-xs text-[var(--muted)]">You have {unread || 'no'} unread updates</p></div>
              <button id="mark-notifications-read" type="button" className="inline-flex items-center gap-1 text-xs font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-300" onClick={() => setNoticeItems((items) => items.map((item) => ({ ...item, unread: false })))}><CheckCheck className="h-3.5 w-3.5" />Mark all read</button>
            </div>
            <div className="max-h-80 overflow-y-auto border-y border-[var(--line)] p-1.5">
              {noticeItems.map((notice) => <button key={notice.id} id={notice.id} type="button" onClick={() => { setNoticeItems((items) => items.map((item) => item.id === notice.id ? { ...item, unread: false } : item)); close() }} className="flex w-full items-start gap-3 rounded-lg px-2.5 py-3 text-left transition hover:bg-[var(--surface-subtle)]">
                <span className={cn('mt-1.5 h-2 w-2 shrink-0 rounded-full', notice.unread ? notice.color : 'bg-ink-300 dark:bg-ink-600')} />
                <span className="min-w-0 flex-1"><span className="block text-sm font-semibold text-[var(--text)]">{notice.title}</span><span className="mt-0.5 block text-xs leading-5 text-[var(--muted)]">{notice.detail}</span><span className="mt-1 block text-[11px] text-ink-400">{notice.time}</span></span>
              </button>)}
            </div>
            <Link to="/settings/notifications" onClick={close} className="block px-4 py-3 text-center text-xs font-semibold text-brand-600 transition hover:bg-[var(--surface-subtle)] dark:text-brand-300">View notification settings</Link>
          </>}
        </Dropdown>
        <Dropdown
          id="user-menu-dropdown"
          contentClassName="w-56"
          trigger={(
            <button id="user-profile-menu" type="button" className="ml-0.5 flex items-center gap-1 rounded-xl p-1 transition hover:bg-[var(--surface)]" aria-label="Open user menu">
              <Avatar name={user.name} src={user.avatar} status={user.status} size="sm" />
              <ChevronDown className="hidden h-3.5 w-3.5 text-ink-400 sm:block" />
            </button>
          )}
        >
          {({ close }) => <>
            <div className="px-2.5 py-2"><p className="truncate text-sm font-semibold text-[var(--text)]">{user.name}</p><p className="truncate text-xs text-[var(--muted)]">{user.email}</p></div>
            <DropdownDivider />
            <DropdownItem icon={UserRound} onClick={() => { navigate('/profile'); close() }}>Your profile</DropdownItem>
            <DropdownItem icon={Settings} onClick={() => { navigate('/settings'); close() }}>Account settings</DropdownItem>
            <DropdownLabel>Workspace</DropdownLabel>
    <div className="mx-1.5 mb-1.5 flex items-center justify-between rounded-lg bg-[var(--surface-subtle)] px-2.5 py-2"><span className="text-xs font-semibold text-[var(--text)]">Aster HQ</span><Badge variant="brand" className="!px-1.5 !py-0.5">Scale</Badge></div>
            <DropdownDivider />
            <DropdownItem icon={LogOut} destructive onClick={handleLogout}>Sign out</DropdownItem>
          </>}
        </Dropdown>
      </div>
    </header>
  )
}

export { DEFAULT_NOTIFICATIONS }
