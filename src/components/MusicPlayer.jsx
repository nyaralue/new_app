import { useState, useRef, useEffect } from 'react'

export default function MusicPlayer({ shouldPlay }) {
  const [muted, setMuted] = useState(false)
  const iframeRef = useRef(null)
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
          ref={iframeRef}
          src={`https://www.youtube.com/embed/6x8HVdS_TJs?autoplay=1&loop=1&playlist=6x8HVdS_TJs&controls=0&showinfo=0&rel=0&mute=${muted ? 1 : 0}`}
          className="hidden"
          allow="autoplay; encrypted-media"
          title="music"
        />
      )}
      {loaded && (
        <button
          onClick={() => setMuted(!muted)}
          className="fixed top-4 right-4 z-50 w-12 h-12 rounded-full bg-rose-deep/80 backdrop-blur-sm border border-rose-warm/30 flex items-center justify-center text-xl transition-all duration-300 hover:scale-110 hover:bg-rose-rich/90 cursor-pointer"
          aria-label={muted ? 'Unmute' : 'Mute'}
        >
          {muted ? '🔇' : '🎵'}
        </button>
      )}
    </>
  )
}
