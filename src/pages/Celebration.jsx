import { motion } from 'framer-motion'
import Confetti from '../components/Confetti'
import StarField from '../components/StarField'

export default function Celebration({ onNext }) {
  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center px-6 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Confetti count={120} />
      <div className="absolute inset-0 bg-gradient-to-b from-rose-deep/30 via-dark to-dark" />
      <StarField count={25} />

      <div className="relative z-10 text-center max-w-lg">
        <motion.div
          className="text-7xl sm:text-8xl mb-8"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
        >
          🎉
        </motion.div>

        <motion.h1
          className="font-cursive text-4xl sm:text-6xl text-gold-light mb-5 leading-tight"
          style={{ textShadow: '0 0 20px rgba(255,215,0,0.3)' }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          Maine pehle se jaanta tha...
        </motion.h1>

        <motion.p
          className="text-xl sm:text-2xl text-rose-light mb-3 font-medium"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
        >
          Meri Bubu haan hi bolegi!
        </motion.p>

        <motion.p
          className="text-rose-light/50 text-base sm:text-lg mb-12 font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
        >
          Ab ruko Dukku... tumhare liye bohot kuch hai aage...
        </motion.p>

        <motion.button
          onClick={onNext}
          className="px-14 py-5 rounded-2xl text-dark text-lg font-bold tracking-wide cursor-pointer"
          style={{
            background: 'linear-gradient(135deg, #DAA520, #FFD700)',
            boxShadow: '0 0 30px rgba(218,165,32,0.4), 0 0 60px rgba(218,165,32,0.15)',
            border: '2px solid rgba(255,255,255,0.15)',
            fontFamily: "'Quicksand', sans-serif",
          }}
          whileHover={{ scale: 1.05, boxShadow: '0 0 45px rgba(218,165,32,0.6), 0 0 80px rgba(218,165,32,0.2)' }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5 }}
        >
          Aage Dekho
        </motion.button>
      </div>
    </motion.div>
  )
}
