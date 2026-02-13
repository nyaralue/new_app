import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import StarField from '../components/StarField'

const DENIAL_MESSAGES = {
  nidhi: 'Nidhi? Nahi nahi... koi aur naam socho. Woh waala naam jo sirf woh jaanta hai',
  default: 'Permission Denied! Ye website sirf kisi bohot special ke liye hai',
}

export default function NameGate({ onUnlock }) {
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [shake, setShake] = useState(false)
  const [unlocked, setUnlocked] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = name.trim().toLowerCase()

    if (trimmed === 'bubu') {
      setError('')
      setUnlocked(true)
      setTimeout(() => onUnlock(), 2200)
      return
    }

    if (trimmed === 'nidhi') {
      setError(DENIAL_MESSAGES.nidhi)
    } else if (trimmed === '') {
      setError('Arre kuch toh likho!')
    } else {
      setError(DENIAL_MESSAGES.default)
    }

    setShake(true)
    setTimeout(() => setShake(false), 600)
  }

  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center px-6 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6 }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-dark-soft via-dark to-dark-soft" />
      <StarField count={50} />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-rose-warm/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-gold/5 blur-3xl" />
      </div>

      <AnimatePresence mode="wait">
        {!unlocked ? (
          <motion.div
            key="gate"
            className="relative z-10 text-center w-full max-w-sm"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30, scale: 0.9 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="text-5xl sm:text-6xl mb-8"
              animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              🔐
            </motion.div>

            <h1 className="font-cursive text-4xl sm:text-5xl text-rose-soft mb-3 leading-tight">
              Hey There!
            </h1>
            <p className="text-rose-light/70 text-base sm:text-lg mb-10 font-light">
              Pehle apna naam batao to enter this secret place
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <motion.div
                animate={shake ? { x: [-12, 12, -12, 12, 0] } : {}}
                transition={{ duration: 0.4 }}
              >
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Tumhara naam..."
                  className="w-full px-6 py-4 rounded-2xl bg-dark-mid/60 border-2 border-rose-warm/15 text-cream text-center text-lg tracking-wide focus:outline-none focus:border-rose-warm/50 focus:bg-dark-mid/80 transition-all duration-300"
                  autoFocus
                />
              </motion.div>

              <motion.button
                type="submit"
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-rose-deep to-rose-warm text-white text-lg font-semibold tracking-wider transition-all duration-300 cursor-pointer"
                whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(220, 20, 60, 0.4)' }}
                whileTap={{ scale: 0.97 }}
              >
                Enter
              </motion.button>
            </form>

            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-6 text-rose-soft text-sm px-5 py-3 rounded-2xl bg-rose-deep/15 border border-rose-warm/15"
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            <p className="mt-10 text-rose-light/20 text-xs tracking-wider uppercase">
              Hint: Sirf wahi naam chalega jo sirf tum dono jaante ho
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="welcome"
            className="relative z-10 text-center"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: 'spring', stiffness: 120 }}
          >
            <motion.div
              className="text-7xl sm:text-8xl mb-8"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 0.6, repeat: 3 }}
            >
              💖
            </motion.div>
            <h1 className="font-cursive text-5xl sm:text-6xl text-gold-light mb-4">
              Welcome Bubu!
            </h1>
            <p className="text-rose-light text-lg font-light">
              Tumhare liye kuch bohot special hai...
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
