import { useState, useMemo } from 'react'

interface UsePaginationProps {
  totalItems: number
  initialPage?: number
  pageSize?: number
  siblingCount?: number
}

interface PaginationRange {
  start: number
  end: number
}

export function usePagination({
  totalItems,
  initialPage = 1,
  pageSize = 10,
  siblingCount = 1,
}: UsePaginationProps) {
  const [currentPage, setCurrentPage] = useState(initialPage)

  const totalPages = Math.ceil(totalItems / pageSize)

  const paginationRange = useMemo(() => {
    // Always include first and last page
    const range: PaginationRange = {
      start: Math.max(2, currentPage - siblingCount), // Start from 2 since 1 is always shown
      end: Math.min(totalPages - 1, currentPage + siblingCount), // End at totalPages-1 since last page is always shown
    }
    console.log(range)
    return range
  }, [currentPage, totalPages, siblingCount])

  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  }

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1))
  }

  const goToPage = (page: number) => {
    setCurrentPage(Math.min(Math.max(1, page), totalPages))
  }

  const getPageItems = <T>(items: T[]): T[] => {
    const start = (currentPage - 1) * pageSize
    const end = start + pageSize
    return items.slice(start, end)
  }

  return {
    currentPage,
    totalPages,
    pageSize,
    paginationRange,
    nextPage,
    prevPage,
    goToPage,
    getPageItems,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1,
  }
}
