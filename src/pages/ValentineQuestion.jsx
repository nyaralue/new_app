import { useState, useCallback, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ESCAPE_LINES = [
  'Arre Bubu, No kyu dabana hai? 😤',
  'Dukku, soch lo phirse! 🤨',
  'Ye button kaam nahi karega tumhare liye Buggu 😜',
  '5 saal ho gaye Babu, ab No ka option nahi hai 💪',
  'Galat button hai ye, chhod do 🚫',
  'Bubu please, No mat dabao 🥺',
  'Kitni baar try karogi Dukku? 😂',
  'Ye button tumse darr ke bhaag raha hai 🏃',
]

export default function ValentineQuestion({ onYes }) {
  const [noPos, setNoPos] = useState({ x: 0, y: 0 })
  const [escapeIndex, setEscapeIndex] = useState(-1)
  const [noSize, setNoSize] = useState(1)
  const containerRef = useRef(null)

  const moveNoButton = useCallback(() => {
    const container = containerRef.current
    if (!container) return

    const rect = container.getBoundingClientRect()
    const btnW = 120
    const btnH = 48
    const x = Math.random() * (rect.width - btnW)
    const y = Math.random() * (rect.height - btnH)

    setNoPos({ x, y })
    setEscapeIndex(prev => (prev + 1) % ESCAPE_LINES.length)
    setNoSize(prev => Math.max(prev * 0.85, 0.4))
  }, [])

  return (
    <motion.div
      ref={containerRef}
      className="min-h-screen min-h-dvh flex flex-col items-center justify-center px-6 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-rose-deep/20 via-dark to-dark-soft" />

      <div className="relative z-10 text-center max-w-lg w-full">
        <motion.div
          className="text-6xl sm:text-7xl mb-4"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          💝
        </motion.div>

        <motion.h1
          className="font-cursive text-3xl sm:text-5xl text-rose-light mb-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Bubu...
        </motion.h1>

        <motion.h2
          className="font-cursive text-2xl sm:text-4xl text-gold-light mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          Will You Be My Valentine?
        </motion.h2>

        <motion.button
          onClick={onYes}
          className="px-10 py-4 rounded-2xl bg-gradient-to-r from-rose-warm to-rose-soft text-white text-xl font-bold tracking-wide animate-pulse-glow cursor-pointer"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          Haan Ji! 💖
        </motion.button>

        <motion.button
          className="absolute px-6 py-3 rounded-xl bg-dark-soft/80 border border-rose-warm/20 text-rose-light/60 text-sm cursor-pointer transition-all duration-200"
          style={{
            left: noPos.x || '50%',
            top: noPos.y || 'auto',
            bottom: noPos.y ? 'auto' : '10%',
            transform: noPos.x ? 'none' : 'translateX(-50%)',
            scale: noSize,
          }}
          onMouseEnter={moveNoButton}
          onTouchStart={moveNoButton}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, type: 'spring', stiffness: 200 }}
        >
          Nahi 😅
        </motion.button>
      </div>

      <AnimatePresence mode="wait">
        {escapeIndex >= 0 && (
          <motion.div
            key={escapeIndex}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-20 px-6 py-3 rounded-2xl bg-dark-soft/90 border border-rose-warm/30 backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-rose-light text-sm sm:text-base text-center whitespace-nowrap">
              {ESCAPE_LINES[escapeIndex]}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
