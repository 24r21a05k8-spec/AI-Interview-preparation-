import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Github, Chrome, Bot } from 'lucide-react'
import Button from '../components/Button'
import { CircuitLines } from '../components/RoboIcon'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!email || !password) return setError('Please fill in all fields.')
    setLoading(true)
    setTimeout(() => { setLoading(false); navigate('/app/dashboard') }, 900)
  }

  return (
    <div className="min-h-screen bg-cyber flex items-center justify-center px-4">
      {/* Decorative */}
      <div className="fixed top-10 left-10 opacity-10 pointer-events-none">
        <CircuitLines className="w-64 h-32" />
      </div>
      <div className="fixed bottom-10 right-10 opacity-10 pointer-events-none">
        <CircuitLines className="w-64 h-32" />
      </div>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(0,255,255,0.04) 0%, transparent 70%)' }} />

      <div className="w-full max-w-sm relative animate-fade-up">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex flex-col items-center gap-3 mb-2">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, rgba(0,255,255,0.2), rgba(0,128,255,0.2))', border: '1px solid rgba(0,255,255,0.3)', boxShadow: '0 0 24px rgba(0,255,255,0.15)' }}>
              <Bot className="w-7 h-7 text-cyan-400" />
            </div>
            <span className="font-bold text-xl text-white">Interview<span className="text-cyan-400">AI</span></span>
          </Link>
          <p className="text-slate-500 text-sm font-mono">// authenticate to continue</p>
        </div>

        <div className="card-glow p-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-0.5" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,255,255,0.5), transparent)' }} />

          {/* Social */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            <button className="btn-secondary py-2.5 text-sm justify-center">
              <Chrome className="w-4 h-4" /> Google
            </button>
            <button className="btn-secondary py-2.5 text-sm justify-center">
              <Github className="w-4 h-4" /> GitHub
            </button>
          </div>

          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px" style={{ background: 'rgba(0,255,255,0.1)' }} />
            <span className="text-xs text-slate-600 font-mono">or_email</span>
            <div className="flex-1 h-px" style={{ background: 'rgba(0,255,255,0.1)' }} />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-slate-500 mb-1.5">EMAIL_ADDRESS</label>
              <input className="input" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-mono text-slate-500">PASSWORD</label>
                <button type="button" className="text-xs text-cyan-500 hover:text-cyan-300 font-mono">forgot?</button>
              </div>
              <div className="relative">
                <input className="input pr-10" type={showPw ? 'text' : 'password'} placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} />
                <button type="button" onClick={() => setShowPw(p => !p)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-cyan-400 transition-colors">
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-sm rounded-xl px-4 py-3 font-mono" style={{ background: 'rgba(255,50,50,0.08)', border: '1px solid rgba(255,50,50,0.2)', color: '#ff6060' }}>
                ⚠ {error}
              </div>
            )}

            <Button type="submit" loading={loading} className="w-full py-2.5">
              Sign In →
            </Button>
          </form>
        </div>

        <p className="text-center text-sm text-slate-600 mt-5 font-mono">
          no_account?{' '}
          <Link to="/signup" className="text-cyan-400 hover:text-cyan-300">register()</Link>
        </p>
      </div>
    </div>
  )
}
