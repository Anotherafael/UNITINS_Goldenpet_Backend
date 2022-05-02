const router = require('express').Router()

//Model
const Service = require('../models/Service')

// Routes

// Create Service
router.post('/', async (req, res) => {
    
    const {name, price} = req.body

    const service = {
        name,
        price,
    }

    if(!(service.name && service.price)){
        res.status(401).json({ warning: "It wasn't possible to create an Service, 'cause some information still missing." })
        return;
    }
    
    try {
        await Service.create(service)
        res.status(201).json({ message: 'Service added with success!' })
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

router.get('/', async (req, res) => {

    try {
        const services = await Service.find()
        
        if(!services) {
            res.status(401).json({ warning: "It wasn't possible to find any services, probably it's empty." })
        }

        res.status(200).json(services)
    } catch (error) {
        res.status(500).json({ error: error })
    }
    
})

router.get('/:id', async (req, res) => {
    
    const id = req.params.id
    
    try {
        const service = await Service.findOne({_id : id})
        res.status(200).json(service)
    } catch (error) {
        res.status(500).json({ error: error })
    }
    
    
})

router.patch('/:id', async (req, res) => {
    
    const id = req.params.id
    const {name, price} = req.body
    
    const service = {
        name,
        price,
    }
    
    try {
        
        const update_info = await Service.updateOne({_id : id}, service)
        const updated_service = await Service.findOne({_id: id})
        
        res.status(200).json({
            inputs: service, 
            updated: updated_service,
            message: "Service updated with success"
        })
    } catch (error) {
        res.status(500).json({ error: error })
    }
    
})

router.delete('/:id', async (req, res) => {
    
    const id = req.params.id
    
    try {
        
        await Service.deleteOne({_id: id})
        res.status(200).json({message: "Service deleted with success"})
        
    } catch (error) {
        res.status(500).json({ error: error })
    }

})

module.exports = router