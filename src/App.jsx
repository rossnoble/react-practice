import { Route } from 'wouter'
import { useState } from 'react'
import { HomePage } from './pages/home'
import { ClickCounterPage } from './pages/click-counter'
import { DatePickerPage } from './pages/date-picker'
import { VirtualListPage } from './pages/virtual-list'
import { SearchHighlightsPage } from './pages/search-highlights'
import { SandpackPage } from './pages/sandpack'
import { PreviewLayout } from './layouts/PreviewLayout'

function App() {
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains('dark')
  )

  const toggleDark = () => {
    document.documentElement.classList.toggle('dark')
    setIsDark(!isDark)
  }

  return (
    <PreviewLayout onToggleDark={toggleDark} isDark={isDark}>
      <Route path="/" component={HomePage} />
      <Route path="/challenges/click-counter" component={ClickCounterPage} />
      <Route path="/challenges/date-picker" component={DatePickerPage} />
      <Route path="/challenges/virtual-list" component={VirtualListPage} />
      <Route
        path="/challenges/search-highlights"
        component={SearchHighlightsPage}
      />
      <Route path="/sandbox" component={SandpackPage} />
    </PreviewLayout>
  )
}

export default App
