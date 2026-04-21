import { useNavigate } from 'react-router-dom'
import { Zap, Target, BarChart3, ArrowRight, CheckCircle2, Star, Bot, Cpu, Shield, UserCircle, Sparkles, TrendingUp } from 'lucide-react'
import { CircuitLines, HexGrid, AIBrain, RobotHead } from '../components/RoboIcon'
import { GlowCard } from '../components/ui/spotlight-card'

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
    <div className="min-h-screen text-slate-100 overflow-hidden relative" style={{ 
      background: 'linear-gradient(180deg, #0A0A1A 0%, #0F0F2A 50%, #1A0A2A 100%)',
      backgroundImage: `
        linear-gradient(rgba(0, 245, 255, 0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0, 245, 255, 0.03) 1px, transparent 1px),
        radial-gradient(ellipse at 20% 50%, rgba(0, 245, 255, 0.06) 0%, transparent 60%),
        radial-gradient(ellipse at 80% 20%, rgba(138, 43, 226, 0.05) 0%, transparent 60%),
        radial-gradient(ellipse at 60% 80%, rgba(138, 43, 226, 0.04) 0%, transparent 60%),
        linear-gradient(180deg, #0A0A1A 0%, #0F0F2A 50%, #1A0A2A 100%)
      `,
      backgroundSize: '40px 40px, 40px 40px, 100% 100%, 100% 100%, 100% 100%, 100% 100%'
    }}>
      
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b backdrop-blur-xl relative" style={{ borderColor: 'rgba(0, 245, 255, 0.1)', background: 'rgba(10, 10, 26, 0.8)' }}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #00F5FF, #0080ff)', boxShadow: '0 0 16px rgba(0,245,255,0.4)' }}>
              <Bot className="w-4 h-4 text-black" />
            </div>
            <span className="font-bold text-white tracking-tight">Interview<span style={{ color: '#00F5FF' }}>AI</span></span>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/login')} className="btn-ghost px-4 py-2 text-sm">Sign In</button>
            <button 
              onClick={() => navigate('/signup')} 
              className="btn px-4 py-2 text-sm text-black font-semibold"
              style={{
                background: 'linear-gradient(135deg, #00F5FF, #0080ff)',
                boxShadow: '0 0 12px rgba(0, 245, 255, 0.2)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 245, 255, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 0 12px rgba(0, 245, 255, 0.2)';
              }}
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-20 pb-28 px-6 overflow-hidden">
        {/* Background glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full blur-3xl pointer-events-none" style={{ background: 'radial-gradient(ellipse, rgba(0,245,255,0.06) 0%, rgba(138,43,226,0.04) 40%, transparent 70%)' }} />
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
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 animate-fade-up" style={{ background: 'rgba(0,245,255,0.08)', border: '1px solid rgba(0,245,255,0.2)' }}>
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#00F5FF' }} />
                <span className="text-sm font-medium tracking-wide" style={{ color: '#00F5FF' }}>Powered by GPT-4 Neural Engine</span>
              </div>

              {/* Headline - Bold & Oversized */}
              <h1 className="font-black leading-[1.05] tracking-tight mb-6 animate-fade-up animate-delay-100">
                <span className="block text-5xl md:text-6xl lg:text-7xl text-white mb-2">Train Smarter.</span>
                <span className="block text-5xl md:text-6xl lg:text-7xl text-white mb-2">Interview Stronger.</span>
              </h1>

              {/* Subtext */}
              <p className="text-xl md:text-2xl text-slate-300 max-w-lg mb-10 leading-relaxed animate-fade-up animate-delay-200 font-medium">
                AI-generated, role-specific interview questions that mirror what top companies actually ask.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center lg:justify-start justify-center gap-4 mb-10 animate-fade-up animate-delay-300">
                <button 
                  onClick={() => navigate('/signup')} 
                  className="btn px-10 py-4 text-lg w-full sm:w-auto text-black font-bold relative overflow-hidden group"
                  style={{
                    background: 'linear-gradient(135deg, #00F5FF, #00B8D4)',
                    boxShadow: '0 0 15px rgba(0, 245, 255, 0.25), 0 4px 12px rgba(0, 0, 0, 0.3)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 30px rgba(0, 245, 255, 0.4), 0 0 50px rgba(0, 245, 255, 0.2), 0 4px 16px rgba(0, 0, 0, 0.3)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 15px rgba(0, 245, 255, 0.25), 0 4px 12px rgba(0, 0, 0, 0.3)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  Train Now <ArrowRight className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => navigate('/login')} 
                  className="btn px-8 py-4 text-lg w-full sm:w-auto font-semibold"
                  style={{
                    background: 'rgba(0, 245, 255, 0.08)',
                    border: '1px solid rgba(0, 245, 255, 0.2)',
                    color: '#00F5FF',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(0, 245, 255, 0.15)';
                    e.currentTarget.style.borderColor = 'rgba(0, 245, 255, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(0, 245, 255, 0.08)';
                    e.currentTarget.style.borderColor = 'rgba(0, 245, 255, 0.2)';
                  }}
                >
                  Sign In
                </button>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap items-center lg:justify-start justify-center gap-6 text-sm text-slate-400 animate-fade-up animate-delay-300">
                {['Free to start', '10k+ engineers'].map(t => (
                  <span key={t} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" style={{ color: '#00F5FF' }} /> {t}
                  </span>
                ))}
              </div>
            </div>

            {/* ── Right: Robot ── */}
            <div className="flex-shrink-0 flex items-center justify-center animate-fade-up animate-delay-200">
              <div className="relative w-72 h-72 md:w-96 md:h-96">

                {/* Outer slow-spin ring */}
                <div className="absolute inset-0 rounded-full border animate-spin" style={{ borderColor: 'rgba(0,245,255,0.15)', animationDuration: '14s' }} />
                {/* Inner reverse-spin ring */}
                <div className="absolute inset-4 rounded-full border animate-spin" style={{ borderColor: 'rgba(138,43,226,0.12)', animationDuration: '9s', animationDirection: 'reverse' }} />

                {/* Glow blob */}
                <div className="absolute inset-0 rounded-full blur-2xl" style={{ background: 'radial-gradient(circle, rgba(0,245,255,0.2) 0%, rgba(138,43,226,0.12) 50%, transparent 75%)' }} />

                {/* Scan line sweep */}
                <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
                  <div className="absolute w-full h-0.5 bg-gradient-to-r from-transparent to-transparent animate-bounce" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,245,255,0.5), transparent)', top: '45%', animationDuration: '3s' }} />
                </div>

                {/* Robot image — float + subtle scale pulse */}
                <img
                  src="/robot-main.png"
                  alt="AI Interview Robot"
                  className="absolute inset-0 w-full h-full object-contain animate-float"
                  style={{
                    filter: 'drop-shadow(0 0 28px rgba(0,245,255,0.4)) drop-shadow(0 0 56px rgba(138,43,226,0.25)) drop-shadow(0 8px 24px rgba(0,0,0,0.5))',
                    animationDuration: '4s',
                  }}
                />

                {/* Floating data chips */}
                <div className="absolute -top-2 -right-4 px-3 py-1.5 rounded-xl text-xs font-mono font-semibold animate-bounce" style={{ animationDuration: '2.5s', background: 'rgba(0,245,255,0.12)', border: '1px solid rgba(0,245,255,0.3)', color: '#00F5FF' }}>
                  GPT-4 ✦
                </div>
                <div className="absolute -bottom-2 -left-4 px-3 py-1.5 rounded-xl text-xs font-mono font-semibold animate-bounce" style={{ animationDuration: '3.2s', animationDelay: '0.8s', background: 'rgba(138,43,226,0.12)', border: '1px solid rgba(138,43,226,0.3)', color: '#a78bfa' }}>
                  AI Ready
                </div>
                <div className="absolute top-1/2 -right-8 px-2.5 py-1 rounded-lg text-xs font-mono animate-bounce" style={{ animationDuration: '2.8s', animationDelay: '0.4s', background: 'rgba(0,245,255,0.1)', border: '1px solid rgba(0,245,255,0.25)', color: '#00F5FF' }}>
                  10k+
                </div>

                {/* Corner accent dots */}
                <div className="absolute top-6 left-6 w-2 h-2 rounded-full animate-ping" style={{ background: '#00F5FF', animationDuration: '2s' }} />
                <div className="absolute bottom-10 right-8 w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping" style={{ animationDuration: '3s', animationDelay: '1s' }} />
              </div>
            </div>

          </div>
        </div>

        {/* How It Works Section */}
        <div className="max-w-5xl mx-auto mt-24 relative animate-fade-up animate-delay-300">
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">How It Works</h2>
            <p className="text-slate-300 text-xl">Get started in three simple steps</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* Step 1 */}
            <GlowCard 
              glowColor="blue" 
              customSize={true}
              className="w-full h-auto"
            >
              <div className="flex flex-col items-center text-center p-8">
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-5" style={{ background: 'linear-gradient(135deg, rgba(0,245,255,0.2), rgba(0,128,255,0.15))', border: '2px solid rgba(0,245,255,0.4)' }}>
                  <UserCircle className="w-10 h-10" style={{ color: '#00F5FF' }} />
                </div>
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full font-black text-lg mb-4" style={{ background: 'rgba(0,245,255,0.2)', color: '#00F5FF' }}>
                  1
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Choose Your Role</h3>
                <p className="text-slate-300 leading-relaxed">
                  Select from 20+ engineering roles including Software Engineer, Frontend, Backend, DevOps, and more.
                </p>
              </div>
            </GlowCard>

            {/* Step 2 */}
            <GlowCard 
              glowColor="purple" 
              customSize={true}
              className="w-full h-auto"
            >
              <div className="flex flex-col items-center text-center p-8">
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-5" style={{ background: 'linear-gradient(135deg, rgba(138,43,226,0.2), rgba(147,51,234,0.15))', border: '2px solid rgba(138,43,226,0.4)' }}>
                  <Sparkles className="w-10 h-10 text-purple-400" />
                </div>
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-purple-500/20 text-purple-400 font-black text-lg mb-4">
                  2
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">AI Generates Questions</h3>
                <p className="text-slate-300 leading-relaxed">
                  Our GPT-4 powered engine creates role-specific questions tailored to your target position and skill level.
                </p>
              </div>
            </GlowCard>

            {/* Step 3 */}
            <GlowCard 
              glowColor="blue" 
              customSize={true}
              className="w-full h-auto"
            >
              <div className="flex flex-col items-center text-center p-8">
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-5" style={{ background: 'linear-gradient(135deg, rgba(0,245,255,0.2), rgba(0,200,255,0.15))', border: '2px solid rgba(0,245,255,0.4)' }}>
                  <TrendingUp className="w-10 h-10" style={{ color: '#00F5FF' }} />
                </div>
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full font-black text-lg mb-4" style={{ background: 'rgba(0,245,255,0.2)', color: '#00F5FF' }}>
                  3
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Practice & Get Feedback</h3>
                <p className="text-slate-300 leading-relaxed">
                  Practice with timed mock interviews and track your progress with detailed analytics and performance insights.
                </p>
              </div>
            </GlowCard>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6 relative" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(15,15,42,0.5) 100%)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-5">
              <AIBrain className="w-12 h-12" />
              <h2 className="text-4xl md:text-5xl font-black text-white">Premium Features</h2>
            </div>
            <p className="text-slate-300 text-xl max-w-2xl mx-auto">Everything you need to dominate your next technical interview.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map(({ icon: Icon, title, desc, color, bg, border }) => (
              <div key={title} className="relative p-6 rounded-2xl group hover:-translate-y-1 transition-all duration-300 cursor-default backdrop-blur-sm" style={{ background: bg, border: `1px solid ${border}`, boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: bg, border: `1px solid ${border}` }}>
                    <Icon className={`w-5 h-5 ${color}`} />
                  </div>
                  <h3 className="font-bold text-white text-base">{title}</h3>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-3">Engineers Who Cracked It</h2>
            <p className="text-slate-300 text-lg">Real results from real engineers.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map(t => (
              <div key={t.name} className="p-7 rounded-2xl backdrop-blur-sm" style={{ background: 'rgba(15, 15, 42, 0.6)', border: '1px solid rgba(0,245,255,0.15)', boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
                <div className="flex gap-0.5 mb-5">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-300 leading-relaxed mb-6">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-black" style={{ background: 'linear-gradient(135deg, #00F5FF, #0080ff)' }}>
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-bold text-white">{t.name}</p>
                    <p className="text-xs text-slate-400">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 relative" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(10,10,26,0.8) 100%)' }}>
        <div className="max-w-2xl mx-auto text-center">
          <RobotHead className="w-24 h-24 mx-auto mb-8 animate-float" />
          <h2 className="text-4xl md:text-5xl font-black text-white mb-5">Ready to Train with AI?</h2>
          <p className="text-slate-300 text-xl mb-10">Join thousands of engineers who landed their dream jobs.</p>
          <button 
            onClick={() => navigate('/signup')} 
            className="btn px-12 py-4 text-lg text-black font-bold"
            style={{
              background: 'linear-gradient(135deg, #00F5FF, #00B8D4)',
              boxShadow: '0 0 20px rgba(0, 245, 255, 0.3)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 0 35px rgba(0, 245, 255, 0.5), 0 0 60px rgba(0, 245, 255, 0.25)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 245, 255, 0.3)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Start Free <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-10 px-6 relative" style={{ borderColor: 'rgba(0,245,255,0.1)', background: 'rgba(10,10,26,0.9)' }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5" style={{ color: '#00F5FF' }} />
            <span className="text-sm font-bold text-slate-300">Interview<span style={{ color: '#00F5FF' }}>AI</span></span>
          </div>
          <p className="text-xs text-slate-500">© 2026 InterviewAI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
