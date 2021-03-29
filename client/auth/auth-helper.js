const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false
  }

  if (sessionStorage.getItem('jwt')) {
    return JSON.parse(sessionStorage.getItem('jwt'))
  }

  return false
}

const authenticate = (jwt, cb) => {
  sessionStorage.setItem('jwt', JSON.stringify(jwt))
  cb()
}

const clearUser = () => {
  sessionStorage.removeItem('jwt')
}

export default {isAuthenticated, authenticate, clearUser}