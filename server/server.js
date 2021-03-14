import mongoose from 'mongoose'
import app from './express'
import config from '../config/config'

const url = config.mongoUri
mongoose.Promise = global.Promise
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
mongoose.connection.on('error', () => {
  throw new Error(`Unable connect to the database ${url}`)
})

const port = config.port
app.listen(port, function onStart(err) {
  if (err) {
    console.log(err)
  }
  console.info('Server started on port %s.', port)
})

