import { Route, Link } from 'wouter'
import { ClickCounterPage } from './pages/click-counter'
import { DatePickerPage } from './pages/date-picker'

const components = [
  {
    title: 'Click counter',
    description: 'Simple counter with increment/decrement',
    id: 'click-counter',
  },
  { title: 'Date Picker', description: 'Date picker from scratch', id: 'date-picker' },
]

function Home() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Components</h2>
      <div className="grid gap-3">
        {components.map(c => (
          <Link href={`/components/${c.id}`} key={c.id}>
            <div className="block bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 rounded-lg p-4 transition-colors">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">{c.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{c.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

function App() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
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
            Build and test standalone components here
          </p>
        </header>

        <div className="grid gap-6">
          <Route path="/" component={Home} />
          <Route path="/components/click-counter" component={ClickCounterPage} />
          <Route path="/components/date-picker" component={DatePickerPage} />
        </div>
      </div>
    </div>
  )
}

export default App
