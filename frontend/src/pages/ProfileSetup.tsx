import { useState } from 'react'

const ROLES = [
  'Software Engineer', 'Frontend Developer', 'Backend Developer',
  'DevOps Engineer', 'Data Scientist', 'Data Engineer',
  'System Architect', 'Mobile Developer', 'QA Engineer',
]

const SKILLS_BY_ROLE: Record<string, string[]> = {
  'Software Engineer':  ['JavaScript', 'TypeScript', 'React', 'Node.js', 'PostgreSQL', 'System Design', 'Git'],
  'Frontend Developer': ['JavaScript', 'TypeScript', 'React', 'Vue.js', 'HTML/CSS', 'Tailwind CSS'],
  'Backend Developer':  ['Node.js', 'Python', 'Java', 'PostgreSQL', 'MySQL', 'API Design', 'Docker'],
  'DevOps Engineer':    ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Terraform', 'Python'],
  'Data Scientist':     ['Python', 'Machine Learning', 'TensorFlow', 'Pandas', 'SQL'],
  'Data Engineer':      ['Python', 'Apache Spark', 'SQL', 'PostgreSQL', 'AWS', 'Docker'],
  'System Architect':   ['System Design', 'Microservices', 'API Design', 'Caching', 'Load Balancing'],
  'Mobile Developer':   ['Swift', 'Kotlin', 'React', 'API Design'],
  'QA Engineer':        ['Unit Testing', 'Integration Testing', 'Test Automation', 'Python'],
}

export default function ProfileSetup({ onComplete }: { onComplete: () => void }) {
  const [selectedRoles, setSelectedRoles] = useState<string[]>([])
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [saved, setSaved] = useState(false)

  const availableSkills = [...new Set(selectedRoles.flatMap(r => SKILLS_BY_ROLE[r] ?? []))]
  const canSave = selectedRoles.length > 0 && selectedSkills.length > 0

  const toggleRole = (r: string) => {
    setSelectedRoles(prev => prev.includes(r) ? prev.filter(x => x !== r) : [...prev, r])
    setSelectedSkills([])
  }

  const toggleSkill = (s: string) => {
    setSelectedSkills(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])
  }

  const handleSave = () => {
    if (!canSave) return
    setSaved(true)
    setTimeout(onComplete, 700)
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Set Up Your Profile</h1>
        <p className="text-white/40 text-sm mt-1">Choose your target roles and skills for personalized questions.</p>
      </div>

      {/* Step indicator */}
      <div className="flex items-center gap-2 text-xs text-white/30">
        <span className={`w-5 h-5 rounded-full flex items-center justify-center font-medium ${selectedRoles.length > 0 ? 'bg-indigo-500 text-white' : 'bg-white/10'}`}>1</span>
        <span>Select roles</span>
        <span className="flex-1 h-px bg-white/10" />
        <span className={`w-5 h-5 rounded-full flex items-center justify-center font-medium ${selectedSkills.length > 0 ? 'bg-indigo-500 text-white' : 'bg-white/10'}`}>2</span>
        <span>Pick skills</span>
        <span className="flex-1 h-px bg-white/10" />
        <span className={`w-5 h-5 rounded-full flex items-center justify-center font-medium ${canSave ? 'bg-indigo-500 text-white' : 'bg-white/10'}`}>3</span>
        <span>Save</span>
      </div>

      {/* Roles */}
      <div className="glass p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-white text-sm">Target Roles</h2>
          {selectedRoles.length > 0 && (
            <span className="badge bg-indigo-500/20 text-indigo-400">{selectedRoles.length} selected</span>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {ROLES.map(role => (
            <button
              key={role}
              onClick={() => toggleRole(role)}
              className={selectedRoles.includes(role) ? 'chip chip-active' : 'chip chip-default'}
            >
              {selectedRoles.includes(role) && <span className="mr-1">✓</span>}
              {role}
            </button>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div className="glass p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-white text-sm">Skills to Focus On</h2>
          {selectedSkills.length > 0 && (
            <span className="badge bg-emerald-500/20 text-emerald-400">{selectedSkills.length} selected</span>
          )}
        </div>
        {availableSkills.length === 0 ? (
          <p className="text-white/25 text-sm italic">Select a role above to see relevant skills.</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {availableSkills.map(skill => (
              <button
                key={skill}
                onClick={() => toggleSkill(skill)}
                className={selectedSkills.includes(skill) ? 'chip chip-green' : 'chip chip-default'}
              >
                {selectedSkills.includes(skill) && <span className="mr-1">✓</span>}
                {skill}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center gap-4">
        <button onClick={handleSave} disabled={!canSave || saved} className="btn-primary px-8 py-2.5">
          {saved ? '✓ Saved!' : 'Save & Continue →'}
        </button>
        {!canSave && <p className="text-xs text-white/30">Select at least one role and one skill.</p>}
      </div>
    </div>
  )
}
