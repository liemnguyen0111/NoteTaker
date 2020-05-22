const express = require('express')
const {join} = require('path')
const app = express()

//Create routes to access html files in public folder
app.use(express.static(join(__dirname, 'Develop/public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Default route
app.get('/', (req, res) => {
    res.sendFile(join(__dirname, "Develop/public/index.html"))
  })
  
  // Notes route
  app.get('/notes', (req, res) => {
    res.sendFile(join(__dirname, "Develop/public/notes.html"))
  })

//Use routes that created in the listRoute.js for API request
app.use(require('./routes'))

//Start a server listener
app.listen(process.env.PORT || 3000, () => 
{
    console.log('http://localhost:3000')
}
)