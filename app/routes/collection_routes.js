const express = require('express')
const passport = require('passport')
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const router = express.Router()
// const requireOwnership = customErrors.requireOwnership

const Collection = require('../models/collection.js')
const Card = require('../models/card.js')
// const User = require('../models/card.js')

const requiresToken = passport.authenticate('bearer', { session: false })

router.post('/collection/new', requiresToken, (req, res, next) => {
  const collection = req.body.collection

  Collection.create(collection)
    .then(collection => {
      res.status(201).json({ collection })
    })
    .catch(next)
})

router.get('/collection/show', requiresToken, (req, res, next) => {
  Collection.find()
    .then((collections) => {
      // `examples` will be an array of Mongoose documents
      // we want to convert each one to a POJO, so we use `.map` to
      // apply `.toObject` to each one
      return collections.map((collections) => collections.toObject())
    })
  // respond with status 200 and JSON of the examples
    .then((collection) => res.status(200).json({ collection }))
  // if an error occurs, pass it to the handler
    .catch(next)
})

router.get('/collection/:id', requiresToken, (req, res, next) => {
  Collection.findById(req.params.id)
    .populate('cards')
    .then(handle404)
    // if `findById` is succesful, respond with 200 and "example" JSON
    .then(collection => res.status(200).json({ cards: collection }))
    // if an error occurs, pass it to the handler
    .catch(next)
})

router.delete('/collection/delete/:id', requiresToken, (req, res, next) => {
  Collection.findOneAndDelete({ _id: req.params.id })
    .exec()
    .then((counter) => res.json())
    .catch((err) => next(err))
})

router.patch('/collection/:id/:cardId', (req, res, next) => {
  let foundCollection
  Collection.findById(req.params.id)
    .then(collection => {
      foundCollection = collection
    })
    .then(() => Card.findById(req.params.cardId))
    .then((card) => {
      console.log(card)
      foundCollection.cards.push(card._id)
      return foundCollection.save()
    })
    .then(() => res.sendStatus(204))
  // if an error occurs, pass it to the handler
    .catch(next)
})

// const displayCards = cardCollect.cards.map((card) => {
//     return {
//       Name: card.name,
//       Mana_Cost: card.manaCost,
//       CMC: card.convertedManaCost,
//       Identity: card.colorIdentity,
//       Type: card.type,
//       SubType: card.subtypes,
//       Keywords: card.keywords,
//       Power: card.power,
//       Toughness: card.toughness,
//       Loyalty: card.loyalty,
//       Rarity: card.rarity
//     }

module.exports = router
