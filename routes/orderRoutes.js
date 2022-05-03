const router = require('express').Router()

/* Importing the Order model. */
const Order = require('../models/Order')

/* Creating a new order. */
router.post('/', async (req, res) => {

    const { name, email, phone, total_price, hours, minutes } = req.body
    const service = req.body.service
    var date = new Date(req.body.date)
    date.setUTCHours(hours, minutes, 0)

    const order = {
        name,
        email,
        phone,
        total_price,
        date,
        service
    }

    if (!(order.name && order.date && order.email && order.phone && order.service && order.total_price)) {
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

/* It's deleting an order. */
router.delete('/:id', async (req, res) => {

    const id = req.params.id

    try {

        await Order.deleteOne({ _id: id })
        res.status(200).json({ message: "Order deleted with success" })

    } catch (error) {
        res.status(500).json({ error: error })
    }

})

/* It's getting all the orders. */
router.get('/', async (req, res) => {

    try {
        const orders = await Order.find()

        if (!orders) {
            res.status(401).json({ warning: "It wasn't possible to find any orders, probably it's empty." })
        }

        res.status(200).json(orders)
    } catch (error) {
        res.status(500).json({ error: error })
    }

})

/* It's getting an order by id. */
router.get('/:id', async (req, res) => {
    
    const id = req.params.id
    
    try {
        const order = await Order.findOne({_id : id})
        res.status(200).json(order)
    } catch (error) {
        res.status(500).json({ error: error })
    }
    
    
})

module.exports = router