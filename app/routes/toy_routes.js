// import our depencies, middleware and models 
// see pet_routes for expanded comments
const express = require('express')
const passport = require('passport')
const Pet = require('../models/pet')
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const requireToken = passport.authenticate('bearer', {session: false})
const removeBlanks = require('../../lib/remove_blank_fields')
const router = express.Router()

// ROUTES GO HERE

// POST -> Create a toy
// POST /toy/<pet_id>
router.post('/toys/:petId', removeBlanks, (req,res,next) => {
    // get our toy from req.body
    const toy = req.body.toy
    // get our petId from req.params.id
    const petId = req.params.petId
    // find the pet
    Pet.findById(petId)
        // handle what happens if no pet is found
        .then(handle404)
        .then(pet => {
            console.log('this is the pet', pet)
            console.log('this is the toy', toy)
            // push the toy to the toys array
            pet.toys.push(toy)

            // save the pet
            return pet.save()
            
        })
        // then send the pet as json
        .then(pet => res.status(201).json({ pet: pet }))
        // catch errors and send to the handler
        .catch(next)
})

// Patch -> udpate a toy
// PATCH /toys/<pet_id>/<toy_id>

// DELETE -> delete a toy
// DELETE /toys/<pet_id>/<toy_id>

module.exports = router