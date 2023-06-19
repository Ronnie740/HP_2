/** @format */
import logo from '../images/logo.png';
import { Link } from 'react-router-dom';
import React from 'react';
import Login from './utils/login';
import Logout from './utils/logout';
import SignUp from './utils/signup';
import { useAuth0 } from '@auth0/auth0-react';

const Header = () => {
	const { isAuthenticated, user } = useAuth0();
	console.log('isAuthenticated:', isAuthenticated);
	console.log('user:', user);
	return (
		<header className='mx-20 flex flex-row justify-between my-5 w-f'>
			{/*Logo and navigation*/}
			<div className='flex space-x-5'>
				{/* Logo */}
				<a href='/'>
					<img className='w-40 h-15' src={logo} alt='Logo' />
				</a>
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
				{isAuthenticated ? (
					<div className='flex items-center space-x-5'>
						<span>Hello! {user.name}</span>
						<img src={user.picture} alt='Profile' className='w-10 h-10 rounded-full' />
						<Logout />
					</div>
				) : (
					<>
						{/* <a href='login'>Login</a> */}
						<Login />
						{/* <a href='signup'>Signup</a> */}
						<SignUp />
					</>
				)}
			</div>
		</header>
	);
};

export default Header;
