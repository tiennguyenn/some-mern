import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import auth from './auth-helper'
import api from './api-auth'

const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [redirect, setRedirect] = useState(false)
  const [error, setError] = useState('')

  const handleEmail = (event) => {
    setEmail(event.target.value)
  }

  const handlePassword = (event) => {
    setPassword(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    api.signIn({email, password}).then((result) => {
      if (result.error) {
        setError(result.error)
      } else {
        auth.authenticate()
        setRedirect(true)
      }
    })
  }


  if (redirect) {
    return (<Redirect to="/" />)
  }

  return (
    <form onSubmit={e => handleSubmit(e)}>
      <span>{error}</span>
      <input name="email" onChange={e => handleEmail(e)} />
      <input type="password" name="password" onChange={e => handlePassword(e)} />
      <button type="submit">Submit</button>
    </form>
  )
}

export default SignIn