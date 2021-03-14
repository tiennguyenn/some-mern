import bodyParser from 'body-parser'
import express from 'express'
import cors from 'cors'
import compress from 'compression'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import template from './../template'
import path from 'path'
import userRoutes from './routes/user.routes'

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

app.get('/', (req, res) => {
  res.status(200).send(template())
})


export default app