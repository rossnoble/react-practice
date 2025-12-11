import { useEffect, useRef, useState } from 'react'

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

// State to store:
// 1. List of items
// 2. Selected item id
// 3. Y position of mouse as it moves
// 4. Y position of initial click
// 5. Ref of all items in the view to query bounds
//
// Event management
// 1. Click on an item: (1) set id as dragged item (2) set mouse Y start position
// 2. Bind mousemove and mouseup events to dragged set event via useEffect
// 3. Mouse move events update Y position
// 4. Mouse up (drop) events updates Y position and calculated offset using start Y position
// 5. Get boundary for each time to determine if dragged item is in bounds of other element
// 6. Set new state for items with shuffled order

export function SortableList({ items: initialItems = items }: Props) {
  const [items, setItems] = useState(initialItems)
  const [draggedId, setDraggedId] = useState(-1)

  const [dragYStart, setDragYStart] = useState(0)
  const [dragXStart, setDragXStart] = useState(0)
  const [mouseY, setMouseY] = useState(0)
  const [mouseX, setMouseX] = useState(0)

  const itemRefs = useRef(new Map()) // { item.id: RefElement }

  const onCheckboxChange = (id: number) => {
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

  const getTargetIndex = (mouseY: number) => {
    let targetIndex: number | undefined = undefined

    items.forEach((item, idx) => {
      if (draggedId === item.id) return

      const element = itemRefs.current.get(item.id)
      const boundary = element.getBoundingClientRect()

      // Will replace if mouse is inside bounds
      const inBounds = mouseY >= boundary.top && mouseY <= boundary.bottom
      if (inBounds) {
        targetIndex = idx
      }
    })

    return targetIndex
  }

  const onMouseDown = (ev: MouseEvent, item: Item) => {
    setDraggedId(item.id)
    // These need to be set as the same time so that the "dragged" item
    // is positioned a the Y position when it was clicked (e.g. 0 offset)
    setDragYStart(ev.clientY)
    setDragXStart(ev.clientX)
    setMouseY(ev.clientY)
    setMouseX(ev.clientX)
  }

  useEffect(() => {
    if (draggedId < 0) return

    const onMouseMove = (ev: MouseEvent) => {
      setMouseY(ev.clientY)
      setMouseX(ev.clientX)
    }

    const onMouseUp = (ev: MouseEvent) => {
      // Get new position in items list
      const targetIndex = getTargetIndex(ev.clientY)
      if (targetIndex !== undefined) {
        const draggedIndex = items.findIndex(item => item.id === draggedId)

        // Move dragged item into new position and adjust items accordingly
        const sorted = [...items]
        const moved = sorted.splice(draggedIndex, 1) // returns removed items array
        sorted.splice(targetIndex, 0, ...moved)

        setItems(sorted)
      }

      // Stop dragging. Reset everything
      setDraggedId(-1)
      setDragYStart(0)
      setMouseY(0)
      setMouseX(0)
    }

    // Bind events to mousemove and mouseup
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
    }
  }, [draggedId])

  const getDraggedStyle = (itemId: number) => {
    return draggedId === itemId
      ? 'bg-sky-100 border-sky-200 shadow-xl/5'
      : draggedId
        ? 'hover:bg-gray-100 border-gray-200'
        : 'bg-gray-100 border-gray-200'
  }

  return (
    <div className="flex flex-col gap-2">
      {items.map(item => (
        <div
          data-item-id={`item-${item.id}`}
          key={item.id}
          className={`flex cursor-grab gap-3 rounded-md border p-2 ${getDraggedStyle(item.id)}`}
          onMouseDown={(ev: any) => onMouseDown(ev, item)}
          style={{
            transform:
              draggedId === item.id
                ? `translateY(${mouseY - dragYStart}px) translateX(${mouseX - dragXStart}px)`
                : 'none',
          }}
          ref={el => {
            // Assign element to ref using item id as key
            itemRefs.current.set(item.id, el)
          }}
        >
          <input
            id={`item-${item.id}`}
            type="checkbox"
            checked={item.completed}
            value={item.completed ? 1 : 0}
            onChange={_ => onCheckboxChange(item.id)}
          />
          <label
            className={`select-none ${item.completed ? 'line-through' : ''}`}
          >
            {item.title}
          </label>
        </div>
      ))}
    </div>
  )
}
