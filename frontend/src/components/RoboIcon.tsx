// Decorative robot/AI SVG elements for the cyber theme

export function RobotHead({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Antenna */}
      <line x1="40" y1="8" x2="40" y2="18" stroke="rgba(0,255,255,0.6)" strokeWidth="2"/>
      <circle cx="40" cy="6" r="3" fill="rgba(0,255,255,0.8)" className="animate-pulse"/>
      {/* Head */}
      <rect x="16" y="18" width="48" height="38" rx="6" fill="rgba(0,20,40,0.9)" stroke="rgba(0,255,255,0.4)" strokeWidth="1.5"/>
      {/* Eyes */}
      <rect x="24" y="28" width="12" height="8" rx="2" fill="rgba(0,255,255,0.15)" stroke="rgba(0,255,255,0.6)" strokeWidth="1"/>
      <rect x="44" y="28" width="12" height="8" rx="2" fill="rgba(0,255,255,0.15)" stroke="rgba(0,255,255,0.6)" strokeWidth="1"/>
      {/* Eye glow */}
      <rect x="26" y="30" width="8" height="4" rx="1" fill="rgba(0,255,255,0.8)" className="animate-robo-blink"/>
      <rect x="46" y="30" width="8" height="4" rx="1" fill="rgba(0,255,255,0.8)" className="animate-robo-blink"/>
      {/* Mouth */}
      <rect x="26" y="42" width="28" height="6" rx="3" fill="rgba(0,255,255,0.1)" stroke="rgba(0,255,255,0.4)" strokeWidth="1"/>
      <rect x="28" y="44" width="4" height="2" rx="1" fill="rgba(0,255,255,0.6)"/>
      <rect x="34" y="44" width="4" height="2" rx="1" fill="rgba(0,255,255,0.6)"/>
      <rect x="40" y="44" width="4" height="2" rx="1" fill="rgba(0,255,255,0.6)"/>
      <rect x="46" y="44" width="4" height="2" rx="1" fill="rgba(0,255,255,0.6)"/>
      {/* Neck */}
      <rect x="32" y="56" width="16" height="6" rx="2" fill="rgba(0,20,40,0.9)" stroke="rgba(0,255,255,0.3)" strokeWidth="1"/>
      {/* Side panels */}
      <rect x="10" y="26" width="6" height="14" rx="2" fill="rgba(0,255,255,0.1)" stroke="rgba(0,255,255,0.3)" strokeWidth="1"/>
      <rect x="64" y="26" width="6" height="14" rx="2" fill="rgba(0,255,255,0.1)" stroke="rgba(0,255,255,0.3)" strokeWidth="1"/>
    </svg>
  )
}

export function CircuitLines({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 50 H40 V20 H80 V50 H120 V80 H160 V50 H200" stroke="rgba(0,255,255,0.15)" strokeWidth="1" strokeDasharray="4 4"/>
      <circle cx="40" cy="20" r="3" fill="rgba(0,255,255,0.3)"/>
      <circle cx="80" cy="50" r="3" fill="rgba(0,255,255,0.3)"/>
      <circle cx="120" cy="80" r="3" fill="rgba(0,255,255,0.3)"/>
      <circle cx="160" cy="50" r="3" fill="rgba(0,255,255,0.3)"/>
      <path d="M20 80 H60 V60 H100 V80 H140 V40 H180" stroke="rgba(0,128,255,0.1)" strokeWidth="1" strokeDasharray="2 6"/>
    </svg>
  )
}

export function HexGrid({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      {[
        [60, 20], [30, 38], [90, 38], [60, 56], [30, 74], [90, 74], [60, 92]
      ].map(([cx, cy], i) => (
        <polygon
          key={i}
          points={`${cx},${cy-14} ${cx+12},${cy-7} ${cx+12},${cy+7} ${cx},${cy+14} ${cx-12},${cy+7} ${cx-12},${cy-7}`}
          fill="rgba(0,255,255,0.03)"
          stroke="rgba(0,255,255,0.12)"
          strokeWidth="1"
        />
      ))}
    </svg>
  )
}

export function AIBrain({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="30" cy="30" r="20" fill="rgba(0,20,40,0.8)" stroke="rgba(0,255,255,0.3)" strokeWidth="1.5"/>
      <circle cx="30" cy="30" r="14" fill="none" stroke="rgba(0,255,255,0.15)" strokeWidth="1" strokeDasharray="3 3"/>
      <circle cx="30" cy="30" r="5" fill="rgba(0,255,255,0.6)" className="animate-pulse"/>
      <line x1="30" y1="10" x2="30" y2="16" stroke="rgba(0,255,255,0.4)" strokeWidth="1.5"/>
      <line x1="30" y1="44" x2="30" y2="50" stroke="rgba(0,255,255,0.4)" strokeWidth="1.5"/>
      <line x1="10" y1="30" x2="16" y2="30" stroke="rgba(0,255,255,0.4)" strokeWidth="1.5"/>
      <line x1="44" y1="30" x2="50" y2="30" stroke="rgba(0,255,255,0.4)" strokeWidth="1.5"/>
      <line x1="16" y1="16" x2="20" y2="20" stroke="rgba(0,255,255,0.3)" strokeWidth="1"/>
      <line x1="44" y1="16" x2="40" y2="20" stroke="rgba(0,255,255,0.3)" strokeWidth="1"/>
      <line x1="16" y1="44" x2="20" y2="40" stroke="rgba(0,255,255,0.3)" strokeWidth="1"/>
      <line x1="44" y1="44" x2="40" y2="40" stroke="rgba(0,255,255,0.3)" strokeWidth="1"/>
    </svg>
  )
}
