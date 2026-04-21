import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { PlayCircle, Pause, SkipForward, RotateCcw, Trophy, Clock, Code, Server, Layers, Database, BarChart3, Settings, Briefcase, CheckCircle2 } from 'lucide-react'
import Button from '../components/Button'

const ROLES = [
  { id: 'software-engineer', name: 'Software Engineer', icon: Code, color: '#00F5FF' },
  { id: 'frontend-developer', name: 'Frontend Developer', icon: Layers, color: '#a78bfa' },
  { id: 'backend-developer', name: 'Backend Developer', icon: Server, color: '#10b981' },
  { id: 'fullstack-developer', name: 'Full Stack Developer', icon: Code, color: '#f59e0b' },
  { id: 'data-scientist', name: 'Data Scientist', icon: BarChart3, color: '#ec4899' },
  { id: 'devops-engineer', name: 'DevOps Engineer', icon: Settings, color: '#06b6d4' },
  { id: 'product-manager', name: 'Product Manager', icon: Briefcase, color: '#8b5cf6' },
  { id: 'qa-engineer', name: 'QA Engineer', icon: CheckCircle2, color: '#14b8a6' },
]

const QUESTIONS_BY_ROLE: Record<string, Array<{ text: string; type: string }>> = {
  'software-engineer': [
    { text: 'Explain the difference between `null` and `undefined` in JavaScript.', type: 'technical' },
    { text: 'What is the virtual DOM in React and how does reconciliation work?', type: 'technical' },
    { text: 'Design a URL shortening service. Walk through the architecture.', type: 'system-design' },
    { text: 'How does the Node.js event loop work?', type: 'technical' },
    { text: 'Describe a time you had to debug a complex issue under pressure.', type: 'behavioral' },
    { text: 'What are closures in JavaScript and how do they work?', type: 'technical' },
    { text: 'Explain the SOLID principles in object-oriented programming.', type: 'technical' },
    { text: 'How would you implement a rate limiter for an API?', type: 'system-design' },
    { text: 'What is the difference between async/await and Promises?', type: 'technical' },
    { text: 'Design a notification system for a social media platform.', type: 'system-design' },
  ],
  'frontend-developer': [
    { text: 'Explain CSS specificity and how it affects styling.', type: 'technical' },
    { text: 'What are React hooks and when would you use useEffect vs useLayoutEffect?', type: 'technical' },
    { text: 'How would you optimize the performance of a React application?', type: 'technical' },
    { text: 'Explain the difference between server-side rendering and client-side rendering.', type: 'technical' },
    { text: 'Describe a challenging UI/UX problem you solved.', type: 'behavioral' },
    { text: 'What is the difference between CSS Grid and Flexbox?', type: 'technical' },
    { text: 'How do you handle state management in large React applications?', type: 'technical' },
    { text: 'Explain how browser rendering works (Critical Rendering Path).', type: 'technical' },
    { text: 'What are Web Vitals and why are they important?', type: 'technical' },
    { text: 'How would you implement infinite scrolling?', type: 'technical' },
  ],
  'backend-developer': [
    { text: 'Explain the difference between SQL and NoSQL databases.', type: 'technical' },
    { text: 'How would you design a RESTful API for a social media platform?', type: 'system-design' },
    { text: 'What is database indexing and when should you use it?', type: 'technical' },
    { text: 'Explain how you would handle authentication and authorization in a microservices architecture.', type: 'system-design' },
    { text: 'Describe a time when you optimized database query performance.', type: 'behavioral' },
    { text: 'What is the CAP theorem and how does it apply to distributed systems?', type: 'technical' },
    { text: 'How would you implement caching in a web application?', type: 'system-design' },
    { text: 'Explain the difference between horizontal and vertical scaling.', type: 'technical' },
    { text: 'What are database transactions and ACID properties?', type: 'technical' },
    { text: 'How would you design a job queue system?', type: 'system-design' },
  ],
  'fullstack-developer': [
    { text: 'How would you architect a real-time chat application?', type: 'system-design' },
    { text: 'Explain the differences between JWT and session-based authentication.', type: 'technical' },
    { text: 'How do you handle state management in a large-scale application?', type: 'technical' },
    { text: 'Design a scalable e-commerce platform with payment processing.', type: 'system-design' },
    { text: 'Describe your approach to debugging issues across the full stack.', type: 'behavioral' },
    { text: 'How would you implement real-time notifications?', type: 'system-design' },
    { text: 'Explain the concept of eventual consistency in distributed systems.', type: 'technical' },
    { text: 'What is your approach to API versioning?', type: 'technical' },
    { text: 'How would you handle file uploads in a scalable way?', type: 'system-design' },
    { text: 'Explain the benefits and challenges of microservices architecture.', type: 'technical' },
  ],
  'data-scientist': [
    { text: 'Explain the difference between supervised and unsupervised learning.', type: 'technical' },
    { text: 'How would you handle missing data in a dataset?', type: 'technical' },
    { text: 'Describe the process of building and deploying a machine learning model.', type: 'system-design' },
    { text: 'What is overfitting and how do you prevent it?', type: 'technical' },
    { text: 'Describe a data science project where you had to communicate findings to non-technical stakeholders.', type: 'behavioral' },
    { text: 'Explain the bias-variance tradeoff.', type: 'technical' },
    { text: 'What is feature engineering and why is it important?', type: 'technical' },
    { text: 'How would you evaluate the performance of a classification model?', type: 'technical' },
    { text: 'Explain the difference between bagging and boosting.', type: 'technical' },
    { text: 'How would you design an A/B testing framework?', type: 'system-design' },
  ],
  'devops-engineer': [
    { text: 'Explain the concept of Infrastructure as Code (IaC).', type: 'technical' },
    { text: 'How would you design a CI/CD pipeline for a microservices application?', type: 'system-design' },
    { text: 'What is container orchestration and why is Kubernetes popular?', type: 'technical' },
    { text: 'Describe your approach to monitoring and logging in production systems.', type: 'technical' },
    { text: 'Tell me about a time you resolved a critical production incident.', type: 'behavioral' },
    { text: 'What is the difference between Docker and virtual machines?', type: 'technical' },
    { text: 'How would you implement blue-green deployments?', type: 'system-design' },
    { text: 'Explain the concept of service mesh and when to use it.', type: 'technical' },
    { text: 'What are the key metrics you monitor in production?', type: 'technical' },
    { text: 'How would you design a disaster recovery strategy?', type: 'system-design' },
  ],
  'product-manager': [
    { text: 'How do you prioritize features in a product roadmap?', type: 'behavioral' },
    { text: 'Describe your process for gathering and analyzing user feedback.', type: 'behavioral' },
    { text: 'How would you handle conflicting stakeholder requirements?', type: 'behavioral' },
    { text: 'Explain how you measure product success and define KPIs.', type: 'technical' },
    { text: 'Walk me through how you would launch a new feature.', type: 'system-design' },
    { text: 'How do you balance technical debt with new feature development?', type: 'behavioral' },
    { text: 'Describe a time when you had to pivot a product strategy.', type: 'behavioral' },
    { text: 'How do you work with engineering teams to estimate project timelines?', type: 'behavioral' },
    { text: 'What frameworks do you use for product discovery?', type: 'technical' },
    { text: 'How would you approach entering a new market?', type: 'system-design' },
  ],
  'qa-engineer': [
    { text: 'Explain the difference between unit testing, integration testing, and e2e testing.', type: 'technical' },
    { text: 'How would you design a test strategy for a complex web application?', type: 'system-design' },
    { text: 'What is test-driven development (TDD) and what are its benefits?', type: 'technical' },
    { text: 'Describe your approach to testing APIs and microservices.', type: 'technical' },
    { text: 'Tell me about a critical bug you found and how you reported it.', type: 'behavioral' },
    { text: 'What is the difference between black-box and white-box testing?', type: 'technical' },
    { text: 'How would you implement automated testing in a CI/CD pipeline?', type: 'system-design' },
    { text: 'Explain the concept of test coverage and its limitations.', type: 'technical' },
    { text: 'How do you prioritize which tests to automate?', type: 'technical' },
    { text: 'What is your approach to performance and load testing?', type: 'technical' },
  ],
}

