const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false
  }

  if (sessionStorage.getItem('user')) {
    return true
  }

  return false
}

const authenticate = () => {
  sessionStorage.setItem('user', 1)
}

const clearUser = () => {
  sessionStorage.removeItem('user')
}

export default {isAuthenticated, authenticate, clearUser}