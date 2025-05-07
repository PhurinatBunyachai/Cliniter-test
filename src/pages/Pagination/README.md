# Example with API

```js
 import { usePagination } from '../../hooks/usePagination'
 //call api
 const data = fetch(url).then(res => res.json())

 const {
    currentPage,
    totalPages,
    paginationRange,
    nextPage,
    prevPage,
    goToPage,
    getPageItems,
    hasNextPage,
    hasPrevPage,
    } =  usePagination({
    totalItems: data.length,
    pageSize: 10,
  })

  // data for display 
  const data_to_dispaly = getPageItems(data)
```