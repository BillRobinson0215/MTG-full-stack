const express = require('express')
// jsonwebtoken docs: https://github.com/auth0/node-jsonwebtoken
const crypto = require('crypto')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')
// bcrypt docs: https://github.com/kelektiv/node.bcrypt.js
const bcrypt = require('bcrypt')
const Collection = require('../models/collection.js')

// see above for explanation of "salting", 10 rounds is recommended
const bcryptSaltRounds = 10

// pull in error types and the logic to handle them and set status codes
const errors = require('../../lib/custom_errors')

const BadParamsError = errors.BadParamsError
const BadCredentialsError = errors.BadCredentialsError

const User = require('../models/user')

// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `res.user`
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// SIGN UP
// POST /sign-up
router.post('/sign-up', (req, res, next) => {
	Promise.resolve(req.body.credentials)
		.then((credentials) => {
			if (
				!credentials ||
				!credentials.password ||
				credentials.password !== credentials.password_confirmation
			) {
				throw new BadParamsError()
			}
		})
		.then(() => bcrypt.hash(req.body.credentials.password, bcryptSaltRounds))
		.then((hash) => {
			return {
				email: req.body.credentials.email,
				hashedPassword: hash,
			}
		})
		.then((user) => {
			User.create(user)
			.then((user) => {
				console.log(user)
				Collection.create({ owner: user._id })
				.then((collection) => {
					console.log(collection)
					user.cardCollection = collection._id
					user.save()
					.then((user) => {
						console.log(user) 
						res.status(201).json({ user: user })
					})
				})
			})
		})
	.catch(next)
})

// SIGN IN
// POST /sign-in
router.post('/sign-in', (req, res, next) => {
  const pw = req.body.credentials.password
  let user

  // find a user based on the email that was passed
  User.findOne({ email: req.body.credentials.email })
    .then(record => {
      // if we didn't find a user with that email, send 401
      if (!record) {
        throw new BadCredentialsError()
      }
      // save the found user outside the promise chain
      user = record
      // `bcrypt.compare` will return true if the result of hashing `pw`
      // is exactly equal to the hashed password stored in the DB
      return bcrypt.compare(pw, user.hashedPassword)
    })
    .then(correctPassword => {
      // if the passwords matched
      if (correctPassword) {
        // the token will be a 16 byte random hex string
        const token = crypto.randomBytes(16).toString('hex')
        user.token = token
        // save the token to the DB as a property on user
        return user.save()
      } else {
        // throw an error to trigger the error handler and end the promise chain
        // this will send back 401 and a message about sending wrong parameters
        throw new BadCredentialsError()
      }
    })
    .then(user => {
      Collection.find({owner: user._id})
      .then((collections) =>{
        console.log(collections)
        return res.status(201).json({ user: user.toObject(),
        cardCollection: collections})
      })
    })
    .catch(next)
})

// CHANGE password
// PATCH /change-password
router.patch('/change-password', requireToken, (req, res, next) => {
  let user = req.user
  // `req.user` will be determined by decoding the token payload
  User.findById(user._id)
		// save user outside the promise chain
		// check that the old password is correct
		.then((user) =>
			bcrypt.compare(req.body.credentials.old, user.hashedPassword)
		)
		// `correctPassword` will be true if hashing the old password ends up the
		// same as `user.hashedPassword`
		.then((correctPassword) => {
			// throw an error if the new password is missing, an empty string,
			// or the old password was wrong
			if (!req.body.credentials.new || !correctPassword) {
				throw new BadParamsError()
			}
		})
		// hash the new password
		.then(() => bcrypt.hash(req.body.credentials.new, bcryptSaltRounds))
		.then((hash) => {
			// set and save the new hashed password in the DB
			user.hashedPassword = hash
			return user.save()
		})
		// respond with no content and status 200
		.then(() => res.sendStatus(204))
		// pass any errors along to the error handler
		.catch(next)
})

router.delete('/sign-out', requireToken, (req, res, next) => {
  // create a new random token for the user, invalidating the current one
  req.user.token = null
  // save the token and respond with 204
  req.user.save()
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
