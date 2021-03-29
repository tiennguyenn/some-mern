import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import auth from './auth-helper'
import api from './api-auth'
import { Button, Card, CardActions, CardContent, Icon, makeStyles, TextField, Typography } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2)
  },
  error: {
    verticalAlign: 'middle'
  },
  title: {
    marginTop: theme.spacing(2),
    color: theme.palette.openTitle
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300
  },
  submit: {
    margin: 'auto',
    marginBottom: theme.spacing(2)
  }
}))

const SignIn = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [redirect, setRedirect] = useState(false)
  const [error, setError] = useState('')
  const classes = useStyles()

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

  const {from} = props.location.state || {from: {pathname: '/'}}
  if (redirect) {
    return (<Redirect to={from} />)
  }

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h6" className={classes.title}>Sign In</Typography>
        <TextField id="emal" type="email" label="Email" onChange={e => handleEmail(e)} className={classes.textField} />
        <br/>
        <TextField id="password" type="password" label="Password" onChange={e => handlePassword(e)} className={classes.textField} />
        <br/>
        {error && <Typography component="p" color="error"><Icon color="error">error</Icon>{error}</Typography>}
      </CardContent>
      <CardActions>
        <Button variant="outlined" onClick={e => handleSubmit(e)} className={classes.submit}>Submit</Button>
      </CardActions>
    </Card>
  )
}

export default SignIn