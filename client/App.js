import React from 'react'
import { hot } from 'react-hot-loader'
import { BrowserRouter } from 'react-router-dom'
import MainRouter from './MainRouter'

const App = () => {
    return (
        <BrowserRouter>
          <MainRouter />
        </BrowserRouter>
      )
}

export default hot(module)(App)
