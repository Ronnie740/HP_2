/** @format */

const express = require('express');
const User = require('../models/user.js');
const Startup = require('../models/startup');
const Post = require('../models/posts');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');
const auth = require('./middleware');
const router = express.Router();

router.post('/userSignup', async (req, res) => {
	try {
		const { email, name, password } = req.body;
		// Hash the password
		const hashedPassword = bcrypt.hashSync(password, 10);
		const user = new User({ email, name, password: hashedPassword });
		await user.save();
		res.status(201).json({ message: 'User added successfully', user: user });
	} catch (error) {
		res.status(500).json({ message: 'Failed to register user' });
	}
});
// Login a new user
router.post('/userLogin', async (req, res) => {
	const { email, name, password } = req.body;

	// Find the user by name and password
	User.findOne({ email, name })
		.then((user) => {
			// Check if the user exists
			if (!user) {
				return res.status(404).json({ error: 'User not found' });
			}

			// Check if the password is correct
			if (!bcrypt.compareSync(password, user.password)) {
				return res.status(401).json({ error: 'Invalid password' });
			}

			// Create and sign a JWT
			const token = jwt.sign({ userId: user._id }, config.jwt.secret, { expiresIn: '1h' });

			// Return the token to the client
			res.json({ token });
		})
		.catch((err) => res.status(500).json({ error: err.message }));
});

router.post('/startup', async (req, res) => {
	try {
		const startupData = req.body;

		// const user = req.user;
		// startupData.owner = user._id;
		// console.log(startupData.owner);
		// console.log(startupData);

		const newStartup = new Startup(startupData);
		await newStartup.save();

		res.status(201).json({ message: 'Startup added successfully', startup: newStartup });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'An error occurred while adding the startup' });
	}
});
router.post('/post', async (req, res) => {
	try {
		const { title, content } = req.body;
		const post = new Post({ title, content });
		await post.save();
		res.status(201).json(post);
	} catch (error) {
		res.status(500).json({ message: 'Failed to create post' });
	}
});

router.get('/topStartups', async (req, res) => {
	try {
		const startups = await Startup.find().limit(3);
		res.json(startups);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Server error' });
	}
});
router.get('/getUserInfo', auth.authenticateToken, async (req, res) => {
	try {
		// Get the user information from the decoded token in the request object
		const { userId } = req.user;

		// Fetch the user data from the database using the userId
		const user = await User.findById(userId);

		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}

		// Return the user information to the client
		res.json(user);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Server error' });
	}
});
// Get a startup by owner
// router.get('/startup', async (req, res) => {
// 	const { owner } = req.query;
// 	try {
// 		const startup = await Startup.find({ owner });
// 		res.status(200).json(startup);
// 	} catch (error) {
// 		console.error(error);
// 		res.status(500).json({ error: 'Failed to get startup' });
// 	}
// });
// Get a startup by owner
router.get('/startup', async (req, res) => {
	const { owner, id } = req.query;
	try {
		let startup;

		if (owner) {
			startup = await Startup.find({ owner });
		} else if (id) {
			startup = await Startup.findById(id);
		} else {
			return res.status(400).json({ error: 'Invalid request' });
		}

		res.status(200).json(startup);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Failed to get startup' });
	}
});

// Get all startups
router.get('/startups', async (req, res) => {
	try {
		const startups = await Startup.find();
		res.status(200).json(startups);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Failed to get startups' });
	}
});
//error handling
router.use(function (req, res) {
	res.status(404);
	res.type('text/plain');
	res.send('Not Found');
});

module.exports = router;
