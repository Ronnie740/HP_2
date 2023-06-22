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
	startup: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Startup',
	},
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
