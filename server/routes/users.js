/** @format */

// routes/users.js

const express = require('express');
const User = require('../models/user.js');

const router = express.Router();

// Register a new user
router.post('/userSignup', async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = new User({ email, password });
		await user.save();
		res.status(201).json({ message: 'User added successfully', user: user });
	} catch (error) {
		res.status(500).json({ message: 'Failed to register user' });
	}
});
// Register a new user
router.post('/userLogin', async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = new User({ email, password });
		await user.save();
		res.status(201).json({ message: 'User added successfully', user: user });
	} catch (error) {
		res.status(500).json({ message: 'Failed to register user' });
	}
});

// Other user routes (e.g., login, update, delete) can be added here

module.exports = router;
