import ClickCounter from './components/ClickCounter'

function App() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">React Practice Playground</h1>
          <p className="text-gray-600">Build and test standalone components here</p>
        </header>

        <div className="grid gap-6">
          <ClickCounter minCount={-5} maxCount={5} />
        </div>
      </div>
    </div>
  )
}

export default App
