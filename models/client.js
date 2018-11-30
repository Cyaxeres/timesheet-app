const mongoose = require('mongoose')

const Schema = mongoose.Schema

const clientSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  manager: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

module.exports = mongoose.model('Client', clientSchema)
