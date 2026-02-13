import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SIZE = 3
const TOTAL = SIZE * SIZE
const EMPTY = TOTAL - 1

const ENCOURAGEMENTS = [
  'Arre wah Bubu! 🤩',
  'Almost ho gaya Dukku! 💪',
  'Meri smart Buggu! 🧠',
  'Babu tum toh genius ho! ✨',
  'Kya baat hai Bubu! 🎉',
]

function isSolvable(tiles) {
  let inversions = 0
  const filtered = tiles.filter(t => t !== EMPTY)
  for (let i = 0; i < filtered.length; i++) {
    for (let j = i + 1; j < filtered.length; j++) {
      if (filtered[i] > filtered[j]) inversions++
    }
  }
  return inversions % 2 === 0
}

function shuffle() {
  let tiles
  do {
    tiles = Array.from({ length: TOTAL }, (_, i) => i)
    for (let i = tiles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [tiles[i], tiles[j]] = [tiles[j], tiles[i]]
    }
  } while (!isSolvable(tiles) || isSolved(tiles))
  return tiles
}

function isSolved(tiles) {
  return tiles.every((t, i) => t === i)
}

function getNeighbors(index) {
  const row = Math.floor(index / SIZE)
  const col = index % SIZE
  const neighbors = []
  if (row > 0) neighbors.push(index - SIZE)
  if (row < SIZE - 1) neighbors.push(index + SIZE)
  if (col > 0) neighbors.push(index - 1)
  if (col < SIZE - 1) neighbors.push(index + 1)
  return neighbors
}

export default function Puzzle({ onNext }) {
  const [phase, setPhase] = useState('intro')
  const [tiles, setTiles] = useState(() => shuffle())
  const [moves, setMoves] = useState(0)
  const [solved, setSolved] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [encouragement, setEncouragement] = useState('')

  useEffect(() => {
    if (phase === 'intro') {
      const timer = setTimeout(() => setPhase('playing'), 3500)
      return () => clearTimeout(timer)
    }
  }, [phase])

  const handleTileClick = useCallback((index) => {
    if (solved) return
    const emptyIndex = tiles.indexOf(EMPTY)
    const neighbors = getNeighbors(emptyIndex)

    if (neighbors.includes(index)) {
      const newTiles = [...tiles];
      [newTiles[emptyIndex], newTiles[index]] = [newTiles[index], newTiles[emptyIndex]]
      setTiles(newTiles)
      setMoves(m => m + 1)

      if (Math.random() < 0.3) {
        setEncouragement(ENCOURAGEMENTS[Math.floor(Math.random() * ENCOURAGEMENTS.length)])
        setTimeout(() => setEncouragement(''), 1500)
      }

      if (isSolved(newTiles)) {
        setSolved(true)
      }
    }
  }, [tiles, solved])

  const handleHint = () => {
    setShowHint(true)
    setTimeout(() => setShowHint(false), 1500)
  }

  return (
    <motion.div
      className="min-h-screen min-h-dvh flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-dark-soft via-dark to-dark-soft" />

      <div className="relative z-10 text-center w-full max-w-sm">
        <AnimatePresence mode="wait">
          {phase === 'intro' && (
            <motion.div
              key="intro"
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="rounded-2xl overflow-hidden border-2 border-gold/30 shadow-lg shadow-gold/10 mb-4">
                <img
                  src="/Screenshot_2026-02-13_at_10.26.55_PM.png"
                  alt="Us"
                  className="w-full"
                />
              </div>
              <p className="font-cursive text-xl sm:text-2xl text-rose-light px-2">
                Ye dekho Buggu humari photo... par thodi bikhar gayi hai, jaise tumhare bina meri zindagi bikhar jaati hai
              </p>
            </motion.div>
          )}

          {phase === 'playing' && !solved && (
            <motion.div
              key="puzzle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <h2 className="font-cursive text-2xl text-rose-light mb-4">
                Photo jodo Bubu!
              </h2>

              <div className="relative mx-auto" style={{ width: '100%', maxWidth: 320 }}>
                <div
                  className="grid gap-1 rounded-xl overflow-hidden border-2 border-rose-warm/20 aspect-square"
                  style={{
                    gridTemplateColumns: `repeat(${SIZE}, 1fr)`,
                    gridTemplateRows: `repeat(${SIZE}, 1fr)`,
                  }}
                >
                  {tiles.map((tile, index) => {
                    if (tile === EMPTY) {
                      return <div key={index} className="bg-dark/50" />
                    }
                    const row = Math.floor(tile / SIZE)
                    const col = tile % SIZE
                    return (
                      <motion.div
                        key={tile}
                        className="cursor-pointer overflow-hidden relative"
                        onClick={() => handleTileClick(index)}
                        whileTap={{ scale: 0.95 }}
                        layout
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        style={{
                          backgroundImage: 'url(/Screenshot_2026-02-13_at_10.26.55_PM.png)',
                          backgroundSize: `${SIZE * 100}% ${SIZE * 100}%`,
                          backgroundPosition: `${(col / (SIZE - 1)) * 100}% ${(row / (SIZE - 1)) * 100}%`,
                        }}
                      >
                        <div className="w-full h-full aspect-square" />
                      </motion.div>
                    )
                  })}
                </div>

                <AnimatePresence>
                  {showHint && (
                    <motion.div
                      className="absolute inset-0 rounded-xl overflow-hidden z-10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <img
                        src="/Screenshot_2026-02-13_at_10.26.55_PM.png"
                        alt="Hint"
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex items-center justify-between mt-4 px-2">
                <span className="text-rose-light/50 text-sm">Moves: {moves}</span>
                <button
                  onClick={handleHint}
                  className="px-4 py-2 rounded-xl bg-dark-soft border border-gold/20 text-gold-light text-sm cursor-pointer transition-all hover:bg-gold/10"
                >
                  Hint 👀
                </button>
              </div>

              <AnimatePresence>
                {encouragement && (
                  <motion.p
                    className="mt-3 text-gold-light font-cursive text-lg"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    {encouragement}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {solved && (
            <motion.div
              key="solved"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              <div className="rounded-2xl overflow-hidden border-2 border-gold/50 shadow-lg shadow-gold/20 mb-6">
                <img
                  src="/Screenshot_2026-02-13_at_10.26.55_PM.png"
                  alt="Us"
                  className="w-full"
                />
              </div>

              <motion.p
                className="font-cursive text-xl sm:text-2xl text-gold-light mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Dekha Babu?
              </motion.p>
              <motion.p
                className="text-rose-light text-lg mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.0 }}
              >
                Jab tum saath hoti ho, sab perfect ho jaata hai
              </motion.p>
              <motion.p
                className="text-rose-light/40 text-sm mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
              >
                {moves} moves mein solve kiya!
              </motion.p>

              <motion.button
                onClick={onNext}
                className="px-10 py-4 rounded-2xl bg-gradient-to-r from-gold-dark to-gold text-dark text-lg font-bold cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.0 }}
              >
                Aage Chalo →
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
