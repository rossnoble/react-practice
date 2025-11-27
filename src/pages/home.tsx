import { Link } from 'wouter'

type PracticeComponent = {
  id: string
  title: string
  description: string
}

const components: PracticeComponent[] = [
  {
    title: 'Click counter',
    description: 'Simple counter with increment/decrement',
    id: 'click-counter',
  },
  {
    title: 'Date Picker',
    description: 'Date picker from scratch',
    id: 'date-picker',
  },
  {
    title: 'Virtual List',
    description: 'Generic virtual list',
    id: 'virtual-list',
  },
]

export function HomePage() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
        Components
      </h2>
      <div className="grid gap-3">
        {components.map(c => (
          <Link href={`/components/${c.id}`} key={c.id}>
            <div className="block bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 rounded-lg p-4 transition-colors">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                {c.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {c.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
