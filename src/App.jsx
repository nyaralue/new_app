import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import FloatingHearts from './components/FloatingHearts'
import MusicPlayer from './components/MusicPlayer'
import NameGate from './pages/NameGate'
import ValentineQuestion from './pages/ValentineQuestion'
import Celebration from './pages/Celebration'
import DoorGame from './pages/DoorGame'
import Puzzle from './pages/Puzzle'
import Proposal from './pages/Proposal'
import Forgiveness from './pages/Forgiveness'

const PAGES = {
  GATE: 'gate',
  VALENTINE: 'valentine',
  CELEBRATION: 'celebration',
  DOORS: 'doors',
  PUZZLE: 'puzzle',
  PROPOSAL: 'proposal',
  FORGIVENESS: 'forgiveness',
}

export default function App() {
  const [page, setPage] = useState(PAGES.GATE)
  const [musicStarted, setMusicStarted] = useState(false)

  const handleUnlock = () => {
    setMusicStarted(true)
    setPage(PAGES.VALENTINE)
  }

  return (
    <div className="relative min-h-screen min-h-dvh">
      {page !== PAGES.GATE && <FloatingHearts />}
      <MusicPlayer shouldPlay={musicStarted} />

      <AnimatePresence mode="wait">
        {page === PAGES.GATE && (
          <NameGate key="gate" onUnlock={handleUnlock} />
        )}
        {page === PAGES.VALENTINE && (
          <ValentineQuestion key="valentine" onYes={() => setPage(PAGES.CELEBRATION)} />
        )}
        {page === PAGES.CELEBRATION && (
          <Celebration key="celebration" onNext={() => setPage(PAGES.DOORS)} />
        )}
        {page === PAGES.DOORS && (
          <DoorGame key="doors" onNext={() => setPage(PAGES.PUZZLE)} />
        )}
        {page === PAGES.PUZZLE && (
          <Puzzle key="puzzle" onNext={() => setPage(PAGES.PROPOSAL)} />
        )}
        {page === PAGES.PROPOSAL && (
          <Proposal key="proposal" onNext={() => setPage(PAGES.FORGIVENESS)} />
        )}
        {page === PAGES.FORGIVENESS && (
          <Forgiveness key="forgiveness" />
        )}
      </AnimatePresence>
    </div>
  )
}
