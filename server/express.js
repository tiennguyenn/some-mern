import bodyParser from 'body-parser'
import express from 'express'
import cors from 'cors'
import compress from 'compression'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import path from 'path'

import ReactDOMServer from 'react-dom/server'
import React from 'react'
import { StaticRouter } from 'react-router'
import { ServerStyleSheets, ThemeProvider } from '@material-ui/styles'

import template from './../template'
import MainRouter from '../client/MainRouter'
import theme from './../client/theme'

import userRoutes from './routes/user.routes'
import authRoutes from './routes/auth.routes'
import postRoutes from './routes/post.routes'

const app = express()

//comment out before building for production
import devBundle from './devBundle'
devBundle.compile(app)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
//app.use(cookieParser())
//app.use(compress())
//app.use(helmet())
//app.use(cors())

const CURRENT_WORKING_DIR = process.cwd()
app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')))

app.use('/', userRoutes)
app.use('/', authRoutes)
app.use('/', postRoutes)

app.get('/*', (req, res) => {
  const sheets = new ServerStyleSheets()
  const context = {}
  const html = ReactDOMServer.renderToString(
    sheets.collect(
      <StaticRouter context={context} location={req.url}>
        <ThemeProvider theme={theme}>
          <MainRouter/>
        </ThemeProvider>
      </StaticRouter>
    )
  )

  const css = sheets.toString()
  res.status(200).send(template({html, css}))
})


export default app