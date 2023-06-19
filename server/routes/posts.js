/** @format */

// routes/posts.js

const express = require('express');
const Post = require('../models/posts');

const router = express.Router();

// Create a new post
router.post('/', async (req, res) => {
	try {
		const { title, content } = req.body;
		const post = new Post({ title, content });
		await post.save();
		res.status(201).json(post);
	} catch (error) {
		res.status(500).json({ message: 'Failed to create post' });
	}
});

// Other post routes (e.g., get all posts, get a single post, update, delete) can be added here

module.exports = router;
