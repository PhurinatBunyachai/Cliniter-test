import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home/Home'
import VirtualizedList from './pages/VirtualizedList/VirtualizedList'
import Pagination from './pages/Pagination/Pagination'
import Cart from './pages/Cart/Cart'
import Form from './pages/Form/Form'
import CRUD from './pages/CRUD/CRUD'
import DarkMode from './pages/DarkMode/DarkMode'
import { useLocation } from 'react-router-dom'

function App() {
  const {pathname} = useLocation();
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-xl font-bold text-indigo-600">Cliniter Exam</span>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link
                  to="/"
                  className={`nav ${pathname == '/' ? 'active' : ''}`}
                 
                >
                  Home
                </Link>
                <Link
                  to="/virtualized-list"
                  className={`nav ${pathname == '/virtualized-list' ? 'active' : ''}`}
                >
                  Virtualized List And Infinite Scroll
                </Link>
                <Link
                  to="/pagination"
                  className={`nav ${pathname == '/pagination' ? 'active' : ''}`}
                >
                  Pagination Hook And Export Csv
                </Link>
                <Link
                  to="/cart"
                  className={`nav ${pathname == '/cart' ? 'active' : ''}`}
                >
                  Cart
                </Link>
                <Link
                  to="/form-validation"
                  className={`nav ${pathname == '/form-validation' ? 'active' : ''}`}
                >
                  Form Validate
                </Link>
                <Link
                  to="/crud"
                  className={`nav ${pathname == '/crud' ? 'active' : ''}`}
                >
                  CRUD And Redux Persist
                </Link>
                <Link
                  to="/dark-mode"
                  className={`nav ${pathname == '/dark-mode' ? 'active' : ''}`}
                >
                  Dark Mode
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/virtualized-list" element={<VirtualizedList />} />
          <Route path="/pagination" element={<Pagination />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/form-validation" element={<Form />} />
          <Route path="/crud" element={<CRUD />} />
          <Route path="/dark-mode" element={<DarkMode />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
