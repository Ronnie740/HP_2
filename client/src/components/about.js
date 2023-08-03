/** @format */

import React from 'react';
import educate from '../images/educate.jpeg';
import awareness from '../images/awareness.jpeg';
import promote from '../images/promote.jpeg';
import me from '../images/ronnie.jpeg';
import facts from '../images/facts.jpg';
import solutions from '../images/solutions.jpg';
import donate from '../images/donate.jpg';
import Tabs from './tabs';
const About = () => {
	return (
		<main className='mx-20 my-10'>
			{/* Top */}
			<div className='flex w-full justify-center'>
				<div className='md:w-[30rem] w-full text-center space-y-5'>
					<h1 className='lg:text-3xl text-xl font-bold'>About US</h1>
					<p className='text-xl'>
						Welcome to our Climate Change Awareness website! Our mission is to provide accurate and accessible information about climate change and its impact on our planet.
					</p>
				</div>
			</div>
			{/* What we Do */}
			<div className='flex w-full justify-center my-10'>
				<div className='text-center space-y-5'>
					<h1 className='lg:text-3xl text-xl font-bold'>What we do</h1>
					<div className='grid md:grid-cols-3  gap-10'>
						<Tabs
							imageSrc={educate}
							altText={''}
							title='Educate'
							description={
								'We provide fundamental information about the nature, causes and effects of climate change in africa. We also provide access to startups that provide summaries of their solution problem areas.'
							}
						/>
						<Tabs
							imageSrc={awareness}
							altText={''}
							title='Raise Awareness'
							description={
								'We believe that increasing awareness is key to driving action. Through out facts section we demonstrate the must know information about climate change as well as link to startups solving the problems.'
							}
						/>
						<Tabs
							imageSrc={promote}
							altText={''}
							title='Promote Startups'
							description={
								' We empower individuals to make a difference by promoting startups in their areas of interest so that they may engage with them either in person or through donations so they actively play a role in fighting climate change. '
							}
						/>
					</div>
				</div>
			</div>
			{/* How it works */}
			<div className='flex w-full justify-center my-10'>
				<div className='text-center space-y-5'>
					<h1 className='lg:text-3xl text-xl font-bold'>How This Works</h1>
					<div className='grid md:grid-cols-3  gap-10'>
						<Tabs
							imageSrc={facts}
							altText={''}
							title='Step 1'
							subTitle={'Read the facts'}
							description={
								'We provide fundamental information about the nature, causes and effects of climate change in africa. Through out facts section we demonstrate the must know information about climate change as well as link to startups solving the problems.'
							}
						/>
						<Tabs
							imageSrc={solutions}
							altText={''}
							title='Step 2'
							subTitle={'Discover solutions'}
							description={
								'We believe that increasing awareness is key to driving action. Through the discover section people can gain more knowledge about startups working to combat climate change and its effects'
							}
						/>
						<Tabs
							imageSrc={donate}
							altText={''}
							title='Step 3'
							subTitle={'Follow or Donate'}
							description={
								' We empower individuals to make a difference by promoting startups in their areas of interest so that they may engage with them either in person or through donations so they actively play a role in fighting climate change. '
							}
						/>
					</div>
				</div>
			</div>

			{/* Meet the team */}
			<div className='flex w-full justify-center my-10'>
				<div className='text-center space-y-5'>
					<h1 className='text-3xl font-bold'>Meet the Team</h1>
					<Tabs
						imageSrc={me}
						altText={''}
						title='Ronnie Ineza'
						description={
							'He is a software developer from Kenya who believes that climate change is a pressing issue and fostering a symbiotic relationship between startups and the community at large will be necessary to find long lasting solutions'
						}
						height={'h-60'}
					/>
				</div>
			</div>
		</main>
	);
};
export default About;
