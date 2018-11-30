const Client = require('../models/client')

const clients = [
  {
    name: 'Laureen Keune',
    manager: '5be355ef7d5ed6270c4d9ca0'
  },
  {
    name: 'Teador Longea',
    manager: '5be355ef7d5ed6270c4d9ca0'
  },
  {
    name: 'Natal Crowley',
    manager: '5be3559e7d5ed6270c4d9c9f'
  },
  {
    name: 'Bjorn Everex',
    manager: '5be356127d5ed6270c4d9ca1'
  }
]

const clientSeeder = () => {
  Client.remove({}, err => {
    if (err) {
      console.log(err)
    } else {
      console.log('removed existing clients')
    }
  })
  clients.forEach(client => {
    Client.create(client, (err, client) => {
      if (err) {
        console.log(err)
      } else {
        client.save()
        console.log('added new client')
      }
    })
  })
}

module.exports = clientSeeder
