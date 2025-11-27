import { ReactNode } from 'react'

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
  itemHeight = 24,
  containerHeight = 300,
  renderItem,
}: VirtualListProps<T>) {
  const getIndex = (item: unknown, index: number) => {
    // TODO: Handle index callback correctly
    return isItemWithId(item) ? item.id : index
  }

  return (
    <div
      className={`p-1 overflow-x-auto overflow-y-scroll border-2 border-gray-400 rounded-md inset-shadow-lg relative`}
      style={{ height: `${containerHeight}px` }}
    >
      {items.map((item, index) => (
        <div key={getIndex(item, index)} className={`h-[${itemHeight}px]`}>
          {renderItem(item)}
        </div>
      ))}
    </div>
  )
}

/*
const itemHeight = 50;
const containerHeight = 600;
const scrollTop = 2500; // User scrolled down

// Which items should we render?
const startIndex = Math.floor(scrollTop / itemHeight); // 50
const endIndex = Math.ceil((scrollTop + containerHeight) / itemHeight); // 62

// How much padding?
const paddingTop = startIndex * itemHeight; // 2500px
const paddingBottom = (totalItems - endIndex) * itemHeight; // 496,900px
   */
