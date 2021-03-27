import { AppBar, Button, CssBaseline, IconButton, Toolbar, Typography } from '@material-ui/core'
import { Home as HomeIcon } from '@material-ui/icons'
import React from 'react'
import auth from '../auth/auth-helper'

const { Link, withRouter } = require("react-router-dom")

const Menu = withRouter(({history}) => {
  const isActive = (history, path) => {
    if (history.location.pathname == path) {
      return {color: '#ff4081'}
    }
    return {color: '#fff'}
  }
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            MERN Social Media
          </Typography>
          <Link to="/">
            <IconButton style={isActive(history, '/')}>
              <HomeIcon />
            </IconButton>
          </Link>
          <Link to="/users">
            <Button style={isActive(history, '/users')}>Users</Button>
          </Link>
          {
            !auth.isAuthenticated() && (
              <>
                <Link to="/sign-in"><Button style={isActive(history, '/sign-in')}>Sign In</Button></Link>
                <Link to="/sign-up"><Button style={isActive(history, '/sign-up')}>Sign Up</Button></Link>
              </>
            )
          }
          {
            auth.isAuthenticated() && (
              <>
              <Link to="/profile"><Button style={isActive(history, '/profile')}>My Profile</Button></Link>
              <Button onClick={() => {auth.clearUser(); history.push("/")}}>Sign out</Button>
              </>
            )
          }
        </Toolbar>
      </AppBar>
    </div>
  )
})

export default Menu