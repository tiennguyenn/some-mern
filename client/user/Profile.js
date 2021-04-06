import { Avatar, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, makeStyles, Paper, Typography } from '@material-ui/core'
import { Edit } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import auth from './../auth/auth-helper'
import api from './api.user'
import DeleteUser from './DeleteUser'
import FindPeople from './FindPeople'
import FollowProfileButton from './FollowProfileButton'
import ProfileTabs from './ProfileTabs'

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
  const {token} = jwt
  const classes = useStyles()
  const userId = match.params.userId

  const [redirectToSignIn, setRedirectToSignIn] = useState(false)
  const [user, setUser] = useState({})
  const [following, setFollowing] = useState()

  const checkFollowing = (user) => {
    return user.followers.some(item => item._id === jwt.user._id)
  }

  const handleFollow = (callAPI) => {
    const {user} = auth.isAuthenticated()
    callAPI(user._id, token, userId).then(data => {
      if (data && data.error) {
        console.log(data.error)
        return
      }
      setFollowing(!following)
      setUser(data)
    })
  }

  useEffect(() => {
    if (!token) {
      auth.clearUser()
      setRedirectToSignIn(true)
      return
    }

    api.read(userId, token).then(result => {
      if (result && result.error) {
        setRedirectToSignIn(true)
      } else {
        setUser(result)
        setFollowing(checkFollowing(result))
      }
    })
  }, [userId])

  if (redirectToSignIn) {
    return <Redirect to="/sign-in" />
  }

  const photoUrl = "/api/users/photo/" + userId + "?" + new Date().getTime()

  return (
    <Paper className={classes.root} elevation={4}>
      <FindPeople />
      <Typography variant="h6" className={classes.title}>Profile</Typography>
      <List>
        <ListItem>
          <ListItemAvatar>
            <Avatar src={photoUrl}></Avatar>
          </ListItemAvatar>
          <ListItemText primary={user.name} secondary={user.email} />
          {
            auth.isAuthenticated().user && auth.isAuthenticated().user._id == user._id ? (
              <ListItemSecondaryAction>
                <Link to={"/user/edit/" + user._id}>
                  <IconButton color="secondary">
                    <Edit/>
                  </IconButton>
                </Link>
                <DeleteUser userId={userId} />
              </ListItemSecondaryAction>
            ) : <FollowProfileButton following={following} handleFollow={handleFollow} />
          }
        </ListItem>
        <Divider/>
        <ListItem>
          <ListItemText>Joined: {new Date(user.created).toDateString()}</ListItemText>
        </ListItem>
      </List>
      <ProfileTabs user={user} />
    </Paper>
  )
}

export default Profile