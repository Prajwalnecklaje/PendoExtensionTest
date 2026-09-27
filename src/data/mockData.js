export const currentUser = {
  id: 'usr-01',
  name: 'Maya Chen',
  initials: 'MC',
  email: 'maya@asterhq.com',
  role: 'Product lead',
  plan: 'Scale',
  avatar: 'https://i.pravatar.cc/160?img=47',
  location: 'San Francisco, CA',
  timezone: 'Pacific Time (UTC−08:00)',
  joined: 'October 2024',
};

export const navProjects = [
  { id: 'prj-nova', name: 'Nova launch', color: 'bg-violet-500', progress: 78, due: 'Sep 28', members: 5, status: 'On track', description: 'Shape the launch narrative and activation experience for Nova.' },
  { id: 'prj-orbit', name: 'Orbit redesign', color: 'bg-sky-500', progress: 46, due: 'Oct 14', members: 8, status: 'At risk', description: 'Make everyday analytics feel calm, clear, and decisive.' },
  { id: 'prj-pulse', name: 'Pulse research', color: 'bg-emerald-500', progress: 92, due: 'Sep 16', members: 4, status: 'On track', description: 'Turn customer signal into a focused product opportunity map.' },
  { id: 'prj-arc', name: 'Arc mobile', color: 'bg-amber-500', progress: 25, due: 'Nov 02', members: 6, status: 'Planning', description: 'Define the mobile command center for distributed teams.' },
  { id: 'prj-signal', name: 'Signal campaign', color: 'bg-rose-500', progress: 64, due: 'Oct 03', members: 3, status: 'Review', description: 'Bring the next chapter of Aster to our community.' },
];

export const teamMembers = [
  { id: 'usr-01', name: 'Maya Chen', email: 'maya@asterhq.com', role: 'Owner', team: 'Product', status: 'Active', avatar: 'https://i.pravatar.cc/96?img=47', lastActive: 'Now' },
  { id: 'usr-02', name: 'Jordan Lee', email: 'jordan@asterhq.com', role: 'Admin', team: 'Engineering', status: 'Active', avatar: 'https://i.pravatar.cc/96?img=12', lastActive: '8m ago' },
  { id: 'usr-03', name: 'Avery Patel', email: 'avery@asterhq.com', role: 'Member', team: 'Design', status: 'Active', avatar: 'https://i.pravatar.cc/96?img=32', lastActive: '2h ago' },
  { id: 'usr-04', name: 'Miles Torres', email: 'miles@asterhq.com', role: 'Member', team: 'Growth', status: 'Away', avatar: 'https://i.pravatar.cc/96?img=59', lastActive: 'Yesterday' },
  { id: 'usr-05', name: 'Nora Williams', email: 'nora@asterhq.com', role: 'Viewer', team: 'Research', status: 'Invited', avatar: 'https://i.pravatar.cc/96?img=49', lastActive: '—' },
  { id: 'usr-06', name: 'Theo Martin', email: 'theo@asterhq.com', role: 'Member', team: 'Engineering', status: 'Active', avatar: 'https://i.pravatar.cc/96?img=68', lastActive: '3d ago' },
];

export const activities = [
  { id: 1, person: 'Avery Patel', avatar: 'https://i.pravatar.cc/96?img=32', action: 'completed', target: 'Homepage refinement', project: 'Nova launch', time: '12 min ago', tone: 'emerald' },
  { id: 2, person: 'Jordan Lee', avatar: 'https://i.pravatar.cc/96?img=12', action: 'commented on', target: 'Mobile navigation', project: 'Orbit redesign', time: '48 min ago', tone: 'sky' },
  { id: 3, person: 'You', avatar: 'https://i.pravatar.cc/96?img=47', action: 'moved', target: 'Research synthesis', project: 'Pulse research', time: '2 hr ago', tone: 'violet' },
  { id: 4, person: 'Miles Torres', avatar: 'https://i.pravatar.cc/96?img=59', action: 'created', target: 'Q4 channel plan', project: 'Signal campaign', time: 'Yesterday', tone: 'amber' },
  { id: 5, person: 'Nora Williams', avatar: 'https://i.pravatar.cc/96?img=49', action: 'joined', target: 'the workspace', project: 'Aster HQ', time: 'Yesterday', tone: 'rose' },
];

export const initialTasks = [
  { id: 'task-01', title: 'Confirm launch metrics', project: 'Nova launch', assignee: 'Maya Chen', due: 'Today', priority: 'High', done: false, labels: ['Launch', 'Metrics'] },
  { id: 'task-02', title: 'Review research synthesis', project: 'Pulse research', assignee: 'Maya Chen', due: 'Today', priority: 'Medium', done: false, labels: ['Research'] },
  { id: 'task-03', title: 'Share prototype with partners', project: 'Orbit redesign', assignee: 'Avery Patel', due: 'Tomorrow', priority: 'Medium', done: false, labels: ['Design'] },
  { id: 'task-04', title: 'Write campaign brief', project: 'Signal campaign', assignee: 'Miles Torres', due: 'Sep 18', priority: 'Low', done: false, labels: ['Content'] },
  { id: 'task-05', title: 'Run accessibility QA', project: 'Nova launch', assignee: 'Jordan Lee', due: 'Sep 20', priority: 'High', done: true, labels: ['QA'] },
  { id: 'task-06', title: 'Set up event instrumentation', project: 'Arc mobile', assignee: 'Theo Martin', due: 'Sep 26', priority: 'High', done: false, labels: ['Engineering'] },
  { id: 'task-07', title: 'Summarize discovery calls', project: 'Pulse research', assignee: 'Nora Williams', due: 'Sep 16', priority: 'Low', done: true, labels: ['Research'] },
];

