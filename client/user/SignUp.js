import React from 'react'
import { useState } from "react"

import {Card, CardContent, Typography, TextField, CardActions, Button, makeStyles, Dialog, DialogTitle, DialogContent, DialogActions, Icon} from '@material-ui/core'

import api from './api.user'
import {Link} from 'react-router-dom'

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

const SignUp = () => {
  const classes = useStyles()
  const [values, setValues] = useState({
    name: '',
    password: '',
    email: '',
    open: false,
    error: ''
  })

  const handleChange = name => event => {
    setValues({...values, [name]: event.target.value})
  }

  const clickSubmit = () => {
    const user = {
      name: values.name,
      email: values.email,
      password: values.password
    }
    api.create(user).then(data => {
      if (data.error) {
        setValues({...values, error: data.error})
      } else {
        setValues({...values, error: '', open: true})
      }
    })
  }

  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h6" className={classes.title}>
            Sign Up
          </Typography>
          <TextField id="name" label="Name" 
             className={classes.textField} 
             value={values.name} onChange={handleChange('name')} 
             margin="normal"/>
          <br/>
          <TextField id="email" type="email" label="Email" 
             className={classes.textField} 
             value={values.email} onChange={handleChange('email')} 
             margin="normal"/>
          <br/>
          <TextField id="password" type="password" label="Password" 
             className={classes.textField} value={values.password} 
             onChange={handleChange('password')} margin="normal"/>
          <br/> {
            values.error && (<Typography component="p" color="error">
              <Icon color="error" className={classes.error}>error</Icon>
              {values.error}</Typography>)
          }
        </CardContent>
        <CardActions>
          <Button color="primary" variant="contained" onClick={clickSubmit} 
            className={classes.submit}>Submit</Button>
        </CardActions>
      </Card>
      <Dialog open={values.open} disableBackdropClick={true}>
        <DialogTitle></DialogTitle>
        <DialogContent>
          New account successfully created.
        </DialogContent>
        <DialogActions>
          <Link to="/sign-in">
          <Button color="primary" autoFocus="autoFocus" variant="contained">Sign In</Button>
          </Link>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default SignUp