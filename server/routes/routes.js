/** @format */

const express = require('express');
const User = require('../models/user.js');
const Startup = require('../models/startup');
const Post = require('../models/posts');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');
const auth = require('./middleware');
const router = express.Router();
const paypal = require('paypal-rest-sdk');
const ContentBasedRecommender = require('content-based-recommender');
require('dotenv').config();

// Configure PayPal SDK with sandbox credentials
paypal.configure({
	mode: 'sandbox',
	client_id: process.env.PAYPAL_CLIENT_ID,
	client_secret: process.env.PAYPAL_CLIENT_SECRET,
});

router.post('/userSignup', async (req, res) => {
	try {
		const { email, nickname, picture } = req.body.user;
		// console.log(nickname);
		// console.log(picture);
		// console.log(email);

		const user = new User({ email, name: nickname, image: { fileName: nickname, imageUrl: picture } });
		console.log(user);
		await user.save();
		res.status(201).json({ message: 'User added successfully', user: user });
	} catch (error) {
		res.status(500).json({ message: 'Failed to register user' });
	}
});
// Login a new user
router.post('/userLogin', async (req, res) => {
	//console.log('Login', req.body);
	const { email } = req.body;
	User.findOne({ email })
		.then((user) => {
			// Check if the user exists
			if (!user) {
				return res.status(404).json({ error: 'User not found' });
			}
			// Create and sign a JWT
			const token = jwt.sign({ userId: user._id }, config.jwt.secret, { expiresIn: '1h' });

			// Return the token to the client
			res.json({ token });
		})
		.catch((err) => res.status(500).json({ error: err.message }));
});

router.post('/startup', async (req, res) => {
	try {
		const startupData = req.body;

		// const user = req.user;
		// startupData.owner = user._id;
		// console.log(startupData.owner);
		// console.log(startupData);

		const newStartup = new Startup(startupData);
		await newStartup.save();

		res.status(201).json({ message: 'Startup added successfully', startup: newStartup });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'An error occurred while adding the startup' });
	}
});
router.post('/post', async (req, res) => {
	try {
		const { title, content } = req.body;
		const post = new Post({ title, content });
		await post.save();
		res.status(201).json(post);
	} catch (error) {
		res.status(500).json({ message: 'Failed to create post' });
	}
});
router.get('/users', async (req, res) => {
	try {
		const users = await User.find();
		res.json(users);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Server Error' });
	}
});
router.get('/topStartups', async (req, res) => {
	try {
		const startups = await Startup.find().limit(3);
		res.json(startups);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Server error' });
	}
});
router.get('/getUserInfo', auth.authenticateToken, async (req, res) => {
	try {
		// Get the user information from the decoded token in the request object
		const { userId } = req.user;

		// Fetch the user data from the database using the userId
		const user = await User.findById(userId);

		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}

		// Return the user information to the client
		res.json(user);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Server error' });
	}
});
// Get a startup by owner
// router.get('/startup', async (req, res) => {
// 	const { owner } = req.query;
// 	try {
// 		const startup = await Startup.find({ owner });
// 		res.status(200).json(startup);
// 	} catch (error) {
// 		console.error(error);
// 		res.status(500).json({ error: 'Failed to get startup' });
// 	}
// });
// Get a startup by owner
router.get('/startup', async (req, res) => {
	const { owner, id } = req.query;
	try {
		let startup;

		if (owner) {
			startup = await Startup.find({ owner });
		} else if (id) {
			startup = await Startup.findById(id);
		} else {
			return res.status(400).json({ error: 'Invalid request' });
		}

		res.status(200).json(startup);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Failed to get startup' });
	}
});
// Get followed startups for a user
router.get('/users/:userId/followed-startups', async (req, res) => {
	const { userId } = req.params;

	try {
		// Find the user by ID
		const user = await User.findById(userId);

		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}

		// Get the followed startup IDs for the user
		const followedStartupIds = user.favorites;

		// Find the startups based on the followed startup IDs
		const followedStartups = await Startup.find({ _id: { $in: followedStartupIds } });

		res.json(followedStartups);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Server error' });
	}
});
// Get all startups
router.get('/startups', async (req, res) => {
	try {
		const startups = await Startup.find();
		res.status(200).json(startups);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Failed to get startups' });
	}
});