export const initialNotifications = [
  { id: 'not-1', title: 'Your weekly workspace digest is ready', body: 'See what moved across your five active projects.', category: 'Updates', time: '8m ago', unread: true, icon: 'sparkle' },
  { id: 'not-2', title: 'Jordan mentioned you in Orbit redesign', body: '“Maya, can you sanity check the flow before we share it?”', category: 'Mentions', time: '46m ago', unread: true, icon: 'mention' },
  { id: 'not-3', title: 'Nova launch is 78% complete', body: 'Four tasks are due this week. You are tracking ahead of plan.', category: 'Projects', time: '3h ago', unread: true, icon: 'chart' },
  { id: 'not-4', title: 'Payment receipt for September', body: 'Your Scale plan payment has been processed.', category: 'Billing', time: 'Yesterday', unread: false, icon: 'receipt' },
  { id: 'not-5', title: 'Nora accepted the workspace invite', body: 'Your team now has 14 active members.', category: 'Team', time: 'Yesterday', unread: false, icon: 'user' },
  { id: 'not-6', title: 'Security tip: add an authenticator app', body: 'A second factor helps protect your Aster workspace.', category: 'Security', time: 'Sep 8', unread: false, icon: 'shield' },
];

export const transactions = [
  { id: 'INV-2026-0910', date: 'Sep 10, 2026', description: 'Aster Scale · Monthly', amount: '$49.00', status: 'Paid' },
  { id: 'INV-2026-0810', date: 'Aug 10, 2026', description: 'Aster Scale · Monthly', amount: '$49.00', status: 'Paid' },
  { id: 'INV-2026-0710', date: 'Jul 10, 2026', description: 'Aster Scale · Monthly', amount: '$49.00', status: 'Paid' },
  { id: 'INV-2026-0610', date: 'Jun 10, 2026', description: 'Aster Scale · Monthly', amount: '$49.00', status: 'Paid' },
];

export const reports = [
  { id: 'rep-1', name: 'Q3 workspace health', type: 'Executive', owner: 'Maya Chen', updated: 'Today', views: 184, status: 'Published', accent: 'violet' },
  { id: 'rep-2', name: 'Nova launch readiness', type: 'Project', owner: 'Jordan Lee', updated: 'Yesterday', views: 96, status: 'Published', accent: 'sky' },
  { id: 'rep-3', name: 'Research signal tracker', type: 'Custom', owner: 'Avery Patel', updated: 'Sep 8', views: 62, status: 'Draft', accent: 'emerald' },
  { id: 'rep-4', name: 'Growth experiment review', type: 'Marketing', owner: 'Miles Torres', updated: 'Sep 5', views: 41, status: 'Published', accent: 'amber' },
  { id: 'rep-5', name: 'Team capacity report', type: 'Operations', owner: 'Maya Chen', updated: 'Sep 1', views: 28, status: 'Draft', accent: 'rose' },
];

export const analyticsSeries = [
  { label: 'Mon', value: 42, secondary: 30 },
  { label: 'Tue', value: 58, secondary: 38 },
  { label: 'Wed', value: 47, secondary: 44 },
  { label: 'Thu', value: 72, secondary: 48 },
  { label: 'Fri', value: 64, secondary: 55 },
  { label: 'Sat', value: 38, secondary: 29 },
  { label: 'Sun', value: 51, secondary: 36 },
];

export const docs = [
  { title: 'Get started with your workspace', excerpt: 'Set up your team, create the first project, and make Aster yours.', category: 'Getting started', read: '4 min read' },
  { title: 'Invite people and shape permissions', excerpt: 'Understand roles, seat management, and healthy team rituals.', category: 'Team & access', read: '6 min read' },
  { title: 'Build a project that stays on track', excerpt: 'Use milestones, task views, and brief templates to focus the work.', category: 'Projects', read: '7 min read' },
  { title: 'Make sense of workspace analytics', excerpt: 'Learn how our activity and health signals are calculated.', category: 'Analytics', read: '5 min read' },
  { title: 'Manage your plan and invoices', excerpt: 'Update payment information, find receipts, and change your plan.', category: 'Billing', read: '3 min read' },
  { title: 'Secure your Aster account', excerpt: 'Add two-factor authentication, review sessions, and stay protected.', category: 'Security', read: '5 min read' },
];

export const dashboardMetrics = [
  { id: 'metric-active-projects', label: 'Active projects', value: '12', change: '+2 this month', direction: 'up', icon: 'layers', chart: [30, 45, 42, 65, 57, 78, 72] },
  { id: 'metric-completion', label: 'Completion rate', value: '84.6%', change: '+6.2% vs last month', direction: 'up', icon: 'trending', chart: [42, 46, 50, 43, 61, 59, 76] },
  { id: 'metric-focus-time', label: 'Focus time', value: '186h', change: '+12.5% vs last month', direction: 'up', icon: 'clock', chart: [35, 54, 49, 68, 59, 74, 83] },
  { id: 'metric-at-risk', label: 'At-risk work', value: '3', change: '1 less than last week', direction: 'down', icon: 'alert', chart: [75, 68, 72, 54, 48, 52, 36] },
];
