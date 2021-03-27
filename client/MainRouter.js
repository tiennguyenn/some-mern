import React from 'react'
import { Route, Switch } from "react-router-dom"

import SignIn from './auth/SignIn'
import SignUp from './auth/SignUp'
import Home from './core/Home'
import Menu from './core/Menu'
import Users from './user/Users'

const MainRouter = () => {
  return (
    <div>
      <Menu />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/users" component={Users} />
        <Route exact path="/sign-in" component={SignIn} />
        <Route exact path="/sign-up" component={SignUp} /> 
      </Switch>
    </div>
  )
}

export default MainRouter