import { useEffect } from 'react'
import { Navigate, Outlet, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './auth'
import { AppLayout, ScrollToTop } from './components/layout'
import { initializePendoForUser } from './pendo'
import LandingPage from './pages/LandingPage'
import {
  AccountSettingsPage, AnalyticsPage, BillingPage, DashboardPage, NotificationsPage,
  ProfilePage, ProjectDetailsPage, ProjectsPage, ReportsPage, SecuritySettingsPage, TeamPage,
} from './pages/AppPages'
import EmbeddedContentPage from './pages/EmbeddedContentPage'
import EmbedPreviewPage from './pages/EmbedPreviewPage'
import HelpPage from './pages/HelpPage'
import ContactPage from './pages/ContactPage'
import NotFoundPage from './pages/NotFoundPage'
import {
  ForgotPasswordPage, LogoutPage, ResetPasswordPage, SignInPage, SignUpPage, VerifyEmailPage,
} from './pages/auth'

function AppLoading() {
  return <div className="grid min-h-screen place-items-center bg-slate-50 dark:bg-slate-950"><div className="text-center"><span className="mx-auto grid h-11 w-11 place-items-center rounded-2xl bg-violet-600 text-lg font-bold text-white shadow-lg shadow-violet-500/20">A</span><span className="mt-4 block text-sm font-medium text-slate-500">Opening your Aster workspace…</span></div></div>
}

function RequireAuth() {
  const { isAuthenticated, isReady } = useAuth()
  const location = useLocation()
  if (!isReady) return <AppLoading />
  if (!isAuthenticated) return <Navigate to={`/sign-in?next=${encodeURIComponent(`${location.pathname}${location.search}${location.hash}`)}`} replace />
  return <WorkspaceLayout />
}

function WorkspaceLayout() {
  const navigate = useNavigate()
  const { currentUser } = useAuth()
  const user = {
    name: currentUser?.name || 'Maya Chen',
    email: currentUser?.email || 'maya@asterhq.com',
    role: currentUser?.role || 'Workspace owner',
    avatar: currentUser?.avatar?.startsWith?.('http') ? currentUser.avatar : undefined,
    status: 'online',
  }
  return <AppLayout user={user} onLogout={() => navigate('/logout')} showBreadcrumbs={false}><Outlet /></AppLayout>
}

function AppRoutes() {
  return <>
    <ScrollToTop />
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/sign-in" element={<SignInPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/verify-email" element={<VerifyEmailPage />} />
      <Route path="/logout" element={<LogoutPage />} />
      <Route path="/embed-preview" element={<EmbedPreviewPage />} />
      <Route element={<RequireAuth />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:projectId" element={<ProjectDetailsPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/billing" element={<BillingPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={<AccountSettingsPage />} />
        <Route path="/settings/security" element={<SecuritySettingsPage />} />
        <Route path="/settings/notifications" element={<NotificationsPage />} />
        <Route path="/embedded-content" element={<EmbeddedContentPage />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </>
}

function PendoBooter() {
  const { currentUser, isReady } = useAuth()

  useEffect(() => {
    if (!isReady || !currentUser || !currentUser.email) return

    initializePendoForUser(currentUser)
  }, [currentUser, isReady])

  return null
}

export default function App() {
  return (
    <AuthProvider>
      <PendoBooter />
      <AppRoutes />
    </AuthProvider>
  )
}
