const User = require('../models/user')

const users = [
  {
    name: 'Symon Pennells',
    address: '7 Bonner Park',
    username: 'spennells0',
    password: 'Pennells'
  },
  {
    name: 'Neil Stubbeley',
    address: '69 Eagan Alley',
    username: 'nstubbeley1',
    password: 'Stubbeley'
  },
  {
    name: 'Vertis Tech',
    address: '10 Trafalgar Road',
    username: 'vertis',
    password: 'vertis'
  }
]

const userSeeder = () => {
  User.remove({}, err => {
    if (err) {
      console.log(err)
    } else {
      console.log('removed existing users')
    }
  })
  users.forEach(user => {
    User.create(user, (err, user) => {
      if (err) {
        console.log(err)
      } else {
        user.save()
        console.log('added new user')
      }
    })
  })
}

module.exports = userSeeder
