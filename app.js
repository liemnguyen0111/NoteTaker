const express = require('express')
const {join} = require('path')
const app = express()

//Create routes to access html files in public folder
app.use(express.static(join(__dirname, 'Develop/public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//Use routes that created in the listRoute.js for API request
app.use(require('./routes/listRoutes.js'))

//Start a server listener
app.listen(3000, () => 
{
    console.log('http://localhost:3000')
}
)