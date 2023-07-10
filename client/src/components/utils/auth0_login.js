/** @format */

import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
	const { loginWithRedirect, isAuthenticated, user } = useAuth0();
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(true); // Add loading state

	console.log('Is Authenticated state: ' + isAuthenticated);

	const handleLogin = async () => {
		try {
			await loginWithRedirect();
		} catch (error) {
			console.error('An error occurred during login:', error);
		}
	};

	useEffect(() => {
		const getUserProfile = async () => {
			if (isAuthenticated && user) {
				try {
					const response = await axios.post('/userLogin', {
						email: user.email,
					});
					console.log('User login response:', response.data);
					const token = response.data.token;
					localStorage.setItem('token', token);

					console.log(response.data);

					// Include the token in subsequent requests
					axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

					setIsLoading(false); // Set loading state to false after token is set
				} catch (error) {
					console.error('An error occurred during user login:', error);
				}
			}
		};

		getUserProfile();
	}, [isAuthenticated, user]);

	useEffect(() => {
		if (!isLoading) {
			// After isLoading becomes false, wait for 5 seconds and then navigate to the desired location
			const loginRedirectPath = localStorage.getItem('loginRedirectPath');
			if (loginRedirectPath) {
				localStorage.removeItem('loginRedirectPath');
				navigate(loginRedirectPath);
			} else {
				navigate('/'); // Redirect to home page, or any other default location
			}
		}
	}, [isLoading, navigate]);

	// if (isAuthenticated) {
	// 	// If user is already authenticated, no need to render the login component
	// 	return null;
	// }

	return (
		<div>
			{/* <h2>Login</h2> */}
			<button onClick={handleLogin}>Log In</button>
		</div>
	);
};

export default Login;
