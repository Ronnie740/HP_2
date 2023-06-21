/** @format */

// client/src/Login.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Login = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [name, setName] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();

		// Send the login request to the server
		axios
			.post('/userLogin', { email, name, password })
			.then((response) => {
				// Handle the response from the server
				const token = response.data.token;
				localStorage.setItem('token', token);

				console.log(response.data);

				// Include the token in subsequent requests
				axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

				// Redirect to the home page
				navigate('/');
			})
			.catch((error) => {
				console.error('Error:', error);
			});
	};

	return (
		<div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
			<div className='max-w-md w-full bg-white p-6 rounded-md shadow-md'>
				<h1 className='text-2xl mb-4'>Login</h1>
				<form onSubmit={handleSubmit}>
					<div className='mb-4'>
						<label htmlFor='email' className='block mb-1'>
							Email:
						</label>
						<input
							type='email'
							id='email'
							className='w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div className='mb-4'>
						<label htmlFor='name' className='block mb-1'>
							Name:
						</label>
						<input
							type='name'
							id='name'
							className='w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500'
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</div>
					<div className='mb-4'>
						<label htmlFor='password' className='block mb-1'>
							Password:
						</label>
						<input
							type='password'
							id='password'
							className='w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors'>
						Login
					</button>
				</form>
			</div>
		</div>
	);
};

export default Login;
