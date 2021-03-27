const signIn = async user => {
  try {
    const response = await fetch('/api/signIn', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    return await response.json()
  } catch (error) {
    console.log(error)
  }
}

export default {signIn}