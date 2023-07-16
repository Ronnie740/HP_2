/** @format */

import React from 'react';

const Tabs = ({ imageSrc, altText, description, title, subTitle, height }) => {
	const filler = altText ? altText : 'Image';
	const className = subTitle ? 'font-semibold' : 'hidden';
	const x = subTitle ? subTitle : '';
	height = height ? height : 'h-40';
	return (
		<div className='flex flex-col w-fit h-fit'>
			{/*Image*/}
			<div className='mx-auto px-2'>
				<img src={imageSrc} alt={filler} className={`rounded-md w-auto lg:w-60 lg:${height} h-auto`} />
			</div>
			{/* title */}
			<h1 className='text-xl font-semibold'>{title}</h1>
			<p className={className}>{x}</p>
			{/*descritpion*/}
			<div className='text-m w-60 mx-auto text-center'>{description}</div>
		</div>
	);
};

export default Tabs;
