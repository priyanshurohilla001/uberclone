const dotenv = require('dotenv')
dotenv.config()

const cors = require('cors')

const connectToDb = require('./db/db')
connectToDb();

const express = require('express')

const userRoutes = require('./routes/user.routes')

const app = express()
app.use(cors())
app.use(express.json())


app.get('/',(req,res)=>{
    res.send("hello")
})

app.use('/users',userRoutes)

module.exports = app 