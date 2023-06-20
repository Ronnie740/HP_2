/** @format */

import React from 'react';
import error from '../../images/404.jpg';

const NotFound = () => {
	return (
		<div className='flex flex-col items-center justify-center h-screen bg-gray-100'>
			<h1 className='text-4xl font-bold mb-4'>404 Not Found</h1>
			<p className='text-lg text-gray-600'>Oops! The page you're looking for doesn't exist.</p>
			<img className='mt-8 w-64' src={error} alt='Error' />
		</div>
	);
};

export default NotFound;
