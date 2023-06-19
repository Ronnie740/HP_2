/** @format */

// routes/users.js

const express = require('express');
const User = require('../models/user.js');

const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
	try {
		const { name, email } = req.body;
		const user = new User({ name, email });
		await user.save();
		res.status(201).json(user);
	} catch (error) {
		res.status(500).json({ message: 'Failed to register user' });
	}
});

// Other user routes (e.g., login, update, delete) can be added here

module.exports = router;
