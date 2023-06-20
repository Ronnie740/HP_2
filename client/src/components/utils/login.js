/** @format */

import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useLocation, useNavigate } from 'react-router-dom';

const Login = () => {
	// const { loginWithRedirect } = useAuth0();
	// const location = useLocation();
	// const navigate = useNavigate();

	// const handleLogin = () => {
	// 	localStorage.setItem('loginRedirectPath', location.pathname);
	// 	loginWithRedirect();
	// };
	const { loginWithRedirect, isAuthenticated, getAccessTokenSilently } = useAuth0();

	const handleLogin = async () => {
		try {
			await loginWithRedirect();
			if (isAuthenticated) {
				const accessToken = await getAccessTokenSilently();
				console.log('Access token: ' + accessToken);
				localStorage.setItem('access_token', accessToken);
			}
		} catch (error) {
			console.error('An error occurred during login:', error);
		}
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
// import React from 'react';
// import { useAuth0 } from '@auth0/auth0-react';

// const Login = () => {
//   const { loginWithRedirect, isAuthenticated } = useAuth0();

//   const handleLogin = () => {
//     const nonce = generateNonce(); // Generate a unique nonce
//     const state = {
//       redirectUrl: window.location.pathname, // Store the current URL
//       nonce: nonce, // Store the generated nonce
//     };
//     localStorage.setItem('loginState', JSON.stringify(state)); // Store the state in local storage
//     loginWithRedirect({ state: nonce }); // Pass the nonce as the state parameter
//   };

//   // Helper function to generate a unique nonce
//   const generateNonce = () => {
//     return Math.random().toString(36).substr(2, 10);
//   };

//   // Check if the user is already authenticated and redirect if necessary
//   if (isAuthenticated) {
//     const storedState = localStorage.getItem('loginState');
//     if (storedState) {
//       const { redirectUrl, nonce } = JSON.parse(storedState);
//       if (nonce) {
//         localStorage.removeItem('loginState');
//         const currentNonce = new URLSearchParams(window.location.search).get(
//           'state'
//         );
//         if (currentNonce === nonce) {
//           window.location.href = redirectUrl; // Redirect to the stored URL
//         }
//       }
//     }
//     return null; // If user is already authenticated, do not render the Login component
//   }

//   return (
//     <div>
//       {/* <h2>Login</h2> */}
//       <button onClick={handleLogin}>Log In</button>
//     </div>
//   );
// };

// export default Login;
