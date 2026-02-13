import { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'

const VIDEO_ID = '6x8HVdS_TJs'

export default function MusicPlayer({ shouldPlay }) {
  const [playing, setPlaying] = useState(false)
  const [ready, setReady] = useState(false)
  const playerRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    if (!shouldPlay) return

    let player
    const tag = document.createElement('script')
    tag.src = 'https://www.youtube.com/iframe_api'
    document.head.appendChild(tag)

    window.onYouTubeIframeAPIReady = () => {
      player = new window.YT.Player(containerRef.current, {
        height: '0',
        width: '0',
        videoId: VIDEO_ID,
        playerVars: {
          autoplay: 1,
          loop: 1,
          playlist: VIDEO_ID,
          controls: 0,
          showinfo: 0,
          modestbranding: 1,
          rel: 0,
        },
        events: {
          onReady: (event) => {
            playerRef.current = event.target
            event.target.setVolume(40)
            event.target.playVideo()
            setReady(true)
            setPlaying(true)
          },
        },
      })
    }

    if (window.YT && window.YT.Player) {
      window.onYouTubeIframeAPIReady()
    }

    return () => {
      if (player && player.destroy) {
        player.destroy()
      }
    }
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
      <div ref={containerRef} className="hidden" />

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
