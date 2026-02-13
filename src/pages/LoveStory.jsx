import { motion } from 'framer-motion'
import { useRef } from 'react'

const MESSAGES = [
  {
    nickname: 'Bubu',
    text: 'Yaar kitni pyaari ho tum, seriously. Meri princess ho tum.',
    icon: '👑',
  },
  {
    nickname: 'Dukku',
    text: '5 saal ho gaye humein saath... aur 26 March 2026 ko 6 saal poore ho jayenge. Har saal tumhare saath aur amazing hota ja raha hai.',
    icon: '📅',
  },
  {
    nickname: 'Buggu',
    text: 'Tum Delhi mein, main Rajasthan mein... distance hai par dil toh hamesha tumhare paas hai. Rajasthan se hi toh hum dono hain -- kismat ne pehle se tay kar rakha tha.',
    icon: '🌍',
  },
  {
    nickname: 'Babu',
    text: 'Tumhe yaad hai tumne mujhe PS5 gift kiya? Main toh sapne mein bhi nahi soch sakta tha ki mere paas hoga... par tum ho na, tum impossible ko bhi possible kar deti ho. Tum meri real life ka cheat code ho.',
    icon: '🎮',
  },
  {
    nickname: 'Bubu',
    text: 'Tum hamesha mujhe special feel karati ho. Har chhoti cheez mein, har pal mein. Aur meri bas ek hi wish hai -- tumhari khushi. Hamesha.',
    icon: '✨',
  },
  {
    nickname: 'Dukku',
    text: 'Har saal main tumhare pyaar mein aur pagal hota ja raha hoon... aur ab ruk nahi sakta. 2027 mein hum officially ek ho jayenge!',
    icon: '💍',
  },
]

function MessageCard({ message, index }) {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60, y: 20 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, delay: 0.1 }}
    >
      <div className="relative bg-gradient-to-br from-dark-soft/90 to-dark/90 border border-rose-warm/15 rounded-3xl p-6 sm:p-8 backdrop-blur-sm">
        <div className="absolute -top-4 left-6 w-10 h-10 rounded-full bg-gradient-to-br from-rose-warm to-rose-soft flex items-center justify-center text-lg">
          {message.icon}
        </div>

        <div className="mt-2">
          <span className="font-cursive text-gold-light text-xl">
            {message.nickname}...
          </span>
          <p className="mt-3 text-rose-pale/90 text-base sm:text-lg leading-relaxed">
            {message.text}
          </p>
        </div>

        <div className="absolute -bottom-2 -right-2 text-rose-warm/10 text-4xl pointer-events-none select-none">
          ❤
        </div>
      </div>
    </motion.div>
  )
}

export default function LoveStory({ onNext }) {
  return (
    <motion.div
      className="min-h-screen py-16 px-4 sm:px-6 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark-soft/50 to-dark" />

      <div className="relative z-10 max-w-lg mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="font-cursive text-3xl sm:text-4xl text-rose-light mb-2">
            Humari Kahani
          </h1>
          <p className="text-rose-light/40 text-sm">scroll karo neeche...</p>
        </motion.div>

        <div className="space-y-8">
          {MESSAGES.map((msg, i) => (
            <MessageCard key={i} message={msg} index={i} />
          ))}
        </div>

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-rose-light/50 mb-6 text-sm">aur bhi hai Buggu...</p>
          <motion.button
            onClick={onNext}
            className="px-10 py-4 rounded-2xl bg-gradient-to-r from-rose-warm to-rose-soft text-white text-lg font-semibold cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Aage Chalo →
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  )
}
