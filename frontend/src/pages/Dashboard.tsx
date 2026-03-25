import { useNavigate } from 'react-router-dom'
import { Sparkles, PlayCircle, BookOpen, TrendingUp, Clock, ArrowRight, Flame } from 'lucide-react'

const stats = [
  { label: 'Questions Practiced', value: '84',  delta: '+12 this week', icon: BookOpen,    color: 'text-indigo-500',  bg: 'bg-indigo-50 dark:bg-indigo-500/10' },
  { label: 'Sessions Completed',  value: '12',  delta: '+3 this week',  icon: Flame,       color: 'text-violet-500',  bg: 'bg-violet-50 dark:bg-violet-500/10' },
  { label: 'Mock Interviews',     value: '4',   delta: '2 this month',  icon: PlayCircle,  color: 'text-blue-500',    bg: 'bg-blue-50 dark:bg-blue-500/10' },
  { label: 'Avg. Score',          value: '78%', delta: '+5% vs last',   icon: TrendingUp,  color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-500/10' },
]

const recentSessions = [
  { role: 'Software Engineer',  skills: ['React', 'Node.js', 'System Design'], questions: 8,  date: 'Today, 2:30 PM',    status: 'completed' },
  { role: 'Frontend Developer', skills: ['JavaScript', 'TypeScript', 'CSS'],   questions: 5,  date: 'Yesterday, 10 AM',  status: 'completed' },
  { role: 'Backend Developer',  skills: ['Node.js', 'PostgreSQL', 'API'],      questions: 6,  date: 'Mar 15, 9:00 AM',   status: 'paused' },
]

export default function Dashboard() {
  const navigate = useNavigate()

  return (
    <div className="space-y-8 animate-fade-up">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Good morning, John 👋</h1>
          <p className="text-slate-500 dark:text-white/40 text-sm mt-1">Here's your interview prep overview.</p>
        </div>
        <button onClick={() => navigate('/app/generate')} className="btn-primary px-4 py-2 text-sm hidden sm:flex">
          <Sparkles className="w-4 h-4" /> Generate Questions
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ label, value, delta, icon: Icon, color, bg }) => (
          <div key={label} className="card p-5 hover:shadow-md dark:hover:border-white/20 transition-all">
            <div className={`w-9 h-9 rounded-xl ${bg} flex items-center justify-center mb-3`}>
              <Icon className={`w-4 h-4 ${color}`} />
            </div>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{value}</p>
            <p className="text-xs text-slate-500 dark:text-white/40 mt-0.5">{label}</p>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1.5 font-medium">{delta}</p>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="grid md:grid-cols-2 gap-4">
        <button onClick={() => navigate('/app/generate')} className="card p-5 text-left hover:shadow-md dark:hover:border-white/20 transition-all group">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-indigo-500" />
            </div>
            <div>
              <p className="font-semibold text-slate-900 dark:text-white text-sm">Generate Questions</p>
              <p className="text-xs text-slate-400 dark:text-white/30">AI-powered, role-specific</p>
            </div>
          </div>
          <p className="text-sm text-slate-500 dark:text-white/40 mb-3">Get tailored interview questions based on your target role and skills.</p>
          <span className="text-xs text-indigo-600 dark:text-indigo-400 font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
            Start generating <ArrowRight className="w-3 h-3" />
          </span>
        </button>

        <button onClick={() => navigate('/app/interview')} className="card p-5 text-left hover:shadow-md dark:hover:border-white/20 transition-all group">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-violet-50 dark:bg-violet-500/10 flex items-center justify-center">
              <PlayCircle className="w-5 h-5 text-violet-500" />
            </div>
            <div>
              <p className="font-semibold text-slate-900 dark:text-white text-sm">Mock Interview</p>
              <p className="text-xs text-slate-400 dark:text-white/30">Timed practice session</p>
            </div>
          </div>
          <p className="text-sm text-slate-500 dark:text-white/40 mb-3">Simulate real interview conditions with a timed, one-question-at-a-time format.</p>
          <span className="text-xs text-violet-600 dark:text-violet-400 font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
            Start interview <ArrowRight className="w-3 h-3" />
          </span>
        </button>
      </div>

      {/* Recent sessions */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-semibold text-slate-900 dark:text-white">Recent Sessions</h2>
          <button onClick={() => navigate('/app/history')} className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline">View all</button>
        </div>
        <div className="space-y-1">
          {recentSessions.map((s, i) => (
            <div key={i} className="flex items-center justify-between py-3 px-3 rounded-xl hover:bg-slate-50 dark:hover:bg-white/3 transition-colors group">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-white/5 flex items-center justify-center text-xs font-mono text-slate-500 dark:text-white/30">
                  {s.questions}
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-800 dark:text-white/90">{s.role}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <Clock className="w-3 h-3 text-slate-400 dark:text-white/25" />
                    <span className="text-xs text-slate-400 dark:text-white/30">{s.date}</span>
                    <span className="text-slate-300 dark:text-white/15">·</span>
                    <span className="text-xs text-slate-400 dark:text-white/30">{s.skills.slice(0, 2).join(', ')}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`badge ${s.status === 'completed' ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400' : 'bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400'}`}>
                  {s.status}
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-300 dark:text-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
