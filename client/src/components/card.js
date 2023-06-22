/** @format */

import React from 'react';
function truncateDescription(description, wordLimit) {
	const words = description.split(' ');
	const truncated = words.slice(0, wordLimit).join(' ');

	if (words.length > wordLimit) {
		return `${truncated}...`;
	}

	return truncated;
}

const Card = ({ name, description, imgSrc, imgAlt, link, height }) => {
	const className = `relative ${height ? height : 'h-[400px]'} cursor-pointer`;
	return (
		// <a className='relative h-[400px] cursor-pointer' href={link}>
		<a className={className} href={link}>
			<img src={imgSrc} alt={imgAlt} className='rounded-md w-full h-full' />
			<div className='absolute inset-0 flex items-end justify-center'>
				<div className='h-1/2 w-full bg-black bg-opacity-40 flex flex-col items-center justify-center rounded-md backdrop-blur-md relative'>
					<h2 className='text-xl font-bold text-white'>{name}</h2>
					<p className='text-lg text-white truncate'>{truncateDescription(description, 5)}</p>
				</div>
			</div>
		</a>
	);
};

export default Card;
