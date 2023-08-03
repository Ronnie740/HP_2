/** @format */

import React, { useEffect, useState } from 'react';
import health from '../images/health.jpeg';
import rainsforest from '../images/rain_forest.jpeg';
import money from '../images/money.jpeg';
import Card from './card';

import axios from 'axios';

const Tabs = ({ imageSrc, altText, description }) => {
	return (
		<div className='flex flex-col w-fit md:w-auto mx-auto'>
			{/*Image*/}
			<div className='mx-auto'>
				<img src={imageSrc} alt={altText} className='rounded-md w-60 h-40' />
			</div>
			{/*descritpion*/}
			<div className='text-m w-60 mx-auto text-center'>{description}</div>
		</div>
	);
};
const Highlight = ({ number, title }) => {
	return (
		<div className='text-center'>
			<p className='text-3xl font-bold'>{number}</p>
			<p className='text-xl font-semibold'>{title}</p>
		</div>
	);
};
const Home = () => {
	const [startups, setStartups] = useState([]);
	const [length, setLength] = useState(0);
	const [users, setUsers] = useState(0);
	useEffect(() => {
		const fetchStartups = async () => {
			try {
				const response = await axios.get('/topStartups');
				setStartups(response.data);
			} catch (error) {
				console.error(error);
			}
		};
		const getAllStartups = async () => {
			try {
				const response = await axios.get('/startups');
				setLength(response.data.length);
			} catch (error) {
				console.error(error);
			}
		};
		const getAllUsers = async () => {
			try {
				const response = await axios.get('/users');
				setUsers(response.data.length);
			} catch (error) {
				console.error(error);
			}
		};

		fetchStartups();
		getAllStartups();
		getAllUsers();
	}, []);

	return (
		<main className=' flex flex-col mx-10 lg:mx-20 my-10'>
			{/*Mission Statement*/}
			<section className='flex flex-row w-full'>
				<div className='mx-auto text-center'>
					<h1 className='md:text-3xl text-xl font-bold'>Our mission</h1>
					<p className='md:text-xl text-base lg:w-[300px] w-fit'>
						Welcome to our Climate Change Awareness website! Our mission is to provide accurate and accessible information about climate change and its impact on our planet.{' '}
					</p>
					<div className=' flex justify-center'>
						<a className='bg-primary md:px-5 px-2 font-bold py-3 mt-5 text-white rounded-md' href='facts'>
							Learn More
						</a>
					</div>
				</div>
			</section>
			{/*Why you should care*/}
			<section className='w-full my-10'>
				<h1 className='flex justify-center md:text-3xl text-lg text-center font-bold'>Why you should care</h1>
				<div className='grid md:grid-cols-3 grid-cols-1 space-y-5 md:space-y-0 md:space-x-5 my-5'>
					<Tabs imageSrc={health} altText={'health image'} description={'Climate change can have significant impacts on human health.'} />
					<Tabs
						imageSrc={rainsforest}
						altText={'rainforest image'}
						description={'Threats to ecosystems and biodiversity, endangering fragile habitats and contributing to the extinction of species.'}
					/>
					<Tabs imageSrc={money} altText={'money image'} description={'Climate change has significant economic implications, causing damage to infrastructure agriculture'} />
				</div>
			</section>
			{/*highlights*/}
			<section className='w-full bg-secondary h-auto rounded-md'>
				<div className='grid md:grid-cols-3 grid-cols-1 m-5 text-white'>
					<Highlight number={length} title={'Startups'} />
					<Highlight number={users} title={'Users'} />
					<Highlight number={'$10,000'} title={'Donated'} />
				</div>
			</section>
			{/*Top startups*/}
			<section className='w-full my-10'>
				<h1 className='flex justify-center text-3xl font-bold'>Top Startups</h1>
				<div className='grid md:grid-cols-3 grid-cols-1 gap-20 w-full mt-10'>
					{startups.map((startup) => (
						<Card key={startup._id} name={startup.startupName} imgSrc={money} imgAlt={startup.startupName} description={startup.startupDesc} link={`/startup/${startup._id}`} />
					))}
				</div>
			</section>
		</main>
	);
};
export default Home;
