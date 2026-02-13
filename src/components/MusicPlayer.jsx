import { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'

const VIDEO_ID = '6x8HVdS_TJs'

export default function MusicPlayer({ shouldPlay }) {
  const [playing, setPlaying] = useState(false)
  const [ready, setReady] = useState(false)
  const playerRef = useRef(null)
  const divRef = useRef(null)
  const initRef = useRef(false)

  useEffect(() => {
    if (!shouldPlay || initRef.current) return
    initRef.current = true

    const loadApi = () => {
      if (window.YT && window.YT.Player) {
        createPlayer()
        return
      }

      const existing = document.querySelector('script[src*="youtube.com/iframe_api"]')
      if (!existing) {
        const tag = document.createElement('script')
        tag.src = 'https://www.youtube.com/iframe_api'
        document.head.appendChild(tag)
      }

      const prev = window.onYouTubeIframeAPIReady
      window.onYouTubeIframeAPIReady = () => {
        if (prev) prev()
        createPlayer()
      }
    }

    const createPlayer = () => {
      if (!divRef.current || playerRef.current) return

      playerRef.current = new window.YT.Player(divRef.current, {
        height: '1',
        width: '1',
        videoId: VIDEO_ID,
        playerVars: {
          autoplay: 1,
          loop: 1,
          playlist: VIDEO_ID,
          controls: 0,
          showinfo: 0,
          modestbranding: 1,
          rel: 0,
          playsinline: 1,
          origin: window.location.origin,
        },
        events: {
          onReady: (event) => {
            event.target.setVolume(50)
            event.target.playVideo()
            setReady(true)
            setPlaying(true)
          },
          onStateChange: (event) => {
            if (event.data === window.YT.PlayerState.PLAYING) {
              setPlaying(true)
            }
          },
        },
      })
    }

    loadApi()
  }, [shouldPlay])

  const togglePlay = useCallback(() => {
    const p = playerRef.current
    if (!p) return

    if (playing) {
      p.pauseVideo()
      setPlaying(false)
    } else {
      p.playVideo()
      setPlaying(true)
    }
  }, [playing])

  return (
    <>
      <div
        ref={divRef}
        style={{
          position: 'fixed',
          top: '-9999px',
          left: '-9999px',
          width: '1px',
          height: '1px',
          opacity: 0.01,
          pointerEvents: 'none',
        }}
      />

      {ready && (
        <motion.button
          onClick={togglePlay}
          className="fixed top-5 right-5 z-50 w-12 h-12 rounded-full flex items-center justify-center text-lg cursor-pointer border-2"
          style={{
            background: 'rgba(13,5,5,0.9)',
            borderColor: playing ? 'rgba(220,20,60,0.4)' : 'rgba(255,255,255,0.1)',
            boxShadow: playing ? '0 0 20px rgba(220,20,60,0.2)' : 'none',
            backdropFilter: 'blur(12px)',
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label={playing ? 'Pause music' : 'Play music'}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {playing ? '🎵' : '🔇'}
        </motion.button>
      )}
    </>
  )
}
