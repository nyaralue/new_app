import { useState, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import StarField from '../components/StarField'

const ESCAPE_LINES = [
  'Arre Bubu, No kyu dabana hai?',
  'Dukku, soch lo phirse!',
  'Ye button kaam nahi karega tumhare liye Buggu',
  '5 saal ho gaye Babu, ab No ka option nahi hai',
  'Galat button hai ye, chhod do',
  'Bubu please, No mat dabao',
  'Kitni baar try karogi Dukku?',
  'Ye button tumse darr ke bhaag raha hai',
  'Main bhaag jaunga par pyaar nahi chhodunga',
  'Haha, pakad ke dikhao!',
  'Bubu itni tez nahi ho tum',
  'Ek aur baar try karo... hehe',
]

export default function ValentineQuestion({ onYes }) {
  const [noPos, setNoPos] = useState(null)
  const [escapeIndex, setEscapeIndex] = useState(-1)
  const [yesScale, setYesScale] = useState(1)
  const containerRef = useRef(null)
  const attemptsRef = useRef(0)

  const moveNoButton = useCallback(() => {
    const container = containerRef.current
    if (!container) return

    const rect = container.getBoundingClientRect()
    const padding = 20
    const btnW = 140
    const btnH = 56

    const maxX = rect.width - btnW - padding
    const maxY = rect.height - btnH - padding
    const x = padding + Math.random() * maxX
    const y = padding + Math.random() * maxY

    setNoPos({ x, y })
    attemptsRef.current += 1
    setEscapeIndex(attemptsRef.current % ESCAPE_LINES.length)
    setYesScale(prev => Math.min(prev + 0.08, 1.6))
  }, [])

  return (
    <motion.div
      ref={containerRef}
      className="fixed inset-0 flex flex-col items-center justify-center px-6 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-rose-deep/20 via-dark to-dark-soft" />
      <StarField count={30} />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-rose-warm/8 blur-[100px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 text-center max-w-lg w-full">
        <motion.div
          className="text-6xl sm:text-7xl mb-6"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          💝
        </motion.div>

        <motion.h1
          className="font-cursive text-4xl sm:text-6xl text-rose-light mb-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Bubu...
        </motion.h1>

        <motion.h2
          className="font-cursive text-2xl sm:text-4xl text-gold-light mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          Will You Be My Valentine?
        </motion.h2>

        <motion.button
          onClick={onYes}
          className="px-12 py-5 rounded-2xl bg-gradient-to-r from-rose-warm to-rose-soft text-white text-xl font-bold tracking-wide animate-pulse-glow cursor-pointer relative z-20"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0, scale: yesScale }}
          transition={{ delay: 0.9 }}
        >
          Haan Ji! 💖
        </motion.button>
      </div>

      <motion.button
        className="absolute px-7 py-3.5 rounded-xl bg-dark-mid/90 border border-rose-warm/20 text-rose-light/70 text-base cursor-pointer z-30 select-none transition-colors hover:border-rose-warm/40"
        style={noPos ? {
          left: noPos.x,
          top: noPos.y,
        } : {
          left: '50%',
          bottom: '12%',
          transform: 'translateX(-50%)',
        }}
        animate={noPos ? {
          left: noPos.x,
          top: noPos.y,
        } : {}}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        onMouseEnter={moveNoButton}
        onTouchStart={(e) => { e.preventDefault(); moveNoButton() }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
      >
        Nahi
      </motion.button>

      <AnimatePresence mode="wait">
        {escapeIndex >= 0 && (
          <motion.div
            key={escapeIndex}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 px-6 py-3 rounded-2xl bg-dark-mid/95 border border-rose-warm/25 backdrop-blur-md shadow-lg shadow-rose-warm/10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-rose-light text-sm sm:text-base text-center">
              {ESCAPE_LINES[escapeIndex]}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
