const mongoose = require('mongoose')

const connectDB = () => {
  const uri = process.env.DATABASE_URI

  mongoose
    .connect(uri, { useCreateIndex: true, useNewUrlParser: true })
    .then(() => console.log('> Database connected'))
    .catch(err => console.log(err))
  mongoose.set('debug', true)
}

module.exports = connectDB
