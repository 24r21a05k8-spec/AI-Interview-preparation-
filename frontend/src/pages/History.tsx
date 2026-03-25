import { useState } from 'react'
import { Clock, ChevronRight, Search } from 'lucide-react'

const sessions = [
  { id: '1', role: 'Software Engineer',  skills: ['React', 'Node.js', 'System Design'], questions: 8,  date: 'Mar 18, 2026', time: '2:30 PM',  status: 'completed' },
  { id: '2', role: 'Frontend Developer', skills: ['JavaScript', 'TypeScript', 'CSS'],   questions: 5,  date: 'Mar 17, 2026', time: '10:00 AM', status: 'completed' },
  { id: '3', role: 'Backend Developer',  skills: ['Node.js', 'PostgreSQL', 'API'],      questions: 6,  date: 'Mar 15, 2026', time: '9:00 AM',  status: 'paused' },
  { id: '4', role: 'System Architect',   skills: ['System Design', 'Microservices'],    questions: 10, date: 'Mar 12, 2026', time: '3:00 PM',  status: 'completed' },
  { id: '5', role: 'DevOps Engineer',    skills: ['Docker', 'Kubernetes', 'AWS'],       questions: 7,  date: 'Mar 10, 2026', time: '11:00 AM', status: 'completed' },
]

export default function History() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<'all' | 'completed' | 'paused'>('all')

  const filtered = sessions.filter(s => {
    const matchSearch = s.role.toLowerCase().includes(search.toLowerCase()) || s.skills.some(sk => sk.toLowerCase().includes(search.toLowerCase()))
    const matchFilter = filter === 'all' || s.status === filter
    return matchSearch && matchFilter
  })

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-up">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">History</h1>
        <p className="text-slate-500 dark:text-white/40 text-sm mt-1">All your past interview sessions.</p>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-white/25" />
          <input className="input pl-9" placeholder="Search by role or skill..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-white/5 rounded-xl p-1">
          {(['all', 'completed', 'paused'] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${filter === f ? 'bg-white dark:bg-white/10 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 dark:text-white/40 hover:text-slate-700 dark:hover:text-white/70'}`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="card divide-y divide-slate-100 dark:divide-white/5 overflow-hidden">
        {filtered.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-slate-400 dark:text-white/30 text-sm">No sessions found.</p>
          </div>
        ) : (
          filtered.map(s => (
            <div key={s.id} className="flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-white/3 transition-colors group cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-sm font-bold text-slate-500 dark:text-white/30">
                  {s.questions}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800 dark:text-white/90">{s.role}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <Clock className="w-3 h-3 text-slate-400 dark:text-white/25" />
                    <span className="text-xs text-slate-400 dark:text-white/30">{s.date} · {s.time}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {s.skills.map(sk => (
                      <span key={sk} className="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-white/40">{sk}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`badge ${s.status === 'completed' ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400' : 'bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400'}`}>
                  {s.status}
                </span>
                <ChevronRight className="w-4 h-4 text-slate-300 dark:text-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
