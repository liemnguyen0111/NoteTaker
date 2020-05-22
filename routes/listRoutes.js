const router = require('express').Router()
const note = require('../Develop/db/db.json')

const {writeFile} = require('fs')
const {promisify} = require('util')

const wfs = promisify(writeFile)

// GET all items
router.get('/api/notes', (req, res) => {
    res.json(note)
  })


// POST items
router.post('/api/notes', (req, res) => {

    let {title, text} = req.body

    note.push({title,text, id: note.length})

    update_db()
    
    res.json(note)
  })

// DELETE items
router.delete('/api/notes/:id', (req, res) => {

    note.splice(req.params.id,1)
    
    for(let i = req.params.id; i < note.length; i++)
    {
        note[i].id = parseInt(i)
    }

    update_db()
   
    res.json(note)
  })

let update_db = () =>
{
    wfs('Develop/db/db.json',JSON.stringify(note))
    .then(res => console.log('Succeed'))
    .catch(err => console.log(err))
}

module.exports = router