const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')

passport.initialize()
passport.session()

passport.use(
  new LocalStrategy(
    {
      usernameField: 'user[username]',
      passwordField: 'user[password]'
    },
    (username, password, done) => {
      User.findOne({ username: username })
        .then(user => {
          if (!user || !user.validatePassword(password)) {
            return done(null, false, {
              errors: { 'username or password': 'is invalid' }
            })
          }

          return done(null, user)
        })
        .catch(done)
    }
  )
)
