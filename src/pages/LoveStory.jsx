import { motion } from 'framer-motion'

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

function TimelineDot({ index }) {
  return (
    <motion.div
      className="absolute left-0 sm:left-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-rose-warm to-rose-soft border-2 border-dark -translate-x-1/2 z-10 shadow-md shadow-rose-warm/30"
      style={{ top: 4 }}
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2, type: 'spring', stiffness: 300 }}
    />
  )
}

function MessageCard({ message, index }) {
  const isLeft = index % 2 === 0

  return (
    <motion.div
      className={`relative pl-8 sm:pl-0 ${isLeft ? 'sm:pr-[calc(50%+2rem)]' : 'sm:pl-[calc(50%+2rem)]'}`}
      initial={{ opacity: 0, x: isLeft ? -40 : 40, y: 20 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      <TimelineDot index={index} />

      <div className="relative bg-gradient-to-br from-dark-mid/80 to-dark-soft/80 border border-rose-warm/10 rounded-2xl p-5 sm:p-6 backdrop-blur-sm hover:border-rose-warm/25 transition-colors duration-300">
        <div className="absolute -top-3 left-5 w-8 h-8 rounded-full bg-gradient-to-br from-rose-warm to-rose-soft flex items-center justify-center text-sm shadow-md shadow-rose-warm/20">
          {message.icon}
        </div>

        <div className="mt-2">
          <span className="font-cursive text-gold-light text-xl">
            {message.nickname}...
          </span>
          <p className="mt-2 text-rose-pale/80 text-base leading-relaxed font-light">
            {message.text}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default function LoveStory({ onNext }) {
  return (
    <motion.div
      className="min-h-screen min-h-dvh py-16 px-4 sm:px-6 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark-soft/40 to-dark" />

      <div className="relative z-10 max-w-2xl mx-auto">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <motion.div
            className="text-4xl mb-4"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
          >
            💌
          </motion.div>
          <h1 className="font-cursive text-4xl sm:text-5xl text-rose-light mb-3 leading-tight">
            Humari Kahani
          </h1>
          <p className="text-rose-light/30 text-sm tracking-wider uppercase">scroll karo neeche</p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-0 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-rose-warm/30 via-rose-warm/10 to-transparent -translate-x-1/2" />

          <div className="space-y-10">
            {MESSAGES.map((msg, i) => (
              <MessageCard key={i} message={msg} index={i} />
            ))}
          </div>
        </div>

        <motion.div
          className="text-center mt-16 pb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-rose-light/40 mb-8 text-sm font-light">aur bhi hai Buggu...</p>
          <motion.button
            onClick={onNext}
            className="px-12 py-5 rounded-2xl bg-gradient-to-r from-rose-warm to-rose-soft text-white text-lg font-semibold cursor-pointer"
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(220, 20, 60, 0.3)' }}
            whileTap={{ scale: 0.95 }}
          >
            Aage Chalo
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  )
}
