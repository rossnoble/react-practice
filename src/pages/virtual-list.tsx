import { VirtualList } from '../components/virtual-list'
import { ComponentCard } from '../components/component-card'

type TodoItem = {
  id: number
  title: string
  description: string
  timestamp: string
}

export const generateItems = (count: number): TodoItem[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    title: `Item ${i + 1}`,
    description: `Description for item ${i + 1}`,
    timestamp: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
  }))
}

export function VirtualListPage() {
  const items = generateItems(100)
  const title = `Virtual List (${items.length} items)`

  return (
    <ComponentCard title={title}>
      <VirtualList
        items={items}
        containerHeight={600}
        renderItem={(item: TodoItem) => (
          <div className="border-b border-gray-300 p-3 hover:bg-gray-200 dark:bg-gray-800">
            <h3 className="font-semibold">{item.title}</h3>
            <p>{item.description}</p>
          </div>
        )}
      />
    </ComponentCard>
  )
}
