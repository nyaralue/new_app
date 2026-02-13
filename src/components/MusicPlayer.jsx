import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function MusicPlayer({ shouldPlay }) {
  const [muted, setMuted] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (shouldPlay && !loaded) {
      setLoaded(true)
    }
  }, [shouldPlay, loaded])

  return (
    <>
      {loaded && (
        <iframe
          src={`https://www.youtube.com/embed/6x8HVdS_TJs?autoplay=1&loop=1&playlist=6x8HVdS_TJs&controls=0&showinfo=0&rel=0&mute=${muted ? 1 : 0}`}
          className="hidden"
          allow="autoplay; encrypted-media"
          title="music"
        />
      )}
      {loaded && (
        <motion.button
          onClick={() => setMuted(!muted)}
          className="fixed top-5 right-5 z-50 w-11 h-11 rounded-full bg-dark-mid/80 backdrop-blur-md border border-rose-warm/20 flex items-center justify-center text-lg transition-all duration-300 hover:border-rose-warm/50 cursor-pointer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label={muted ? 'Unmute' : 'Mute'}
        >
          {muted ? '🔇' : '🎵'}
        </motion.button>
      )}
    </>
  )
}
