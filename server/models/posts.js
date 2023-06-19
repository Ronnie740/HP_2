/** @format */

// models/Post.js

const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	content: {
		type: String,
		required: true,
	},
	// Add more fields as per your requirements
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
