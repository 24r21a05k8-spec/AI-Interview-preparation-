import { useState } from 'react'
import { Bookmark, Copy, ChevronDown, ChevronUp, Check, Trash2 } from 'lucide-react'

const savedQuestions = [
  { id: '1', type: 'technical',     difficulty: 'intermediate', role: 'Software Engineer',  text: 'Explain the difference between `null` and `undefined` in JavaScript.', answer: 'null is intentional absence of value; undefined means declared but not assigned.' },
  { id: '2', type: 'system-design', difficulty: 'advanced',     role: 'System Architect',   text: 'Design a URL shortening service like bit.ly.', answer: 'Use base62 encoding, Redis cache, NoSQL DB, CDN for redirects.' },
  { id: '3', type: 'behavioral',    difficulty: 'beginner',     role: 'Software Engineer',  text: 'Describe a time you had to debug a complex issue under pressure.', answer: 'Use STAR format: Situation, Task, Action, Result.' },
  { id: '4', type: 'technical',     difficulty: 'advanced',     role: 'Backend Developer',  text: 'How does the Node.js event loop work?', answer: 'Single-threaded with libuv. Phases: timers, I/O callbacks, poll, check, close.' },
]

const typeBadge: Record<string, string> = {
  technical:       'text-indigo-300',
  behavioral:      'text-slate-300',
  'system-design': 'text-violet-300',
}
const diffBadge: Record<string, string> = {
  beginner:     'text-emerald-400',
  intermediate: 'text-amber-400',
  advanced:     'text-red-400',
}

export default function Saved() {
  const [questions, setQuestions] = useState(savedQuestions)
  const [expanded, setExpanded] = useState<string | null>(null)
  const [copied, setCopied] = useState<string | null>(null)

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(id); setTimeout(() => setCopied(null), 2000)
  }

  const handleRemove = (id: string) => setQuestions(prev => prev.filter(q => q.id !== id))

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-up">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Saved Questions</h1>
          <p className="text-slate-400 text-sm mt-1">{questions.length} questions bookmarked.</p>
        </div>
      </div>

      {questions.length === 0 ? (
        <div className="card py-20 text-center">
          <Bookmark className="w-10 h-10 mx-auto mb-3" style={{ color: '#00F5FF', opacity: 0.3 }} />
          <p className="text-slate-400 font-medium">No saved questions yet</p>
          <p className="text-slate-500 text-sm mt-1">Bookmark questions while generating to see them here.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {questions.map((q, i) => (
            <div key={q.id} className="card overflow-hidden hover:shadow-md dark:hover:border-white/20 transition-all">
              <div className="p-5">
                <div className="flex items-start gap-3">
                  <span className="font-mono text-xs mt-1 shrink-0" style={{ color: '#00F5FF' }}>{String(i + 1).padStart(2, '0')}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium mb-1.5" style={{ color: '#00F5FF' }}>{q.role}</p>
                    <p className="text-sm leading-relaxed font-medium text-white">{q.text}</p>
                    <div className="flex items-center gap-2 mt-3">
                      <span className={`badge ${typeBadge[q.type]}`}>{q.type}</span>
                      <span className={`badge ${diffBadge[q.difficulty]}`}>{q.difficulty}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button onClick={() => handleCopy(q.id, q.text)} className="btn-ghost p-1.5 rounded-lg">
                      {copied === q.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                    <button onClick={() => handleRemove(q.id)} className="btn-ghost p-1.5 rounded-lg text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => setExpanded(expanded === q.id ? null : q.id)} className="btn-ghost p-1.5 rounded-lg">
                      {expanded === q.id ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>
              {expanded === q.id && (
                <div className="px-5 pb-5 animate-fade-in">
                  <div className="border-t pt-4" style={{ borderColor: 'rgba(0,245,255,0.1)' }}>
                    <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#00F5FF' }}>Sample Answer</p>
                    <p className="text-sm leading-relaxed text-slate-300">{q.answer}</p>
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
