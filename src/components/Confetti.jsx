import { useEffect, useState } from 'react'

const COLORS = ['#DC143C', '#FFD700', '#FF6B81', '#FFB3C1', '#B22222', '#FF69B4', '#FFA500']
const SHAPES = ['circle', 'square', 'heart']

function Particle({ delay, color, shape }) {
  const left = Math.random() * 100
  const duration = 2 + Math.random() * 3
  const size = 6 + Math.random() * 10
  const drift = (Math.random() - 0.5) * 200

  return (
    <div
      className="absolute top-0 pointer-events-none"
      style={{
        left: `${left}%`,
        animation: `confettiFall ${duration}s ${delay}s ease-out forwards`,
        '--drift': `${drift}px`,
      }}
    >
      {shape === 'heart' ? (
        <span style={{ fontSize: size, color }}>❤</span>
      ) : (
        <div
          style={{
            width: size,
            height: shape === 'square' ? size : size / 2,
            backgroundColor: color,
            borderRadius: shape === 'circle' ? '50%' : '2px',
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
        />
      )}
    </div>
  )
}

export default function Confetti({ count = 80 }) {
  const [particles] = useState(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      delay: Math.random() * 0.5,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
    }))
  )

  return (
    <>
      <style>{`
        @keyframes confettiFall {
          0% { transform: translateY(-10px) translateX(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) translateX(var(--drift)) rotate(720deg); opacity: 0; }
        }
      `}</style>
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-40">
        {particles.map(p => (
          <Particle key={p.id} {...p} />
        ))}
      </div>
    </>
  )
}
