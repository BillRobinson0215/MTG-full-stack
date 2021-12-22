const mongoose = require('mongoose')

const deckSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  cards: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Card'
    }
  ],
  commander: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Card'
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
})

module.exports = mongoose.model('Deck', deckSchema)
