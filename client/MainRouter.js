import React from 'react'
import { Route, Switch } from "react-router-dom"

import PrivateRoute from './auth/PrivateRoute'
import SignIn from './auth/SignIn'
import SignUp from './user/SignUp'
import Home from './core/Home'
import Menu from './core/Menu'
import Profile from './user/Profile'
import Users from './user/Users'
import EditProfile from './user/EditProfile'

const MainRouter = () => {
  return (
    <div>
      <Menu />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/users" component={Users} />
        <Route exact path="/sign-in" component={SignIn} />
        <Route exact path="/sign-up" component={SignUp} />
        <Route exact path="/user/:userId" component={Profile} />
        <PrivateRoute path="/user/edit/:userId" component={EditProfile}/>
      </Switch>
    </div>
  )
}

export default MainRouter