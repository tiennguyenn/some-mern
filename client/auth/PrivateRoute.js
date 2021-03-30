import { Redirect, Route } from "react-router"
import React, {Component} from 'react'

import auth from './auth-helper'

const PrivateRoute = ({component: Component, ...rest}) => {
  return (
    <Route {...rest} render={props => (
      auth.isAuthenticated() ? <Component {...props} /> :
      <Redirect to={{pathname: "/sign-in", state: {from: props.location}}} />
    )} />
  )
}

export default PrivateRoute