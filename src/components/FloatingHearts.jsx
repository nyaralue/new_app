import { useEffect, useState } from 'react'

const HEART_CHARS = ['❤', '💕', '💗', '♥', '💖']

function Heart({ id, onDone }) {
  const [style] = useState(() => ({
    left: `${Math.random() * 100}%`,
    animationDuration: `${4 + Math.random() * 6}s`,
    animationDelay: `${Math.random() * 3}s`,
    fontSize: `${12 + Math.random() * 18}px`,
    opacity: 0.3 + Math.random() * 0.4,
  }))

  useEffect(() => {
    const timeout = setTimeout(onDone, 10000)
    return () => clearTimeout(timeout)
  }, [onDone])

  return (
    <span
      className="absolute bottom-0 pointer-events-none select-none"
      style={{
        ...style,
        animation: `floatUp ${style.animationDuration} ${style.animationDelay} linear forwards`,
      }}
    >
      {HEART_CHARS[id % HEART_CHARS.length]}
    </span>
  )
}

export default function FloatingHearts() {
  const [hearts, setHearts] = useState([])
  const [counter, setCounter] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter(c => c + 1)
      setHearts(prev => [...prev, { id: Date.now() + Math.random() }])
    }, 800)
    return () => clearInterval(interval)
  }, [])

  const removeHeart = (id) => {
    setHearts(prev => prev.filter(h => h.id !== id))
  }

  return (
    <>
      <style>{`
        @keyframes floatUp {
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 0.5; }
          100% { transform: translateY(-100vh) rotate(720deg); opacity: 0; }
        }
      `}</style>
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {hearts.map(h => (
          <Heart key={h.id} id={counter} onDone={() => removeHeart(h.id)} />
        ))}
      </div>
    </>
  )
}
