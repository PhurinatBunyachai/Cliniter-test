export interface User {
  id: number
  name: string
  email: string
  role: string
}

/**
 * Generate a single user
 */
export const generateUser = (index: number): User => ({
  id: index + 1,
  name: `User ${index + 1}`,
  email: `user${index + 1}@example.com`,
  role: index % 2 === 0 ? 'Admin' : 'User'
})

/**
 * Generate an array of users
 */
export const generateUsers = (count: number = 100): User[] => {
  return Array.from({ length: count }, (_, index) => generateUser(index))
}

