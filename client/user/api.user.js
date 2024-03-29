const list = async () => {
  try {
    const response = await fetch('/api/users', {method: 'GET'})
    return await response.json()
  } catch (error) {
    console.log(error)
  }
}

const read = async (userId, token) => {
  try {
    const response = await fetch(`/api/users/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
    return await response.json()
  } catch (error) {
    console.log(error)
  }
}

const create = async user => {
  try {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user)
    })

    return await response.json()
  } catch (error) {
    console.log(error)
  }
}

const remove = async (userId, token) => {
  const response = await fetch('/api/users/' + userId, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  })

  return await response.json()
}

const update = async (userId, token, user) => {
  const response = await fetch('/api/users/' + userId, {
    method: 'PUT',
    headers: {
      'Authorization': 'Bearer ' + token
    },
    body: user
  })
  return await response.json()
}

const follow = async (userId, token, followId) => {
  const response = await fetch('/api/users/follow', {
    method: 'PUT',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({userId, followId})
  })
  return await response.json()
}

const unfollow = async (userId, token, followId) => {
  const response = await fetch('/api/users/unfollow', {
    method: 'PUT',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({userId, followId})
  })
  return await response.json()
}

const findPeople = async (userId, token) => {
  const response = await fetch('/api/users/findpeople/' + userId, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  })
  return await response.json()
}


export default {findPeople, list, read, create, remove, update, follow, unfollow}