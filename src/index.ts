import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import cors from 'cors'
import mongoose from 'mongoose'
import routes from './routes'
import keys from './utils/keys'
import * as logging from './utils/logging'
import { sequelize } from './config/database'
import { responseEnhancer } from './middleware/express-formatter'

const app = express()
const NAMESPACE = 'APP'

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// Helmet helps secure Express apps by setting HTTP response headers.
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }))
// HTTP request logger middleware for node.js
app.use(morgan('common'))
app.use(cors())
// Formatter response express middleware for node.js
app.use(responseEnhancer())

/* ROUTES */
app.use('/api', routes)

try {
  app.listen(keys.port, () => {
    logging.info(NAMESPACE, 'Server is running..')
  })
} catch (error) {
  logging.error(NAMESPACE, `${error}`)
}
