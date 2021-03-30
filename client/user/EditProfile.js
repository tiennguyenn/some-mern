import React, { useEffect, useState } from 'react'
import { Avatar, Button, Card, CardActions, CardContent, Icon, makeStyles, TextField, Typography } from '@material-ui/core'
import FileUpload from '@material-ui/icons/AddPhotoAlternate'
import {Redirect} from 'react-router'

import auth from './../auth/auth-helper'
import api from './api.user'

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2)
  },
  title: {
    margin: theme.spacing(2),
    color: theme.palette.protectedTitle
  },
  error: {
    verticalAlign: 'middle'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300
  },
  submit: {
    margin: 'auto',
    marginBottom: theme.spacing(2)
  },
  filename:{
    marginLeft: theme.spacing(2)
  },
  input: {
    display: 'none'
  },
  bigAvatar: {
    width: 60,
    height: 60,
    margin: 'auto'
  }
}))

const EditProfile = ({match}) => {
  
  const classes = useStyles()
  const {token, user} = auth.isAuthenticated()
  const userId = match.params.userId

  const [error, setError] = useState()
  const [name, setName] = useState()
  const [about, setAbout] = useState()
  const [email, setEmail] = useState()
  const [photo, setPhoto] = useState()
  const [password, setPassword] = useState()
  const [redirectToSignIn, setRedirectToSignIn] = useState(false)
  const [redirectToProfile, setRedirectToProfile] = useState(false)

  useEffect(() => {
    if (!token) {
      setRedirectToSignIn(true)
    }

    if (user._id != userId) {
      setRedirectToSignIn(true)
    }

    api.read(userId, token).then(data => {
      if (data && data.error) {
        setError(data.error)
      }
      setName(data.name)
      setEmail(data.email)
      setAbout(data.about)
    })

  }, [])

  const handleName = (e) => {
    setName(e.target.value)
  }

  const handleAbout = (e) => {
    setAbout(e.target.value)
  }

  const handleEmail = (e) => {
    setEmail(e.target.value)
  }

  const handlePassword = (e) => {
    setPassword(e.target.value)
  }

  const handlePhoto = (e) => {
    setPhoto(e.target.files[0])
  }

  const clickSubmit = () => {
    let userData = new FormData()
    userData.append('name', name)
    userData.append('email', email)
    userData.append('password', password)
    userData.append('about', about)
    userData.append('photo', photo)

    api.update(userId, token, userData).then(data => {
      if (data && data.error) {
        setError(data.error)
        return
      }
      setRedirectToProfile(true)
    })
  }

  if (redirectToSignIn) {
    return (
      <Redirect to="/sign-in" />
    )
  }

  if (redirectToProfile) {
    return (
      <Redirect to={"/user/" + userId} />
    )
  }

  const photoUrl = "/api/users/photo/" + userId + "?" + new Date().getTime()

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h6" className={classes.title}>Edit Profile</Typography>
        <Avatar src={photoUrl} className={classes.bigAvatar}/><br/>
        <input accept="image/*" onChange={handlePhoto} className={classes.input} id="icon-button-file" type="file" />
        <label htmlFor="icon-button-file">
          <Button variant="contained" color="default" component="span">
            Upload
            <FileUpload/>
          </Button>
        </label>
        <span className={classes.filename}>{photo && photo.name}</span><br/>
        <TextField value={name} onChange={handleName} id="name" label="Name" className={classes.textField} margin="normal"/>
        <TextField value={about} multiline rows="2" onChange={handleAbout} id="about" label="About" className={classes.textField}/>
        <TextField type="email" value={email} onChange={handleEmail} id="email" label="Email" className={classes.textField}/>
        <TextField type="password" id="password" onChange={handlePassword} label="Password" className={classes.textField}/>
        <br />
        {
          error && (<Typography component="p" color="error">
            <Icon color="error">error</Icon>
            {error}
            </Typography>)
        }
      </CardContent>
      <CardActions>
        <Button onClick={clickSubmit} className={classes.submit} color="primary" variant="outlined">Submit</Button>
      </CardActions>
    </Card>
  )
}

export default EditProfile