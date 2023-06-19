/** @format */

import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Login = () => {
	const { loginWithRedirect, isAuthenticated } = useAuth0();

	const handleLogin = () => {
		loginWithRedirect();
	};

	// if (isAuthenticated) {
	// 	return null; // If user is already authenticated, do not render the Login component
	// }

	return (
		<div>
			{/* <h2>Login</h2> */}
			<button onClick={handleLogin}>Log In</button>
		</div>
	);
};

export default Login;
