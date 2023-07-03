/** @format */

import React from 'react';

const Footer = () => {
	return (
		<footer className='flex flex-col bg-accent py-4 px-20 text-white'>
			<div className='space-x-5'>
				<a href='about' className='font-semibold'>
					About
				</a>
				<a href='contact' className='font-semibold'>
					Contact
				</a>
			</div>
			<p className='text-sm text-white font-semibold mx-auto'>&copy; 2023 EcoStart. All rights reserved.</p>
		</footer>
	);
};

export default Footer;
