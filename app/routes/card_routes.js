const express = require('express')
const router = express.Router()

// const Collection = require('../models/collection.js')
const Card = require('../models/card.js')
// const User = require('../models/card.js')

router.get('/cards/show', (req, res, next) => {
  Card.find()
    .then((cards) => {
      console.log(cards)
      // `examples` will be an array of Mongoose documents
      // we want to convert each one to a POJO, so we use `.map` to
      // apply `.toObject` to each one
      return cards.map((cards) => cards.toObject())
    })
  // respond with status 200 and JSON of the examples
    .then((cards) => res.status(200).json({ cards }))
  // if an error occurs, pass it to the handler
    .catch(next)
})

router.get('/cards/:name', (req, res, next) => {
  Card.findOne({name: req.params.name})
		// respond with status 200 and JSON of the examples
		.then((cards) => res.status(200).json({ cards }))
		// if an error occurs, pass it to the handler
		.catch(next)
})


module.exports = router
