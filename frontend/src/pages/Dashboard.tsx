import { useNavigate } from 'react-router-dom'
import { Sparkles, PlayCircle, BookOpen, TrendingUp, Clock, ArrowRight, Flame, Bot, Zap } from 'lucide-react'
import { AIBrain, HexGrid } from '../components/RoboIcon'

const stats = [
  { label: 'Questions Practiced', value: '84',  delta: '+12 this week', icon: BookOpen,   c: 'text-cyan-400',    bg: 'rgba(0,255,255,0.08)',   border: 'rgba(0,255,255,0.15)' },
  { label: 'Sessions Completed',  value: '12',  delta: '+3 this week',  icon: Flame,      c: 'text-violet-400',  bg: 'rgba(128,0,255,0.08)',   border: 'rgba(128,0,255,0.15)' },
  { label: 'Mock Interviews',     value: '4',   delta: '2 this month',  icon: PlayCircle, c: 'text-blue-400',    bg: 'rgba(0,128,255,0.08)',   border: 'rgba(0,128,255,0.15)' },
  { label: 'Avg. Score',          value: '78%', delta: '+5% vs last',   icon: TrendingUp, c: 'text-emerald-400', bg: 'rgba(0,255,136,0.08)',   border: 'rgba(0,255,136,0.15)' },
]

const recentSessions = [
  { role: 'Software Engineer',  skills: ['React', 'Node.js', 'System Design'], questions: 8,  date: 'Today, 2:30 PM',   status: 'completed' },
  { role: 'Frontend Developer', skills: ['JavaScript', 'TypeScript', 'CSS'],   questions: 5,  date: 'Yesterday, 10 AM', status: 'completed' },
  { role: 'Backend Developer',  skills: ['Node.js', 'PostgreSQL', 'API'],      questions: 6,  date: 'Mar 15, 9:00 AM',  status: 'paused' },
]

export default function Dashboard() {
  const navigate = useNavigate()

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <AIBrain className="w-12 h-12" />
            <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 animate-pulse border-2 border-[#080b14]" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Good morning, John <span className="text-cyan-400">_</span></h1>
            <p className="text-slate-500 text-sm mt-0.5 font-mono">// AI engine ready · 84 questions in memory</p>
          </div>
        </div>
        <button onClick={() => navigate('/app/generate')} className="btn-primary px-4 py-2 text-sm hidden sm:flex">
          <Sparkles className="w-4 h-4" /> Generate
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map(({ label, value, delta, icon: Icon, c, bg, border }) => (
          <div key={label} className="relative p-4 rounded-2xl overflow-hidden" style={{ background: bg, border: `1px solid ${border}` }}>
            <div className="absolute top-0 right-0 opacity-5">
              <HexGrid className="w-16 h-16" />
            </div>
            <Icon className={`w-4 h-4 ${c} mb-3`} />
            <p className={`text-2xl font-bold ${c}`}>{value}</p>
            <p className="text-xs text-slate-400 mt-0.5">{label}</p>
            <p className="text-xs text-emerald-400 mt-1.5 font-mono">{delta}</p>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="grid md:grid-cols-2 gap-4">
        <button onClick={() => navigate('/app/generate')} className="card p-5 text-left group hover:-translate-y-0.5 transition-all duration-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(0,255,255,0.1)', border: '1px solid rgba(0,255,255,0.2)' }}>
              <Sparkles className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <p className="font-semibold text-white text-sm">Generate Questions</p>
              <p className="text-xs text-slate-500 font-mono">// AI-powered, role-specific</p>
            </div>
          </div>
          <p className="text-sm text-slate-400 mb-3">Get tailored interview questions based on your target role and skills.</p>
          <span className="text-xs text-cyan-400 font-medium flex items-center gap-1 group-hover:gap-2 transition-all font-mono">
            → start_generation() <ArrowRight className="w-3 h-3" />
          </span>
        </button>

        <button onClick={() => navigate('/app/interview')} className="card p-5 text-left group hover:-translate-y-0.5 transition-all duration-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(128,0,255,0.1)', border: '1px solid rgba(128,0,255,0.2)' }}>
              <PlayCircle className="w-5 h-5 text-violet-400" />
            </div>
            <div>
              <p className="font-semibold text-white text-sm">Mock Interview</p>
              <p className="text-xs text-slate-500 font-mono">// Timed simulation</p>
            </div>
          </div>
          <p className="text-sm text-slate-400 mb-3">Simulate real interview conditions with a timed, one-question-at-a-time format.</p>
          <span className="text-xs text-violet-400 font-medium flex items-center gap-1 group-hover:gap-2 transition-all font-mono">
            → start_interview() <ArrowRight className="w-3 h-3" />
          </span>
        </button>
      </div>

      {/* AI tip */}
      <div className="flex items-start gap-3 p-4 rounded-xl" style={{ background: 'rgba(0,255,255,0.04)', border: '1px solid rgba(0,255,255,0.1)' }}>
        <Bot className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
        <div>
          <p className="text-xs font-semibold text-cyan-400 mb-1 font-mono">// AI Tip</p>
          <p className="text-sm text-slate-400">Focus on system design questions today — your last 3 sessions show room for improvement in distributed systems concepts.</p>
        </div>
        <Zap className="w-4 h-4 text-amber-400 shrink-0 animate-pulse" />
      </div>

      {/* Recent sessions */}
      <div className="card p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-white flex items-center gap-2">
            <span className="text-cyan-400 font-mono text-sm">//</span> Recent Sessions
          </h2>
          <button onClick={() => navigate('/app/history')} className="text-xs text-cyan-400 hover:underline font-mono">view_all()</button>
        </div>
        <div className="space-y-1">
          {recentSessions.map((s, i) => (
            <div key={i} className="flex items-center justify-between py-3 px-3 rounded-xl transition-colors group cursor-pointer"
              style={{ borderBottom: i < recentSessions.length - 1 ? '1px solid rgba(0,255,255,0.05)' : 'none' }}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-mono font-bold" style={{ background: 'rgba(0,255,255,0.08)', color: 'rgba(0,255,255,0.6)' }}>
                  {s.questions}
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-200">{s.role}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <Clock className="w-3 h-3 text-slate-600" />
                    <span className="text-xs text-slate-500 font-mono">{s.date}</span>
                    <span className="text-slate-700">·</span>
                    <span className="text-xs text-slate-500">{s.skills.slice(0, 2).join(', ')}</span>
                  </div>
                </div>
              </div>
              <span className={`text-xs px-2.5 py-1 rounded-full font-mono ${s.status === 'completed' ? 'text-emerald-400' : 'text-amber-400'}`}
                style={{ background: s.status === 'completed' ? 'rgba(0,255,136,0.1)' : 'rgba(255,160,0,0.1)', border: `1px solid ${s.status === 'completed' ? 'rgba(0,255,136,0.2)' : 'rgba(255,160,0,0.2)'}` }}>
                {s.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
