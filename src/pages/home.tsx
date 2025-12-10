import { Link } from 'wouter'

import { challenges } from '../challenges'
import { ChallengeListCard } from '../components/challenge-list-card'

export function HomePage() {
  return (
    <div className="space-y-12">
      <div>
        <header className="mb-4">
          <h2 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Challenges
          </h2>
        </header>

        <div className="grid gap-3">
          {challenges.map(challenge => (
            <Link href={`/challenges/${challenge.id}`} key={challenge.id}>
              <ChallengeListCard challenge={challenge} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
