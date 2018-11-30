const mongoose = require('mongoose')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

const { Schema } = mongoose

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    username: { type: String, required: true },
    hash: { type: String },
    salt: { type: String }
  },
  { timestamps: true }
)

userSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString('hex')
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
    .toString('hex')
}

userSchema.methods.validatePassword = function (password) {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
    .toString('hex')
  return this.hash === hash
}

userSchema.methods.generateJWT = function () {
  const today = new Date()
  const expirationDate = new Date(today)
  expirationDate.setDate(today.getDate() + 60)

  return jwt.sign(
    {
      id: this._id,
      username: this.username,
      exp: parseInt(expirationDate.getTime() / 1000, 10)
    },
    process.env.SECRET_KEY
  )
}

userSchema.methods.toAuthJSON = function () {
  return {
    id: this._id,
    name: this.name,
    address: this.address,
    username: this.username,
    token: this.generateJWT()
  }
}

module.exports = mongoose.model('User', userSchema)
