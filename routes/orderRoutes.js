const router = require('express').Router()

//Model
const Order = require('../models/Order')

// Routes

// Create Order
router.post('/', async (req, res) => {
    
    const {name, email, phone, total_price, hours, minutes} = req.body
    const service = req.body.service
    const date = new Date(req.body.date)
    date.setHours(hours, minutes, 0)

    const order = {
        name,
        email,
        phone,
        total_price,
        date,
        service
    }

    if(!(order.name && order.date && order.email && order.phone && order.service && order.total_price)){
        res.status(401).json({ warning: "It wasn't possible to create an Order, 'cause some information still missing." })
        return;
    }

    try {
        await Order.create(order)
        res.status(201).json({ message: 'Order added with success!' })
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

module.exports = router