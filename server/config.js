/** @format */
require('dotenv').config();
module.exports = {
	auth0: {
		domain: process.env.REACT_APP_AUTH0_DOMAIN,
		clientId: process.env.REACT_APP_AUTH0_CLIENT_ID,
		clientSecret: process.env.REACT_APP_AUTH0_CLIENT_SECRET,
	},
	jwt: {
		secret: 'this is my secret',
	},
};
