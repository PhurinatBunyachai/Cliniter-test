declare module 'react-window-infinite-loader' {
  import { ComponentType, RefObject } from 'react'
  import { ListOnItemsRenderedProps, FixedSizeList } from 'react-window'

  interface InfiniteLoaderProps {
    isItemLoaded: (index: number) => boolean
    itemCount: number
    loadMoreItems: (startIndex: number, stopIndex: number) => Promise<void>
    children: (props: {
      onItemsRendered: (props: ListOnItemsRenderedProps) => void
      ref: RefObject<FixedSizeList>
    }) => React.ReactNode
  }

  const InfiniteLoader: ComponentType<InfiniteLoaderProps>
  export default InfiniteLoader
} 