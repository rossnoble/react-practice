import { CheckCircle, Clock, Circle } from 'lucide-react'

import { type Challenge } from '../challenges'

type ChallengeListCardProps = {
  challenge: Challenge
}

export function ChallengeListCard({ challenge }: ChallengeListCardProps) {
  const getStatusStyles = () => {
    if (challenge.status === 'completed') {
      return 'bg-green-100 dark:bg-green-800 border-green-300'
    } else if (challenge.status === 'in-progress') {
      return 'bg-sky-100 dark:bg-sky-800 border-sky-300'
    }

    return 'border-gray-200 bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700'
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
      className={`flex items-center justify-between rounded-lg border p-4 transition-colors ${getStatusStyles()}`}
    >
      <div>
        <h3 className="font-semibold text-gray-900 dark:text-gray-100">
          {challenge.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {challenge.description}
        </p>
      </div>
      <div className="flex-shrink-0">{getStatusIcon()}</div>
    </div>
  )
}
