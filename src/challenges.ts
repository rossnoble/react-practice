type Status = 'completed' | 'in-progress' | 'not-started'

export type Challenge = {
  id: string
  title: string
  description: string
  status?: Status
}

export const challenges: Challenge[] = [
  {
    id: 'click-counter',
    title: 'Click counter',
    description: 'Simple counter with increment/decrement',
    status: 'completed',
  },
  {
    id: 'date-picker',
    title: 'Date picker',
    description: 'Date picker from scratch',
    status: 'completed',
  },
  {
    id: 'virtual-list',
    title: 'Virtual list',
    description: 'Generic virtual list',
    status: 'completed',
  },
  {
    id: 'search-highlights',
    title: 'Search highlighting',
    description: 'Search as you type with result highlighting',
    status: 'completed',
  },
]
