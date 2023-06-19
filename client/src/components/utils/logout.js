/** @format */

import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Logout = () => {
	const { logout, isAuthenticated } = useAuth0();

	const handleLogout = () => {
		logout({ returnTo: window.location.origin });
	};

	// if (!isAuthenticated) {
	// 	return null; // If user is not authenticated, do not render the Logout component
	// }

	return (
		<div>
			{/* <h2>Logout</h2> */}
			<button onClick={handleLogout}>Log Out</button>
		</div>
	);
};

export default Logout;
