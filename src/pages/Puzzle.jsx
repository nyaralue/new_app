import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import StarField from '../components/StarField'

const SIZE = 3
const TOTAL = SIZE * SIZE
const EMPTY = TOTAL - 1

const ENCOURAGEMENTS = [
  'Arre wah Bubu!',
  'Almost ho gaya Dukku!',
  'Meri smart Buggu!',
  'Babu tum toh genius ho!',
  'Kya baat hai Bubu!',
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

export default function Puzzle({ onNext }) {
  const [phase, setPhase] = useState('intro')
  const [tiles, setTiles] = useState(() => shuffle())
  const [moves, setMoves] = useState(0)
  const [solved, setSolved] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [encouragement, setEncouragement] = useState('')
  const boardRef = useRef(null)

  useEffect(() => {
    if (phase === 'intro') {
      const timer = setTimeout(() => setPhase('playing'), 3500)
      return () => clearTimeout(timer)
    }
  }, [phase])

  const handleTileClick = useCallback((clickedIndex) => {
    if (solved) return
    const emptyIndex = tiles.indexOf(EMPTY)

    const clickedRow = Math.floor(clickedIndex / SIZE)
    const clickedCol = clickedIndex % SIZE
    const emptyRow = Math.floor(emptyIndex / SIZE)
    const emptyCol = emptyIndex % SIZE

    const isNeighbor =
      (clickedRow === emptyRow && Math.abs(clickedCol - emptyCol) === 1) ||
      (clickedCol === emptyCol && Math.abs(clickedRow - emptyRow) === 1)

    if (!isNeighbor) return

    const newTiles = [...tiles];
    [newTiles[emptyIndex], newTiles[clickedIndex]] = [newTiles[clickedIndex], newTiles[emptyIndex]]
    setTiles(newTiles)
    setMoves(m => m + 1)

    if (Math.random() < 0.25) {
      setEncouragement(ENCOURAGEMENTS[Math.floor(Math.random() * ENCOURAGEMENTS.length)])
      setTimeout(() => setEncouragement(''), 1500)
    }

    if (isSolved(newTiles)) {
      setSolved(true)
    }
  }, [tiles, solved])

  const handleHint = () => {
    setShowHint(true)
    setTimeout(() => setShowHint(false), 2000)
  }

  const tileSize = 100 / SIZE

  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center px-4 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-dark-soft via-dark to-dark-soft" />
      <StarField count={20} />

      <div className="relative z-10 text-center w-full max-w-sm">
        <AnimatePresence mode="wait">
          {phase === 'intro' && (
            <motion.div
              key="intro"
              className="space-y-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="rounded-2xl overflow-hidden border-2 border-gold/30 shadow-lg shadow-gold/10">
                <img
                  src="/Screenshot_2026-02-13_at_10.26.55_PM.png"
                  alt="Us"
                  className="w-full"
                />
              </div>
              <p className="font-cursive text-xl sm:text-2xl text-rose-light px-2 leading-relaxed">
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
              <h2 className="font-cursive text-2xl sm:text-3xl text-rose-light mb-5">
                Photo jodo Bubu!
              </h2>

              <div className="relative mx-auto" style={{ width: '100%', maxWidth: 300 }}>
                <div
                  ref={boardRef}
                  className="relative w-full rounded-xl overflow-hidden border-2 border-rose-warm/20"
                  style={{ paddingBottom: '100%' }}
                >
                  {tiles.map((tile, index) => {
                    if (tile === EMPTY) return null

                    const currentRow = Math.floor(index / SIZE)
                    const currentCol = index % SIZE
                    const sourceRow = Math.floor(tile / SIZE)
                    const sourceCol = tile % SIZE

                    return (
                      <motion.div
                        key={tile}
                        className="absolute cursor-pointer overflow-hidden"
                        onClick={() => handleTileClick(index)}
                        animate={{
                          left: `${currentCol * tileSize}%`,
                          top: `${currentRow * tileSize}%`,
                        }}
                        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                        whileTap={{ scale: 0.92 }}
                        style={{
                          width: `${tileSize}%`,
                          height: `${tileSize}%`,
                          backgroundImage: 'url(/Screenshot_2026-02-13_at_10.26.55_PM.png)',
                          backgroundSize: `${SIZE * 100}% ${SIZE * 100}%`,
                          backgroundPosition: `${sourceCol * (100 / (SIZE - 1))}% ${sourceRow * (100 / (SIZE - 1))}%`,
                          border: '1px solid rgba(26, 10, 10, 0.6)',
                        }}
                      />
                    )
                  })}

                  <AnimatePresence>
                    {showHint && (
                      <motion.div
                        className="absolute inset-0 z-10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.85 }}
                        exit={{ opacity: 0 }}
                      >
                        <img
                          src="/Screenshot_2026-02-13_at_10.26.55_PM.png"
                          alt="Hint"
                          className="w-full h-full object-cover rounded-xl"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="flex items-center justify-between mt-5 px-2">
                <span className="text-rose-light/40 text-sm font-light">Moves: {moves}</span>
                <button
                  onClick={handleHint}
                  className="px-5 py-2.5 rounded-xl bg-dark-mid border border-gold/15 text-gold-light text-sm cursor-pointer transition-all hover:bg-gold/10 hover:border-gold/30"
                >
                  Peek
                </button>
              </div>

              <AnimatePresence>
                {encouragement && (
                  <motion.p
                    className="mt-4 text-gold-light font-cursive text-lg"
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
              <div className="rounded-2xl overflow-hidden border-2 border-gold/40 shadow-lg shadow-gold/20 mb-8">
                <img
                  src="/Screenshot_2026-02-13_at_10.26.55_PM.png"
                  alt="Us"
                  className="w-full"
                />
              </div>

              <motion.p
                className="font-cursive text-2xl sm:text-3xl text-gold-light mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Dekha Babu?
              </motion.p>
              <motion.p
                className="text-rose-light text-lg mb-8 font-light"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.0 }}
              >
                Jab tum saath hoti ho, sab perfect ho jaata hai
              </motion.p>
              <motion.p
                className="text-rose-light/30 text-sm mb-6 font-light"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
              >
                {moves} moves mein solve kiya!
              </motion.p>

              <motion.button
                onClick={onNext}
                className="px-12 py-5 rounded-2xl bg-gradient-to-r from-gold-dark to-gold text-dark text-lg font-bold cursor-pointer"
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(218, 165, 32, 0.4)' }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.0 }}
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
