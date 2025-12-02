import { Link } from 'wouter'

type Challenge = {
  id: string
  title: string
  description: string
}

const challenges: Challenge[] = [
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
  {
    title: 'Search Highlights',
    description: 'Search as you type with result highlighting',
    id: 'search-highlights',
  },
]

export function HomePage() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
        Components
      </h2>
      <div className="grid gap-3">
        {challenges.map(challenge => (
          <Link href={`/challenges/${challenge.id}`} key={challenge.id}>
            <div className="block rounded-lg border border-gray-200 bg-white p-4 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                {challenge.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {challenge.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
