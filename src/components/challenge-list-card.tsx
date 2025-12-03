import { type Challenge } from '../../challenges'

type ChallengeListCardProps = {
  challenge: Challenge
}

export function ChallengeListCard({ challenge }: ChallengeListCardProps) {
  const getStatusStyles = () => {
    if (challenge.status === 'completed') {
      return 'bg-green-100 dark:bg-green-800 border-green-300'
    }

    return 'border-gray-200 bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700'
  }
  return (
    <div
      className={`block rounded-lg border p-4 transition-colors ${getStatusStyles()}`}
    >
      <h3 className="font-semibold text-gray-900 dark:text-gray-100">
        {challenge.title}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        {challenge.description}
      </p>
    </div>
  )
}
