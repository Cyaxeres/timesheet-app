const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const session = require('express-session')
const cors = require('cors')
const mongoose = require('mongoose')
const connectDB = require('./connect')
const errorHandler = require('errorhandler')
// const jobSeeder = require('./seed/job_seeder')
// const userSeeder = require('./seed/user_seeder')
// const clientSeeder = require('./seed/client_seeder')
const clientRoutes = require('./routes/api/clients')
const jobRoutes = require('./routes/api/jobs')
const userRoutes = require('./routes/api/users')
// configure mongoose global promise
mongoose.promise = global.Promise

// configure isProduction variable
const isProduction = process.env.NODE_ENV === 'production'

// initiate app
const app = express()

// configure app
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use(
  session({
    secret: process.env.SECRET_KEY,
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false
  })
)

if (!isProduction) {
  app.use(errorHandler())
}

connectDB()
// userSeeder()
// jobSeeder()
// clientSeeder()

// Models & Routes
require('./models/user')
require('./config')
app.use('/api/clients', clientRoutes)
app.use('/api/jobs', jobRoutes)
app.use('/api/users', userRoutes)

// error handling & middlewares
if (!isProduction) {
  app.use((req, res, err) => {
    res.status(err.status || 500)

    res.json({
      errors: {
        message: err.message,
        error: err
      }
    })
  })
}

app.use((req, res, err) => {
  res.status(err.status || 500)

  res.json({
    errors: {
      message: err.message,
      error: {}
    }
  })
})

module.exports = app
