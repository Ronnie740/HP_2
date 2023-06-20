/** @format */

import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
// import { useHistory } from 'react-router-dom';

const Account = () => {
	const { user, logout, deleteUser, isAuthenticated } = useAuth0();
	// const history = useHistory();

	const handleLogout = () => {
		logout({ returnTo: window.location.origin });
	};

	const handleDeleteAccount = () => {
		deleteUser({ returnTo: window.location.origin });
		// history.push('/');
	};
	if (!isAuthenticated) {
		return <div>Loading...</div>; // Render a loading state or redirect to a login page
	}

	return (
		<div className='max-w-lg mx-auto p-4'>
			{user && (
				<>
					<div className='flex flex-col items-center mb-4'>
						<img className='w-40 h-40 rounded-full mx-auto' src={user.picture} alt='Profile' />
						<h2 className='text-xl font-bold'>{user.name}</h2>
					</div>

					<h3 className='text-lg font-semibold mb-2'>Followed Startups:</h3>
					{/* Render the followed startups section */}
					{/* Replace with your own implementation */}
					<div className='flex flex-col'>
						<button className='bg-primary hover:bg-button_active text-white rounded-md py-2 px-4 mb-2' onClick={handleLogout}>
							Logout
						</button>

						<button className='bg-red-500 text-white rounded-md py-2 px-4' onClick={handleDeleteAccount}>
							Delete Account
						</button>
					</div>
				</>
			)}
		</div>
	);
};

export default Account;
