/** @format */

import { React, useState } from 'react';

const Contact = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState('');

	const handleNameChange = (event) => {
		setName(event.target.value);
	};

	const handleEmailChange = (event) => {
		setEmail(event.target.value);
	};

	const handleMessageChange = (event) => {
		setMessage(event.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		const destination = 'your-email@example.com';
		const mailtoLink = `mailto:${destination}?subject=Contact%20Form%20Submission&body=Name:%20${name}%0AEmail:%20${email}%0AMessage:%20${message}`;

		window.location.href = mailtoLink;

		// Reset form fields
		setName('');
		setEmail('');
		setMessage('');
	};

	return (
		<div className='bg-gray-200 shadow-md rounded-md p-6 mx-20 my-10'>
			<h1 className='font-semibold text-2xl text-center'>Contact Us</h1>
			<form onSubmit={handleSubmit}>
				<div className='mb-4'>
					<label htmlFor='name' className='block mb-2'>
						Name
					</label>
					<input type='text' id='name' name='name' value={name} onChange={handleNameChange} className='w-full rounded-md border-gray-300 border p-2' required />
				</div>
				<div className='mb-4'>
					<label htmlFor='email' className='block mb-2'>
						Email
					</label>
					<input type='email' id='email' name='email' value={email} onChange={handleEmailChange} className='w-full rounded-md border-gray-300 border p-2' required />
				</div>
				<div className='mb-4'>
					<label htmlFor='message' className='block mb-2'>
						Message
					</label>
					<textarea id='message' name='message' rows='4' value={message} onChange={handleMessageChange} className='w-full rounded-md border-gray-300 border p-2' required></textarea>
				</div>
				<div className='mb-4'>
					<button type='submit' className='bg-primary hover:bg-button_active text-white rounded-md py-2 w-full'>
						Submit
					</button>
				</div>
			</form>
		</div>
	);
};

export default Contact;
