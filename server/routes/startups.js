/** @format */

const express = require('express');
const router = express.Router();
const Startup = require('../models/startup');

// POST /startups
router.post('/', async (req, res) => {
	try {
		const startupData = req.body;

		const newStartup = new Startup(startupData);
		await newStartup.save();

		res.status(201).json({ message: 'Startup added successfully', startup: newStartup });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'An error occurred while adding the startup' });
	}
});

module.exports = router;
