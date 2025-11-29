import React from 'react'

import { VirtualList } from '../components/virtual-list'
import { ComponentCard } from '../components/shared/component-card'

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
  const [items, setItems] = React.useState(generateItems(10_000))
  const title = `Virtual List (${items.length} items)`

  const [containerHeight, setContainerHeight] = React.useState(600)
  const handleContainerHeightChange = (
    ev: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newValue = parseInt(ev.target.value)
    setContainerHeight(newValue || 0)
  }

  const handleDeleteClick = (itemId: TodoItem['id']) => {
    const filtered = items.filter(item => item.id !== itemId)
    setItems(filtered)
  }

  return (
    <ComponentCard title={title}>
      <label htmlFor="container-height">Container height:</label>
      <input
        id="container-height"
        type="number"
        value={containerHeight}
        onChange={handleContainerHeightChange}
        step={25}
        min={100}
        max={1000}
        className="mb-4 border border-gray-300 p-1"
      />

      <VirtualList
        items={items}
        containerHeight={containerHeight}
        itemHeight={65}
        renderItem={(item: TodoItem) => (
          <div className="group flex w-full justify-between border-b border-gray-300 px-3 py-2 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:hover:bg-gray-700">
            <div>
              <h3 className="font-semibold">{item.title}</h3>
              <p>{item.description}</p>
            </div>

            <div className="m-1 flex flex-col justify-start">
              <button
                onClick={() => handleDeleteClick(item.id)}
                className="hidden size-5 rounded-sm bg-red-300 text-xs text-white group-hover:block hover:bg-red-400 active:bg-red-700"
              >
                &#10005;
              </button>
            </div>
          </div>
        )}
      />
    </ComponentCard>
  )
}
