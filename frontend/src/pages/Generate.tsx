import { useState } from 'react'
import { Sparkles, X, Copy, Bookmark, ChevronDown, ChevronUp, Check } from 'lucide-react'
import Button from '../components/Button'
import { SkeletonCard } from '../components/Spinner'

const ROLES = ['Software Engineer', 'Frontend Developer', 'Backend Developer', 'DevOps Engineer', 'Data Scientist', 'System Architect', 'Mobile Developer', 'QA Engineer', 'Product Manager']
const SKILLS_MAP: Record<string, string[]> = {
  'Software Engineer':  ['JavaScript', 'TypeScript', 'React', 'Node.js', 'PostgreSQL', 'System Design', 'Git', 'Docker'],
  'Frontend Developer': ['JavaScript', 'TypeScript', 'React', 'Vue.js', 'HTML/CSS', 'Tailwind CSS', 'Webpack'],
  'Backend Developer':  ['Node.js', 'Python', 'Java', 'PostgreSQL', 'MySQL', 'Redis', 'API Design', 'Docker'],
  'DevOps Engineer':    ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Terraform', 'Linux', 'Python'],
  'Data Scientist':     ['Python', 'Machine Learning', 'TensorFlow', 'Pandas', 'SQL', 'Statistics'],
  'System Architect':   ['System Design', 'Microservices', 'API Design', 'Caching', 'Load Balancing', 'AWS'],
  'Mobile Developer':   ['Swift', 'Kotlin', 'React Native', 'iOS', 'Android', 'API Design'],
  'QA Engineer':        ['Unit Testing', 'Integration Testing', 'Selenium', 'Cypress', 'Python', 'CI/CD'],
  'Product Manager':    ['Agile', 'Roadmapping', 'SQL', 'Analytics', 'User Research', 'Stakeholder Management'],
}
const LEVELS = ['Junior (0–2 yrs)', 'Mid-level (2–5 yrs)', 'Senior (5–8 yrs)', 'Staff / Principal (8+ yrs)']

const MOCK_QUESTIONS = [
  { id: '1', type: 'technical',     difficulty: 'intermediate', text: 'Explain the difference between `null` and `undefined` in JavaScript. When would you use each?', answer: 'null is an intentional absence of value assigned by the developer. undefined means a variable has been declared but not assigned. Use null when you want to explicitly indicate "no value", and undefined is typically the default state.' },
  { id: '2', type: 'system-design', difficulty: 'advanced',     text: 'Design a URL shortening service like bit.ly. Walk through the architecture, database schema, and how you would handle 100M requests/day.', answer: 'Key components: API gateway, URL generation service (base62 encoding), distributed cache (Redis), database (NoSQL for scale), CDN for redirects. Use consistent hashing for distribution.' },
  { id: '3', type: 'technical',     difficulty: 'intermediate', text: 'What is the virtual DOM in React and how does reconciliation work?', answer: 'The virtual DOM is a lightweight JS representation of the real DOM. React uses a diffing algorithm to compare the new virtual DOM with the previous one and only updates the changed parts in the real DOM.' },
  { id: '4', type: 'behavioral',    difficulty: 'beginner',     text: 'Describe a time when you had to debug a complex issue under time pressure. What was your approach?', answer: 'Structure your answer using STAR: Situation, Task, Action, Result. Focus on systematic debugging: reproduce the issue, isolate variables, check logs, form hypotheses, test solutions.' },
  { id: '5', type: 'technical',     difficulty: 'advanced',     text: 'Explain how the Node.js event loop works and how it handles asynchronous operations.', answer: 'Node.js uses a single-threaded event loop with libuv. Phases: timers, pending callbacks, idle/prepare, poll, check, close callbacks. Async I/O is offloaded to the OS or thread pool.' },
]

