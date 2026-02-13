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
    const padding = 30
    const btnW = 160
    const btnH = 60

    const maxX = rect.width - btnW - padding
    const maxY = rect.height - btnH - padding
    const x = padding + Math.random() * Math.max(maxX, 50)
    const y = padding + Math.random() * Math.max(maxY, 50)

    setNoPos({ x, y })
    attemptsRef.current += 1
    setEscapeIndex(attemptsRef.current % ESCAPE_LINES.length)
    setYesScale(prev => Math.min(prev + 0.1, 1.8))
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
      <div className="absolute inset-0 bg-gradient-to-b from-rose-deep/30 via-dark to-dark-soft" />
      <StarField count={40} />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full blur-[120px]"
          style={{ background: 'radial-gradient(circle, rgba(220,20,60,0.15), transparent 70%)' }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 text-center max-w-lg w-full">
        <motion.div
          className="text-7xl sm:text-8xl mb-8"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          💝
        </motion.div>

        <motion.h1
          className="font-cursive text-5xl sm:text-7xl text-white mb-4 drop-shadow-lg"
          style={{ textShadow: '0 0 30px rgba(255,107,129,0.5), 0 2px 4px rgba(0,0,0,0.5)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Bubu...
        </motion.h1>

        <motion.h2
          className="font-cursive text-3xl sm:text-5xl text-gold-light mb-14"
          style={{ textShadow: '0 0 20px rgba(255,215,0,0.4), 0 2px 4px rgba(0,0,0,0.5)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          Will You Be My Valentine?
        </motion.h2>

        <motion.button
          onClick={onYes}
          className="px-16 py-6 rounded-3xl text-white text-2xl sm:text-3xl font-bold tracking-wide cursor-pointer relative z-20 border-2 border-white/20"
          style={{
            background: 'linear-gradient(135deg, #DC143C 0%, #FF6B81 50%, #DC143C 100%)',
            boxShadow: '0 0 40px rgba(220,20,60,0.5), 0 0 80px rgba(220,20,60,0.2), inset 0 1px 0 rgba(255,255,255,0.2)',
            textShadow: '0 2px 4px rgba(0,0,0,0.3)',
          }}
          whileHover={{ scale: 1.08, boxShadow: '0 0 60px rgba(220,20,60,0.7), 0 0 100px rgba(220,20,60,0.3)' }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0, scale: yesScale }}
          transition={{ delay: 0.9 }}
        >
          Haan Ji! 💖
        </motion.button>
      </div>

      <motion.button
        className="absolute px-8 py-4 rounded-2xl text-white text-lg sm:text-xl font-semibold cursor-pointer z-30 select-none border-2 border-white/10"
        style={{
          background: 'linear-gradient(135deg, #1A0A0A 0%, #2D1515 100%)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)',
          textShadow: '0 1px 2px rgba(0,0,0,0.5)',
          ...(noPos ? {
            left: noPos.x,
            top: noPos.y,
          } : {
            left: '50%',
            bottom: '10%',
            transform: 'translateX(-50%)',
          }),
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
        Nahi 😤
      </motion.button>

      <AnimatePresence mode="wait">
        {escapeIndex >= 0 && (
          <motion.div
            key={escapeIndex}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 px-8 py-4 rounded-2xl border backdrop-blur-md"
            style={{
              background: 'rgba(13,5,5,0.95)',
              borderColor: 'rgba(220,20,60,0.3)',
              boxShadow: '0 8px 32px rgba(220,20,60,0.15)',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-rose-light text-base sm:text-lg text-center font-medium">
              {ESCAPE_LINES[escapeIndex]}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
