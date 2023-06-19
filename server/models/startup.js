/** @format */

// models/Startup.js

const mongoose = require('mongoose');

const startupSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	problems: {
		type: String,
		required: true,
	},
	dangers: {
		type: String,
		required: true,
	},
	solution: {
		type: String,
		required: false,
	},
	video_urls: {
		type: String,
		required: false,
	},
	team: [
		{
			name: {
				type: String,
				required: true,
			},
			jobTitle: {
				type: String,
				required: true,
			},
			description: {
				type: String,
				required: true,
			},
		},
	],
});
const Startup = mongoose.model('Startup', startupSchema);

module.exports = Startup;
