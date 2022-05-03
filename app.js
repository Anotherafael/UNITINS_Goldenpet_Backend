require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')

/* Parsing the body of the request. */
app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json())


/* Importing the routes from the routes folder and using them in the app. */
const orderRoute = require('./routes/orderRoutes')
app.use('/order', orderRoute)

const serviceRoute = require('./routes/serviceRoutes')
app.use('/service', serviceRoute)

const moreRoute = require('./routes/moreRoutes')
app.use('', moreRoute)

/* Getting the user and password from the .env file. */
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD

/* Connecting to the MongoDB database. */
mongoose
    .connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@mongoleaf.k13wz.mongodb.net/goldenpetdb?retryWrites=true&w=majority`)
    .then(() => {
        console.log('Conectamos ao MongoDB')
        app.listen(3000)
    })
    .catch()