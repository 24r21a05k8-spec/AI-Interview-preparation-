import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { PlayCircle, Pause, SkipForward, RotateCcw, Trophy, Clock } from 'lucide-react'
import Button from '../components/Button'

const QUESTIONS = [
  { text: 'Explain the difference between `null` and `undefined` in JavaScript.', type: 'technical' },
  { text: 'What is the virtual DOM in React and how does reconciliation work?', type: 'technical' },
  { text: 'Design a URL shortening service. Walk through the architecture.', type: 'system-design' },
  { text: 'How does the Node.js event loop work?', type: 'technical' },
  { text: 'Describe a time you had to debug a complex issue under pressure.', type: 'behavioral' },
]
const QUESTION_TIME = 60
type Status = 'setup' | 'active' | 'paused' | 'finished'

export default function MockInterview() {
  const [status, setStatus] = useState<Status>('setup')
  const [idx, setIdx] = useState(0)
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME)
  const [results, setResults] = useState<{ text: string; timeSpent: number }[]>([])
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const navigate = useNavigate()

  const stopTimer = () => { if (intervalRef.current) clearInterval(intervalRef.current) }

  const advance = (tLeft: number) => {
    stopTimer()
    const spent = QUESTION_TIME - tLeft
    setResults(prev => {
      const updated = [...prev, { text: QUESTIONS[idx].text, timeSpent: spent }]
      if (idx + 1 >= QUESTIONS.length) setStatus('finished')
      else { setIdx(i => i + 1); setTimeLeft(QUESTION_TIME) }
      return updated
    })
  }

  useEffect(() => {
    if (status !== 'active') return stopTimer()
    intervalRef.current = setInterval(() => {
      setTimeLeft(t => { if (t <= 1) { advance(t); return QUESTION_TIME } return t - 1 })
    }, 1000)
    return stopTimer
  }, [status, idx])

  const timerPct = (timeLeft / QUESTION_TIME) * 100
  const timerColor = timeLeft > 20 ? '#22c55e' : timeLeft > 10 ? '#f59e0b' : '#ef4444'
  const timerTextColor = timeLeft > 20 ? 'text-emerald-500' : timeLeft > 10 ? 'text-amber-500' : 'text-red-500'

  if (status === 'setup') {
    return (
      <div className="max-w-lg mx-auto space-y-6 animate-fade-up">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Mock Interview</h1>
          <p className="text-slate-500 dark:text-white/40 text-sm mt-1">Simulate real interview conditions.</p>
        </div>
        <div className="card p-6 space-y-4">
          <h2 className="font-semibold text-slate-900 dark:text-white mb-1">Session Overview</h2>
          {[['Questions', QUESTIONS.length], ['Time per question', `${QUESTION_TIME}s`], ['Total time', `~${Math.ceil(QUESTIONS.length * QUESTION_TIME / 60)} min`], ['Role', 'Software Engineer']].map(([l, v]) => (
            <div key={String(l)} className="flex justify-between py-2 border-b border-slate-100 dark:border-white/5 last:border-0">
              <span className="text-sm text-slate-500 dark:text-white/40">{l}</span>
              <span className="text-sm font-medium text-slate-800 dark:text-white/80">{v}</span>
            </div>
          ))}
        </div>
        <Button onClick={() => { setIdx(0); setTimeLeft(QUESTION_TIME); setResults([]); setStatus('active') }} className="w-full py-3">
          <PlayCircle className="w-5 h-5" /> Start Interview
        </Button>
      </div>
    )
  }

  if (status === 'finished') {
    const total = results.reduce((s, r) => s + r.timeSpent, 0)
    const avg = Math.round(total / results.length)
    return (
      <div className="max-w-2xl mx-auto space-y-6 animate-fade-up">
        <div className="card p-8 text-center">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center mx-auto mb-4">
            <Trophy className="w-8 h-8 text-amber-500" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">Interview Complete!</h1>
          <p className="text-slate-500 dark:text-white/40 text-sm">You answered all {QUESTIONS.length} questions.</p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {[{ label: 'Questions', value: QUESTIONS.length, color: 'text-indigo-500' }, { label: 'Total Time', value: `${total}s`, color: 'text-emerald-500' }, { label: 'Avg / Question', value: `${avg}s`, color: 'text-amber-500' }].map(s => (
            <div key={s.label} className="card p-4 text-center">
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-slate-400 dark:text-white/30 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="card p-5">
          <h2 className="font-semibold text-slate-900 dark:text-white text-sm mb-4">Question Breakdown</h2>
          <div className="space-y-2">
            {results.map((r, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-white/5 last:border-0">
                <span className="text-sm text-slate-600 dark:text-white/50 truncate flex-1 mr-4">Q{i + 1}: {r.text.slice(0, 55)}...</span>
                <span className="text-sm font-mono text-slate-400 dark:text-white/30 shrink-0">{r.timeSpent}s</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <Button onClick={() => { setIdx(0); setTimeLeft(QUESTION_TIME); setResults([]); setStatus('active') }}>
            <RotateCcw className="w-4 h-4" /> Retry
          </Button>
          <Button variant="secondary" onClick={() => navigate('/app/dashboard')}>Back to Dashboard</Button>
        </div>
      </div>
    )
  }

  const progress = (idx / QUESTIONS.length) * 100

  return (
    <div className="max-w-2xl mx-auto space-y-5 animate-fade-up">
      {/* Progress */}
      <div>
        <div className="flex justify-between text-xs text-slate-400 dark:text-white/30 mb-2">
          <span>Question {idx + 1} of {QUESTIONS.length}</span>
          <span>{Math.round(progress)}% complete</span>
        </div>
        <div className="h-1.5 bg-slate-200 dark:bg-white/5 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Timer + Question */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-xs text-slate-400 dark:text-white/30 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Clock className="w-3 h-3" /> Time Remaining
            </p>
            <p className={`text-4xl font-mono font-bold ${timerTextColor}`}>
              {String(Math.floor(timeLeft / 60)).padStart(2, '0')}:{String(timeLeft % 60).padStart(2, '0')}
            </p>
          </div>
          <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
            <circle cx="32" cy="32" r="26" fill="none" stroke="currentColor" strokeWidth="4" className="text-slate-200 dark:text-white/5" />
            <circle cx="32" cy="32" r="26" fill="none" stroke={timerColor} strokeWidth="4"
              strokeDasharray={`${2 * Math.PI * 26}`}
              strokeDashoffset={`${2 * Math.PI * 26 * (1 - timerPct / 100)}`}
              strokeLinecap="round" className="transition-all duration-1000" />
          </svg>
        </div>

        <div className="mb-2">
          <span className={`badge text-xs ${QUESTIONS[idx].type === 'behavioral' ? 'bg-slate-100 dark:bg-white/8 text-slate-500 dark:text-white/40' : QUESTIONS[idx].type === 'system-design' ? 'bg-violet-50 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400' : 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400'}`}>
            {QUESTIONS[idx].type}
          </span>
        </div>
        <p className="text-lg text-slate-800 dark:text-white/90 leading-relaxed">{QUESTIONS[idx].text}</p>

        {status === 'paused' && (
          <div className="mt-4 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 rounded-xl px-4 py-3 text-sm text-amber-700 dark:text-amber-400">
            ⏸ Interview paused — resume when you're ready.
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex gap-3">
        {status === 'active'
          ? <Button variant="secondary" onClick={() => setStatus('paused')}><Pause className="w-4 h-4" /> Pause</Button>
          : <Button onClick={() => setStatus('active')}><PlayCircle className="w-4 h-4" /> Resume</Button>
        }
        <Button onClick={() => advance(timeLeft)} className="ml-auto">
          {idx + 1 === QUESTIONS.length ? 'Finish' : 'Next'} <SkipForward className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
