import { useMemo } from 'react'
import { usePagination } from '../../hooks/usePagination'
import { generateUsers } from '../../utils/userSeed'
import CsvDownloader from 'react-csv-downloader'

export default function Pagination() {
  const users = useMemo(() => generateUsers(100), [])
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
  } = usePagination({
    totalItems: users.length,
    pageSize: 10,
    siblingCount: 1,
  })

  const currentUsers = getPageItems(users)
  const columns = [
    { id: 'id', displayName: 'ID' },
    { id: 'name', displayName: 'Name' },
    { id: 'email', displayName: 'Email' },
    { id: 'role', displayName: 'Role' }
  ]

  const csvData = currentUsers.map(user => ({
    id: user.id.toString(),
    name: user.name,
    email: user.email,
    role: user.role
  }))

  const renderPageNumbers = () => {
    const pages = []
    
    // Always add first page
    pages.push(
      <button
        key={1}
        onClick={() => goToPage(1)}
        className={`px-3 py-1 rounded-md cursor-pointer ${
          currentPage === 1
            ? 'bg-indigo-600 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        1
      </button>
    )

    // Add ellipsis if needed after first page
    if (paginationRange.start > 2) {
      pages.push(
        <span key="ellipsis-start" className="px-2">
          ...
        </span>
      )
    }

    // Add middle pages
    for (let i = paginationRange.start; i <= paginationRange.end; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => goToPage(i)}
          className={`px-3 py-1 rounded-md cursor-pointer ${
            currentPage === i
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {i}
        </button>
      )
    }

    // Add ellipsis if needed before last page
    if (paginationRange.end < totalPages - 1) {
      pages.push(
        <span key="ellipsis-end" className="px-2">
          ...
        </span>
      )
    }

    // Always add last page if there is more than one page
    if (totalPages > 1) {
      pages.push(
        <button
          key={totalPages}
          onClick={() => goToPage(totalPages)}
          className={`px-3 py-1 rounded-md cursor-pointer ${
            currentPage === totalPages
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {totalPages}
        </button>
      )
    }

    return pages
  }

  return (
    <div className="max-w-[1280px] mx-auto p-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Pagination Demo</h1>
        <div className='flex justify-start align-center my-5'>
        <CsvDownloader
            datas={csvData}
            columns={columns}
            filename="users.csv"
          >
            <span className='px-5 py-2 rounded-md cursor-pointer bg-indigo-600 text-white'>Download</span>
          </CsvDownloader>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentUsers.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      user.role === 'Admin' ? 'bg-purple-100 text-purple-800' : 
                      user.role === 'Editor' ? 'bg-blue-100 text-blue-800' :
                      user.role === 'Manager' ? 'bg-green-100 text-green-800' :
                      user.role === 'Viewer' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">{(currentPage - 1) * 10 + 1}</span> to{' '}
            <span className="font-medium">{Math.min(currentPage * 10, users.length)}</span> of{' '}
            <span className="font-medium">{users.length}</span> results
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={prevPage}
              disabled={!hasPrevPage}
              className={`px-3 py-1 rounded-md cursor-pointer ${
                hasPrevPage
                  ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  : 'bg-gray-50 text-gray-400 cursor-not-allowed'
              }`}
            >
              Previous
            </button>

            {renderPageNumbers()}

            <button
              onClick={nextPage}
              disabled={!hasNextPage}
              className={`px-3 py-1 rounded-md cursor-pointer ${
                hasNextPage
                  ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  : 'bg-gray-50 text-gray-400 cursor-not-allowed'
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 