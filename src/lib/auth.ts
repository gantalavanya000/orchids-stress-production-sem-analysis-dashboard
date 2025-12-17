export interface User {
  id: string
  email: string
  role: 'admin' | 'employee'
  name: string
}

const DEMO_USERS = {
  admin: {
    id: '1',
    email: 'admin@company.com',
    password: 'admin123',
    role: 'admin' as const,
    name: 'Admin User'
  },
  employee: {
    id: '2',
    email: 'employee@company.com',
    password: 'employee123',
    role: 'employee' as const,
    name: 'Employee User'
  }
}

export function authenticateUser(email: string, password: string): User | null {
  const user = Object.values(DEMO_USERS).find(
    u => u.email === email && u.password === password
  )
  
  if (user) {
    const { password: _, ...userWithoutPassword } = user
    return userWithoutPassword
  }
  
  return null
}

export function storeUser(user: User) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('user', JSON.stringify(user))
  }
}

export function getStoredUser(): User | null {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('user')
    return stored ? JSON.parse(stored) : null
  }
  return null
}

export function clearUser() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('user')
  }
}
