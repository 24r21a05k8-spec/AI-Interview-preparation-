import { useNavigate } from 'react-router-dom'
import { Zap, Target, BarChart3, ArrowRight, CheckCircle2, Star, Bot, Cpu, Shield } from 'lucide-react'
import { CircuitLines, HexGrid, AIBrain } from '../components/RoboIcon'

const features = [
  { icon: Bot,      title: 'AI Robot Interviewer',  desc: 'Our AI engine generates role-specific questions with the precision of a senior engineer.', color: 'text-cyan-400',    bg: 'rgba(0,255,255,0.08)',   border: 'rgba(0,255,255,0.2)' },
  { icon: Target,   title: 'Role-Based Targeting',  desc: 'Choose from 20+ engineering roles. Questions adapt to your exact job target and tech stack.', color: 'text-blue-400',    bg: 'rgba(0,128,255,0.08)',   border: 'rgba(0,128,255,0.2)' },
  { icon: Zap,      title: 'Neural Mock Interviews', desc: 'Practice under real conditions with timed sessions powered by advanced language models.', color: 'text-violet-400',  bg: 'rgba(128,0,255,0.08)',   border: 'rgba(128,0,255,0.2)' },
  { icon: BarChart3, title: 'Progress Analytics',   desc: 'Track your improvement with detailed session analytics and performance trends.', color: 'text-emerald-400', bg: 'rgba(0,255,136,0.08)',   border: 'rgba(0,255,136,0.2)' },
  { icon: Cpu,      title: 'Smart Question Engine', desc: 'Powered by GPT-4 with custom prompting for technical depth and relevance.', color: 'text-amber-400',   bg: 'rgba(255,160,0,0.08)',   border: 'rgba(255,160,0,0.2)' },
  { icon: Shield,   title: 'Secure & Private',      desc: 'Your data stays yours. End-to-end encryption with Supabase Row Level Security.', color: 'text-pink-400',    bg: 'rgba(255,0,128,0.08)',   border: 'rgba(255,0,128,0.2)' },
]

const testimonials = [
  { name: 'Sarah K.', role: 'SWE @ Google',         text: 'Landed my dream job after 2 weeks of prep. The AI questions were spot-on for my interviews.', stars: 5 },
  { name: 'Marcus T.', role: 'Frontend Dev @ Stripe', text: 'The role-specific questions saved me hours of research. The mock interview mode is incredible.', stars: 5 },
  { name: 'Priya M.', role: 'Data Scientist @ Meta',  text: 'Felt completely prepared walking in. The AI knew exactly what Meta would ask.', stars: 5 },
]

