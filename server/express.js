import bodyParser from 'body-parser'
import express from 'express'
import cors from 'cors'
import compress from 'compression'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import template from './../template'
import path from 'path'
import userRoutes from './routes/user.routes'
import authRoutes from './routes/auth.routes'
import ReactDOMServer from 'react-dom/server'
import React from 'react'

const app = express()

//comment out before building for production
import devBundle from './devBundle'
import MainRouter from '../client/MainRouter'
import { StaticRouter } from 'react-router'
import { ServerStyleSheets } from '@material-ui/styles'
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

app.get('/*', (req, res) => {
  const sheets = new ServerStyleSheets()
  const context = {}
  const html = ReactDOMServer.renderToString(
    sheets.collect(
      <StaticRouter context={context} location={req.url}>
        <MainRouter/>
      </StaticRouter>
    )
  )

  const css = sheets.toString()
  res.status(200).send(template({html, css}))
})


export default app