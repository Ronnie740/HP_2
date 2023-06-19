/** @format */

import React from 'react';

const Tabs = ({ imageSrc, altText, description, title, subTitle }) => {
	const filler = altText ? altText : 'Image';
	const className = subTitle ? 'font-semibold' : 'hidden';
	const x = subTitle ? subTitle : '';
	return (
		<div className='flex flex-col w-fit h-fit'>
			{/*Image*/}
			<div className='mx-auto'>
				<img src={imageSrc} alt={filler} className='rounded-md w-60 h-40' />
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
