const mongoose = require('mongoose')

const Schema = mongoose.Schema

const jobSchema = new Schema({
  title: { type: String, required: true },
  client: { type: Schema.Types.ObjectId, ref: 'Client', required: true },
  tasks: [
    {
      start_time: { type: String, required: true },
      end_time: { type: String, required: true },
      user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
      isCompleted: { type: Boolean, default: false },
      comments: { type: String, required: true }
    }
  ]
})

module.exports = mongoose.model('Job', jobSchema)
