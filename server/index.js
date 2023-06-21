/** @format */

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// const authRoutes = require('./routes/auth');
const app = express();
const port = 4000;
const router = require('./routes/routes');

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
const mongoURI = 'mongodb+srv://ronnie:d2iNhkq3MbvJzhaN@cluster0.xhnpf1t.mongodb.net/hp_test?retryWrites=true&w=majority'; // Replace with your MongoDB URI

// MongoDB Connection
mongoose
	.connect(mongoURI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log('MongoDB connected');
		// Start the server after successful database connection
		app.listen(port, () => {
			console.log(`Server is running on port ${port}`);
		});
	})
	.catch((error) => {
		console.error('MongoDB connection error:', error);
		process.exit(1); // Exit with failure
	});
app.use('/', router);

module.exports = app;
