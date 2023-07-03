/** @format */

import React from 'react';
export function truncateDescription(description, wordLimit) {
	const words = description.split(' ');
	const truncated = words.slice(0, wordLimit).join(' ');

	if (words.length > wordLimit) {
		return `${truncated}...`;
	}

	return truncated;
}

const Card = ({ name, description, imgSrc, imgAlt, link, height }) => {
	const className = `relative ${height ? height : 'sm:h-[400px] h-[200px]'} cursor-pointer`;
	return (
		// <a className='relative h-[400px] cursor-pointer' href={link}>
		<a className={className} href={link}>
			<img src={imgSrc} alt={imgAlt} className='rounded-md w-full h-full' />
			<div className='absolute inset-0 flex items-end justify-center'>
				<div className='h-1/2 w-full bg-black bg-opacity-40 flex flex-col items-center justify-center rounded-md backdrop-blur-md relative'>
					<h2 className='md:text-xl text-base font-bold text-white'>{name}</h2>
					<p className='md:text-lg text-sm text-white truncate px-2'>{truncateDescription(description, 3)}</p>
				</div>
			</div>
		</a>
	);
};

export default Card;