const typeBadge: Record<string, string> = {
  technical:       'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300',
  behavioral:      'bg-slate-100 dark:bg-white/8 text-slate-600 dark:text-white/50',
  'system-design': 'bg-violet-50 dark:bg-violet-500/10 text-violet-700 dark:text-violet-300',
}
const diffBadge: Record<string, string> = {
  beginner:     'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400',
  intermediate: 'bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400',
  advanced:     'bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-400',
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

  const toggleSkill = (s: string) =>
    setSkills(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])

  const removeSkill = (s: string) => setSkills(prev => prev.filter(x => x !== s))

  const handleGenerate = () => {
    if (!role || skills.length === 0 || !level) return
    setLoading(true); setQuestions([])
    setTimeout(() => { setLoading(false); setQuestions(MOCK_QUESTIONS) }, 1600)
  }

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  const toggleSave = (id: string) =>
    setSaved(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-up">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Generate Questions</h1>
        <p className="text-slate-500 dark:text-white/40 text-sm mt-1">Configure your session and let AI do the work.</p>
      </div>

      {/* Config card */}
      <div className="card p-6 space-y-5">
        {/* Role */}
        <div>
          <label className="block text-xs font-semibold text-slate-500 dark:text-white/40 uppercase tracking-wider mb-2">Target Role</label>
          <select className="input" value={role} onChange={e => { setRole(e.target.value); setSkills([]) }}>
            <option value="">Select a role...</option>
            {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>

        {/* Skills */}
        {role && (
          <div>
            <label className="block text-xs font-semibold text-slate-500 dark:text-white/40 uppercase tracking-wider mb-2">Skills</label>
            {skills.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {skills.map(s => (
                  <span key={s} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 text-xs font-medium border border-indigo-200 dark:border-indigo-500/30">
                    {s}
                    <button onClick={() => removeSkill(s)} className="hover:text-indigo-900 dark:hover:text-white">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
            <div className="flex flex-wrap gap-2">
              {availableSkills.filter(s => !skills.includes(s)).map(s => (
                <button key={s} onClick={() => toggleSkill(s)} className="px-3 py-1.5 rounded-full text-xs font-medium border border-slate-200 dark:border-white/10 text-slate-600 dark:text-white/50 hover:border-indigo-400 dark:hover:border-indigo-500/50 hover:text-indigo-700 dark:hover:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-all">
                  + {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Level */}
        <div>
          <label className="block text-xs font-semibold text-slate-500 dark:text-white/40 uppercase tracking-wider mb-2">Experience Level</label>
          <div className="grid grid-cols-2 gap-2">
            {LEVELS.map(l => (
              <button key={l} onClick={() => setLevel(l)} className={`py-2.5 px-3 rounded-xl text-sm border transition-all text-left ${level === l ? 'bg-indigo-50 dark:bg-indigo-500/15 border-indigo-300 dark:border-indigo-500/40 text-indigo-700 dark:text-indigo-300 font-medium' : 'border-slate-200 dark:border-white/10 text-slate-600 dark:text-white/50 hover:border-slate-300 dark:hover:border-white/20'}`}>
                {l}
              </button>
            ))}
          </div>
        </div>

        <Button onClick={handleGenerate} loading={loading} disabled={!role || skills.length === 0 || !level} className="w-full py-3">
          <Sparkles className="w-4 h-4" />
          {loading ? 'Generating...' : 'Generate Questions'}
        </Button>
      </div>

      {/* Skeleton loading */}
      {loading && (
        <div className="space-y-3">
          {[1, 2, 3].map(i => <SkeletonCard key={i} />)}
        </div>
      )}

      {/* Results */}
      {!loading && questions.length > 0 && (
        <div className="space-y-3 animate-fade-up">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500 dark:text-white/40">{questions.length} questions generated</p>
            <Button variant="secondary" size="sm">Save All</Button>
          </div>

          {questions.map((q, i) => (
            <div key={q.id} className="card overflow-hidden hover:shadow-md dark:hover:border-white/20 transition-all">
              <div className="p-5">
                <div className="flex items-start gap-3">
                  <span className="text-slate-300 dark:text-white/20 font-mono text-xs mt-1 shrink-0 w-5">{String(i + 1).padStart(2, '0')}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-800 dark:text-white/85 leading-relaxed">{q.text}</p>
                    <div className="flex items-center gap-2 mt-3">
                      <span className={`badge ${typeBadge[q.type]}`}>{q.type}</span>
                      <span className={`badge ${diffBadge[q.difficulty]}`}>{q.difficulty}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button onClick={() => handleCopy(q.id, q.text)} className="btn-ghost p-1.5 rounded-lg" title="Copy">
                      {copied === q.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                    <button onClick={() => toggleSave(q.id)} className={`btn-ghost p-1.5 rounded-lg ${saved.includes(q.id) ? 'text-amber-500' : ''}`} title="Save">
                      <Bookmark className={`w-3.5 h-3.5 ${saved.includes(q.id) ? 'fill-amber-500' : ''}`} />
                    </button>
                    <button onClick={() => setExpanded(expanded === q.id ? null : q.id)} className="btn-ghost p-1.5 rounded-lg">
                      {expanded === q.id ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>

              {expanded === q.id && (
                <div className="px-5 pb-5 pt-0 animate-fade-in">
                  <div className="border-t border-slate-100 dark:border-white/5 pt-4">
                    <p className="text-xs font-semibold text-slate-400 dark:text-white/25 uppercase tracking-wider mb-2">Sample Answer</p>
                    <p className="text-sm text-slate-600 dark:text-white/55 leading-relaxed">{q.answer}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
