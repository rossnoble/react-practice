type Status = 'completed' | 'in-progress' | 'not-started'

export type ChallengePageProps = {
  challenge?: Challenge
}

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
    description: 'Simple counter with min and max values',
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
  {
    id: 'toast-notifications',
    title: 'Toast notifications',
    description: 'Build a toast notification system with Context API',
    status: 'completed',
  },
  {
    id: 'roomba',
    title: 'Roomba',
    description: 'Simulate a roomba vacuum cleaner moving around a grid',
    status: 'completed',
  },
  {
    id: 'digital-clock',
    title: 'Digital clock',
    description: 'Real-time digital clock display',
    status: 'completed',
  },
  {
    id: 'analog-clock',
    title: 'Analog clock',
    description: 'Real-time analog clock display',
    status: 'completed',
  },
  {
    id: 'temperature-converter',
    title: 'Temperature converter',
    description: 'Convert between Celsius and Fahrenheit',
    status: 'completed',
  },
  {
    id: 'modal',
    title: 'Modal',
    description: 'Accessible modal with keyboard support',
    status: 'not-started',
  },
  {
    id: 'sortable-list',
    title: 'Sortable list',
    description: 'Drag-and-drop sortable to-do list',
    status: 'completed',
  },
]
