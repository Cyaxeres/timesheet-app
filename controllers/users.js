const passport = require('passport')
const User = require('../models/user')

module.exports = {
  users_create_user: (req, res, next) => {
    const {
      body: { user }
    } = req

    if (!user.username) {
      return res.status(422).json({
        error: {
          username: 'is required'
        }
      })
    }

    if (!user.password) {
      return res.status(422).json({
        error: {
          password: 'is required'
        }
      })
    }

    const finalUser = new User(user)

    finalUser.setPassword(user.password)

    return finalUser.save().then(() => {
      res.json({ user: finalUser.toAuthJSON() })
    })
  },

  users_login_user: (req, res, next) => {
    const {
      body: { user }
    } = req

    if (!user.username) {
      return res.status(422).json({
        errors: {
          username: 'is required'
        }
      })
    }

    if (!user.password) {
      return res.status(422).json({
        errors: {
          password: 'is required'
        }
      })
    }

    return passport.authenticate(
      'local',
      { session: false },
      (err, passportUser, info) => {
        if (err) {
          return next(err)
        }
        if (passportUser) {
          const user = passportUser
          user.token = passportUser.generateJWT()

          return res.json({ user: user.toAuthJSON() })
        }

        return res.status(400).info
      }
    )(req, res, next)
  },

  users_show_user: (req, res, next) => {
    const {
      payload: { id }
    } = req
    return User.findById(id)
      .then(user => {
        res.status(200).json({ user: user.toAuthJSON() })
      })
      .catch(err => {
        res.status(400).json(err)
      })
  }
}
