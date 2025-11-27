import { Route, Link } from 'wouter'
import { HomePage } from './pages/home'
import { ClickCounterPage } from './pages/click-counter'
import { DatePickerPage } from './pages/date-picker'
import { VirtualListPage } from './pages/virtual-list'

function App() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-8">
      <div className="max-w-2xl mx-auto">
        <header className="mb-8">
          <Link href="/">
            <div className="inline-block">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
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
            path="/components/click-counter"
            component={ClickCounterPage}
          />
          <Route path="/components/date-picker" component={DatePickerPage} />
          <Route path="/components/virtual-list" component={VirtualListPage} />
        </div>
      </div>
    </div>
  )
}

export default App
