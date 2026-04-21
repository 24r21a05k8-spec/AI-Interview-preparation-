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
        <h1 className="text-2xl font-bold text-white">History</h1>
        <p className="text-slate-400 text-sm mt-1">All your past interview sessions.</p>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#00F5FF', opacity: 0.4 }} />
          <input className="input pl-9" placeholder="Search by role or skill..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="flex items-center gap-1 rounded-xl p-1" style={{ background: 'rgba(0,245,255,0.05)' }}>
          {(['all', 'completed', 'paused'] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${filter === f ? 'text-black shadow-sm' : 'text-slate-400 hover:text-white'}`}
              style={filter === f ? { background: '#00F5FF' } : {}}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="card divide-y overflow-hidden" style={{ borderColor: 'rgba(0,245,255,0.1)' }}>
        {filtered.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-slate-400 text-sm">No sessions found.</p>
          </div>
        ) : (
          filtered.map(s => (
            <div key={s.id} className="flex items-center justify-between p-4 transition-colors group cursor-pointer hover:bg-white/3" style={{ borderColor: 'rgba(0,245,255,0.05)' }}>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold" style={{ background: 'rgba(0,245,255,0.1)', color: '#00F5FF' }}>
                  {s.questions}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{s.role}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <Clock className="w-3 h-3 text-slate-500" />
                    <span className="text-xs text-slate-400">{s.date} · {s.time}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {s.skills.map(sk => (
                      <span key={sk} className="text-xs px-2 py-0.5 rounded-full text-slate-400" style={{ background: 'rgba(0,245,255,0.08)' }}>{sk}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`badge ${s.status === 'completed' ? 'text-emerald-400' : 'text-amber-400'}`}
                  style={{ background: s.status === 'completed' ? 'rgba(0,255,136,0.1)' : 'rgba(255,160,0,0.1)', border: `1px solid ${s.status === 'completed' ? 'rgba(0,255,136,0.2)' : 'rgba(255,160,0,0.2)'}` }}>
                  {s.status}
                </span>
                <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: '#00F5FF' }} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
