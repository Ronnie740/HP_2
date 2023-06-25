/** @format */

// models/User.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true,
	},
	name: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Startup' }],
	notifications: [
		{
			message: String, // Notification message
			isRead: Boolean, // Indicates whether the user has read the notification or not
		},
	],
	// Add more fields as per your requirements
});

const User = mongoose.model('User', userSchema);

module.exports = User;
