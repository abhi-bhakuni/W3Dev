const express = require("express")
const cors = require("cors")
require("dotenv").config()
require("./Models/DBConnection")

const app = express()

const routeLoginCheck = require("./Routes/LoginRoute/login")
const routeSignupCheck = require("./Routes/LoginRoute/signup")
const routeDashboardFetch = require("./Routes/DashboardRoute/dashboard")

app.use(cors())
app.use(express.json())
app.use('/login', routeLoginCheck)
app.use('/signup', routeSignupCheck)
app.use('/dashboard', routeDashboardFetch)


// Server on '/'
app.get('/', (req,res) => {
    res.send("Server running on /")
})


// Running on the below PORT
const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
    console.log(`Server is running successfully on ${PORT}`)
})
