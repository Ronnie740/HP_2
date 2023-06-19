/** @format */

import React, { useState } from 'react';
import Card from './card';

// const ProgressBar = ({ value, maxValue }) => {
// 	const progress = (value / maxValue) * 100;

// 	return (
// 		<div className='w-full h-4 bg-gray-200 rounded-full overflow-hidden'>
// 			<div className='h-full bg-blue-500 rounded-full' style={{ width: `${progress}%` }} />
// 		</div>
// 	);
// };
const data = [
	{
		imgSrc: 'https://example.com/image1.jpg',
		imgAlt: 'Image 1',
		name: 'Object 1',
		description: 'This is the description for Object 1.',
	},
	{
		imgSrc: 'https://example.com/image2.jpg',
		imgAlt: 'Image 2',
		name: 'Object 2',
		description: 'This is the description for Object 2.',
	},
	{
		imgSrc: 'https://example.com/image3.jpg',
		imgAlt: 'Image 3',
		name: 'Object 3',
		description: 'This is the description for Object 3.',
	},
	{
		imgSrc: 'https://example.com/image4.jpg',
		imgAlt: 'Image 4',
		name: 'Object 4',
		description: 'This is the description for Object 4.',
	},
	{
		imgSrc: 'https://example.com/image5.jpg',
		imgAlt: 'Image 5',
		name: 'Object 5',
		description: 'This is the description for Object 5.',
	},
	{
		imgSrc: 'https://example.com/image6.jpg',
		imgAlt: 'Image 6',
		name: 'Object 6',
		description: 'This is the description for Object 6.',
	},
	{
		imgSrc: 'https://example.com/image7.jpg',
		imgAlt: 'Image 7',
		name: 'Object 7',
		description: 'This is the description for Object 7.',
	},
	{
		imgSrc: 'https://example.com/image8.jpg',
		imgAlt: 'Image 8',
		name: 'Object 8',
		description: 'This is the description for Object 8.',
	},
	{
		imgSrc: 'https://example.com/image9.jpg',
		imgAlt: 'Image 9',
		name: 'Object 9',
		description: 'This is the description for Object 9.',
	},
	{
		imgSrc: 'https://example.com/image10.jpg',
		imgAlt: 'Image 10',
		name: 'Object 10',
		description: 'This is the description for Object 10.',
	},
];

const Dropdown = ({ options, onSelect }) => {
	return (
		<select className='border rounded px-4 py-2 bg-primary text-white font-bold hover:bg-button_active cursor-pointer' onChange={(e) => onSelect(e.target.value)}>
			{options.map((option) => (
				<option key={option.value} value={option.value}>
					{option.label}
				</option>
			))}
		</select>
	);
};

const Discover = () => {
	const [selectedCategory, setSelectedCategory] = useState('');
	const [selectedLocation, setSelectedLocation] = useState('');

	const categoryOptions = [
		{ value: '', label: 'Choose Category' },
		{ value: '1', label: 'Category 1' },
		{ value: '2', label: 'Category 2' },
		{ value: '3', label: 'Category 3' },
	];

	const locationOptions = [
		{ value: '', label: 'Choose location' },
		{ value: 'london', label: 'London' },
		{ value: 'paris', label: 'Paris' },
		{ value: 'new-york', label: 'New York' },
	];
	const handleCategorySelect = (value) => {
		setSelectedCategory(value);
	};

	const handleLocationSelect = (value) => {
		setSelectedLocation(value);
	};
	const [objects, setObjects] = useState(data);
	return (
		<main className='mx-20'>
			{/* categories and location dropdowns */}
			<section className='flex space-x-10 text-center my-10'>
				<div className='flex flex-col'>
					<Dropdown options={categoryOptions} onSelect={handleCategorySelect} />
					{/* <p>Selected Category: {selectedCategory}</p> */}
				</div>

				<div className='flex flex-col'>
					<Dropdown options={locationOptions} onSelect={handleLocationSelect} />
					{/* <p>Selected Location: {selectedLocation}</p> */}
				</div>
			</section>

			{/* startups being displayed dynamicaly */}
			<section className='grid grid-cols-2 gap-10 my-10'>
				{objects.map((objects, index) => (
					<Card imgSrc={objects.imgSrc} imgAlt={objects.imgSrc} name={objects.name} description={objects.description} height={'h-[500px]'} />
				))}
			</section>
		</main>
	);
};

export default Discover;
