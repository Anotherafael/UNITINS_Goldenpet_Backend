const router = require('express').Router()

const Order = require('../models/Order')

/* It's getting all the orders with the same service. */
router.get("/byservice", async (req, res) => {
    
    const service = req.body.service

    try {
        const orders = await Order.find({'service.name': service})
        res.status(200).json(orders)
    } catch (error) {
        res.status(500).json({ error: error })
    }
    
})

/* It's getting all the orders with the price less than the price. */
router.get("/by-lprice", async (req, res) => {
    
    const price = req.body.price

    try {
        const orders = await Order.find({'total_price': {$lt: price}})
        res.status(200).json(orders)
    } catch (error) {
        res.status(500).json({ error: error })
    }
    
})

/* It's getting all the orders with the price greater than the price. */
router.get("/by-gprice", async (req, res) => {
    
    const price = req.body.price

    try {
        const orders = await Order.find({'total_price': {$gt: price}})
        res.status(200).json(orders)
    } catch (error) {
        res.status(500).json({ error: error })
    }
    
})

module.exports = router