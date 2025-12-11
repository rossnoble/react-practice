import { useState } from 'react'

type Item = {
  id: number
  completed: boolean
  title: string
}

const items = [
  { id: 1, completed: true, title: 'Feed cat' },
  { id: 2, completed: false, title: 'Buy groceries' },
  { id: 3, completed: false, title: 'Take out the trash' },
  { id: 4, completed: false, title: 'Cook dinner' },
]

type Props = {
  items: Item[]
}

export function SortableList({ items: initialItems = items }: Props) {
  const [items, setItems] = useState(initialItems)

  const handleCheckboxChange = (id: number) => {
    setItems(items =>
      items.map(item => {
        if (item.id === id) {
          return { ...item, completed: !item.completed }
        } else {
          return item
        }
      })
    )
  }

  return (
    <div className="flex flex-col gap-2">
      {items.map(item => (
        <div
          key={item.id}
          className="flex gap-3 rounded-md border border-gray-200 bg-gray-100 p-2"
        >
          <input
            id={`item-${item.id}`}
            type="checkbox"
            checked={item.completed}
            value={item.completed ? 1 : 0}
            onChange={_ => handleCheckboxChange(item.id)}
          />
          <label>{item.title}</label>
        </div>
      ))}
    </div>
  )
}
