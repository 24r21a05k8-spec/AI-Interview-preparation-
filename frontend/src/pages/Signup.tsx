import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Sparkles, Eye, EyeOff, Github, Chrome, CheckCircle2 } from 'lucide-react'
import Button from '../components/Button'

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) => setForm(f => ({ ...f, [k]: e.target.value }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!form.name || !form.email || !form.password) return setError('Please fill in all fields.')
    if (form.password.length < 6) return setError('Password must be at least 6 characters.')
    setLoading(true)
    setTimeout(() => { setLoading(false); navigate('/app/dashboard') }, 900)
  }

  const pwStrength = form.password.length === 0 ? 0 : form.password.length < 6 ? 1 : form.password.length < 10 ? 2 : 3
  const strengthLabel = ['', 'Weak', 'Good', 'Strong'][pwStrength]
  const strengthColor = ['', 'bg-red-500', 'bg-amber-500', 'bg-emerald-500'][pwStrength]

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a0a0f] flex items-center justify-center px-4 py-10">
      <div className="absolute inset-0 bg-mesh pointer-events-none" />

      <div className="w-full max-w-sm relative animate-fade-up">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-slate-900 dark:text-white">InterviewAI</span>
          </Link>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Create your account</h1>
          <p className="text-slate-500 dark:text-white/40 text-sm mt-1">Start preparing for free</p>
        </div>

        <div className="card p-6 shadow-xl dark:shadow-none">
          <div className="grid grid-cols-2 gap-3 mb-5">
            <button className="btn-secondary py-2.5 text-sm justify-center">
              <Chrome className="w-4 h-4" /> Google
            </button>
            <button className="btn-secondary py-2.5 text-sm justify-center">
              <Github className="w-4 h-4" /> GitHub
            </button>
          </div>

          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-slate-200 dark:bg-white/8" />
            <span className="text-xs text-slate-400 dark:text-white/25">or continue with email</span>
            <div className="flex-1 h-px bg-slate-200 dark:bg-white/8" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-white/50 mb-1.5">Full Name</label>
              <input className="input" type="text" placeholder="John Doe" value={form.name} onChange={set('name')} />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-white/50 mb-1.5">Email</label>
              <input className="input" type="email" placeholder="you@example.com" value={form.email} onChange={set('email')} />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-white/50 mb-1.5">Password</label>
              <div className="relative">
                <input className="input pr-10" type={showPw ? 'text' : 'password'} placeholder="Min. 6 characters" value={form.password} onChange={set('password')} />
                <button type="button" onClick={() => setShowPw(p => !p)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-white/30">
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {form.password.length > 0 && (
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex-1 h-1 bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
                    <div className={`h-full ${strengthColor} rounded-full transition-all`} style={{ width: `${(pwStrength / 3) * 100}%` }} />
                  </div>
                  <span className={`text-xs font-medium ${['', 'text-red-500', 'text-amber-500', 'text-emerald-500'][pwStrength]}`}>{strengthLabel}</span>
                </div>
              )}
            </div>

            {error && (
              <div className="flex items-center gap-2 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 text-sm rounded-xl px-4 py-3">
                ⚠ {error}
              </div>
            )}

            <Button type="submit" loading={loading} className="w-full py-2.5">
              Create Account
            </Button>

            <p className="text-xs text-center text-slate-400 dark:text-white/25">
              By signing up, you agree to our Terms of Service and Privacy Policy.
            </p>
          </form>
        </div>

        <p className="text-center text-sm text-slate-500 dark:text-white/30 mt-5">
          Already have an account?{' '}
          <Link to="/login" className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  )
}
