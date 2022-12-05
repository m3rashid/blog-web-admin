require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const helmet = require('helmet')
const xss = require('xss-clean')
const cors = require('cors')

const { appConfig, isProduction, startLog } = require('./utils/appConfig')
const routes = require('./modules/routes')

const app = express()
app.use(helmet())
app.use(xss())
app.use(cors(appConfig.cors))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
mongoose.set('debug', !isProduction)
app.use('/api', routes)

app.get('/', (_, res) => {
  return res.json({ message: 'Server is OK' })
})

// Global error handler
app.use((err, req, res, _) => {
  console.error(err)
  return res.status(500).json({
    message: appConfig.errorMessage,
  })
})

process.on('uncaughtException', (error) => {
  console.error(error)

  process.exit(1)
})

const port = process.env.PORT || 5000
app.listen(port, async () => {
  try {
    await mongoose.connect(appConfig.mongodbUri)
    console.log('Mongoose is connected')
    console.log(startLog(port))
  } catch (err) {
    console.error('MongoDB connection error')
    console.error(err)
    process.exit(1)
  }
})
