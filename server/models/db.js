/** @format */

// db.js

const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://ronnie:d2iNhkq3MbvJzhaN@cluster0.xhnpf1t.mongodb.net/hp_test?retryWrites=true&w=majority'; // Replace with your MongoDB URI
console.log('This is a log');
const connectDB = async () => {
	try {
		await mongoose.connect(mongoURI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
			useCreateIndex: true,
		});
		console.log('MongoDB connected');
	} catch (error) {
		console.error('MongoDB connection error:', error);
		process.exit(1); // Exit with failure
	}
};

module.exports = connectDB;
