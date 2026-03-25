import { useState } from 'react'
import { X, Copy, Bookmark, ChevronDown, ChevronUp, Check, Bot, Zap } from 'lucide-react'
import Button from '../components/Button'
import { SkeletonCard } from '../components/Spinner'
import { AIBrain } from '../components/RoboIcon'

const ROLES = ['Software Engineer', 'Frontend Developer', 'Backend Developer', 'DevOps Engineer', 'Data Scientist', 'System Architect', 'Mobile Developer', 'QA Engineer']
const SKILLS_MAP: Record<string, string[]> = {
  'Software Engineer':  ['JavaScript', 'TypeScript', 'React', 'Node.js', 'PostgreSQL', 'System Design', 'Git', 'Docker'],
  'Frontend Developer': ['JavaScript', 'TypeScript', 'React', 'Vue.js', 'HTML/CSS', 'Tailwind CSS', 'Webpack'],
  'Backend Developer':  ['Node.js', 'Python', 'Java', 'PostgreSQL', 'MySQL', 'Redis', 'API Design', 'Docker'],
  'DevOps Engineer':    ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Terraform', 'Linux', 'Python'],
  'Data Scientist':     ['Python', 'Machine Learning', 'TensorFlow', 'Pandas', 'SQL', 'Statistics'],
  'System Architect':   ['System Design', 'Microservices', 'API Design', 'Caching', 'Load Balancing', 'AWS'],
  'Mobile Developer':   ['Swift', 'Kotlin', 'React Native', 'iOS', 'Android', 'API Design'],
  'QA Engineer':        ['Unit Testing', 'Integration Testing', 'Selenium', 'Cypress', 'Python', 'CI/CD'],
}
const LEVELS = ['Junior (0–2 yrs)', 'Mid-level (2–5 yrs)', 'Senior (5–8 yrs)', 'Staff / Principal (8+ yrs)']

const MOCK_QUESTIONS = [
  { id: '1', type: 'technical',     difficulty: 'intermediate', text: 'Explain the difference between `null` and `undefined` in JavaScript. When would you use each?', answer: 'null is an intentional absence of value assigned by the developer. undefined means a variable has been declared but not assigned.' },
  { id: '2', type: 'system-design', difficulty: 'advanced',     text: 'Design a URL shortening service like bit.ly. Walk through the architecture, database schema, and how you would handle 100M requests/day.', answer: 'Key components: API gateway, URL generation service (base62 encoding), distributed cache (Redis), database (NoSQL for scale), CDN for redirects.' },
  { id: '3', type: 'technical',     difficulty: 'intermediate', text: 'What is the virtual DOM in React and how does reconciliation work?', answer: 'The virtual DOM is a lightweight JS representation of the real DOM. React uses a diffing algorithm to compare and only updates changed parts.' },
  { id: '4', type: 'behavioral',    difficulty: 'beginner',     text: 'Describe a time when you had to debug a complex issue under time pressure. What was your approach?', answer: 'Use STAR format: Situation, Task, Action, Result. Focus on systematic debugging.' },
  { id: '5', type: 'technical',     difficulty: 'advanced',     text: 'Explain how the Node.js event loop works and how it handles asynchronous operations.', answer: 'Node.js uses a single-threaded event loop with libuv. Phases: timers, pending callbacks, poll, check, close callbacks.' },
]

const typeStyle: Record<string, { label: string; color: string; bg: string; border: string }> = {
  technical:       { label: 'technical',     color: 'text-cyan-400',    bg: 'rgba(0,255,255,0.08)',   border: 'rgba(0,255,255,0.2)' },
  behavioral:      { label: 'behavioral',    color: 'text-slate-400',   bg: 'rgba(148,163,184,0.08)', border: 'rgba(148,163,184,0.2)' },
  'system-design': { label: 'system-design', color: 'text-violet-400',  bg: 'rgba(128,0,255,0.08)',   border: 'rgba(128,0,255,0.2)' },
}
const diffStyle: Record<string, { color: string; bg: string; border: string }> = {
  beginner:     { color: 'text-emerald-400', bg: 'rgba(0,255,136,0.08)',  border: 'rgba(0,255,136,0.2)' },
  intermediate: { color: 'text-amber-400',   bg: 'rgba(255,160,0,0.08)',  border: 'rgba(255,160,0,0.2)' },
  advanced:     { color: 'text-red-400',     bg: 'rgba(255,50,50,0.08)',  border: 'rgba(255,50,50,0.2)' },
}

