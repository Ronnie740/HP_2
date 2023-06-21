/** @format */

import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Signup = () => {
	const { loginWithRedirect, isAuthenticated } = useAuth0();

	const handleSignup = () => {
		loginWithRedirect({ screen_hint: 'signup' });
	};

	// if (isAuthenticated) {
	// 	return null; // If user is already authenticated, do not render the Signup component
	// }

	return (
		<div>
			{/* <h2>Sign Up</h2> */}
			<button onClick={handleSignup}>Sign Up</button>
		</div>
	);
};

export default Signup;
