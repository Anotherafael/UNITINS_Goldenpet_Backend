const mongoose = require('mongoose')

const Order = mongoose.model('Order', {
  name: String,
  email: String,
  phone: String,
  total_price: Number,
  date: Date,
  service: [{
    name: String,
    price: Number,
  }],
})

module.exports = Order