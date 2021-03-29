import { Redirect, Route } from "react-router"
import React from 'react'

const PrivateRoute = () => {
  return (
    <Route render={props => (
      <Redirect to={{pathname: "/sign-in", state: {from: props.location}}} />
    )} />
  )
}

export default PrivateRoute