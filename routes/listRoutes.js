const router = require('express').Router()
const note = require('../Develop/db/db.json')

const {writeFile} = require('fs')
const {promisify} = require('util')

const wfs = promisify(writeFile)

// GET all items
router.get('/api/notes', (req, res) => {

    //Return all note
    res.json(note)

  })


// POST items
router.post('/api/notes', (req, res) => {

    //Create two new variables that hold the title and text 
    let {title, text} = req.body

    //Push new note into note
    note.push({title,text, id: `${note.length}`})

    //Update database
    update_db()
    
    //Return an updated note
    res.json(note)
  })

// DELETE items
router.delete('/api/notes/:id', (req, res) => {

    //Remove a note from a specific index/id
    note.splice(req.params.id,1)
    
    //Re-assign id to each note start from the deleted note to the end
    //To ensure that all id are in order, which make it easy for handling when deleting note
    for(let i = req.params.id; i < note.length; i++)
    {
        note[i].id = `${i}`
    }

    //Update database 
    update_db()
   
    //Return an updated note 
    res.json(note)
  })

// A function that re-write/update database 
let update_db = () =>
{
    wfs('Develop/db/db.json',JSON.stringify(note))
    .then(res => console.log('Succeed'))
    .catch(err => console.log(err))
}

//Export router out for express to use
module.exports = router