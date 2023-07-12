/** @format */

import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
	const { loginWithRedirect, isAuthenticated, user } = useAuth0();
	const location = useLocation();
	const navigate = useNavigate();

	const handleSignup = () => {
		loginWithRedirect({ screen_hint: 'signup' });
	};

	useEffect(() => {
		const sendUserToBackend = async () => {
			if (isAuthenticated && user) {
				try {
					// Send the user object to the backend
					await axios.post('/userSignup', { user });
					console.log('User object sent to backend:', user);
				} catch (error) {
					console.error('An error occurred while sending the user object to the backend:', error);
				}
			}
		};

		sendUserToBackend();
	}, [isAuthenticated, user]);

	if (isAuthenticated) {
		// If user is already authenticated, redirect to the desired location
		const loginRedirectPath = localStorage.getItem('loginRedirectPath');
		if (loginRedirectPath) {
			localStorage.removeItem('loginRedirectPath');
			navigate(loginRedirectPath);
		} else {
			navigate('/'); // Redirect to home page, or any other default location
		}
		//return null;
	}

	return (
		<div>
			{/* <h2>Sign Up</h2> */}
			<button onClick={handleSignup}>Sign Up</button>
		</div>
	);
};

export default Signup;
