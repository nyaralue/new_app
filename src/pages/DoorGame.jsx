import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import StarField from '../components/StarField'

const LOVE_MESSAGES = [
  { icon: '💌', label: 'Love Letter', desc: 'M bhaaut lucky ho jo tumhare saath... meri life me har khushi tumse jusi h' },
  { icon: '👑', label: 'My Queen', desc: 'Jaldi saath rahna start krna aur m hamesha tumhe apni queen / princess bnake rakhna h bubu' },
  { icon: '🌟', label: 'Pretty Girl', desc: 'Tumhse jayda pyara intelligent smart pretty aaj tk maine kisi ko nhi dekha bubu' },
  { icon: '🤞', label: 'Promise', desc: 'I will never hurt you i promise bubu meri' },
  { icon: '💖', label: 'I Love You', desc: 'I love you so much bubu' },
]

const GIFTS = [
  { icon: '📱', label: 'Phone!', desc: 'Ek nayi phone aa rahi hai tumhare liye Bubu!' },
  { icon: '📸', label: 'Camera!', desc: 'Ab tum aur pretty photos lena Dukku!' },
  { icon: '💇‍♀️', label: 'Dyson!', desc: 'Meri princess ke liye Dyson!' },
]

const EMPTY = [
  { icon: '🫣', label: 'Oops!', desc: 'Is darwaze ke peeche kuch nahi tha... better luck next door Buggu!' },
  { icon: '😜', label: 'Hehe!', desc: 'Khaali! Par tumhara asli gift toh main hoon Babu hehe' },
]

function shuffleDoors() {
  const contents = [
    ...LOVE_MESSAGES.map((m, i) => ({ type: 'message', ...m, id: `msg-${i}` })),
    ...GIFTS.map((g, i) => ({ type: 'gift', ...g, id: `gift-${i}` })),
    ...EMPTY.map((e, i) => ({ type: 'empty', ...e, id: `empty-${i}` })),
  ]

  for (let i = contents.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [contents[i], contents[j]] = [contents[j], contents[i]]
  }
  return contents
}

