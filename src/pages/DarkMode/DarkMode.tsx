import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../../store/store'
import { toggleDarkMode } from '../../store/darkModeSlice'

export default function DarkMode() {
  const dispatch = useDispatch()
  const isDarkMode = useSelector((state: RootState) => state.darkMode.isDarkMode)

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])


  return (
    <div className="max-w-[1280px] mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dark Mode Toggle</h1>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={isDarkMode}
              onChange={() => dispatch(toggleDarkMode())}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
              {isDarkMode ? 'Dark' : 'Light'}
            </span>
          </label>
        </div>
      </div>
    </div>
  )
}
