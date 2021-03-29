import { ThemeProvider } from '@material-ui/styles'
import React, { useEffect } from 'react'
import { hot } from 'react-hot-loader'
import { BrowserRouter } from 'react-router-dom'
import MainRouter from './MainRouter'
import theme from './theme'

const App = () => {
  useEffect(() => {
    document.getElementById('jss-server-side').remove()
  }, [])

  return (
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <MainRouter />
        </ThemeProvider>
      </BrowserRouter>
    )
}

export default hot(module)(App)
