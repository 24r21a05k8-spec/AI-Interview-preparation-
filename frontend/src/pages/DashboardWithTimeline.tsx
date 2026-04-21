import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sparkles, PlayCircle, TrendingUp, ArrowRight, Flame, Bot, Trophy, Target, Brain, Activity, Code, User, Clock, X, Zap } from 'lucide-react'
import RadialOrbitalTimeline from '../components/ui/radial-orbital-timeline'

// Progress Ring Component with neon green
const ProgressRing = ({ progress, size = 120, strokeWidth = 8, color = '#00FF88', label }: { progress: number; size?: number; strokeWidth?: number; color?: string; label?: string }) => {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (progress / 100) * circumference

  return (
    <div className="relative flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          <circle cx={size / 2} cy={size / 2} r={radius} stroke="rgba(42, 42, 58, 0.5)" strokeWidth={strokeWidth} fill="none" />
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
            style={{ transition: 'stroke-dashoffset 0.5s ease', filter: `drop-shadow(0 0 6px ${color}60)` }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-black" style={{ color }}>{progress}%</span>
        </div>
      </div>
      {label && <p className="text-sm font-medium text-white mt-3">{label}</p>}
    </div>
  )
}

// Skill Bar Component
const SkillBar = ({ name, level, color }: { name: string; level: number; color: string }) => (
  <div className="space-y-2">
    <div className="flex items-center justify-between">
      <span className="text-sm font-medium text-white">{name}</span>
      <span className="text-sm font-mono font-bold" style={{ color }}>{level}%</span>
    </div>
    <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(42, 42, 58, 0.5)' }}>
      <div 
        className="h-full rounded-full transition-all duration-700"
        style={{ 
          width: `${level}%`, 
          background: color,
          boxShadow: `0 0 8px ${color}60`
        }}
      />
    </div>
  </div>
)

// Timeline data
const learningJourneyData = [
  {
    id: 1,
    title: "Profile Setup",
    date: "Week 1",
    content: "Completed profile setup and selected target roles: Software Engineer, Frontend Developer.",
    category: "Setup",
    icon: User,
    relatedIds: [2],
    status: "completed" as const,
    energy: 100,
  },
  {
    id: 2,
    title: "First Practice",
    date: "Week 1",
    content: "Started with React fundamentals. Practiced 15 questions on hooks and state management.",
    category: "Practice",
    icon: Code,
    relatedIds: [1, 3],
    status: "completed" as const,
    energy: 90,
  },
  {
    id: 3,
    title: "System Design",
    date: "Week 2",
    content: "Dove into system design patterns. Completed URL shortener and cache design problems.",
    category: "Learning",
    icon: Brain,
    relatedIds: [2, 4],
    status: "completed" as const,
    energy: 85,
  },
  {
    id: 4,
    title: "Mock Interview",
    date: "Week 3",
    content: "First timed mock interview. 8 questions in 60 minutes. Score: 78%",
    category: "Assessment",
    icon: PlayCircle,
    relatedIds: [3, 5],
    status: "in-progress" as const,
    energy: 70,
  },
  {
    id: 5,
    title: "Advanced Topics",
    date: "Week 4",
    content: "Working on distributed systems, microservices, and scalability patterns.",
    category: "Advanced",
    icon: Brain,
    relatedIds: [4, 6],
    status: "in-progress" as const,
    energy: 60,
  },
  {
    id: 6,
    title: "Interview Ready",
    date: "Week 5",
    content: "Final preparation phase. Ready for real interviews at top tech companies.",
    category: "Goal",
    icon: Trophy,
    relatedIds: [5],
    status: "pending" as const,
    energy: 40,
  },
]

export default function DashboardWithTimeline() {
  const navigate = useNavigate()
  const [showTimeline, setShowTimeline] = useState(false)
  const userName = 'John'

  return (
    <>
      <div className="min-h-screen space-y-6 animate-fade-up">
        
        {/* Header Section */}
        <div className="card-glow p-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: '#00FF88', boxShadow: '0 0 16px rgba(0, 255, 136, 0.4)' }}>
                  <Bot className="w-5 h-5 text-black" />
                </div>
                <h1 className="text-3xl font-black text-white">
                  Good morning, {userName} <span className="text-[#00FF88]">_</span>
                </h1>
              </div>
              <p className="text-[#8888AA] text-sm font-mono mb-3">
                // AI engine active · Neural network ready · 84 questions loaded
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg" style={{ background: 'rgba(0, 255, 136, 0.1)', border: '1px solid rgba(0, 255, 136, 0.2)' }}>
                  <Flame className="w-4 h-4 text-[#00FF88]" />
                  <span className="text-sm font-bold text-[#00FF88]">7 day streak</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg" style={{ background: 'rgba(168, 85, 247, 0.1)', border: '1px solid rgba(168, 85, 247, 0.2)' }}>
                  <Trophy className="w-4 h-4 text-[#A855F7]" />
                  <span className="text-sm font-bold text-[#A855F7]">Level 12</span>
                </div>
                <button 
                  onClick={() => setShowTimeline(true)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all hover:scale-105" 
                  style={{ background: 'rgba(0, 212, 255, 0.1)', border: '1px solid rgba(0, 212, 255, 0.2)' }}
                >
                  <Clock className="w-4 h-4 text-[#00D4FF]" />
                  <span className="text-sm font-bold text-[#00D4FF]">View Journey</span>
                </button>
              </div>
            </div>
            <button 
              onClick={() => navigate('/app/generate')} 
              className="btn-primary px-6 py-3 text-sm font-bold whitespace-nowrap"
            >
              <Sparkles className="w-4 h-4" /> Generate Questions
            </button>
          </div>
        </div>

        {/* Main Grid Layout */}
        <div className="grid lg:grid-cols-3 gap-6">
          
          {/* Left Column - Progress & Skills */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Your Progress */}
            <div className="card p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-black text-white flex items-center gap-2">
                  <Activity className="w-5 h-5 text-[#00FF88]" />
                  Your Progress
                </h2>
                <button className="text-sm font-mono text-[#00FF88] hover:text-[#40FFa8] transition-colors">
                  view_details()
                </button>
              </div>
              
              <div className="grid grid-cols-3 gap-6">
                <ProgressRing progress={78} size={110} strokeWidth={8} color="#00FF88" label="Overall Score" />
                <ProgressRing progress={85} size={110} strokeWidth={8} color="#A855F7" label="Completion Rate" />
                <ProgressRing progress={68} size={110} strokeWidth={8} color="#00FF88" label="Level Progress" />
              </div>
              
              <div className="mt-4 text-center">
                <p className="text-sm text-[#8888AA] font-mono">+5% this week · 680/1000 XP</p>
              </div>
            </div>

            {/* Skill Mastery */}
            <div className="card p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-black text-white flex items-center gap-2">
                  <Brain className="w-5 h-5 text-[#00FF88]" />
                  Skill Mastery
                </h2>
                <button className="text-sm font-mono text-[#00FF88] hover:text-[#40FFa8] transition-colors">
                  analyze()
                </button>
              </div>
              
              <div className="space-y-4">
                <SkillBar name="React" level={85} color="#00FF88" />
                <SkillBar name="System Design" level={62} color="#A855F7" />
                <SkillBar name="Algorithms" level={78} color="#00FF88" />
                <SkillBar name="Node.js" level={90} color="#00FF88" />
              </div>
            </div>

            {/* Continue Practice */}
            <div className="card p-6">
              <div className="flex items-center gap-2 mb-6">
                <Target className="w-5 h-5 text-[#00FF88]" />
                <h2 className="text-xl font-black text-white">Continue Practice</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <button 
                  onClick={() => navigate('/app/generate')} 
                  className="card-glow p-5 text-left group"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ 
                      background: 'rgba(0, 255, 136, 0.2)',
                      border: '1px solid rgba(0, 255, 136, 0.3)'
                    }}>
                      <Sparkles className="w-6 h-6 text-[#00FF88]" />
                    </div>
                    <div>
                      <p className="font-bold text-white">System Design</p>
                      <p className="text-xs text-[#8888AA] font-mono">// Recommended</p>
                    </div>
                  </div>
                  <p className="text-sm text-[#8888AA] mb-3">
                    AI suggests focusing on distributed systems and scalability patterns based on your recent performance.
                  </p>
                  <span className="text-sm font-medium text-[#00FF88] flex items-center gap-2 font-mono group-hover:gap-3 transition-all">
                    → start_session() <ArrowRight className="w-4 h-4" />
                  </span>
                </button>

                <button 
                  onClick={() => navigate('/app/interview')} 
                  className="card-glow p-5 text-left group"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ 
                      background: 'rgba(168, 85, 247, 0.2)',
                      border: '1px solid rgba(168, 85, 247, 0.3)'
                    }}>
                      <PlayCircle className="w-6 h-6 text-[#A855F7]" />
                    </div>
                    <div>
                      <p className="font-bold text-white">Mock Interview</p>
                      <p className="text-xs text-[#8888AA] font-mono">// Timed mode</p>
                    </div>
                  </div>
                  <p className="text-sm text-[#8888AA] mb-3">
                    Simulate real interview conditions with a timed, one-question-at-a-time format. Track your performance live.
                  </p>
                  <span className="text-sm font-medium text-[#A855F7] flex items-center gap-2 font-mono group-hover:gap-3 transition-all">
                    → start_interview() <ArrowRight className="w-4 h-4" />
                  </span>
                </button>
              </div>
            </div>

            {/* Performance Trend */}
            <div className="card p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-black text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-[#00FF88]" />
                  Performance Trend
                </h2>
                <div className="flex items-center gap-2">
                  <button className="text-xs px-3 py-1.5 rounded-lg font-mono font-bold" style={{ background: 'rgba(0, 255, 136, 0.1)', color: '#00FF88' }}>7D</button>
                  <button className="text-xs px-3 py-1.5 rounded-lg font-mono text-[#8888AA] hover:text-[#00FF88] transition-colors">30D</button>
                  <button className="text-xs px-3 py-1.5 rounded-lg font-mono text-[#8888AA] hover:text-[#00FF88] transition-colors">ALL</button>
                </div>
              </div>
              
              <div className="relative h-48 flex items-end justify-between gap-2">
                {[45, 52, 48, 65, 70, 68, 78].map((height, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2">
                    <div 
                      className="w-full rounded-t-lg transition-all duration-500 hover:opacity-80 cursor-pointer"
                      style={{ 
                        height: `${height}%`,
                        background: '#00FF88',
                        boxShadow: '0 0 12px rgba(0, 255, 136, 0.3)'
                      }}
                    />
                    <span className="text-xs text-[#8888AA] font-mono">D{i+1}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - AI Assistant & Activity */}
          <div className="space-y-6">
            
            {/* AI Assistant */}
            <div className="card p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{
                  background: '#00FF88',
                  boxShadow: '0 0 16px rgba(0, 255, 136, 0.4)'
                }}>
                  <Bot className="w-5 h-5 text-black" />
                </div>
                <div>
                  <h2 className="text-lg font-black text-white">AI Assistant</h2>
                  <p className="text-xs text-[#8888AA] font-mono">// Real-time feedback</p>
                </div>
              </div>

              <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(0, 255, 136, 0.2)' }}>
                    <Bot className="w-4 h-4 text-[#00FF88]" />
                  </div>
                  <div className="flex-1 p-3 rounded-xl" style={{ background: 'rgba(0, 255, 136, 0.06)', border: '1px solid rgba(0, 255, 136, 0.1)' }}>
                    <p className="text-sm text-white">Great progress today! You've improved your system design score by 8%. Focus on distributed caching next.</p>
                    <span className="text-xs text-[#8888AA] font-mono mt-2 block">2 min ago</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(0, 255, 136, 0.2)' }}>
                    <Bot className="w-4 h-4 text-[#00FF88]" />
                  </div>
                  <div className="flex-1 p-3 rounded-xl" style={{ background: 'rgba(0, 255, 136, 0.06)', border: '1px solid rgba(0, 255, 136, 0.1)' }}>
                    <p className="text-sm text-white">💡 Tip: Companies like Meta often ask about CAP theorem. Want to practice?</p>
                    <span className="text-xs text-[#8888AA] font-mono mt-2 block">15 min ago</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(255, 160, 0, 0.2)' }}>
                    <Zap className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="flex-1 p-3 rounded-xl" style={{ background: 'rgba(255, 160, 0, 0.06)', border: '1px solid rgba(255, 160, 0, 0.1)' }}>
                    <p className="text-sm text-white">🔥 You're on a 7-day streak! Keep it up to unlock the "Consistent Learner" badge.</p>
                    <span className="text-xs text-[#8888AA] font-mono mt-2 block">1 hour ago</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Ask AI anything..." 
                  className="input flex-1 text-sm"
                />
                <button className="w-10 h-10 rounded-xl flex items-center justify-center" style={{
                  background: '#00FF88',
                  boxShadow: '0 0 12px rgba(0, 255, 136, 0.3)'
                }}>
                  <Bot className="w-4 h-4 text-black" />
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="card p-6">
              <h2 className="text-lg font-black text-white mb-6">Recent Activity</h2>

              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 rounded-xl" style={{ background: 'rgba(0, 255, 136, 0.04)', border: '1px solid rgba(0, 255, 136, 0.1)' }}>
                  <div className="w-2 h-2 rounded-full mt-2" style={{ background: '#00FF88', boxShadow: '0 0 8px rgba(0, 255, 136, 0.6)' }} />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">Completed React session</p>
                    <p className="text-xs text-[#8888AA] font-mono mt-1">8 questions · 78% score · Today 2:30 PM</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl" style={{ background: 'rgba(168, 85, 247, 0.04)', border: '1px solid rgba(168, 85, 247, 0.1)' }}>
                  <div className="w-2 h-2 rounded-full bg-[#A855F7] mt-2" style={{ boxShadow: '0 0 8px rgba(168, 85, 247, 0.6)' }} />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">Unlocked achievement</p>
                    <p className="text-xs text-[#8888AA] font-mono mt-1">🏆 "Quick Learner" · Yesterday</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl" style={{ background: 'rgba(0, 255, 136, 0.04)', border: '1px solid rgba(0, 255, 136, 0.1)' }}>
                  <div className="w-2 h-2 rounded-full bg-[#00FF88] mt-2" style={{ boxShadow: '0 0 8px rgba(0, 255, 136, 0.6)' }} />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">Mock interview passed</p>
                    <p className="text-xs text-[#8888AA] font-mono mt-1">Node.js · 85% score · Mar 26</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="card p-5">
                <p className="text-3xl font-black text-[#00FF88] mb-1">84</p>
                <p className="text-xs text-[#8888AA]">Questions Practiced</p>
              </div>
              <div className="card p-5">
                <p className="text-3xl font-black text-[#A855F7] mb-1">12</p>
                <p className="text-xs text-[#8888AA]">Sessions Completed</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Modal */}
      {showTimeline && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-sm" onClick={() => setShowTimeline(false)} />
          <div className="relative w-full h-full">
            <button 
              onClick={() => setShowTimeline(false)}
              className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
              style={{ background: 'rgba(0, 255, 136, 0.2)', border: '1px solid rgba(0, 255, 136, 0.4)' }}
            >
              <X className="w-5 h-5 text-[#00FF88]" />
            </button>
            <div className="absolute top-4 left-4 z-50">
              <h2 className="text-2xl font-black text-white mb-1">Your Learning Journey</h2>
              <p className="text-sm text-[#8888AA] font-mono">// Interactive timeline visualization</p>
            </div>
            <RadialOrbitalTimeline timelineData={learningJourneyData} />
          </div>
        </div>
      )}
    </>
  )
}
