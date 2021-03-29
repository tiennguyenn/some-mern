import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import auth from './auth-helper'
import api from './api-auth'
import { Button, Card, CardActions, CardContent, Icon, TextField, Typography } from '@material-ui/core'

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
        auth.authenticate(result, () => {
          setRedirect(true)
        })
      }
    })
  }

  if (redirect) {
    return (<Redirect to="/" />)
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Sign In</Typography>
        <TextField id="emal" type="email" label="Email" onChange={e => handleEmail(e)} />
        <TextField id="password" type="password" label="Password" onChange={e => handlePassword(e)} />
        <br/>
        {error && <Typography component="p" color="error"><Icon color="error">error</Icon>{error}</Typography>}
      </CardContent>
      <CardActions>
        <Button variant="outlined" onClick={e => handleSubmit(e)}>Submit</Button>
      </CardActions>
    </Card>
  )
}

export default SignIn