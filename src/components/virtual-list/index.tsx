import { ReactNode, useEffect, useState } from 'react'

type ItemWithId = {
  id: string | number
}

function isItemWithId(item: unknown): item is ItemWithId {
  return (item as ItemWithId).id !== 'undefined'
}

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
      className={`p-1 overflow-x-auto overflow-y-auto border-1 border-gray-600 hover:border-sky-600 rounded-md outline outline-3 outline-gray-300 hover:outline-sky-300 flex flex-col relative`}
      style={{ height: `${containerHeight}px` }}
      onScroll={handleScroll}
    >
      <div style={{ paddingTop: `${paddingTop}px` }} />

      <div>
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
      </div>

      <div style={{ paddingBottom: `${paddingBottom}px` }} />
    </div>
  )
}
