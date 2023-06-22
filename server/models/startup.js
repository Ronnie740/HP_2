/** @format */

// models/Startup.js

const mongoose = require('mongoose');

const startupSchema = new mongoose.Schema({
	startupName: {
		type: String,
		required: true,
	},
	startupDesc: {
		type: String,
		required: true,
	},
	startupCountry: {
		type: String,
		required: true,
	},
	startupCategory: {
		type: String,
		required: true,
	},
	paypalLink: {
		type: String,
		required: true,
	},
	goal: {
		type: String,
		required: true,
	},
	problemSolved: {
		type: String,
		required: true,
	},
	dangers: [
		{
			type: String,
			required: true,
		},
	],
	solution: {
		type: String,
		required: false,
	},
	videos: [
		{
			type: String,
			required: false,
		},
	],
	teamMembers: [
		{
			name: {
				type: String,
				required: true,
			},
			title: {
				type: String,
				required: true,
			},
			description: {
				type: String,
				required: true,
			},
		},
	],
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});
const Startup = mongoose.model('Startup', startupSchema);

module.exports = Startup;
