import { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, Sparkles, History, Bookmark, PlayCircle,
  Menu, X, Sun, Moon, LogOut, User, ChevronDown, Bell
} from 'lucide-react'
import { useDarkMode } from '../hooks/useDarkMode'

const navItems = [
  { to: '/app/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/app/generate',  icon: Sparkles,        label: 'Generate' },
  { to: '/app/history',   icon: History,         label: 'History' },
  { to: '/app/saved',     icon: Bookmark,        label: 'Saved' },
  { to: '/app/interview', icon: PlayCircle,      label: 'Mock Interview' },
]

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const { dark, toggle } = useDarkMode()
  const navigate = useNavigate()

  const handleLogout = () => { localStorage.removeItem('token'); navigate('/login') }

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-[#0a0a0f] overflow-hidden">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-20 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-30 w-60 flex flex-col bg-white dark:bg-[#111118] border-r border-slate-200 dark:border-white/5 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-5 h-16 border-b border-slate-200 dark:border-white/5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-slate-900 dark:text-white tracking-tight">InterviewAI</span>
          <button className="ml-auto lg:hidden btn-ghost p-1" onClick={() => setSidebarOpen(false)}>
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <p className="text-xs font-semibold text-slate-400 dark:text-white/25 uppercase tracking-wider px-3 mb-3">Menu</p>
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to} to={to}
              className={({ isActive }) => isActive ? 'sidebar-item-active' : 'sidebar-item-inactive'}
              onClick={() => setSidebarOpen(false)}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Bottom */}
        <div className="px-3 py-4 border-t border-slate-200 dark:border-white/5 space-y-1">
          <button onClick={toggle} className="sidebar-item-inactive w-full">
            {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            {dark ? 'Light Mode' : 'Dark Mode'}
          </button>
          <button onClick={handleLogout} className="sidebar-item-inactive w-full text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10">
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="h-16 flex items-center gap-4 px-6 bg-white dark:bg-[#111118] border-b border-slate-200 dark:border-white/5 shrink-0">
          <button className="lg:hidden btn-ghost p-2 rounded-lg" onClick={() => setSidebarOpen(true)}>
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex-1" />

          <button className="btn-ghost p-2 rounded-xl relative">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-indigo-500 rounded-full" />
          </button>

          <div className="relative">
            <button
              onClick={() => setProfileOpen(p => !p)}
              className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
            >
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center text-xs font-bold text-white">
                J
              </div>
              <span className="hidden sm:block text-sm font-medium text-slate-700 dark:text-white/80">John Doe</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 dark:text-white/30" />
            </button>

            {profileOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 card shadow-xl py-1 z-50 animate-fade-up">
                <button className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm text-slate-700 dark:text-white/70 hover:bg-slate-50 dark:hover:bg-white/5">
                  <User className="w-4 h-4" /> Profile
                </button>
                <div className="border-t border-slate-100 dark:border-white/5 my-1" />
                <button onClick={handleLogout} className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10">
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6 bg-mesh">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