const QUESTION_COUNT_OPTIONS = [3, 5, 8, 10, 15]
const TIME_PER_QUESTION_OPTIONS = [30, 60, 90, 120, 180] // in seconds

const QUESTION_TIME = 60
type Status = 'setup' | 'active' | 'paused' | 'finished'

export default function MockInterview() {
  const [status, setStatus] = useState<Status>('setup')
  const [selectedRole, setSelectedRole] = useState<string>('software-engineer')
  const [questionCount, setQuestionCount] = useState<number>(5)
  const [timePerQuestion, setTimePerQuestion] = useState<number>(60)
  const [idx, setIdx] = useState(0)
  const [timeLeft, setTimeLeft] = useState(timePerQuestion)
  const [results, setResults] = useState<{ text: string; timeSpent: number }[]>([])
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const navigate = useNavigate()

  const allQuestions = QUESTIONS_BY_ROLE[selectedRole] || QUESTIONS_BY_ROLE['software-engineer']
  const QUESTIONS = allQuestions.slice(0, questionCount)
  const selectedRoleData = ROLES.find(r => r.id === selectedRole) || ROLES[0]

  const stopTimer = () => { if (intervalRef.current) clearInterval(intervalRef.current) }

  const advance = (tLeft: number) => {
    stopTimer()
    const spent = timePerQuestion - tLeft
    setResults(prev => {
      const updated = [...prev, { text: QUESTIONS[idx].text, timeSpent: spent }]
      if (idx + 1 >= QUESTIONS.length) setStatus('finished')
      else { setIdx(i => i + 1); setTimeLeft(timePerQuestion) }
      return updated
    })
  }

  useEffect(() => {
    if (status !== 'active') return stopTimer()
    intervalRef.current = setInterval(() => {
      setTimeLeft(t => { if (t <= 1) { advance(t); return timePerQuestion } return t - 1 })
    }, 1000)
    return stopTimer
  }, [status, idx, timePerQuestion])

  const timerPct = (timeLeft / timePerQuestion) * 100
  const timerColor = timeLeft > 20 ? '#22c55e' : timeLeft > 10 ? '#f59e0b' : '#ef4444'
  const timerTextColor = timeLeft > 20 ? 'text-emerald-500' : timeLeft > 10 ? 'text-amber-500' : 'text-red-500'

  if (status === 'setup') {
    const RoleIcon = selectedRoleData.icon
    
    return (
      <div className="max-w-2xl mx-auto space-y-6 animate-fade-up">
        <div>
          <h1 className="text-2xl font-bold text-white">Mock Interview</h1>
          <p className="text-slate-400 text-sm mt-1">Simulate real interview conditions.</p>
        </div>

        {/* Role Selection */}
        <div className="card p-6">
          <h2 className="font-semibold text-white mb-4 flex items-center gap-2">
            <Briefcase className="w-5 h-5" style={{ color: '#00F5FF' }} />
            Select Your Role
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {ROLES.map((role) => {
              const Icon = role.icon
              const isSelected = selectedRole === role.id
              return (
                <button
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  className="p-4 rounded-xl text-center transition-all duration-200 hover:-translate-y-1"
                  style={{
                    background: isSelected ? `${role.color}15` : 'rgba(0,245,255,0.04)',
                    border: `2px solid ${isSelected ? role.color : 'rgba(0,245,255,0.1)'}`,
                    boxShadow: isSelected ? `0 0 20px ${role.color}30` : 'none'
                  }}
                >
                  <div 
                    className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center"
                    style={{
                      background: isSelected ? `${role.color}20` : 'rgba(0,245,255,0.08)',
                      border: `1px solid ${isSelected ? role.color : 'rgba(0,245,255,0.15)'}`
                    }}
                  >
                    <Icon className="w-6 h-6" style={{ color: isSelected ? role.color : '#00F5FF' }} />
                  </div>
                  <p className="text-sm font-semibold text-white mb-1">{role.name}</p>
                  {isSelected && (
                    <div className="flex items-center justify-center gap-1 mt-2">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: role.color }} />
                      <span className="text-xs font-mono" style={{ color: role.color }}>Selected</span>
                    </div>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Interview Configuration */}
        <div className="card p-6">
          <h2 className="font-semibold text-white mb-4 flex items-center gap-2">
            <Settings className="w-5 h-5" style={{ color: '#00F5FF' }} />
            Interview Configuration
          </h2>
          
          {/* Number of Questions */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-300 mb-3">
              Number of Questions
            </label>
            <div className="grid grid-cols-5 gap-2">
              {QUESTION_COUNT_OPTIONS.map((count) => (
                <button
                  key={count}
                  onClick={() => setQuestionCount(count)}
                  className="py-2.5 px-4 rounded-lg text-center transition-all duration-200 font-mono font-bold"
                  style={{
                    background: questionCount === count ? 'rgba(0,245,255,0.15)' : 'rgba(0,245,255,0.04)',
                    border: `2px solid ${questionCount === count ? '#00F5FF' : 'rgba(0,245,255,0.1)'}`,
                    color: questionCount === count ? '#00F5FF' : '#94a3b8',
                    boxShadow: questionCount === count ? '0 0 15px rgba(0,245,255,0.2)' : 'none'
                  }}
                >
                  {count}
                </button>
              ))}
            </div>
          </div>

          {/* Time per Question */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-3">
              Time per Question
            </label>
            <div className="grid grid-cols-5 gap-2">
              {TIME_PER_QUESTION_OPTIONS.map((time) => (
                <button
                  key={time}
                  onClick={() => setTimePerQuestion(time)}
                  className="py-2.5 px-4 rounded-lg text-center transition-all duration-200 font-mono font-bold"
                  style={{
                    background: timePerQuestion === time ? 'rgba(138,43,226,0.15)' : 'rgba(138,43,226,0.04)',
                    border: `2px solid ${timePerQuestion === time ? '#a78bfa' : 'rgba(138,43,226,0.1)'}`,
                    color: timePerQuestion === time ? '#a78bfa' : '#94a3b8',
                    boxShadow: timePerQuestion === time ? '0 0 15px rgba(138,43,226,0.2)' : 'none'
                  }}
                >
                  {time}s
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Session Overview */}
        <div className="card p-6 space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{
                background: `${selectedRoleData.color}20`,
                border: `1px solid ${selectedRoleData.color}`
              }}
            >
              <RoleIcon className="w-5 h-5" style={{ color: selectedRoleData.color }} />
            </div>
            <div>
              <h2 className="font-semibold text-white">Session Overview</h2>
              <p className="text-xs text-slate-400 font-mono">Role: {selectedRoleData.name}</p>
            </div>
          </div>
          
          {[
            ['Questions', questionCount], 
            ['Time per question', `${timePerQuestion}s`], 
            ['Total time', `~${Math.ceil(questionCount * timePerQuestion / 60)} min`]
          ].map(([l, v]) => (
            <div key={String(l)} className="flex justify-between py-2 border-b last:border-0" style={{ borderColor: 'rgba(0,245,255,0.1)' }}>
              <span className="text-sm text-slate-400">{l}</span>
              <span className="text-sm font-medium text-white font-mono">{v}</span>
            </div>
          ))}
        </div>

        <Button 
          onClick={() => { 
            setIdx(0); 
            setTimeLeft(timePerQuestion); 
            setResults([]); 
            setStatus('active') 
          }} 
          className="w-full py-3"
        >
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
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(255,160,0,0.1)', border: '1px solid rgba(255,160,0,0.2)' }}>
            <Trophy className="w-8 h-8 text-amber-400" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">Interview Complete!</h1>
          <p className="text-slate-400 text-sm">You answered all {QUESTIONS.length} questions.</p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {[{ label: 'Questions', value: QUESTIONS.length, color: '#00F5FF' }, { label: 'Total Time', value: `${total}s`, color: '#10b981' }, { label: 'Avg / Question', value: `${avg}s`, color: '#f59e0b' }].map(s => (
            <div key={s.label} className="card p-4 text-center">
              <p className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</p>
              <p className="text-xs text-slate-400 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="card p-5">
          <h2 className="font-semibold text-white text-sm mb-4">Question Breakdown</h2>
          <div className="space-y-2">
            {results.map((r, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b last:border-0" style={{ borderColor: 'rgba(0,245,255,0.05)' }}>
                <span className="text-sm text-slate-300 truncate flex-1 mr-4">Q{i + 1}: {r.text.slice(0, 55)}...</span>
                <span className="text-sm font-mono text-slate-400 shrink-0">{r.timeSpent}s</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <Button onClick={() => { setIdx(0); setTimeLeft(timePerQuestion); setResults([]); setStatus('active') }}>
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
        <div className="flex justify-between text-xs text-slate-400 mb-2">
          <span>Question {idx + 1} of {QUESTIONS.length}</span>
          <span>{Math.round(progress)}% complete</span>
        </div>
        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(0,245,255,0.1)' }}>
          <div className="h-full rounded-full transition-all duration-500" style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #00F5FF, #a78bfa)' }} />
        </div>
      </div>

      {/* Timer + Question */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-xs uppercase tracking-wider mb-1 flex items-center gap-1.5" style={{ color: '#00F5FF' }}>
              <Clock className="w-3 h-3" /> Time Remaining
            </p>
            <p className={`text-4xl font-mono font-bold ${timerTextColor}`}>
              {String(Math.floor(timeLeft / 60)).padStart(2, '0')}:{String(timeLeft % 60).padStart(2, '0')}
            </p>
          </div>
          <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
            <circle cx="32" cy="32" r="26" fill="none" stroke="currentColor" strokeWidth="4" style={{ color: 'rgba(0,245,255,0.1)' }} />
            <circle cx="32" cy="32" r="26" fill="none" stroke={timerColor} strokeWidth="4"
              strokeDasharray={`${2 * Math.PI * 26}`}
              strokeDashoffset={`${2 * Math.PI * 26 * (1 - timerPct / 100)}`}
              strokeLinecap="round" className="transition-all duration-1000" />
          </svg>
        </div>

        <div className="mb-2">
          <span className={`badge text-xs ${QUESTIONS[idx].type === 'behavioral' ? 'text-slate-400' : QUESTIONS[idx].type === 'system-design' ? 'text-violet-400' : 'text-indigo-400'}`}
            style={{ background: QUESTIONS[idx].type === 'behavioral' ? 'rgba(148,163,184,0.1)' : QUESTIONS[idx].type === 'system-design' ? 'rgba(138,43,226,0.1)' : 'rgba(99,102,241,0.1)', border: `1px solid ${QUESTIONS[idx].type === 'behavioral' ? 'rgba(148,163,184,0.2)' : QUESTIONS[idx].type === 'system-design' ? 'rgba(138,43,226,0.2)' : 'rgba(99,102,241,0.2)'}` }}>
            {QUESTIONS[idx].type}
          </span>
        </div>
        <p className="text-lg text-white leading-relaxed font-medium">{QUESTIONS[idx].text}</p>

        {status === 'paused' && (
          <div className="mt-4 rounded-xl px-4 py-3 text-sm" style={{ background: 'rgba(255,160,0,0.1)', border: '1px solid rgba(255,160,0,0.2)', color: '#f59e0b' }}>
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
