import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Confetti from '../components/Confetti'
import StarField from '../components/StarField'

const MESSAGES = [
  'Bubu, agar kabhi maine tumhe hurt kiya ho, jaane ya anjaane mein...',
  'Agar kabhi koi galti ho gayi ho mujhse Dukku...',
  'Toh dil se sorry yaar. Tum meri sabse khaas ho aur main kabhi nahi chahunga ki tumhe meri wajah se bura lage.',
  'Micchami Dukkadam -- meri saari galtiyon ko maaf kar dena Babu.',
]

export default function Forgiveness() {
  const [forgiven, setForgiven] = useState(false)
  const [showFinal, setShowFinal] = useState(false)

  const handleForgive = () => {
    setForgiven(true)
    setTimeout(() => setShowFinal(true), 3500)
  }

  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center px-4 sm:px-6 overflow-y-auto overflow-x-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark-soft/50 to-dark" />
      <StarField count={35} />
      {showFinal && <Confetti count={80} />}

      <div className="relative z-10 max-w-md w-full py-12">
        <AnimatePresence mode="wait">
          {!forgiven ? (
            <motion.div
              key="asking"
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -30 }}
            >
              <motion.h1
                className="font-cursive text-3xl sm:text-5xl text-rose-light mb-10 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Micchami Dukkadam, Bubu
              </motion.h1>

              <motion.div
                className="mb-10 mx-auto w-48 h-48 sm:w-60 sm:h-60 rounded-full overflow-hidden border-4 border-rose-warm/25 shadow-xl shadow-rose-warm/15"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, type: 'spring' }}
              >
                <img
                  src="/Screenshot_2026-02-13_at_10.27.04_PM.png"
                  alt="Sorry"
                  className="w-full h-full object-cover object-top"
                />
              </motion.div>

              <div className="space-y-6 mb-12">
                {MESSAGES.map((msg, i) => (
                  <motion.p
                    key={i}
                    className="text-rose-pale/80 text-base sm:text-lg leading-relaxed px-2 font-light"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0 + i * 0.7 }}
                  >
                    {msg}
                  </motion.p>
                ))}
              </div>

              <motion.button
                onClick={handleForgive}
                className="px-12 py-5 rounded-2xl bg-gradient-to-r from-gold-dark to-gold text-dark text-lg font-bold cursor-pointer animate-float"
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(218, 165, 32, 0.4)' }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3.8 }}
              >
                Maaf Kiya
              </motion.button>
            </motion.div>
          ) : !showFinal ? (
            <motion.div
              key="forgiven"
              className="text-center min-h-[60vh] flex flex-col items-center justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 150 }}
            >
              <motion.div
                className="text-7xl sm:text-8xl mb-8"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 0.8, repeat: 4 }}
              >
                🥹
              </motion.div>

              <h2 className="font-cursive text-3xl sm:text-4xl text-gold-light mb-5">
                Pata tha meri Bubu kabhi na nahi bolegi...
              </h2>

              <p className="text-rose-light text-lg font-light">
                Thank you princess 💖
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="final"
              className="text-center min-h-[80vh] flex flex-col items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
            >
              <motion.div
                className="text-7xl sm:text-8xl mb-10"
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                ❤
              </motion.div>

              <motion.h1
                className="font-cursive text-4xl sm:text-5xl text-gold-light mb-5 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                Happy Valentine's Day Buggu
              </motion.h1>

              <motion.p
                className="text-xl sm:text-2xl text-rose-light mb-8 font-light"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
              >
                Hamesha tumhare saath, hamesha tumhare liye
              </motion.p>

              <motion.div
                className="w-32 h-px bg-gradient-to-r from-transparent via-rose-warm/40 to-transparent mb-8"
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
              />

              <motion.p
                className="text-rose-light/25 text-sm font-light tracking-wider"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.0 }}
              >
                Made with pyaar ❤
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
