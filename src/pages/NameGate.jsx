import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const DENIAL_MESSAGES = {
  nidhi: 'Nidhi? Nahi nahi... koi aur naam socho. Woh waala naam jo sirf woh jaanta hai 😏',
  default: 'Permission Denied! Ye website sirf kisi bohot special ke liye hai 🔒',
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
      setTimeout(() => onUnlock(), 2000)
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
      className="min-h-screen min-h-dvh flex flex-col items-center justify-center px-6 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark-soft to-dark" />

      <AnimatePresence mode="wait">
        {!unlocked ? (
          <motion.div
            key="gate"
            className="relative z-10 text-center max-w-md w-full"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="text-6xl mb-6"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🔐
            </motion.div>

            <h1 className="font-cursive text-3xl sm:text-4xl text-rose-soft mb-3">
              Hey!
            </h1>
            <p className="text-rose-light/80 text-lg mb-8">
              Apna naam enter karo to enter this website
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <motion.div
                animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}}
                transition={{ duration: 0.4 }}
              >
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Tumhara naam..."
                  className="w-full px-6 py-4 rounded-2xl bg-dark-soft/80 border-2 border-rose-warm/20 text-cream text-center text-xl font-medium focus:outline-none focus:border-rose-warm/60 transition-all duration-300 placeholder:text-rose-light/30"
                  autoFocus
                />
              </motion.div>

              <motion.button
                type="submit"
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-rose-deep to-rose-warm text-white text-lg font-semibold tracking-wide transition-all duration-300 cursor-pointer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
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
                  className="mt-6 text-rose-soft text-sm px-4 py-3 rounded-xl bg-rose-deep/20 border border-rose-warm/20"
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            <p className="mt-8 text-rose-light/30 text-xs">
              Hint: Sirf wahi naam chalega jo sirf tum dono jaante ho
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="welcome"
            className="relative z-10 text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, type: 'spring' }}
          >
            <motion.div
              className="text-7xl mb-6"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 0.8, repeat: 2 }}
            >
              💖
            </motion.div>
            <h1 className="font-cursive text-4xl sm:text-5xl text-gold-light mb-4">
              Welcome Bubu!
            </h1>
            <p className="text-rose-light text-lg">
              Tumhare liye kuch special hai...
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
