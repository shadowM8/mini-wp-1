require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const cors = require('cors')
const mongoose = require('mongoose')

//connect to mongoose
mongoose.connect(`mongodb://localhost:27017/db_mini_wp`, { useNewUrlParser: true })


app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

const userRoute = require('./routes/user.js')
const articleRoute = require('./routes/article.js')

app.use('/users',userRoute)
app.use('/articles', articleRoute)


app.listen(port, () => {
    console.log(`listening on port ${port}`)
})