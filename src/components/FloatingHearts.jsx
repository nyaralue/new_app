import { useEffect, useState, useCallback } from 'react'

const HEARTS = ['❤', '💕', '💗', '♥', '💖', '🤍', '💘']

function Heart({ data, onDone }) {
  useEffect(() => {
    const timeout = setTimeout(onDone, 12000)
    return () => clearTimeout(timeout)
  }, [onDone])

  return (
    <span
      className="absolute bottom-0 pointer-events-none select-none"
      style={{
        left: `${data.left}%`,
        fontSize: `${data.size}px`,
        opacity: data.opacity,
        animation: `floatUp ${data.duration}s ${data.delay}s linear forwards`,
        filter: `blur(${data.blur}px)`,
      }}
    >
      {HEARTS[data.index % HEARTS.length]}
    </span>
  )
}

export default function FloatingHearts() {
  const [hearts, setHearts] = useState([])

  useEffect(() => {
    const interval = setInterval(() => {
      setHearts(prev => [...prev.slice(-25), {
        id: Date.now() + Math.random(),
        left: Math.random() * 100,
        size: 10 + Math.random() * 20,
        opacity: 0.15 + Math.random() * 0.35,
        duration: 6 + Math.random() * 8,
        delay: Math.random() * 0.5,
        blur: Math.random() < 0.3 ? 1 : 0,
        index: Math.floor(Math.random() * HEARTS.length),
      }])
    }, 1200)
    return () => clearInterval(interval)
  }, [])

  const removeHeart = useCallback((id) => {
    setHearts(prev => prev.filter(h => h.id !== id))
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {hearts.map(h => (
        <Heart key={h.id} data={h} onDone={() => removeHeart(h.id)} />
      ))}
    </div>
  )
}
