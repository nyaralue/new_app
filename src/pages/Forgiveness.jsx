import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

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
    setTimeout(() => setShowFinal(true), 3000)
  }

  return (
    <motion.div
      className="min-h-screen py-12 px-4 sm:px-6 flex flex-col items-center relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark-soft/60 to-dark" />

      <div className="relative z-10 max-w-md w-full">
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
                className="font-cursive text-3xl sm:text-4xl text-rose-light mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Micchami Dukkadam, Bubu
              </motion.h1>

              <motion.div
                className="mb-8 mx-auto w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden border-4 border-rose-warm/30 shadow-lg shadow-rose-warm/20"
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

              <div className="space-y-5 mb-10">
                {MESSAGES.map((msg, i) => (
                  <motion.p
                    key={i}
                    className="text-rose-pale/85 text-base sm:text-lg leading-relaxed px-2"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0 + i * 0.6 }}
                  >
                    {msg}
                  </motion.p>
                ))}
              </div>

              <motion.button
                onClick={handleForgive}
                className="px-10 py-4 rounded-2xl bg-gradient-to-r from-gold-dark to-gold text-dark text-lg font-bold cursor-pointer animate-float"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3.6 }}
              >
                Maaf Kiya 🤗
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
                className="text-7xl mb-6"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 0.8, repeat: 3 }}
              >
                🥹
              </motion.div>

              <h2 className="font-cursive text-2xl sm:text-3xl text-gold-light mb-4">
                Pata tha meri Bubu kabhi na nahi bolegi...
              </h2>

              <p className="text-rose-light text-lg">
                Thank you princess 💖
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="final"
              className="text-center min-h-[80vh] flex flex-col items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <motion.div
                className="text-6xl mb-8"
                animate={{
                  scale: [1, 1.15, 1],
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                ❤
              </motion.div>

              <motion.h1
                className="font-cursive text-3xl sm:text-4xl text-gold-light mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Happy Valentine's Day Buggu
              </motion.h1>

              <motion.p
                className="text-xl text-rose-light mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.0 }}
              >
                Hamesha tumhare saath, hamesha tumhare liye
              </motion.p>

              <motion.p
                className="text-rose-light/30 text-sm mt-8"
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
