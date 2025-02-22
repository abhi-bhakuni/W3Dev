const mongoose = require('mongoose')
require("dotenv").config()

const MongoDB_URL = process.env.MONGODB_URL

mongoose.connect(MongoDB_URL)
    .then(() => console.log("Connected to MongoDB successfully"))
    .catch((e) => console.error(`Error connecting to MongoDB ${e}`))

module.exports = mongoose
