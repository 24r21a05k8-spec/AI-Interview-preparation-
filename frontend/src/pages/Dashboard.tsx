import { useNavigate } from 'react-router-dom'
import { Sparkles, PlayCircle, TrendingUp, ArrowRight, Flame, Bot, Zap, Trophy, Target, Brain, MessageSquare, Send, Award, Calendar, Activity } from 'lucide-react'
import { AIBrain, HexGrid } from '../components/RoboIcon'

// Progress Ring Component
const ProgressRing = ({ progress, size = 120, strokeWidth = 8, color = '#00F5FF' }: { progress: number; size?: number; strokeWidth?: number; color?: string }) => {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (progress / 100) * circumference

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="rgba(0,245,255,0.1)" strokeWidth={strokeWidth} fill="none" />
        <circle 
          cx={size / 2} 
          cy={size / 2} 
          r={radius} 
          stroke={color} 
          strokeWidth={strokeWidth} 
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.5s ease', filter: `drop-shadow(0 0 6px ${color}40)` }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-black" style={{ color }}>{progress}%</span>
        <span className="text-xs text-slate-500 font-mono">complete</span>
      </div>
    </div>
  )
}

// Skill Heatmap Component
const SkillHeatmap = () => {
  const skills = [
    { name: 'React', level: 85, color: '#00F5FF' },
    { name: 'System Design', level: 62, color: '#a78bfa' },
    { name: 'Algorithms', level: 78, color: '#00F5FF' },
    { name: 'Node.js', level: 90, color: '#10b981' },
    { name: 'TypeScript', level: 88, color: '#00F5FF' },
    { name: 'PostgreSQL', level: 70, color: '#a78bfa' },
  ]

  return (
    <div className="space-y-3">
      {skills.map((skill) => (
        <div key={skill.name}>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-sm font-medium text-slate-300">{skill.name}</span>
            <span className="text-xs font-mono font-bold" style={{ color: skill.color }}>{skill.level}%</span>
          </div>
          <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(0,245,255,0.08)' }}>
            <div 
              className="h-full rounded-full transition-all duration-700"
              style={{ 
                width: `${skill.level}%`, 
                background: `linear-gradient(90deg, ${skill.color}, ${skill.color}80)`,
                boxShadow: `0 0 8px ${skill.color}40`
              }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

export default function Dashboard() {
  const navigate = useNavigate()
  const userName = 'John'
  
  const currentStreak = 7
  const level = 12
  const xpProgress = 68

  return (
    <div className="min-h-screen space-y-4 animate-fade-up" style={{
      background: 'linear-gradient(180deg, #0A0A1A 0%, #0F0F2A 50%, #1A0A2A 100%)',
      backgroundImage: `
        linear-gradient(rgba(0, 245, 255, 0.02) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0, 245, 255, 0.02) 1px, transparent 1px),
        radial-gradient(ellipse at 20% 50%, rgba(0, 245, 255, 0.04) 0%, transparent 60%),
        radial-gradient(ellipse at 80% 20%, rgba(138, 43, 226, 0.03) 0%, transparent 60%)
      `,
      backgroundSize: '40px 40px, 40px 40px, 100% 100%, 100% 100%'
    }}>
      
      {/* Dynamic Greeting Header */}
      <div className="relative p-5 rounded-2xl overflow-hidden" style={{ 
        background: 'linear-gradient(135deg, rgba(0,245,255,0.08) 0%, rgba(138,43,226,0.08) 100%)',
        border: '1px solid rgba(0,245,255,0.2)',
        boxShadow: '0 0 30px rgba(0,245,255,0.1)'
      }}>
        <div className="absolute top-0 right-0 opacity-5 pointer-events-none">
          <HexGrid className="w-48 h-48" />
        </div>
        <div className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <AIBrain className="w-14 h-14" />
              <div className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full animate-pulse border-2 border-[#0A0A1A]" style={{ background: '#00F5FF' }} />
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-black text-white mb-1">
                Good morning, {userName} <span style={{ color: '#00F5FF' }}>_</span>
              </h1>
              <p className="text-slate-400 text-xs lg:text-sm font-mono mb-2">
                // AI engine active · Neural network ready · 84 questions loaded
              </p>
              <div className="flex flex-wrap items-center gap-2 lg:gap-3 mt-2">
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg" style={{ background: 'rgba(0,245,255,0.1)', border: '1px solid rgba(0,245,255,0.2)' }}>
                  <Flame className="w-3.5 h-3.5" style={{ color: '#00F5FF' }} />
                  <span className="text-xs font-bold" style={{ color: '#00F5FF' }}>{currentStreak} day streak</span>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg" style={{ background: 'rgba(138,43,226,0.1)', border: '1px solid rgba(138,43,226,0.2)' }}>
                  <Trophy className="w-3.5 h-3.5 text-purple-400" />
                  <span className="text-xs font-bold text-purple-400">Level {level}</span>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg" style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)' }}>
                  <Award className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-xs font-bold text-emerald-400">3 achievements</span>
                </div>
              </div>
            </div>
          </div>
          <button onClick={() => navigate('/app/generate')} className="btn px-5 py-2.5 text-sm font-bold text-black whitespace-nowrap" style={{
            background: 'linear-gradient(135deg, #00F5FF, #0080ff)',
            boxShadow: '0 0 20px rgba(0,245,255,0.3)'
          }}>
            <Sparkles className="w-4 h-4" /> Generate Questions
          </button>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid lg:grid-cols-3 gap-4">
        
        {/* Left Column - Progress & Skills */}
        <div className="lg:col-span-2 space-y-4">
          
          {/* Progress Tracker */}
          <div className="card p-5">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-black text-white flex items-center gap-2">
                <Activity className="w-5 h-5" style={{ color: '#00F5FF' }} />
                Your Progress
              </h2>
              <button className="text-xs font-mono" style={{ color: '#00F5FF' }}>view_details()</button>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center">
                <ProgressRing progress={78} size={100} strokeWidth={7} color="#00F5FF" />
                <p className="text-sm font-semibold text-slate-300 mt-2">Overall Score</p>
                <p className="text-xs text-slate-500 font-mono">+5% this week</p>
              </div>
              <div className="flex flex-col items-center">
                <ProgressRing progress={85} size={100} strokeWidth={7} color="#a78bfa" />
                <p className="text-sm font-semibold text-slate-300 mt-2">Completion Rate</p>
                <p className="text-xs text-slate-500 font-mono">12/14 sessions</p>
              </div>
              <div className="flex flex-col items-center">
                <ProgressRing progress={xpProgress} size={100} strokeWidth={7} color="#10b981" />
                <p className="text-sm font-semibold text-slate-300 mt-2">Level Progress</p>
                <p className="text-xs text-slate-500 font-mono">680/1000 XP</p>
              </div>
            </div>
          </div>

          {/* Skill Heatmap */}
          <div className="card p-5">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-black text-white flex items-center gap-2">
                <Brain className="w-5 h-5" style={{ color: '#00F5FF' }} />
                Skill Mastery
              </h2>
              <button className="text-xs font-mono" style={{ color: '#00F5FF' }}>analyze()</button>
            </div>
            <SkillHeatmap />
          </div>

          {/* Continue Practice Section */}
          <div className="card p-5">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-black text-white flex items-center gap-2">
                <Target className="w-5 h-5" style={{ color: '#00F5FF' }} />
                Continue Practice
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-3">
              <button onClick={() => navigate('/app/generate')} className="p-4 rounded-xl text-left group hover:-translate-y-1 transition-all duration-200" style={{
                background: 'rgba(0,245,255,0.06)',
                border: '1px solid rgba(0,245,255,0.2)'
              }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ 
                    background: 'linear-gradient(135deg, rgba(0,245,255,0.2), rgba(0,128,255,0.15))',
                    border: '1px solid rgba(0,245,255,0.3)'
                  }}>
                    <Sparkles className="w-5 h-5" style={{ color: '#00F5FF' }} />
                  </div>
                  <div>
                    <p className="font-bold text-white text-sm">System Design</p>
                    <p className="text-xs text-slate-500 font-mono">// Recommended</p>
                  </div>
                </div>
                <p className="text-sm text-slate-400 mb-2">AI suggests focusing on distributed systems and scalability patterns based on your recent performance.</p>
                <span className="text-xs font-medium flex items-center gap-1 group-hover:gap-2 transition-all font-mono" style={{ color: '#00F5FF' }}>
                  → start_session() <ArrowRight className="w-3 h-3" />
                </span>
              </button>

              <button onClick={() => navigate('/app/interview')} className="p-4 rounded-xl text-left group hover:-translate-y-1 transition-all duration-200" style={{
                background: 'rgba(138,43,226,0.06)',
                border: '1px solid rgba(138,43,226,0.2)'
              }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ 
                    background: 'linear-gradient(135deg, rgba(138,43,226,0.2), rgba(147,51,234,0.15))',
                    border: '1px solid rgba(138,43,226,0.3)'
                  }}>
                    <PlayCircle className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <p className="font-bold text-white text-sm">Mock Interview</p>
                    <p className="text-xs text-slate-500 font-mono">// Timed mode</p>
                  </div>
                </div>
                <p className="text-sm text-slate-400 mb-2">Simulate real interview conditions with a timed, one-question-at-a-time format. Track your performance live.</p>
                <span className="text-xs text-purple-400 font-medium flex items-center gap-1 group-hover:gap-2 transition-all font-mono">
                  → start_interview() <ArrowRight className="w-3 h-3" />
                </span>
              </button>
            </div>
          </div>

          {/* Performance Graph Placeholder */}
          <div className="card p-5">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-black text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5" style={{ color: '#00F5FF' }} />
                Performance Trend
              </h2>
              <div className="flex items-center gap-2">
                <button className="text-xs px-2.5 py-1 rounded-lg font-mono" style={{ background: 'rgba(0,245,255,0.1)', color: '#00F5FF' }}>7D</button>
                <button className="text-xs px-2.5 py-1 rounded-lg font-mono text-slate-500">30D</button>
                <button className="text-xs px-2.5 py-1 rounded-lg font-mono text-slate-500">ALL</button>
              </div>
            </div>

            
            {/* Simple visual graph representation */}
            <div className="relative h-40 flex items-end justify-between gap-1.5">
              {[45, 52, 48, 65, 70, 68, 78].map((height, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                  <div 
                    className="w-full rounded-t-lg transition-all duration-500 hover:opacity-80 cursor-pointer"
                    style={{ 
                      height: `${height}%`,
                      background: `linear-gradient(180deg, #00F5FF, rgba(0,245,255,0.3))`,
                      boxShadow: '0 0 12px rgba(0,245,255,0.3)'
                    }}
                  />
                  <span className="text-xs text-slate-500 font-mono">D{i+1}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - AI Assistant & Activity */}
        <div className="space-y-4">
          
          {/* AI Assistant Panel */}
          <div className="card p-5">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{
                background: 'linear-gradient(135deg, #00F5FF, #0080ff)',
                boxShadow: '0 0 16px rgba(0,245,255,0.4)'
              }}>
                <Bot className="w-4 h-4 text-black" />
              </div>
              <div>
                <h2 className="text-base font-black text-white">AI Assistant</h2>
                <p className="text-xs text-slate-500 font-mono">// Real-time feedback</p>
              </div>
            </div>

            {/* Chat-style interface */}
            <div className="space-y-2.5 mb-4 max-h-56 overflow-y-auto">
              <div className="flex gap-2.5">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(0,245,255,0.2)' }}>
                  <Bot className="w-3.5 h-3.5" style={{ color: '#00F5FF' }} />
                </div>
                <div className="flex-1 p-2.5 rounded-xl" style={{ background: 'rgba(0,245,255,0.06)', border: '1px solid rgba(0,245,255,0.1)' }}>
                  <p className="text-xs text-slate-300">Great progress today! You've improved your system design score by 8%. Focus on distributed caching next.</p>
                  <span className="text-xs text-slate-500 font-mono mt-1 block">2 min ago</span>
                </div>
              </div>

              <div className="flex gap-2.5">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(0,245,255,0.2)' }}>
                  <Bot className="w-3.5 h-3.5" style={{ color: '#00F5FF' }} />
                </div>
                <div className="flex-1 p-2.5 rounded-xl" style={{ background: 'rgba(0,245,255,0.06)', border: '1px solid rgba(0,245,255,0.1)' }}>
                  <p className="text-xs text-slate-300">💡 Tip: Companies like Meta often ask about CAP theorem. Want to practice?</p>
                  <span className="text-xs text-slate-500 font-mono mt-1 block">15 min ago</span>
                </div>
              </div>

              <div className="flex gap-2.5">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(0,245,255,0.2)' }}>
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                </div>
                <div className="flex-1 p-2.5 rounded-xl" style={{ background: 'rgba(255,160,0,0.06)', border: '1px solid rgba(255,160,0,0.1)' }}>
                  <p className="text-xs text-slate-300">🔥 You're on a 7-day streak! Keep it up to unlock the "Consistent Learner" badge.</p>
                  <span className="text-xs text-slate-500 font-mono mt-1 block">1 hour ago</span>
                </div>
              </div>
            </div>

            {/* Input */}
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="Ask AI anything..." 
                className="flex-1 px-3 py-2 rounded-xl text-sm focus:outline-none"
                style={{
                  background: 'rgba(0,245,255,0.04)',
                  border: '1px solid rgba(0,245,255,0.15)',
                  color: '#fff'
                }}
              />
              <button className="w-9 h-9 rounded-xl flex items-center justify-center" style={{
                background: 'linear-gradient(135deg, #00F5FF, #0080ff)',
                boxShadow: '0 0 12px rgba(0,245,255,0.3)'
              }}>
                <Send className="w-3.5 h-3.5 text-black" />
              </button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="card p-5">
            <div className="flex items-center gap-2 mb-5">
              <Calendar className="w-4 h-4" style={{ color: '#00F5FF' }} />
              <h2 className="text-base font-black text-white">Recent Activity</h2>
            </div>

            <div className="space-y-2.5">
              <div className="flex items-start gap-2.5 p-2.5 rounded-xl" style={{ background: 'rgba(0,245,255,0.04)', border: '1px solid rgba(0,245,255,0.1)' }}>
                <div className="w-2 h-2 rounded-full mt-1.5" style={{ background: '#00F5FF', boxShadow: '0 0 8px rgba(0,245,255,0.6)' }} />
                <div className="flex-1">
                  <p className="text-xs font-medium text-slate-300">Completed React session</p>
                  <p className="text-xs text-slate-500 font-mono mt-0.5">8 questions · 78% score · Today 2:30 PM</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-2.5 rounded-xl" style={{ background: 'rgba(138,43,226,0.04)', border: '1px solid rgba(138,43,226,0.1)' }}>
                <div className="w-2 h-2 rounded-full bg-purple-400 mt-1.5" style={{ boxShadow: '0 0 8px rgba(138,43,226,0.6)' }} />
                <div className="flex-1">
                  <p className="text-xs font-medium text-slate-300">Unlocked achievement</p>
                  <p className="text-xs text-slate-500 font-mono mt-0.5">🏆 "Quick Learner" · Yesterday</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-2.5 rounded-xl" style={{ background: 'rgba(16,185,129,0.04)', border: '1px solid rgba(16,185,129,0.1)' }}>
                <div className="w-2 h-2 rounded-full bg-emerald-400 mt-1.5" style={{ boxShadow: '0 0 8px rgba(16,185,129,0.6)' }} />
                <div className="flex-1">
                  <p className="text-xs font-medium text-slate-300">Mock interview passed</p>
                  <p className="text-xs text-slate-500 font-mono mt-0.5">Node.js · 85% score · Mar 26</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 rounded-xl" style={{ background: 'rgba(0,245,255,0.06)', border: '1px solid rgba(0,245,255,0.2)' }}>
              <p className="text-2xl font-black mb-1" style={{ color: '#00F5FF' }}>84</p>
              <p className="text-xs text-slate-400">Questions Practiced</p>
            </div>
            <div className="p-4 rounded-xl" style={{ background: 'rgba(138,43,226,0.06)', border: '1px solid rgba(138,43,226,0.2)' }}>
              <p className="text-2xl font-black text-purple-400 mb-1">12</p>
              <p className="text-xs text-slate-400">Sessions Completed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