function HeartDoor({ index, content, opened, disabled, onOpen }) {
  const doorHue = [340, 25, 160, 200, 350, 35, 170, 190, 15, 145][index % 10]

  return (
    <motion.div
      className="relative cursor-pointer select-none"
      onClick={() => !opened && !disabled && onOpen()}
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.05 + index * 0.06, type: 'spring', stiffness: 200 }}
      whileHover={!opened && !disabled ? { scale: 1.1, y: -6 } : {}}
      whileTap={!opened && !disabled ? { scale: 0.95 } : {}}
    >
      <AnimatePresence mode="wait">
        {!opened ? (
          <motion.div
            key="closed"
            className="relative flex flex-col items-center justify-center"
            exit={{ scale: 0, rotate: 15, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <svg
              viewBox="0 0 100 95"
              className="w-20 h-20 sm:w-24 sm:h-24 drop-shadow-lg"
              style={{ filter: disabled ? 'grayscale(0.7) opacity(0.4)' : 'none' }}
            >
              <defs>
                <linearGradient id={`hg-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={`hsl(${doorHue}, 70%, 45%)`} />
                  <stop offset="100%" stopColor={`hsl(${doorHue}, 80%, 25%)`} />
                </linearGradient>
                <linearGradient id={`hs-${index}`} x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.25)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                </linearGradient>
              </defs>
              <path
                d="M50 88 C50 88, 5 55, 5 32 C5 15, 18 5, 30 5 C38 5, 45 10, 50 20 C55 10, 62 5, 70 5 C82 5, 95 15, 95 32 C95 55, 50 88, 50 88Z"
                fill={`url(#hg-${index})`}
                stroke={`hsl(${doorHue}, 60%, 55%)`}
                strokeWidth="1.5"
              />
              <path
                d="M50 88 C50 88, 5 55, 5 32 C5 15, 18 5, 30 5 C38 5, 45 10, 50 20 C55 10, 62 5, 70 5 C82 5, 95 15, 95 32 C95 55, 50 88, 50 88Z"
                fill={`url(#hs-${index})`}
              />
              <text
                x="50"
                y="48"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="rgba(255,255,255,0.9)"
                fontSize="16"
                fontWeight="700"
                fontFamily="'Quicksand', sans-serif"
              >
                {index + 1}
              </text>
              <circle cx="50" cy="62" r="3.5" fill="rgba(255,215,0,0.7)" />
            </svg>

            {!disabled && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{ opacity: [0, 0.4, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
              >
                <div className="w-4 h-4 rounded-full bg-white/20 blur-sm" />
              </motion.div>
            )}

            <span className="text-[10px] sm:text-xs text-rose-light/50 mt-1 font-light">
              Door {index + 1}
            </span>
          </motion.div>
        ) : (
          <motion.div
            key="open"
            className="relative flex flex-col items-center"
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <div
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex flex-col items-center justify-center p-1.5 border-2"
              style={{
                background: content.type === 'gift'
                  ? 'linear-gradient(135deg, #0D3320, #0A2818)'
                  : content.type === 'empty'
                  ? 'linear-gradient(135deg, #1A1A1A, #111)'
                  : 'linear-gradient(135deg, #2D0A15, #1A0508)',
                borderColor: content.type === 'gift'
                  ? 'rgba(34,197,94,0.4)'
                  : content.type === 'empty'
                  ? 'rgba(255,255,255,0.1)'
                  : 'rgba(220,20,60,0.4)',
                boxShadow: content.type === 'gift'
                  ? '0 0 20px rgba(34,197,94,0.2)'
                  : content.type === 'empty'
                  ? '0 2px 8px rgba(0,0,0,0.3)'
                  : '0 0 20px rgba(220,20,60,0.2)',
              }}
            >
              <motion.span
                className="text-2xl sm:text-3xl"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 400, delay: 0.15 }}
              >
                {content.icon}
              </motion.span>
              <motion.span
                className="text-[9px] sm:text-[10px] text-white/80 font-bold mt-0.5 text-center leading-tight"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {content.label}
              </motion.span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function DoorGame({ onNext }) {
  const doors = useMemo(() => shuffleDoors(), [])
  const [opened, setOpened] = useState([])
  const [selectedContent, setSelectedContent] = useState(null)
  const [showPopup, setShowPopup] = useState(false)

  const maxOpens = 3
  const remaining = maxOpens - opened.length
  const allDone = remaining <= 0

  const handleOpen = (index) => {
    if (opened.includes(index) || allDone) return
    const newOpened = [...opened, index]
    setOpened(newOpened)
    setSelectedContent(doors[index])
    setShowPopup(true)
  }

  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center overflow-y-auto overflow-x-hidden px-4 sm:px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-dark-soft via-dark to-dark-soft" />
      <StarField count={25} />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[160px]"
          style={{ background: 'radial-gradient(circle, rgba(220,20,60,0.08), transparent 70%)' }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 w-full max-w-md flex flex-col items-center pt-10 pb-12">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.div
            className="inline-block mb-4"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <svg viewBox="0 0 100 95" className="w-16 h-16 sm:w-20 sm:h-20 drop-shadow-lg">
              <path
                d="M50 88 C50 88, 5 55, 5 32 C5 15, 18 5, 30 5 C38 5, 45 10, 50 20 C55 10, 62 5, 70 5 C82 5, 95 15, 95 32 C95 55, 50 88, 50 88Z"
                fill="url(#mainHeart)"
              />
              <defs>
                <linearGradient id="mainHeart" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#DC143C" />
                  <stop offset="100%" stopColor="#8B0000" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>

          <h1
            className="font-cursive text-3xl sm:text-4xl text-white mb-3"
            style={{ textShadow: '0 0 25px rgba(255,107,129,0.4)' }}
          >
            Mystery Doors, Bubu!
          </h1>

          <p className="text-rose-light/60 text-sm sm:text-base mb-4 font-light">
            10 dil hain yahan, par tum sirf 3 khol sakti ho
          </p>

          <div className="flex items-center justify-center gap-3 mb-2">
            {Array.from({ length: maxOpens }).map((_, i) => (
              <motion.div
                key={i}
                className="relative"
                animate={i < opened.length ? { scale: [1, 1.4, 1] } : {}}
                transition={{ duration: 0.4 }}
              >
                <svg viewBox="0 0 24 22" className="w-5 h-5">
                  <path
                    d="M12 21 C12 21, 1 13, 1 7.5 C1 3.5, 4 1, 7 1 C9 1, 11 2.5, 12 5 C13 2.5, 15 1, 17 1 C20 1, 23 3.5, 23 7.5 C23 13, 12 21, 12 21Z"
                    fill={i < opened.length ? '#DC143C' : 'rgba(220,20,60,0.15)'}
                    stroke={i < opened.length ? '#FF6B81' : 'rgba(220,20,60,0.25)'}
                    strokeWidth="0.5"
                  />
                </svg>
              </motion.div>
            ))}
            <span className="text-rose-light/30 text-xs ml-1">
              {remaining > 0 ? `${remaining} left` : 'Done!'}
            </span>
          </div>
        </motion.div>

        <div className="grid grid-cols-5 gap-x-2 gap-y-4 sm:gap-x-4 sm:gap-y-5 mb-8 w-full max-w-sm justify-items-center">
          {doors.map((content, i) => (
            <HeartDoor
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
          {showPopup && selectedContent && (
            <motion.div
              key={selectedContent.id}
              className="fixed inset-0 z-50 flex items-center justify-center px-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={() => setShowPopup(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              />

              <motion.div
                className="relative max-w-sm w-full rounded-3xl p-8 text-center border-2"
                style={{
                  background: selectedContent.type === 'gift'
                    ? 'linear-gradient(135deg, #0D2818, #081A10)'
                    : selectedContent.type === 'empty'
                    ? 'linear-gradient(135deg, #1A1A1A, #0D0D0D)'
                    : 'linear-gradient(135deg, #1A0508, #0D0305)',
                  borderColor: selectedContent.type === 'gift'
                    ? 'rgba(34,197,94,0.3)'
                    : selectedContent.type === 'empty'
                    ? 'rgba(255,255,255,0.1)'
                    : 'rgba(220,20,60,0.3)',
                  boxShadow: selectedContent.type === 'gift'
                    ? '0 0 60px rgba(34,197,94,0.15)'
                    : '0 0 60px rgba(220,20,60,0.1)',
                }}
                initial={{ scale: 0.5, y: 30 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              >
                <motion.span
                  className="text-5xl sm:text-6xl inline-block mb-4"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 300, delay: 0.2 }}
                >
                  {selectedContent.icon}
                </motion.span>

                <motion.h3
                  className="text-white text-xl sm:text-2xl font-bold mb-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {selectedContent.label}
                </motion.h3>

                <motion.p
                  className="text-rose-light/80 text-sm sm:text-base leading-relaxed font-light mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {selectedContent.desc}
                </motion.p>

                <motion.button
                  onClick={() => setShowPopup(false)}
                  className="px-8 py-3 rounded-2xl text-white text-sm font-semibold cursor-pointer border border-white/10"
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                  }}
                  whileHover={{ scale: 1.05, background: 'rgba(255,255,255,0.15)' }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  Close
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {allDone && !showPopup && (
            <motion.div
              className="text-center mt-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <p className="text-rose-light/40 text-sm mb-6 font-light">
                Bas Buggu, 3 dil khol liye... ab aage chalo!
              </p>
              <motion.button
                onClick={onNext}
                className="px-14 py-5 rounded-2xl text-white text-lg font-bold cursor-pointer border-2 border-white/15"
                style={{
                  background: 'linear-gradient(135deg, #DC143C, #FF6B81)',
                  boxShadow: '0 0 35px rgba(220,20,60,0.3)',
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
