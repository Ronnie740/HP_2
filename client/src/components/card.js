/** @format */

import React from 'react';

const Card = ({ name, description, imgSrc, imgAlt, link, height }) => {
	const className = `relative ${height ? height : 'h-[400px]'} cursor-pointer`;
	return (
		// <a className='relative h-[400px] cursor-pointer' href={link}>
		<a className={className} href={link}>
			<img src={imgSrc} alt={imgAlt} className='rounded-md w-full h-full' />
			<div className='absolute inset-0 flex items-end justify-center'>
				<div className='h-1/2 w-full bg-black bg-opacity-40 flex flex-col items-center justify-center rounded-md backdrop-blur-md'>
					<h2 className='text-xl font-bold text-white'>{name}</h2>
					<p className='text-lg text-white'>{description}</p>
				</div>
			</div>
		</a>
	);
};

export default Card;
