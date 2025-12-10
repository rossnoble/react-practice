import { PropsWithChildren } from 'react'
import { Challenge } from '../challenges'

type Props = PropsWithChildren<{
  challenge: Challenge
}>

export function ChallengeLayout({ challenge, children }: Props) {
  return (
    <div>
      <header className="border-b-1 border-gray-200 bg-gray-100 py-4 dark:border-gray-700 dark:bg-gray-800">
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-1 text-lg font-semibold">{challenge.title}</h2>
          {challenge.description && (
            <p className="text-gray-600 dark:text-white">
              {challenge.description}
            </p>
          )}
        </div>
      </header>

      <div className="mx-auto mt-12 max-w-2xl">{children}</div>
    </div>
  )
}
