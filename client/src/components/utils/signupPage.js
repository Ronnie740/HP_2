/** @format */

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import zxcvbn from 'zxcvbn'; // Importing zxcvbn library for password strength estimation

const Signup = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [name, setName] = useState('');
	//For old password implentations
	// const [password, setPassword] = useState('');

	const [password, setPassword] = useState('');
	const [passwordStrength, setPasswordStrength] = useState(0);
	const [showPassword, setShowPassword] = useState(false);

	const handlePasswordChange = (e) => {
		const newPassword = e.target.value;
		setPassword(newPassword);
		setPasswordStrength(zxcvbn(newPassword).score); // Estimating password strength using zxcvbn library
	};

	const hasLowercase = /[a-z]/.test(password);
	const hasUppercase = /[A-Z]/.test(password);
	const hasNumber = /[0-9]/.test(password);
	const hasSymbol = /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/.test(password);

	const getPasswordStrengthColor = () => {
		if (passwordStrength === 0) return 'text-red-500';
		if (passwordStrength === 1) return 'text-orange-500';
		if (passwordStrength === 2) return 'text-yellow-500';
		if (passwordStrength === 3) return 'text-blue-500';
		if (passwordStrength === 4) return 'text-green-500';
	};

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log('Email', email);
		console.log('Name', name);
		console.log('Password', password);
		// Send the signup request to the server
		axios
			.post('/userSignup', { email, name, password })
			.then((response) => {
				// Handle the response from the server
				console.log(response.data);
				navigate('/login');
			})
			.catch((error) => {
				console.error('Error:', error);
			});
	};

	return (
		<div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
			<div className='max-w-md w-full bg-white p-6 rounded-md shadow-md'>
				<h1 className='text-2xl mb-4'>Signup</h1>
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
					{/* for old password */}
					{/* <div className='mb-4'>
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
					</div> */}
					{/* New passwords with security measures */}
					<div className='mb-4'>
						<label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='password'>
							Password
						</label>
						<div className='relative'>
							<input
								className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
								id='password'
								type={showPassword ? 'text' : 'password'}
								placeholder='Enter your password'
								value={password}
								onChange={handlePasswordChange}
							/>
							<button className='absolute top-0 right-0 mr-2 mt-2 text-gray-500 focus:outline-none' onClick={togglePasswordVisibility}>
								{showPassword ? 'Hide' : 'Show'}
							</button>
						</div>
					</div>
					<div>
						<p className={`text-sm mb-2 ${getPasswordStrengthColor()}`}>Password Strength: {passwordStrength === 0 ? 'Weak' : passwordStrength === 4 ? 'Strong' : 'Medium'}</p>
						<ul className='list-disc ml-6'>
							<li className={hasLowercase ? 'text-green-500' : 'text-red-500'}>At least one lowercase letter</li>
							<li className={hasUppercase ? 'text-green-500' : 'text-red-500'}>At least one uppercase letter</li>
							<li className={hasNumber ? 'text-green-500' : 'text-red-500'}>At least one number</li>
							<li className={hasSymbol ? 'text-green-500' : 'text-red-500'}>At least one symbol</li>
						</ul>
					</div>
					<button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors'>
						Signup
					</button>
				</form>
			</div>
		</div>
	);
};

export default Signup;
