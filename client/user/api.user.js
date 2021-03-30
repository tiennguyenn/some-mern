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


export default {list, read, create, remove}