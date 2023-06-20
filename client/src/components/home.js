/** @format */

import React from 'react';
import health from '../images/health.jpeg';
import rainsforest from '../images/rain_forest.jpeg';
import money from '../images/money.jpeg';
import Card from './card';

const Tabs = ({ imageSrc, altText, description }) => {
	return (
		<div className='flex flex-col'>
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
//Todo: finish this
// const Card = ({ name, description, imgSrc, imgAlt, link }) => {
// 	return (
// 		<a className='relative h-[400px] cursor-pointer' href={link}>
// 			<img src={imgSrc} alt={imgAlt} className='rounded-md w-full h-full' />
// 			<div className='absolute inset-0 flex items-end justify-center'>
// 				<div className='h-1/2 w-full bg-black bg-opacity-40 flex flex-col items-center justify-center rounded-md backdrop-blur-md'>
// 					<h2 className='text-xl font-bold text-white'>{name}</h2>
// 					<p className='text-lg text-white'>{description}</p>
// 				</div>
// 			</div>
// 		</a>
// 	);
// };
const Home = () => {
	return (
		<main className=' flex flex-col mx-20 my-10'>
			{/*Mission Statement*/}
			<section className='flex flex-row w-full'>
				<div className='mx-auto text-center'>
					<h1 className='text-3xl font-bold'>Our mission</h1>
					<p className='text-xl w-[300px]'>
						Welcome to our Climate Change Awareness website! Our mission is to provide accurate and accessible information about climate change and its impact on our planet.{' '}
					</p>
					<div className=' flex justify-center'>
						<a className='bg-primary px-5 font-bold py-3 mt-5 text-white rounded-md' href='facts'>
							Learn More
						</a>
					</div>
				</div>
			</section>
			{/*Why you should care*/}
			<section className='w-full my-10'>
				<h1 className='flex justify-center text-3xl font-bold'>Why you should care</h1>
				<div className='grid grid-cols-3 m-5'>
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
				<div className='grid grid-cols-3 m-5 text-white'>
					<Highlight number={'100'} title={'Startups'} />
					<Highlight number={'100'} title={'Users'} />
					<Highlight number={'$10,000'} title={'Donated'} />
				</div>
			</section>
			{/*Top startups*/}
			<section className='w-full my-10'>
				<h1 className='flex justify-center text-3xl font-bold'>Top Startups</h1>
				<div className='grid grid-cols-3 gap-20 w-full mt-10'>
					<Card name={'Startup 1'} imgSrc={health} imgAlt={'Startup 1'} description={'Description'} />
					<Card name={'Startup 2'} imgSrc={rainsforest} imgAlt={'Startup 2'} description={'Description'} />
					<Card name={'Startup 3'} imgSrc={money} imgAlt={'Startup 3'} description={'Description'} />
				</div>
			</section>
		</main>
	);
};
export default Home;