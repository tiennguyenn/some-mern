import { Avatar, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, makeStyles, Paper, Typography } from '@material-ui/core'
import { Edit } from '@material-ui/icons'
import Person from '@material-ui/icons/Person'
import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import auth from './../auth/auth-helper'
import api from './api.user'
import DeleteUser from './DeleteUser'

const useStyles = makeStyles(theme => ({
  root: theme.mixins.gutters({
    maxWidth: 600,
    margin: 'auto',
    padding: theme.spacing(3),
    marginTop: theme.spacing(5)
  }),
  title: {
    marginTop: theme.spacing(3),
    color: theme.palette.protectedTitle
  }
}))

const Profile = ({match}) => {
  const jwt = auth.isAuthenticated()
  const [redirectToSignIn, setRedirectToSignIn] = useState(false)
  const [user, setUser] = useState({})

  const classes = useStyles()

  useEffect(() => {
    const userId = match.params.userId
    const token = jwt.token
    api.read(userId, token).then(result => {
      if (result && result.error) {
        console.log(result)
      } else {
        setUser(result)
      }
    })
  }, [])

  if (redirectToSignIn) {
    return <Redirect to="/sign-in" />
  }

  return (
    <Paper className={classes.root} elevation={4}>
      <Typography variant="h6" className={classes.title}>Profile</Typography>
      <List>
        <ListItem>
          <ListItemAvatar>
            <Avatar><Person/></Avatar>
          </ListItemAvatar>
          <ListItemText primary={user.name} secondary={user.email} />
          {
            auth.isAuthenticated().user && auth.isAuthenticated().user._id == user._id && (
              <ListItemSecondaryAction>
                <Link to="/">
                  <IconButton color="secondary">
                    <Edit/>
                  </IconButton>
                </Link>
                <DeleteUser />
              </ListItemSecondaryAction>
            )
          }
        </ListItem>
      </List>
    </Paper>
  )
}

export default Profile