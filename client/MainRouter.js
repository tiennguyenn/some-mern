import React from 'react'
import { Route, Switch } from "react-router-dom"
import Users from './user/Users'

const MainRouter = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Users} />
      </Switch>
    </div>
  )
}

export default MainRouter