//Get categories
router.get('/categories', async (req, res) => {
	try {
		const startups = await Startup.find();
		const categories = [...new Set(startups.map((startup) => startup.startupCategory))];
		res.status(200).json(categories);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Failed to get startups' });
	}
});
// Create a new post for a startup
router.post('/startup/:id/posts', auth.authenticateToken, async (req, res) => {
	const { id } = req.params;
	const { title, content } = req.body;

	try {
		const startup = await Startup.findById(id);

		if (!startup) {
			return res.status(404).json({ error: 'Startup not found' });
		}
		console.log('Startup Owner', startup.owner.toString());
		console.log(req.user.userId);

		// Check if the user is the owner of the startup
		if (req.user.userId !== startup.owner.toString()) {
			return res.status(403).json({ error: 'Access denied' });
		}

		const post = new Post({ title, content, startup: id });
		await post.save();

		res.status(201).json(post);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Server error' });
	}
});

// Get all posts for a startup
router.get('/startup/:id/posts', async (req, res) => {
	const { id } = req.params;

	try {
		const posts = await Post.find({ startup: id });

		if (posts.length === 0) {
			return res.json({ message: 'No posts yet' });
		}

		res.json(posts);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Server error' });
	}
});
// Get a specific post for a startup
router.get('/startup/:id/posts/:postId', async (req, res) => {
	const { id, postId } = req.params;

	try {
		const post = await Post.findOne({ _id: postId, startup: id });

		if (!post) {
			return res.status(404).json({ error: 'Post not found' });
		}

		res.json(post);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Server error' });
	}
});
// Update a post
router.put('/startup/:id/posts/:postId', async (req, res) => {
	const { id, postId } = req.params;
	const { title, content } = req.body;
	console.log(title, content);
	try {
		const post = await Post.findOne({ _id: postId, startup: id });

		if (!post) {
			return res.status(404).json({ error: 'Post not found' });
		}

		post.title = title;
		post.content = content;
		await post.save();

		res.json(post);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Server error' });
	}
});
// Delete a post
router.delete('/startup/:id/posts/:postId', async (req, res) => {
	const { id, postId } = req.params;

	try {
		const result = await Post.deleteOne({ _id: postId, startup: id });

		if (result.deletedCount === 0) {
			return res.status(404).json({ error: 'Post not found' });
		}

		res.json({ message: 'Post deleted' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Server error' });
	}
});

router.get('/users/:userId/favorites/:startupId', async (req, res) => {
	const { userId, startupId } = req.params;

	try {
		const user = await User.findById(userId);

		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}

		const isFavorite = user.favorites.includes(startupId);

		res.json({ isFavorite });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Server error' });
	}
});
// Update a startup to be a user's favorite
router.put('/users/:userId/favorites/:startupId', async (req, res) => {
	const { userId, startupId } = req.params;

	try {
		const user = await User.findById(userId);
		const startup = await Startup.findById(startupId);

		if (!user || !startup) {
			return res.status(404).json({ error: 'User or startup not found' });
		}

		// Check if the startup is already in the user's favorites
		const isFavorite = user.favorites.includes(startupId);
		// Check if the startup is already in the user's favorites
		const isFollower = startup.followers.includes(userId);

		if (isFavorite) {
			return res.status(400).json({ error: 'Startup is already in favorites' });
		}
		if (isFollower) {
			return res.status(400).json({ error: 'User is already in followers' });
		}

		// Add the startup to the user's favorites
		user.favorites.push(startupId);
		await user.save();

		// Add the user to the startup's followers
		startup.followers.push(userId);
		await startup.save();

		res.json({ message: 'Startup added to favorites' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Server error' });
	}
});
router.delete('/users/:userId/favorites/:startupId', async (req, res) => {
	const { userId, startupId } = req.params;

	try {
		const user = await User.findById(userId);
		const startup = await Startup.findById(startupId);

		if (!user || !startup) {
			return res.status(404).json({ error: 'User or startup not found' });
		}

		// Remove the startup ID from the user's favorites array
		user.favorites = user.favorites.filter((favorite) => favorite.toString() !== startupId);
		await user.save();

		// Remove the user from the startup's followers array
		startup.followers = startup.followers.filter((follower) => follower.toString() !== userId);
		await startup.save();

		res.json({ message: 'Startup removed from favorites' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Server error' });
	}
});
// POST route for sending notifications to a user
router.post('/user/:userId/notifications', async (req, res) => {
	try {
		const { userId } = req.params;
		const { message } = req.body;

		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}
		user.notifications;

		// Implement your notification delivery mechanism here
		const notification = {
			message,
			isRead: false, // Set the notification as unread initially
		};
		// Add the notification to the user's notifications array
		user.notifications.push(notification);

		// Save the user object with the updated notifications
		await user.save();
		res.status(200).json({ success: true, notification });
	} catch (error) {
		console.error(error);
		res.status(500).json({ success: false, error: 'Failed to send notification.' });
	}
});
router.get('/user/:userId/notifications', async (req, res) => {
	try {
		// Extract the user ID from the authenticated request
		const { userId } = req.params;
		// console.log(r);

		// Fetch the user from the database
		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}

		// Get the notifications for the user
		const notifications = user.notifications;

		res.status(200).json({ success: true, notifications });
	} catch (error) {
		console.error(error);
		res.status(500).json({ success: false, error: 'Failed to fetch notifications.' });
	}
});
// DELETE route to remove a notification
router.delete('/user/:userId/notifications/:notificationIndex', (req, res) => {
	const { userId, notificationIndex } = req.params;
	User.findById(userId)
		.then((user) => {
			if (!user) {
				return res.status(404).json({ message: 'User not found' });
			}

			// Remove the notification at the specified index
			user.notifications.splice(notificationIndex, 1);

			// Save the updated user to the database
			return user.save();
		})
		.then((updatedUser) => {
			res.json({ message: 'Notification removed successfully' });
			// console.log('Removed Notification', updatedUser);
		})
		.catch((error) => {
			console.error(error);
			res.status(500).json({ message: 'Internal server error' });
		});
});
router.post('/api/users/:userId/image', async (req, res) => {
	try {
		const { userId } = req.params;
		const { fileName, imageUrl } = req.body;

		// Find the user
		const user = await User.findOne({ _id: userId });

		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		let updateData = {};

		if (user.image) {
			// User already has an image, update the existing image field
			updateData = {
				$set: {
					'image.fileName': fileName,
					'image.imageUrl': imageUrl,
				},
			};
		} else {
			// User does not have an image, add the image field
			updateData = {
				$set: {
					image: {
						fileName,
						imageUrl,
					},
				},
			};
		}

		// Update the user with the image data
		const updatedUser = await User.findOneAndUpdate({ _id: userId }, updateData, { new: true });

		res.status(200).json(updatedUser);
	} catch (error) {
		console.error('Error saving image metadata:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
});

// Retrieve image metadata from MongoDB
router.get('/api/users/:userId/image', async (req, res) => {
	try {
		const { userId } = req.params;

		// Find the user and retrieve the image URL
		const user = await User.findById(userId);
		if (!user || !user.image) {
			return res.status(404).json({ message: 'User image not found' });
		}

		res.status(200).json({ imageUrl: user.image.imageUrl });
	} catch (error) {
		console.error('Error retrieving image metadata:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
});

// Create a payment
router.post('/api/paypal/create-payment', (req, res) => {
	// app.post('/startup/:startupId/donate', (req, res) => {
	// const startupId = req.params.startupId;
	const receiverEmail = 'sb-r6g2t26467443@personal.example.com';
	const { amount } = req.body;
	const paymentData = {
		// intent: 'sale',
		intent: 'sale',
		payer: {
			payment_method: 'paypal',
		},
		transactions: [
			{
				amount: {
					total: amount,
					currency: 'USD',
				},
				payee: {
					email: receiverEmail, // Receiver PayPal email
				},
			},
		],
		redirect_urls: {
			// return_url: `http://localhost:3000/success?amount=${encodeURIComponent(amount)}`,
			return_url: `http://localhost:3000/success`,
			cancel_url: 'http://localhost:3000/cancel',
		},
	};

	paypal.payment.create(paymentData, (error, payment) => {
		if (error) {
			console.error(error);
			res.sendStatus(500);
		} else {
			// Return the PayPal payment approval URL to the client
			const approvalUrl = payment.links.find((link) => link.rel === 'approval_url').href;
			res.json({ approvalUrl, amount });
		}
	});
});
// router.get('/success/:PayerId/paymentId', (req, res) => {
router.get('/success', (req, res) => {
	const { paymentId, payerId } = req.query;
	// const paymentId = req.params.paymentId;
	// const payerId = req.params.PayerId;
	paypal.payment.execute(paymentId, { payer_id: payerId }, (error, payment) => {
		if (error) {
			console.error(error);
			res.sendStatus(500);
		} else {
			// res.redirect('http://localhost:3000/success');
			console.log('Payment was a success!');
			// console.log(JSON.stringify(payment));
			// const { total, currency } = payment.transactions[0].amount;
			// const amount = { total, currency };
			const redirectUrl = `http://localhost:3000/success`;
			res.redirect(redirectUrl);
		}
	});
});

//Content based recommendations for users
// Set up the recommender
const recommender = new ContentBasedRecommender({
	minScore: 0.1,
	maxSimilarDocuments: 100,
});
// Train the recommender with startup data
const trainRecommender = async () => {
	try {
		const startups = await Startup.find();
		const documents = startups.map((startup) => ({
			id: startup._id.toString(),
			// content: `${startup.startupCategory} ${startup.startupCountry}`,
			content: `${startup.startupCategory}`,
		}));
		console.log(`Training Documents`, documents);
		recommender.train(documents);
		console.log('Recommender trained successfully');
	} catch (error) {
		console.error('Error training recommender:', error);
	}
};

trainRecommender();

router.get('/recommendations', async (req, res) => {
	try {
		const { userId } = req.query;

		// Retrieve user preferences from the database
		const user = await User.findById(userId);
		console.log(`User favorites: ${user.favorites}`);

		// Initialize an array to store recommended startup IDs
		let recommendedStartupIds = [];

		// Iterate over each favorite startup ID
		for (const favoriteId of user.favorites) {
			const favorite = await Startup.findById(favoriteId);
			console.log(`Favorite Startup: ${favorite._id.toString()}`);

			// Generate recommendations based on the favorite startup
			const similarDocuments = recommender.getSimilarDocuments(favorite._id.toString(), 0, 10);
			console.log(`Similar Documents`, similarDocuments);

			// Add the recommended startup IDs to the array
			recommendedStartupIds = [...recommendedStartupIds, ...similarDocuments.map((doc) => doc.id)];
		}

		// Remove duplicates from the recommended startup IDs array
		recommendedStartupIds = [...new Set(recommendedStartupIds)];

		// Retrieve the recommended startups from the database
		const recommendedStartups = await Startup.find({ _id: { $in: recommendedStartupIds } });

		res.json(recommendedStartups);
	} catch (error) {
		console.error('Error retrieving recommendations:', error);
		res.status(500).json({ error: 'An error occurred' });
	}
});

//error handling
router.use(function (req, res) {
	res.status(404);
	res.type('text/plain');
	res.send('Not Found');
});

module.exports = router;
