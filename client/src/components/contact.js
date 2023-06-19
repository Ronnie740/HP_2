/** @format */

import React from 'react';

const Contact = () => {
	return (
		<div className='bg-gray-200 shadow-md rounded-md p-6 mx-20 my-10'>
			<h1 className='font-semibold text-2xl text-center'>Contact Us</h1>
			<form>
				<div className='mb-4'>
					<label for='name' className='block mb-2'>
						Name
					</label>
					<input type='text' id='name' name='name' className='w-full rounded-md border-gray-300 border p-2' required />
				</div>
				<div className='mb-4'>
					<label for='email' className='block mb-2'>
						Email
					</label>
					<input type='email' id='email' name='email' className='w-full rounded-md border-gray-300 border p-2' required />
				</div>
				<div className='mb-4'>
					<label for='message' className='block mb-2'>
						Message
					</label>
					<textarea id='message' name='message' rows='4' className='w-full rounded-md border-gray-300 border p-2' required></textarea>
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
