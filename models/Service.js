const mongoose = require('mongoose')

const Service = mongoose.model('Service', {
  name: String,
  price: Number,
})

module.exports = Service