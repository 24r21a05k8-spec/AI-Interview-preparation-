import { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Sparkles, History, Bookmark, PlayCircle, Menu, X, LogOut, User, ChevronDown, Bell, Bot, Cpu } from 'lucide-react'
import { CircuitLines } from '../components/RoboIcon'

const navItems = [
  { to: '/app/dashboard', icon: LayoutDashboard, label: 'Dashboard',       color: 'text-cyan-400' },
  { to: '/app/generate',  icon: Sparkles,        label: 'Generate',        color: 'text-blue-400' },
  { to: '/app/history',   icon: History,         label: 'History',         color: 'text-violet-400' },
  { to: '/app/saved',     icon: Bookmark,        label: 'Saved',           color: 'text-amber-400' },
  { to: '/app/interview', icon: PlayCircle,      label: 'Mock Interview',  color: 'text-emerald-400' },
]

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => { localStorage.removeItem('token'); navigate('/login') }

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#0A0A0F' }}>
      {sidebarOpen && (
        <div className="fixed inset-0 z-20 bg-black/70 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-30 w-60 flex flex-col transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
        style={{ background: '#111115', borderRight: '1px solid #2A2A3A' }}>

        {/* Logo */}
        <div className="flex items-center gap-2.5 px-5 h-16" style={{ borderBottom: '1px solid #2A2A3A' }}>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#00FF88', boxShadow: '0 0 16px rgba(0, 255, 136, 0.4)' }}>
            <Bot className="w-4 h-4 text-black" />
          </div>
          <span className="font-bold text-white tracking-tight">Interview<span className="text-[#00FF88]">AI</span></span>
          <button className="ml-auto lg:hidden btn-ghost p-1" onClick={() => setSidebarOpen(false)}>
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Status indicator */}
        <div className="mx-3 mt-3 px-3 py-2 rounded-xl flex items-center gap-2" style={{ background: 'rgba(0, 255, 136, 0.05)', border: '1px solid rgba(0, 255, 136, 0.1)' }}>
          <div className="w-1.5 h-1.5 rounded-full bg-[#00FF88] animate-pulse" />
          <span className="text-xs text-[#8888AA] font-mono">AI Engine: <span className="text-[#00FF88]">Online</span></span>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <p className="text-xs font-semibold text-[#8888AA] uppercase tracking-wider px-3 mb-3 font-mono">// Navigation</p>
          {navItems.map(({ to, icon: Icon, label, color }) => (
            <NavLink
              key={to} to={to}
              className={({ isActive }) => isActive ? 'sidebar-item-active' : 'sidebar-item-inactive'}
              onClick={() => setSidebarOpen(false)}
            >
              <Icon className={`w-4 h-4 shrink-0 ${color}`} />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Circuit decoration */}
        <div className="px-3 opacity-20">
          <CircuitLines className="w-full h-8" />
        </div>

        {/* Bottom */}
        <div className="px-3 py-4 space-y-1" style={{ borderTop: '1px solid #2A2A3A' }}>
          <button onClick={() => navigate('/app/profile')} className="sidebar-item-inactive w-full">
            <User className="w-4 h-4 text-[#8888AA]" /> Profile
          </button>
          <button onClick={handleLogout} className="sidebar-item-inactive w-full" style={{ color: 'rgba(255,80,80,0.8)' }}>
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="h-16 flex items-center gap-4 px-6 shrink-0" style={{ background: '#111115', borderBottom: '1px solid #2A2A3A' }}>
          <button className="lg:hidden btn-ghost p-2 rounded-lg" onClick={() => setSidebarOpen(true)}>
            <Menu className="w-5 h-5" />
          </button>

          {/* System status */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg" style={{ background: 'rgba(0, 255, 136, 0.05)', border: '1px solid rgba(0, 255, 136, 0.1)' }}>
            <Cpu className="w-3.5 h-3.5 text-[#00FF88]" />
            <span className="text-xs text-[#8888AA] font-mono">LPI-4 <span className="text-[#00FF88]">ready</span></span>
          </div>

          <div className="flex-1" />

          <button className="btn-ghost p-2 rounded-xl relative">
            <Bell className="w-4 h-4 text-[#8888AA]" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#00FF88' }} />
          </button>

          <div className="relative">
            <button onClick={() => setProfileOpen(p => !p)} className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl transition-colors" style={{ border: '1px solid transparent' }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(0, 255, 136, 0.2)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'transparent')}>
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-black" style={{ background: '#00FF88' }}>
                J
              </div>
              <span className="hidden sm:block text-sm font-medium text-white">John Doe</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#8888AA]" />
            </button>

            {profileOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 rounded-xl py-1 z-50 animate-fade-up" style={{ background: '#1A1A24', border: '1px solid #2A2A3A', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)' }}>
                <button 
                  onClick={() => { navigate('/app/profile'); setProfileOpen(false); }}
                  className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm text-[#8888AA] hover:text-[#00FF88] hover:bg-[rgba(0,255,136,0.05)] transition-colors"
                >
                  <User className="w-4 h-4" /> Profile
                </button>
                <div className="my-1" style={{ borderTop: '1px solid #2A2A3A' }} />
                <button onClick={handleLogout} className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-colors">
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
