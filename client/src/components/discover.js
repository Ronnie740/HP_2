/** @format */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from './card';
import axios from 'axios';
import money from '../images/money.jpeg';
import useFetchUser from './useFetchUser';

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

const Dropdown = ({ options, selectedValue, onSelect }) => {
	return (
		<select
			className='border rounded md:px-4 px-2 py-2 bg-primary text-white font-bold hover:bg-button_active cursor-pointer'
			onChange={(e) => onSelect(e.target.value)}
			value={options.find((option) => option.value === selectedValue)?.label || ''}>
			{options.map((option) => (
				<option key={option.value} value={option.value}>
					{option.label}
				</option>
			))}
		</select>
	);
};

// const Discover = () => {
// 	const [selectedCategory, setSelectedCategory] = useState('');
// 	const [selectedLocation, setSelectedLocation] = useState('');

// 	const categoryOptions = [
// 		{ value: '', label: 'Choose Category' },
// 		{ value: '1', label: 'Category 1' },
// 		{ value: '2', label: 'Category 2' },
// 		{ value: '3', label: 'Category 3' },
// 	];

// 	const locationOptions = [
// 		{ value: '', label: 'Choose location' },
// 		{ value: 'london', label: 'London' },
// 		{ value: 'paris', label: 'Paris' },
// 		{ value: 'new-york', label: 'New York' },
// 	];
// 	const handleCategorySelect = (value) => {
// 		setSelectedCategory(value);
// 	};

// 	const handleLocationSelect = (value) => {
// 		setSelectedLocation(value);
// 	};
// 	const [objects, setObjects] = useState(data);
// 	return (
// 		<main className='mx-20'>
// 			{/* categories and location dropdowns */}
// 			<section className='flex space-x-10 text-center my-10'>
// 				<div className='flex flex-col'>
// 					<Dropdown options={categoryOptions} onSelect={handleCategorySelect} />
// 					{/* <p>Selected Category: {selectedCategory}</p> */}
// 				</div>

// 				<div className='flex flex-col'>
// 					<Dropdown options={locationOptions} onSelect={handleLocationSelect} />
// 					{/* <p>Selected Location: {selectedLocation}</p> */}
// 				</div>
// 			</section>

// 			{/* startups being displayed dynamicaly */}
// 			<section className='grid grid-cols-2 gap-10 my-10'>
// 				{objects.map((objects, index) => (
// 					<Card imgSrc={objects.imgSrc} imgAlt={objects.imgSrc} name={objects.name} description={objects.description} height={'h-[500px]'} />
// 				))}
// 			</section>
// 		</main>
// 	);
// };

// export default Discover;
const Discover = () => {
	const [selectedCategory, setSelectedCategory] = useState('');
	const [selectedLocation, setSelectedLocation] = useState('');
	const [startups, setStartups] = useState([]);
	const [categories, setCategories] = useState([]);
	const [locations, setLocations] = useState([]);
	const [recommended, setRecommended] = useState([]);

	useEffect(() => {
		const fetchStartups = async () => {
			try {
				const response = await axios.get('/startups');
				setStartups(response.data);
				console.log(response.data);
				const allCategories = response.data.map((startup) => startup.startupCategory);
				const uniqueCategories = [...new Set(allCategories)];
				setCategories(uniqueCategories);
				const allLocations = response.data.map((startup) => startup.startupCountry);
				const uniqueLocations = [...new Set(allLocations)];
				setLocations(uniqueLocations);
			} catch (error) {
				console.error(error);
			}
		};

		fetchStartups();
	}, []);

	const user = useFetchUser();
	useEffect(() => {
		if (user) {
			async function fetchRecommendations() {
				try {
					const response = await axios.get(`/recommendations?userId=${user._id}`);
					//console.log(response.data);
					setRecommended(response.data);
					console.log('Recommended Startups', recommended);
				} catch (error) {
					console.error('Error retrieving recommendations:', error);
				}
			}

			fetchRecommendations();
		}
	}, [user]);

	const handleCategorySelect = (value) => {
		setSelectedCategory(value);
	};

	const handleLocationSelect = (value) => {
		setSelectedLocation(value);
	};

	const filteredStartups = startups.filter(
		(startup) => (selectedCategory === '' || startup.startupCategory === selectedCategory) && (selectedLocation === '' || startup.startupCountry === selectedLocation)
	);

	const resetFilters = () => {
		setSelectedCategory('');
		setSelectedLocation('');
	};

	return (
		<main className='mx-20'>
			{/* Recommendations */}
			{recommended.length >= 1 ? (
				<>
					<h1 className='text-center md:text-3xl text-xl font-bold'>Recommendations</h1>
					<section className='grid lg:grid-cols-2 grid-cols-1 gap-10 my-10'>
						{recommended.map((recommendation, index) => (
							<Card
								key={index}
								imgSrc={money}
								imgAlt={recommendation.startupName}
								name={recommendation.startupName}
								description={recommendation.startupDesc}
								height={'md:h-[500px] h-[200px]'}
								link={`/startup/${recommendation._id}`}
							/>
						))}
					</section>
				</>
			) : (
				''
			)}
			{/* categories and location dropdowns */}
			<section className='flex flex-col md:flex-row md:space-x-10 text-center my-10'>
				<div className='md:flex md:flex-col'>
					<Dropdown
						options={[{ value: '', label: 'Choose Category' }, ...categories.map((category) => ({ value: category, label: category }))]}
						selectedValue={selectedCategory}
						onSelect={handleCategorySelect}
					/>
				</div>

				<div className='md:flex md:flex-col'>
					<Dropdown
						options={[{ value: '', label: 'Choose location' }, ...locations.map((location) => ({ value: location, label: location }))]}
						selectedValue={selectedLocation}
						onSelect={handleLocationSelect}
					/>
				</div>
				{selectedCategory !== '' || selectedLocation !== '' ? (
					<button className='bg-primary hover:bg-button_active text-white rounded-md py-2 px-4' onClick={resetFilters}>
						Reset Filters
					</button>
				) : null}
			</section>

			{/* startups being displayed dynamically */}
			<section className='grid lg:grid-cols-2 grid-cols-1 gap-10 my-10'>
				{filteredStartups.map((startup, index) => (
					<Card
						key={index}
						imgSrc={money}
						imgAlt={startup.startupName}
						name={startup.startupName}
						description={startup.startupDesc}
						height={'md:h-[500px] h-[200px]'}
						link={`/startup/${startup._id}`}
					/>
				))}
			</section>
		</main>
	);
};

export default Discover;
