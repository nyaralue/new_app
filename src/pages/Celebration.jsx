import { motion } from 'framer-motion'
import Confetti from '../components/Confetti'

export default function Celebration({ onNext }) {
  return (
    <motion.div
      className="min-h-screen min-h-dvh flex flex-col items-center justify-center px-6 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Confetti count={100} />

      <div className="absolute inset-0 bg-gradient-to-b from-rose-deep/30 via-dark to-dark" />

      <div className="relative z-10 text-center max-w-lg">
        <motion.div
          className="text-7xl mb-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
        >
          🎉
        </motion.div>

        <motion.h1
          className="font-cursive text-3xl sm:text-5xl text-gold-light mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          Maine pehle se jaanta tha...
        </motion.h1>

        <motion.p
          className="text-xl sm:text-2xl text-rose-light mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
        >
          Meri Bubu haan hi bolegi!
        </motion.p>

        <motion.p
          className="text-rose-light/60 text-lg mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
        >
          Ab ruko Dukku... tumhare liye bohot kuch hai aage...
        </motion.p>

        <motion.button
          onClick={onNext}
          className="px-10 py-4 rounded-2xl bg-gradient-to-r from-gold-dark to-gold text-dark text-lg font-bold tracking-wide animate-float cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5 }}
        >
          Aage Dekho →
        </motion.button>
      </div>
    </motion.div>
  )
}
