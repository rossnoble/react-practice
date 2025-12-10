import { Route } from 'wouter'
import { useState } from 'react'
import { HomePage } from './pages/home'
import { ClickCounter } from './challenges/click-counter'
import { DatePickerPage } from './pages/date-picker'
import { VirtualListPage } from './pages/virtual-list'
import { SearchHighlights } from './challenges/search-highlights'
import { ToastNotificationsPage } from './pages/toast-notifications'
import { RoombaPage } from './pages/roomba'
import { DigitalClockPage } from './pages/digital-clock'
import { AnalogClockPage } from './pages/analog-clock'
import { TemperatureConverterPage } from './pages/temperature-converter'
import { SandpackPage } from './pages/sandpack'
import { MainLayout } from './layouts/main-layout'
import { challenges, type Challenge } from './challenges'
import { ChallengeLayout } from './layouts/challenge-layout'

const pageComponents: Record<Challenge['id'], React.ComponentType> = {
  'click-counter': ClickCounter,
  'date-picker': DatePickerPage,
  'virtual-list': VirtualListPage,
  'search-highlights': SearchHighlights,
  'toast-notifications': ToastNotificationsPage,
  roomba: RoombaPage,
  'digital-clock': DigitalClockPage,
  'analog-clock': AnalogClockPage,
  'temperature-converter': TemperatureConverterPage,
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
