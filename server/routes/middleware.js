/** @format */

const jwt = require('jsonwebtoken');
const config = require('../config');

exports.authenticateToken = function (req, res, next) {
	// Get the token from the request headers
	const token = req.headers.authorization;
	console.log(req.headers.authorization);

	if (!token) {
		return res.status(401).json({ error: 'No token provided' });
	}

	// Verify the token
	jwt.verify(token, config.jwt.secret, (err, decoded) => {
		if (err) {
			return res.status(403).json({ error: 'Failed to authenticate token' });
		}

		// Token is valid, attach the decoded user information to the request object
		req.user = decoded;
		console.log('Token is valid');

		// Proceed to the next middleware or route handler
		next();
	});
};
// module.exports = authenticateToken;
