const list = async () => {
  try {
    const response = await fetch('/api/users', {method: 'GET'})
    return await response.json()
  } catch (error) {
    console.log(error)
  }
}


export {list}