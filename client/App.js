import React, { useEffect } from 'react'
import { hot } from 'react-hot-loader'
import { BrowserRouter } from 'react-router-dom'
import MainRouter from './MainRouter'

const App = () => {
  useEffect(() => {
    document.getElementById('jss-server-side').remove()
  }, [])

  return (
      <BrowserRouter>
        <MainRouter />
      </BrowserRouter>
    )
}

export default hot(module)(App)
