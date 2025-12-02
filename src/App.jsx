import { Route, Link } from 'wouter'
import { useState } from 'react'
import { HomePage } from './pages/home'
import { ClickCounterPage } from './pages/click-counter'
import { DatePickerPage } from './pages/date-picker'
import { VirtualListPage } from './pages/virtual-list'
import { SearchHighlightsPage } from './pages/search-highlights'
import { SandpackPage } from './pages/sandpack'

function App() {
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains('dark')
  )

  const toggleDark = () => {
    document.documentElement.classList.toggle('dark')
    setIsDark(!isDark)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8 dark:bg-gray-950">
      <div className="mx-auto max-w-2xl">
        <header className="relative mb-8">
          <button
            onClick={toggleDark}
            className="absolute top-0 right-0 flex size-8 items-center justify-center rounded-md border-1 border-gray-300 bg-gray-100 p-2 transition-colors hover:bg-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
            aria-label="Toggle dark mode"
          >
            {isDark ? '☀️' : '🌙'}
          </button>
          <Link href="/">
            <div className="inline-block">
              <h1 className="mb-2 text-4xl font-bold text-gray-900 transition-colors hover:text-blue-600 dark:text-gray-100 dark:hover:text-blue-400">
                React Practice Playground
              </h1>
            </div>
          </Link>
          <p className="text-gray-600 dark:text-gray-400">
            Fun exercises for learning and interview and prep
          </p>
        </header>

        <div className="grid gap-6">
          <Route path="/" component={HomePage} />
          <Route
            path="/challenges/click-counter"
            component={ClickCounterPage}
          />
          <Route path="/challenges/date-picker" component={DatePickerPage} />
          <Route path="/challenges/virtual-list" component={VirtualListPage} />
          <Route
            path="/challenges/search-highlights"
            component={SearchHighlightsPage}
          />
          <Route path="/sandpack" component={SandpackPage} />
        </div>
      </div>
    </div>
  )
}

export default App
