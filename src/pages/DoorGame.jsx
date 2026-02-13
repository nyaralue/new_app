import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import StarField from '../components/StarField'

const LOVE_MESSAGES = [
  'M bhaaut lucky ho jo tumhare saath... meri life me har khushi tumse jusi h 💕',
  'Jaldi saath rahna start krna aur m hamesha tumhe apni queen / princess bnake rakhna h bubu 👑',
  'Tumhse jayda pyara intelligent smart pretty aaj tk maine kisi ko nhi dekha bubu 🌟',
  'I will never hurt you i promise bubu meri 🤞',
  'I love you so much bubu 💖',
]

const GIFTS = [
  { icon: '📱', label: 'Phone', desc: 'Ek nayi phone aa rahi hai tumhare liye Bubu!' },
  { icon: '📸', label: 'Camera', desc: 'Ab tum aur pretty photos lena Dukku!' },
  { icon: '💨', label: 'Dyson', desc: 'Meri princess ke liye Dyson!' },
]

const EMPTY = [
  { icon: '💨', label: 'Oops!', desc: 'Is darwaze ke peeche kuch nahi tha... better luck next door Buggu!' },
  { icon: '🫣', label: 'Empty!', desc: 'Khaali! Par tumhara asli gift toh main hoon Babu hehe' },
]

function shuffleDoors() {
  const contents = [
    ...LOVE_MESSAGES.map((msg, i) => ({ type: 'message', icon: '💌', label: 'Love Letter', desc: msg, id: `msg-${i}` })),
    ...GIFTS.map((g, i) => ({ type: 'gift', ...g, id: `gift-${i}` })),
    ...EMPTY.map((e, i) => ({ type: 'empty', ...e, id: `empty-${i}` })),
  ]

  for (let i = contents.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [contents[i], contents[j]] = [contents[j], contents[i]]
  }

  return contents
}

const DOOR_COLORS = [
  'from-rose-warm to-rose-deep',
  'from-amber-600 to-amber-800',
  'from-emerald-600 to-emerald-800',
  'from-sky-600 to-sky-800',
  'from-rose-deep to-rose-rich',
  'from-amber-700 to-yellow-900',
  'from-teal-600 to-teal-800',
  'from-cyan-600 to-cyan-800',
  'from-orange-600 to-orange-800',
  'from-lime-600 to-lime-800',
]

