const Client = require('../models/client')

module.exports = {
  clients_get_all: (req, res, next) => {
    Client.find()
      .select('-__v')
      .populate('manager', 'name')
      .exec()
      .then(docs => {
        res.status(200).json(docs)
      })
      .catch(err => {
        console.log(err)
        res.status(400).json({
          error: err
        })
      })
  },

  clients_get_client: (req, res, next) => {
    const id = req.params.clientId
    Client.findById(id)
      .select('-__v')
      .populate('manager', 'name')
      .exec()
      .then(doc => {
        console.log('From API: ', doc)
        if (doc) {
          res.status(200).json(doc)
        } else {
          res.status(404).json({
            message: 'No valid entry found'
          })
        }
      })
      .catch(err => {
        console.log(err)
        res.status(400).json({
          error: err
        })
      })
  }
}
