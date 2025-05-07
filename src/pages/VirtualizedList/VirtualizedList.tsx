import { useState, useCallback } from 'react'
import { FixedSizeList as List } from 'react-window'
import InfiniteLoader from 'react-window-infinite-loader'

interface Item {
  id: number
  name: string
  email: string
}

// Generate items in chunks
const generateItems = (startIndex: number, count: number): Item[] => {
  return Array.from({ length: count }, (_, index) => ({
    id: startIndex + index + 1,
    name: `User ${startIndex + index + 1}`,
    email: `user${startIndex + index + 1}@example.com`
  }))
}

const ITEMS_PER_PAGE = 50
const TOTAL_ITEMS = 100000

export default function VirtualizedList() {
  const [items, setItems] = useState<Item[]>(() => generateItems(0, ITEMS_PER_PAGE))
  const [hasNextPage, setHasNextPage] = useState(true)
  const [isNextPageLoading, setIsNextPageLoading] = useState(false)

  const loadMoreItems = useCallback(async (startIndex: number, stopIndex: number) => {
    if (isNextPageLoading) return

    setIsNextPageLoading(true)
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const newItems = generateItems(startIndex, stopIndex - startIndex + 1)
    setItems(prevItems => [...prevItems, ...newItems])
    
    // Check if we've reached the end
    if (stopIndex >= TOTAL_ITEMS - 1) {
      setHasNextPage(false)
    }
    
    setIsNextPageLoading(false)
  }, [isNextPageLoading])

  const isItemLoaded = useCallback((index: number) => {
    return !hasNextPage || index < items.length
  }, [hasNextPage, items.length])

  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => {
    if (!isItemLoaded(index)) {
      return (
        <div
          style={style}
          className="flex items-center px-4 border-b border-gray-200 bg-gray-50"
        >
          <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-1/3"></div>
            <div className="h-3 bg-gray-200 rounded animate-pulse w-1/2 mt-2"></div>
          </div>
        </div>
      )
    }

    const item = items[index]
    return (
      <div
        style={style}
        className={`flex items-center px-4 border-b border-gray-200 ${
          index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
        }`}
      >
        <div className="flex-1">
          <div className="font-medium text-gray-900">{item.name}</div>
          <div className="text-sm text-gray-500">{item.email}</div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-[1280px] mx-auto h-screen flex flex-col">
      <div className="p-4 bg-white border-b mt-5 rounded-lg shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Virtualized List (100k items)</h1>
        <div className="text-sm text-gray-500">
          Loaded {items.length} of {TOTAL_ITEMS} items
        </div>
      </div>

      <div className="flex-1 bg-white rounded-lg shadow-sm mt-4">
        <InfiniteLoader
          isItemLoaded={isItemLoaded}
          itemCount={TOTAL_ITEMS}
          loadMoreItems={loadMoreItems}
        >
          {({ onItemsRendered, ref }) => (
            <List
              ref={ref}
              height={window.innerHeight - 200}
              width="100%"
              itemCount={TOTAL_ITEMS}
              itemSize={72}
              onItemsRendered={onItemsRendered}
              className="rounded-lg"
            >
              {Row}
            </List>
          )}
        </InfiniteLoader>
      </div>
    </div>
  )
}
