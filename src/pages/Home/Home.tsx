import { Link } from 'react-router-dom'

interface Feature {
  id: number
  title: string
  path: string
}

const features: Feature[] = [
  {
    id: 1,
    title: "Virtualized List And Infinite Scroll (Exam 1 & 7)",
    path: "/virtualized-list"
  },
  {
    id: 2,
    title: "Pagination Hook And Export Csv (Exam 2 & 9)",
    path: "/pagination"
  },
  {
    id: 3,
    title: "CRUD And Redux (Exam 3 & 10)",
    path: "/crud"
  },
  {
    id: 4,
    title: "Dark Mode (Exam 4)",
    path: "/dark-mode"
  },
  {
    id: 5,
    title: "Real-Time Chat Application (Not Finish)",
    path: "/chat"
  },
  {
    id: 6,
    title: "Form Validation (Exam 6)",
    path: "/form-validation"
  },
  {
    id: 8,
    title: "Cart (Exam 8)",
    path: "/cart"
  }
]

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
           Cliniter Exam Demo
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <Link
              key={feature.id}
              to={feature.path}
              className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  {feature.title}
                </h2>
                <span className="text-sm font-medium text-indigo-600">
                  #{feature.id}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
} 