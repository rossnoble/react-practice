import { ReactNode, useEffect, useState } from 'react'

type VirtualListProps<T> = {
  items: T[]
  itemHeight?: number
  containerHeight?: number
  renderItem: (item: T) => ReactNode
}

export function VirtualList<T>({
  items,
  itemHeight = 64,
  containerHeight = 300,
  renderItem,
}: VirtualListProps<T>) {
  const [scrollTop, setScrollTop] = useState(0)

  const getIndex = (item: unknown, index: number) => {
    return isItemWithId(item) ? item.id : `${visibleStartIndex}-${index}`
  }

  const handleScroll = (ev: React.UIEvent<HTMLDivElement>) => {
    // Scroll event on the parent container
    setScrollTop(ev.currentTarget.scrollTop)
  }

  // Number of items to hide from the head to the start of the viewport
  const visibleStartIndex = Math.floor(scrollTop / itemHeight)

  // Number of items inside the height of the viewport
  const visibleEndIndex = Math.ceil((scrollTop + containerHeight) / itemHeight)

  useEffect(() => {
    const sliceMsg = `Show slice: [${visibleStartIndex}, ${visibleEndIndex}]`
    const countMsg = `Item count: ${visibleEndIndex - visibleStartIndex}`

    console.log(sliceMsg, countMsg)
  }, [visibleStartIndex, visibleEndIndex])

  const visibleItems = items.slice(visibleStartIndex, visibleEndIndex)

  // Match the height of the elements from the start until the viewport
  const paddingTop = visibleStartIndex * itemHeight

  // Match the height of the elements from the end of the viewport to the bottom
  const paddingBottom = (items.length - visibleEndIndex) * itemHeight

  return (
    <div
      className={`relative flex flex-col overflow-x-auto overflow-y-auto rounded-md border-1 border-gray-600 p-1 outline outline-3 outline-transparent transition-all duration-300 hover:border-sky-600 hover:outline-sky-200 dark:hover:border-sky-900 dark:hover:outline-sky-900`}
      style={{ height: `${containerHeight}px` }}
      onScroll={handleScroll}
    >
      <div>
        <div style={{ height: `${paddingTop}px` }} />

        {visibleItems.map((item, index) => (
          <div
            key={getIndex(item, index)}
            data-item-key={getIndex(item, index)}
            style={{
              height: `${itemHeight}px`,
              top: (visibleStartIndex + index) * itemHeight,
            }}
            className="absolute right-0 left-0"
          >
            {renderItem(item)}
          </div>
        ))}

        <div style={{ height: `${paddingBottom}px` }} />
      </div>
    </div>
  )
}

type ItemWithId = {
  id: string | number
}

function isItemWithId(item: unknown): item is ItemWithId {
  return (item as ItemWithId).id !== 'undefined'
}