function Door({ index, content, opened, disabled, onOpen }) {
  const colorClass = DOOR_COLORS[index % DOOR_COLORS.length]

  return (
    <motion.div
      className="relative aspect-[3/4] cursor-pointer perspective-[800px]"
      onClick={() => !opened && !disabled && onOpen()}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + index * 0.08 }}
      whileHover={!opened && !disabled ? { scale: 1.05, y: -4 } : {}}
      whileTap={!opened && !disabled ? { scale: 0.97 } : {}}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <AnimatePresence mode="wait">
        {!opened ? (
          <motion.div
            key="closed"
            className={`absolute inset-0 rounded-2xl bg-gradient-to-b ${colorClass} flex flex-col items-center justify-center gap-2 border-2 border-white/10 overflow-hidden`}
            style={{
              boxShadow: disabled
                ? '0 2px 8px rgba(0,0,0,0.3)'
                : '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.15)',
              opacity: disabled ? 0.5 : 1,
            }}
            exit={{ rotateY: -90, opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

            <div className="absolute top-2 left-0 right-0 h-1.5 mx-3 rounded-full bg-white/10" />
            <div className="absolute top-5 left-0 right-0 h-0.5 mx-3 rounded-full bg-white/5" />

            <span className="relative text-3xl sm:text-4xl drop-shadow-lg">🚪</span>
            <span className="relative text-white font-bold text-sm sm:text-base drop-shadow-md">
              #{index + 1}
            </span>

            <div className="absolute right-2 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-gold-light/80 shadow-md shadow-gold/30" />

            {!disabled && (
              <motion.div
                className="absolute inset-0 bg-white/5"
                animate={{ opacity: [0, 0.1, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
              />
            )}
          </motion.div>
        ) : (
          <motion.div
            key="open"
            className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center p-3 text-center border-2"
            style={{
              background: content.type === 'gift'
                ? 'linear-gradient(135deg, #1a3a1a, #0D2818)'
                : content.type === 'empty'
                ? 'linear-gradient(135deg, #1A0A0A, #2D1515)'
                : 'linear-gradient(135deg, #2D1515, #0D0505)',
              borderColor: content.type === 'gift'
                ? 'rgba(34,197,94,0.3)'
                : content.type === 'empty'
                ? 'rgba(255,255,255,0.1)'
                : 'rgba(220,20,60,0.3)',
              boxShadow: content.type === 'gift'
                ? '0 0 25px rgba(34,197,94,0.15)'
                : content.type === 'empty'
                ? '0 4px 12px rgba(0,0,0,0.3)'
                : '0 0 25px rgba(220,20,60,0.15)',
            }}
            initial={{ rotateY: 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <motion.span
              className="text-3xl sm:text-4xl mb-1"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, delay: 0.3 }}
            >
              {content.icon}
            </motion.span>

            <motion.span
              className="text-white font-bold text-xs sm:text-sm mb-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {content.label}
            </motion.span>

            <motion.p
              className="text-white/70 text-[10px] sm:text-xs leading-tight font-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {content.desc}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function DoorGame({ onNext }) {
  const doors = useMemo(() => shuffleDoors(), [])
  const [opened, setOpened] = useState([])
  const [lastOpened, setLastOpened] = useState(null)

  const maxOpens = 3
  const remaining = maxOpens - opened.length
  const allDone = remaining <= 0

  const handleOpen = (index) => {
    if (opened.includes(index) || allDone) return
    setOpened(prev => [...prev, index])
    setLastOpened(doors[index])
  }

  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center overflow-y-auto overflow-x-hidden px-4 sm:px-6 py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-dark-soft via-dark to-dark-soft" />
      <StarField count={25} />

      <div className="relative z-10 w-full max-w-lg">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.div
            className="text-5xl sm:text-6xl mb-4"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            ❤️
          </motion.div>

          <h1 className="font-cursive text-3xl sm:text-4xl text-white mb-3"
            style={{ textShadow: '0 0 20px rgba(255,107,129,0.4)' }}
          >
            Mystery Doors, Bubu!
          </h1>

          <p className="text-rose-light/70 text-sm sm:text-base mb-2 font-light">
            10 darwaze hain yahan, par tum sirf 3 khol sakti ho
          </p>

          <div className="flex items-center justify-center gap-2 mt-4">
            {Array.from({ length: maxOpens }).map((_, i) => (
              <motion.div
                key={i}
                className="w-3 h-3 rounded-full"
                style={{
                  background: i < opened.length ? '#DC143C' : 'rgba(220,20,60,0.2)',
                  boxShadow: i < opened.length ? '0 0 8px rgba(220,20,60,0.5)' : 'none',
                }}
                animate={i < opened.length ? { scale: [1, 1.3, 1] } : {}}
                transition={{ duration: 0.3 }}
              />
            ))}
            <span className="text-rose-light/40 text-xs ml-2">
              {remaining > 0 ? `${remaining} chances left` : 'All done!'}
            </span>
          </div>
        </motion.div>

        <div className="grid grid-cols-5 gap-2.5 sm:gap-3 mb-8">
          {doors.map((content, i) => (
            <Door
              key={content.id}
              index={i}
              content={content}
              opened={opened.includes(i)}
              disabled={allDone && !opened.includes(i)}
              onOpen={() => handleOpen(i)}
            />
          ))}
        </div>

        <AnimatePresence>
          {lastOpened && (
            <motion.div
              key={lastOpened.id}
              className="text-center px-4 py-4 rounded-2xl border mb-6"
              style={{
                background: 'rgba(13,5,5,0.8)',
                borderColor: 'rgba(220,20,60,0.2)',
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <span className="text-2xl">{lastOpened.icon}</span>
              <p className="text-rose-light text-sm mt-1 font-light">{lastOpened.desc}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {allDone && (
            <motion.div
              className="text-center mt-4 pb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <p className="text-rose-light/50 text-sm mb-6 font-light">
                Bas Buggu, 3 darwaze khol liye... ab aage chalo!
              </p>
              <motion.button
                onClick={onNext}
                className="px-12 py-5 rounded-2xl text-white text-lg font-bold cursor-pointer border-2 border-white/15"
                style={{
                  background: 'linear-gradient(135deg, #DC143C, #FF6B81)',
                  boxShadow: '0 0 30px rgba(220,20,60,0.3)',
                  textShadow: '0 1px 3px rgba(0,0,0,0.3)',
                }}
                whileHover={{ scale: 1.05, boxShadow: '0 0 50px rgba(220,20,60,0.5)' }}
                whileTap={{ scale: 0.95 }}
              >
                Aage Chalo
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