export default function Generate() {
  const [role, setRole] = useState('')
  const [skills, setSkills] = useState<string[]>([])
  const [level, setLevel] = useState('')
  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState<typeof MOCK_QUESTIONS>([])
  const [expanded, setExpanded] = useState<string | null>(null)
  const [saved, setSaved] = useState<string[]>([])
  const [copied, setCopied] = useState<string | null>(null)

  const availableSkills = SKILLS_MAP[role] ?? []
  const toggleSkill = (s: string) => setSkills(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])
  const removeSkill = (s: string) => setSkills(prev => prev.filter(x => x !== s))

  const handleGenerate = () => {
    if (!role || skills.length === 0 || !level) return
    setLoading(true); setQuestions([])
    setTimeout(() => { setLoading(false); setQuestions(MOCK_QUESTIONS) }, 1600)
  }

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text); setCopied(id); setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-up">
      <div className="flex items-center gap-3">
        <AIBrain className="w-10 h-10" />
        <div>
          <h1 className="text-2xl font-bold text-white">Generate Questions</h1>
          <p className="text-slate-500 text-sm font-mono">// configure neural parameters</p>
        </div>
      </div>

      {/* Config */}
      <div className="card-glow p-6 space-y-5 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-0.5" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,255,255,0.4), transparent)' }} />

        <div>
          <label className="block text-xs font-mono text-slate-500 mb-2">TARGET_ROLE</label>
          <select className="input" value={role} onChange={e => { setRole(e.target.value); setSkills([]) }}
            style={{ background: 'rgba(0,255,255,0.04)', color: role ? '#e2e8f0' : 'rgba(148,163,184,0.4)' }}>
            <option value="">select_role...</option>
            {ROLES.map(r => <option key={r} value={r} style={{ background: '#080b14', color: '#e2e8f0' }}>{r}</option>)}
          </select>
        </div>

        {role && (
          <div>
            <label className="block text-xs font-mono text-slate-500 mb-2">SKILL_MATRIX</label>
            {skills.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {skills.map(s => (
                  <span key={s} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium font-mono" style={{ background: 'rgba(0,255,255,0.1)', border: '1px solid rgba(0,255,255,0.25)', color: '#00ffff' }}>
                    {s} <button onClick={() => removeSkill(s)} className="hover:text-white"><X className="w-3 h-3" /></button>
                  </span>
                ))}
              </div>
            )}
            <div className="flex flex-wrap gap-2">
              {availableSkills.filter(s => !skills.includes(s)).map(s => (
                <button key={s} onClick={() => toggleSkill(s)} className="px-3 py-1.5 rounded-full text-xs font-medium font-mono transition-all" style={{ background: 'rgba(0,255,255,0.04)', border: '1px solid rgba(0,255,255,0.12)', color: 'rgba(148,163,184,0.7)' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,255,255,0.4)'; (e.currentTarget as HTMLElement).style.color = '#00ffff' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,255,255,0.12)'; (e.currentTarget as HTMLElement).style.color = 'rgba(148,163,184,0.7)' }}>
                  + {s}
                </button>
              ))}
            </div>
          </div>
        )}

        <div>
          <label className="block text-xs font-mono text-slate-500 mb-2">EXPERIENCE_LEVEL</label>
          <div className="grid grid-cols-2 gap-2">
            {LEVELS.map(l => (
              <button key={l} onClick={() => setLevel(l)} className="py-2.5 px-3 rounded-xl text-sm text-left transition-all font-mono" style={{ background: level === l ? 'rgba(0,255,255,0.1)' : 'rgba(0,255,255,0.03)', border: `1px solid ${level === l ? 'rgba(0,255,255,0.35)' : 'rgba(0,255,255,0.1)'}`, color: level === l ? '#00ffff' : 'rgba(148,163,184,0.6)', boxShadow: level === l ? '0 0 12px rgba(0,255,255,0.1)' : 'none' }}>
                {l}
              </button>
            ))}
          </div>
        </div>

        <Button onClick={handleGenerate} loading={loading} disabled={!role || skills.length === 0 || !level} className="w-full py-3">
          <Bot className="w-4 h-4" />
          {loading ? 'Neural engine processing...' : 'Generate Questions'}
        </Button>
      </div>

      {loading && <div className="space-y-3">{[1, 2, 3].map(i => <SkeletonCard key={i} />)}</div>}

      {!loading && questions.length > 0 && (
        <div className="space-y-3 animate-fade-up">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500 font-mono">// {questions.length} questions generated</p>
            <Button variant="secondary" size="sm"><Zap className="w-3.5 h-3.5" /> Save All</Button>
          </div>

          {questions.map((q, i) => {
            const ts = typeStyle[q.type]; const ds = diffStyle[q.difficulty]
            return (
              <div key={q.id} className="card overflow-hidden hover:-translate-y-0.5 transition-all duration-200">
                <div className="p-5">
                  <div className="flex items-start gap-3">
                    <span className="font-mono text-xs mt-1 shrink-0 w-5" style={{ color: 'rgba(0,255,255,0.3)' }}>{String(i + 1).padStart(2, '0')}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-slate-300 leading-relaxed">{q.text}</p>
                      <div className="flex items-center gap-2 mt-3">
                        <span className="text-xs px-2.5 py-0.5 rounded-full font-mono" style={{ background: ts.bg, border: `1px solid ${ts.border}`, color: ts.color }}>{ts.label}</span>
                        <span className="text-xs px-2.5 py-0.5 rounded-full font-mono" style={{ background: ds.bg, border: `1px solid ${ds.border}`, color: ds.color }}>{q.difficulty}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button onClick={() => handleCopy(q.id, q.text)} className="btn-ghost p-1.5 rounded-lg">
                        {copied === q.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                      <button onClick={() => setSaved(p => p.includes(q.id) ? p.filter(x => x !== q.id) : [...p, q.id])} className="btn-ghost p-1.5 rounded-lg">
                        <Bookmark className={`w-3.5 h-3.5 ${saved.includes(q.id) ? 'fill-amber-400 text-amber-400' : ''}`} />
                      </button>
                      <button onClick={() => setExpanded(expanded === q.id ? null : q.id)} className="btn-ghost p-1.5 rounded-lg">
                        {expanded === q.id ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                </div>
                {expanded === q.id && (
                  <div className="px-5 pb-5 animate-fade-in">
                    <div className="pt-4" style={{ borderTop: '1px solid rgba(0,255,255,0.08)' }}>
                      <p className="text-xs font-mono text-slate-600 mb-2">// sample_answer</p>
                      <p className="text-sm text-slate-400 leading-relaxed">{q.answer}</p>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