export default function Landing() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-cyber text-slate-100 overflow-hidden">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-cyan-500/10 bg-[#080b14]/90 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #00ffff, #0080ff)', boxShadow: '0 0 16px rgba(0,255,255,0.4)' }}>
              <Bot className="w-4 h-4 text-black" />
            </div>
            <span className="font-bold text-white tracking-tight">Interview<span className="text-cyan-400">AI</span></span>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/login')} className="btn-ghost px-4 py-2 text-sm">Sign In</button>
            <button onClick={() => navigate('/signup')} className="btn-primary px-4 py-2 text-sm">Get Started</button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-16 pb-24 px-6 overflow-hidden">
        {/* Background glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full blur-3xl pointer-events-none" style={{ background: 'radial-gradient(ellipse, rgba(0,255,255,0.05) 0%, rgba(0,128,255,0.04) 40%, transparent 70%)' }} />
        <div className="absolute bottom-0 left-10 opacity-10 pointer-events-none">
          <HexGrid className="w-48 h-48" />
        </div>
        <div className="absolute top-1/3 right-0 opacity-8 pointer-events-none">
          <CircuitLines className="w-56 h-28" />
        </div>

        <div className="max-w-6xl mx-auto relative">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

            {/* ── Left: Text ── */}
            <div className="flex-1 text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-7 animate-fade-up" style={{ background: 'rgba(0,255,255,0.07)', border: '1px solid rgba(0,255,255,0.18)' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-cyan-400 text-sm font-medium tracking-wide">Powered by GPT-4 Neural Engine</span>
              </div>

              {/* Headline */}
              <h1 className="font-extrabold leading-[1.08] tracking-tight mb-5 animate-fade-up animate-delay-100">
                <span className="block text-4xl md:text-5xl lg:text-6xl text-white mb-1">Train Smarter.</span>
                <span className="block text-4xl md:text-5xl lg:text-6xl text-white mb-1">Interview Stronger.</span>
                <span className="block text-3xl md:text-4xl lg:text-5xl mt-3" style={{ background: 'linear-gradient(135deg, #00ffff 0%, #0080ff 55%, #8040ff 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  Where Preparation Meets Precision.
                </span>
              </h1>

              {/* Subtext */}
              <p className="text-lg text-slate-400 max-w-lg mb-8 leading-relaxed animate-fade-up animate-delay-200">
                AI-generated, role-specific interview questions that mirror what top companies actually ask. Stop guessing. Start acing.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center lg:justify-start justify-center gap-3 mb-8 animate-fade-up animate-delay-300">
                <button onClick={() => navigate('/signup')} className="btn-primary px-8 py-3.5 text-base w-full sm:w-auto">
                  Start Preparing Free <ArrowRight className="w-4 h-4" />
                </button>
                <button onClick={() => navigate('/login')} className="btn-secondary px-7 py-3.5 text-base w-full sm:w-auto">
                  Sign In
                </button>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap items-center lg:justify-start justify-center gap-5 text-sm text-slate-500 animate-fade-up animate-delay-300">
                {['No credit card required', 'Free to start', '10k+ engineers'].map(t => (
                  <span key={t} className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500" /> {t}
                  </span>
                ))}
              </div>
            </div>

            {/* ── Right: Robot ── */}
            <div className="flex-shrink-0 flex items-center justify-center animate-fade-up animate-delay-200">
              <div className="relative w-72 h-72 md:w-96 md:h-96">

                {/* Outer slow-spin ring */}
                <div className="absolute inset-0 rounded-full border border-cyan-500/15 animate-spin" style={{ animationDuration: '14s' }} />
                {/* Inner reverse-spin ring */}
                <div className="absolute inset-4 rounded-full border border-blue-500/10 animate-spin" style={{ animationDuration: '9s', animationDirection: 'reverse' }} />

                {/* Glow blob */}
                <div className="absolute inset-0 rounded-full blur-2xl" style={{ background: 'radial-gradient(circle, rgba(0,255,255,0.18) 0%, rgba(0,128,255,0.1) 50%, transparent 75%)' }} />

                {/* Scan line sweep */}
                <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
                  <div className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent animate-bounce" style={{ top: '45%', animationDuration: '3s' }} />
                </div>

                {/* Robot image — float + subtle scale pulse */}
                <img
                  src="/robo.png"
                  alt="AI Interview Robot"
                  className="absolute inset-0 w-full h-full object-contain animate-float"
                  style={{
                    filter: 'drop-shadow(0 0 28px rgba(0,255,255,0.35)) drop-shadow(0 0 56px rgba(0,128,255,0.2)) drop-shadow(0 8px 24px rgba(0,0,0,0.5))',
                    animationDuration: '4s',
                  }}
                />

                {/* Floating data chips */}
                <div className="absolute -top-2 -right-4 px-3 py-1.5 rounded-xl text-xs font-mono font-semibold animate-bounce" style={{ animationDuration: '2.5s', background: 'rgba(0,255,255,0.1)', border: '1px solid rgba(0,255,255,0.25)', color: '#00ffff' }}>
                  GPT-4 ✦
                </div>
                <div className="absolute -bottom-2 -left-4 px-3 py-1.5 rounded-xl text-xs font-mono font-semibold animate-bounce" style={{ animationDuration: '3.2s', animationDelay: '0.8s', background: 'rgba(0,128,255,0.1)', border: '1px solid rgba(0,128,255,0.25)', color: '#60a5fa' }}>
                  AI Ready
                </div>
                <div className="absolute top-1/2 -right-8 px-2.5 py-1 rounded-lg text-xs font-mono animate-bounce" style={{ animationDuration: '2.8s', animationDelay: '0.4s', background: 'rgba(128,0,255,0.1)', border: '1px solid rgba(128,0,255,0.25)', color: '#a78bfa' }}>
                  10k+
                </div>

                {/* Corner accent dots */}
                <div className="absolute top-6 left-6 w-2 h-2 rounded-full bg-cyan-400 animate-ping" style={{ animationDuration: '2s' }} />
                <div className="absolute bottom-10 right-8 w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping" style={{ animationDuration: '3s', animationDelay: '1s' }} />
              </div>
            </div>

          </div>
        </div>

        {/* Robot showcase */}
        <div className="max-w-2xl mx-auto mt-16 relative animate-fade-up animate-delay-300">
          <div className="card-glow p-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-0.5" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,255,255,0.6), transparent)' }} />
            <div className="flex items-center gap-3 mb-4">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-cyan-500/60" />
              </div>
              <span className="text-xs text-slate-500 font-mono">interview-ai.terminal</span>
            </div>
            <div className="font-mono text-sm space-y-2">
              <p className="text-cyan-400">$ generating questions for <span className="text-white">Software Engineer</span> role...</p>
              <p className="text-slate-500">→ Analyzing role requirements...</p>
              <p className="text-slate-500">→ Loading skill matrix: React, Node.js, System Design</p>
              <p className="text-slate-500">→ Calibrating difficulty: Senior level</p>
              <p className="text-emerald-400">✓ Generated 5 questions in 1.2s</p>
              <div className="mt-3 p-3 rounded-lg" style={{ background: 'rgba(0,255,255,0.05)', border: '1px solid rgba(0,255,255,0.1)' }}>
                <p className="text-slate-300 text-xs">Q1: <span className="text-white">Design a distributed rate limiter that can handle 1M requests/second across multiple data centers...</span></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6" style={{ background: 'rgba(0,0,0,0.3)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <AIBrain className="w-10 h-10" />
              <h2 className="text-3xl md:text-4xl font-bold text-white">Neural-powered features</h2>
            </div>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">Everything you need to dominate your next technical interview.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map(({ icon: Icon, title, desc, color, bg, border }) => (
              <div key={title} className="relative p-5 rounded-2xl group hover:-translate-y-1 transition-all duration-200 cursor-default" style={{ background: bg, border: `1px solid ${border}` }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: bg, border: `1px solid ${border}` }}>
                    <Icon className={`w-4 h-4 ${color}`} />
                  </div>
                  <h3 className="font-semibold text-white text-sm">{title}</h3>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-white mb-2">Engineers who cracked it</h2>
            <p className="text-slate-500">Real results from real engineers.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {testimonials.map(t => (
              <div key={t.name} className="card p-6">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-400 text-sm leading-relaxed mb-5">"{t.text}"</p>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-black" style={{ background: 'linear-gradient(135deg, #00ffff, #0080ff)' }}>
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">{t.name}</p>
                    <p className="text-xs text-slate-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6" style={{ background: 'rgba(0,0,0,0.3)' }}>
        <div className="max-w-2xl mx-auto text-center">
          <RobotHead className="w-20 h-20 mx-auto mb-6 animate-float" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to train with AI?</h2>
          <p className="text-slate-400 mb-8">Join thousands of engineers who landed their dream jobs.</p>
          <button onClick={() => navigate('/signup')} className="btn-primary px-10 py-3.5 text-base">
            Start Free <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 px-6" style={{ borderColor: 'rgba(0,255,255,0.08)' }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Bot className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-semibold text-slate-400">Interview<span className="text-cyan-400">AI</span></span>
          </div>
          <p className="text-xs text-slate-600">© 2026 InterviewAI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
