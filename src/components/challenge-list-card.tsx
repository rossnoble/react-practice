import { CheckCircle, Clock, Circle } from 'lucide-react'

import { type Challenge } from '../challenges'

type ChallengeListCardProps = {
  challenge: Challenge
}

export function ChallengeListCard({ challenge }: ChallengeListCardProps) {
  const getStatusStyles = () => {
    if (challenge.status === 'completed') {
      return 'bg-green-50 dark:bg-green-900 border-green-300 dark:border-green-700 hover:border-green-400 hover:outline-green-400'
    } else if (challenge.status === 'in-progress') {
      return 'bg-sky-50 dark:bg-sky-800 border-sky-300 dark:border-sky-700 dark:bg-sky-900 hover:border-sky-400 hover:outline-sky-400'
    }

    return 'border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-gray-500 hover:border-gray-400'
  }

  const getStatusIcon = () => {
    if (challenge.status === 'completed') {
      return (
        <CheckCircle className="size-5 text-green-600 dark:text-green-300" />
      )
    } else if (challenge.status === 'in-progress') {
      return <Clock className="size-5 text-sky-600 dark:text-sky-300" />
    }
    return <Circle className="size-5 text-gray-400 dark:text-gray-500" />
  }

  return (
    <div
      className={`flex items-start justify-between rounded-lg border px-4 py-3 ${getStatusStyles()} h-full`}
    >
      <div>
        <h3 className="mb-1 font-semibold text-gray-900 dark:text-gray-100">
          {challenge.title}
        </h3>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          {challenge.description}
        </p>
      </div>
      <div className="flex-shrink-0">{getStatusIcon()}</div>
    </div>
  )
}
