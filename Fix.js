const { BadParamsError } = require("./lib/custom_errors")
const { router } = require("./server")
const collection = require("./app/models/collection")

router.post('.sign-up', (req,res,next) => {
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
                Collection.create({owner:user._id })
                .then((collection) => {
                    user.collection = collection._id
                })
            })
        })
        res.status(201).json({ user: user })
		.catch(next)
})
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
			User.create(user).then((user) => {
				Collection.create({ owner: user._id }).then((collection) => {
					user.collection = collection._id
				})
			})
			// .then((user) => {
			// 	User.create(user)
			// 	.then((user) => {
			// 		if (!user) {
			// 			return res.status(500).json({error: 'Duplicate User Entry'})
			// 		}
			// 		Collection.create({ owner: user._id }
			// 			.then((user.collection._id = collection._id)))
			// 		return user
			// 	})
			// 	// .then((collection) =>{
			// 	user.collection._id = collection._id
			res.status(201).json({ user: user })
		})
		.catch(next)
})
