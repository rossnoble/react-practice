import { Roomba } from '../challenges/roomba'
import { ComponentCard } from '../components/component-card'
import { type ChallengePageProps } from '../challenges'

export function RoombaPage({ challenge }: ChallengePageProps) {
  const { title, description } = challenge ?? {}

  return (
    <ComponentCard {...{ title, description }}>
      <Roomba />
    </ComponentCard>
  )
}
