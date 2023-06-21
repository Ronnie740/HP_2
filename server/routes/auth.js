/** @format */

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config');
const User = require('../models/user');

router.post('/login', (req, res) => {
	// Get the email and password from the request body
	const { email, password } = req.body;

	// Find the user in the database
	User.findOne({ email }, (err, user) => {
		if (err) {
			console.error(err);
			return res.status(500).json({ message: 'Internal Server Error' });
		}

		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		// Compare the provided password with the stored password
		bcrypt.compare(password, user.password, (err, result) => {
			if (err) {
				console.error(err);
				return res.status(500).json({ message: 'Internal Server Error' });
			}

			if (!result) {
				return res.status(401).json({ message: 'Invalid credentials' });
			}
			// Generate a JWT token
			const token = jwt.sign({ userId: user._id }, config.jwt.secret, { expiresIn: '1h' });

			// Return the token to the client
			res.json({ token });
		});
	});
});

router.post('/signup', (req, res) => {
	// Get the email and password from the request body
	const { email, password } = req.body;

	// Hash the password
	bcrypt.hash(password, 10, (err, hashedPassword) => {
		if (err) {
			console.error(err);
			return res.status(500).json({ message: 'Internal Server Error' });
		}

		// Create a new user in the database
		User.create({ email, password: hashedPassword }, (err, user) => {
			if (err) {
				console.error(err);
				return res.status(500).json({ message: 'Internal Server Error' });
			}

			// Generate a JWT token
			const token = jwt.sign({ userId: user._id }, config.jwt.secret, { expiresIn: '1h' });

			// Return the token to the client
			res.json({ token });
		});
	});
});

module.exports = router;
