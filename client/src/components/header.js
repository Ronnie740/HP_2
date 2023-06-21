/** @format */
import logo from '../images/logo.png';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import md5 from 'md5';
const Header = () => {
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
				}
			} catch (error) {
				console.error(error);
			}
		};

		fetchUser();
	}, []);
	const handleLogout = () => {
		// Perform logout actions (e.g., clearing token from localStorage)
		// and redirect to the logout page or desired location
		localStorage.removeItem('token');
		// Redirect to the root directory
		navigate('/');
	};
	// Gravetar avatars
	// let gravatarUrl = ``;
	// if (user) {
	// 	gravatarUrl = `https://www.gravatar.com/avatar/${md5(user.email)}?s=200`;
	// }
	return (
		<header className='mx-20 flex flex-row justify-between my-5 w-f'>
			{/*Logo and navigation*/}
			<div className='flex space-x-5'>
				{/* Logo */}
				<Link to='/'>
					<img className='w-40 h-15' src={logo} alt='Logo' />
				</Link>
				{/* Nav */}
				<div className='w-auto space-x-5 mt-3'>
					<Link to='discover'>Discover</Link>
					<Link to='facts'>Climate Change Facts</Link>
					<Link to='about'>About Us</Link>
					<Link to='contact'>Contact Us</Link>
				</div>
			</div>
			{/* Login and Signup */}
			<div className=' flex w-auto space-x-5 mt-3 items-center'>
				{user ? (
					<>
						<Link to='/account' className='flex space-x-5'>
							<span className='my-auto'>Hello! {user.name}</span>
							{/* <img src={gravatarUrl} alt='Profile' className='w-10 h-10 rounded-full' /> */}
							<img src='https://api.dicebear.com/6.x/fun-emoji/svg?seed=Bear' alt='Profile' className='w-10 h-10 rounded-full' />
							{/* <img src={<Avatar name={user.name} />} alt='Profile' className='w-10 h-10 rounded-full' /> */}
						</Link>
						<button onClick={handleLogout}>Logout</button>
					</>
				) : (
					<>
						<Link to='/login'>Login</Link>
						<Link to='/signup'>Signup</Link>
					</>
				)}
			</div>
		</header>
	);
};

export default Header;
