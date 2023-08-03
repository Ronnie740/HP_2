/** @format */

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { truncateDescription } from './card';
import { Link } from 'react-router-dom';

//import { useAuth0 } from '@auth0/auth0-react';
// import md5 from 'md5';

const Account = () => {
	// const { user, logout, deleteUser, isAuthenticated } = useAuth0();
	const navigate = useNavigate();
	const [user, setUser] = useState(null);
	useEffect(() => {
		const fetchUser = async () => {
			try {
				const token = localStorage.getItem('token');
				console.log('header token:', token);
				if (token) {
					const response = await axios.get('/getUserInfo', {
						headers: { Authorization: token },
					});
					setUser(response.data);
				} else {
					navigate('/login');
				}
			} catch (error) {
				console.error(error);
			}
		};

		fetchUser();
	}, []);

	const [startup, setStartup] = useState(null);
	const [followedStartups, setFollowedStartups] = useState([]);
	useEffect(() => {
		const fetchStartup = async () => {
			try {
				const response = await axios.get(`/startup?owner=${user._id}`);
				if (response.data.length > 0) {
					setStartup(response.data[0]);
				}
			} catch (error) {
				console.error(error);
			}
		};

		const fetchFollowed = async () => {
			try {
				const response = await axios.get(`/users/${user._id}/followed-startups`);
				if (response.data.length > 0) {
					setFollowedStartups(response.data);
				}
			} catch (error) {
				console.error(error);
			}
		};
		if (user) {
			fetchStartup();
			fetchFollowed();
		}
	}, [user]);

	const handleCreateStartup = () => {
		navigate('/startup_registration');
	};

	const handleViewMyStartup = () => {
		navigate(`/startup/${startup._id}`);
	};

	const handleLogout = () => {
		localStorage.removeItem('token');
		navigate('/');
	};
	const handleProfileEdit = () => {
		navigate('/testUpload');
	};

	const handleDeleteAccount = () => {
		// history.push('/');
	};
	if (!user) {
		return <div>loading ...</div>; // Render a loading state or redirect to a login page
	}
	const imageSrc = user.image ? user.image.imageUrl : 'https://api.dicebear.com/6.x/fun-emoji/svg?seed=Bear';
	// const gravatarUrl = `https://www.gravatar.com/avatar/${md5(user.email)}?s=200`;

	return (
		<div className='max-w-lg mx-auto p-4'>
			{user && (
				<>
					{/* <div className='flex flex-col items-center mb-4'>
						<img className='w-40 h-40 rounded-full mx-auto' src='https://api.dicebear.com/6.x/fun-emoji/svg?seed=Bear' alt='Profile' />
						<h2 className='text-xl font-bold'>{user.name}</h2>
					</div> */}
					<div className='flex flex-col items-center mb-4'>
						<div className='relative'>
							<img className='w-40 h-40 rounded-full mx-auto' src={imageSrc} alt='Profile' />
							{/* Edit Button */}
							<button className='absolute right-0 bottom-0 p-2 bg-white rounded-full shadow-md' onClick={handleProfileEdit}>
								<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className='w-6 h-6'>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10'
									/>
								</svg>
							</button>
						</div>
						<h2 className='text-xl font-bold'>{user.name}</h2>
					</div>

					<h3 className='text-lg font-semibold mb-2'>Followed Startups:</h3>
					{/* Render the followed startups section */}
					<div className='my-5 space-y-4'>
						{followedStartups.map((startup) => (
							// <Link to={`/startup/${startup._id}`}>
							<div key={startup._id} className='text-center flex flex-col bg-slate-300 rounded-md'>
								<Link to={`/startup/${startup._id}`}>
									<h1 className='text-2xl font-bold'>{startup.startupName}</h1>
									<p className='text-xl font-semibold'>{truncateDescription(startup.startupDesc, 8)}</p>
								</Link>
							</div>
						))}
					</div>
					{/* Replace with your own implementation */}
					<div className='flex flex-col'>
						<button className='bg-primary hover:bg-button_active text-white rounded-md py-2 px-4 mb-2' onClick={handleLogout}>
							Logout
						</button>

						<button className='bg-red-500 text-white rounded-md py-2 px-4' onClick={handleDeleteAccount}>
							Delete Account
						</button>
						{startup ? (
							<div className='mt-4'>
								<h3 className='text-lg font-semibold mb-2'>My Startup:</h3>
								<button className='bg-primary hover:bg-button_active text-white rounded-md py-2 px-4' onClick={handleViewMyStartup}>
									View My Startup
								</button>
							</div>
						) : (
							<div className='mt-4'>
								<h3 className='text-lg font-semibold mb-2'>Create a Startup:</h3>
								<button className='bg-primary hover:bg-button_active text-white rounded-md py-2 px-4' onClick={handleCreateStartup}>
									Create Startup
								</button>
							</div>
						)}
					</div>
				</>
			)}
		</div>
	);
};

export default Account;
