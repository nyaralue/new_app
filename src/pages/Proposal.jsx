import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Confetti from '../components/Confetti'
import StarField from '../components/StarField'

const LINES = [
  'Meri Princess...',
  'Meri Bubu...',
  'Meri poori duniya...',
]

function TypewriterLine({ text, delay, onDone }) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)
  const onDoneRef = useCallback(() => onDone?.(), [])

  useEffect(() => {
    let timeout
    const startTimeout = setTimeout(() => {
      let i = 0
      const type = () => {
        if (i <= text.length) {
          setDisplayed(text.slice(0, i))
          i++
          timeout = setTimeout(type, 90)
        } else {
          setDone(true)
          onDoneRef()
        }
      }
      type()
    }, delay)

    return () => {
      clearTimeout(startTimeout)
      clearTimeout(timeout)
    }
  }, [text, delay, onDoneRef])

  return (
    <motion.p
      className="font-cursive text-2xl sm:text-4xl text-rose-light mb-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: delay / 1000 }}
    >
      {displayed}
      {!done && <span className="animate-pulse text-gold-light ml-0.5">|</span>}
    </motion.p>
  )
}

export default function Proposal({ onNext }) {
  const [phase, setPhase] = useState('dark')
  const [linesComplete, setLinesComplete] = useState(0)
  const [showQuestion, setShowQuestion] = useState(false)
  const [accepted, setAccepted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setPhase('typing'), 1500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (linesComplete >= LINES.length) {
      const timer = setTimeout(() => setShowQuestion(true), 800)
      return () => clearTimeout(timer)
    }
  }, [linesComplete])

  const handleAccept = () => {
    setAccepted(true)
    setTimeout(() => onNext(), 6000)
  }

  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center px-6 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {accepted && <Confetti count={150} />}

      <motion.div
        className="absolute inset-0"
        animate={{
          background: phase === 'dark'
            ? 'linear-gradient(to bottom, #050202, #050202)'
            : 'linear-gradient(to bottom, #0D0505, #1A0A0A, #0D0505)',
        }}
        transition={{ duration: 2.5 }}
      />

      {phase === 'typing' && <StarField count={60} />}

      {phase === 'typing' && !accepted && (
        <motion.div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 3 }}
        >
          {Array.from({ length: 40 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-gold-light/50 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 4,
              }}
            />
          ))}
        </motion.div>
      )}

      <div className="relative z-10 text-center max-w-lg">
        <AnimatePresence>
          {phase === 'typing' && !accepted && (
            <motion.div key="typing" className="space-y-2">
              {LINES.map((line, i) => (
                <TypewriterLine
                  key={i}
                  text={line}
                  delay={i * 2800}
                  onDone={() => setLinesComplete(c => c + 1)}
                />
              ))}

              <AnimatePresence>
                {showQuestion && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.5 }}
                    className="pt-10"
                  >
                    <motion.div
                      className="text-6xl sm:text-7xl mb-8"
                      animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 2.5, repeat: Infinity }}
                    >
                      💍
                    </motion.div>

                    <h1 className="font-cursive text-3xl sm:text-5xl text-gold-light mb-10 leading-tight">
                      Will You Marry Me,{' '}
                      <span className="text-rose-soft">My Valentine?</span>
                    </h1>

                    <motion.button
                      onClick={handleAccept}
                      className="px-14 py-5 rounded-2xl bg-gradient-to-r from-rose-warm to-rose-soft text-white text-xl font-bold animate-pulse-glow cursor-pointer"
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Hamesha Haan! 💖
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {accepted && (
            <motion.div
              key="accepted"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 150, delay: 0.5 }}
              className="space-y-6"
            >
              <motion.div
                className="text-8xl sm:text-9xl"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1, repeat: 4 }}
              >
                💖
              </motion.div>

              <h1 className="font-cursive text-3xl sm:text-5xl text-gold-light leading-tight">
                2027 mein hum officially ek ho jayenge...
              </h1>

              <p className="text-xl sm:text-2xl text-rose-light font-light">
                I love you Bubu, aaj bhi, kal bhi, hamesha.
              </p>

              <motion.p
                className="font-cursive text-2xl text-rose-soft pt-4"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                Forever Yours ❤
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
