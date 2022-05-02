require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')

app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json())

// Routes
const orderRoute = require('./routes/orderRoutes')
app.use('/order', orderRoute)

const serviceRoute = require('./routes/serviceRoutes')
app.use('/service', serviceRoute)

// .ENV 
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD

mongoose
    .connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@mongoleaf.k13wz.mongodb.net/goldenpetdb?retryWrites=true&w=majority`)
    .then(() => {
        console.log('Conectamos ao MongoDB')
        app.listen(3000)
    })
    .catch()