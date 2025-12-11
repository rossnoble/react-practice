import { Route } from 'wouter'
import { useState } from 'react'

import { HomePage } from './pages/home'
import { SandpackPage } from './pages/sandpack'
import { MainLayout } from './layouts/main-layout'
import { challenges, type Challenge } from './challenges'

import { ChallengeLayout } from './layouts/challenge-layout'
import { ClickCounter } from './challenges/click-counter'
import { DatePicker } from './challenges/date-picker'
import { EntryPoint as VirtualList } from './challenges/virtual-list'
import { SearchHighlights } from './challenges/search-highlights'
import { ToastNotifications } from './challenges/toast-notifications'
import { Roomba } from './challenges/roomba'
import { DigitalClock } from './challenges/digital-clock'
import { AnalogClock } from './challenges/analog-clock'
import { TemperatureConverter } from './challenges/temperature-converter'
import { Modal } from './challenges/modal'
import { SortableList } from './challenges/sortable-list'

const pageComponents: Record<Challenge['id'], React.ComponentType> = {
  'click-counter': ClickCounter,
  'date-picker': DatePicker,
  'virtual-list': VirtualList,
  'search-highlights': SearchHighlights,
  'toast-notifications': ToastNotifications,
  roomba: Roomba,
  'digital-clock': DigitalClock,
  'analog-clock': AnalogClock,
  'temperature-converter': TemperatureConverter,
  modal: Modal,
  'sortable-list': SortableList,
}

function App() {
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains('dark')
  )

  const toggleDark = () => {
    document.documentElement.classList.toggle('dark')
    setIsDark(!isDark)
  }

  return (
    <MainLayout onToggleDark={toggleDark} isDark={isDark}>
      <Route path="/" component={HomePage} />
      {challenges.map(challenge => (
        <Route
          key={challenge.id}
          path={`/challenges/${challenge.id}`}
          component={() => {
            const Component = pageComponents[challenge.id]
            return (
              <ChallengeLayout challenge={challenge}>
                <Component />
              </ChallengeLayout>
            )
          }}
        />
      ))}

      <Route path="/sandbox" component={SandpackPage} />
    </MainLayout>
  )
}

export default App
