/** @format */

import React, { useState } from 'react';
import money from '../images/money.jpeg';
import Tabs from './tabs';
import ReactPlayer from 'react-player';
import Man from '../images/man.jpeg';
import Woman from '../images/woman.jpeg';
import Button from './button';

const ProgressBar = ({ value, maxValue }) => {
	const progress = (value / maxValue) * 100;

	return (
		<div className='w-40 h-5 bg-white rounded-full overflow-hidden'>
			<div className='h-full bg-blue-500 rounded-full ' style={{ width: `${progress}%` }} />
		</div>
	);
};
const StartupTemplate = ({ startupName, startupDesc, startupCountry, startupCategory, goalPercentage, goal, problemSolved, dangers, solution, videos, teamMembers }) => {
	return (
		<main className='mx-20'>
			{/* Startup Bio */}
			<section className='bg-slate-200 py-10 my-10 rounded-md shadow-lg'>
				<div className='grid grid-cols-2 gap-5 m-5'>
					<div className='flex flex-col space-y-5 text-center'>
						<h1 className='text-2xl font-semibold'>{startupName}</h1>
						<img src={money} alt='img' className='w-auto h-auto max-h-fit rounded-md shadow-lg' />
						<p className='text-xl'>{startupDesc}</p>
						<div className='flex justify-center space-x-5 text-2xl'>
							<p>{startupCountry}</p>
							<p>{startupCategory}</p>
						</div>
					</div>
					<div className='flex flex-col my-auto text-center space-y-4'>
						<div className='flex justify-center'>
							<ProgressBar maxValue={100} value={goalPercentage} />
						</div>
						{/* Percentage of donations to goal */}
						<p className='text-xl font-semibold'>{`${goalPercentage} % raised`}</p>
						<h2 className='text-2xl'>Goal</h2>
						<p className='text-xl font-semibold'>{goal}</p>
						<div className='w-full justify-center'>
							<button className='w-fit bg-primary hover:bg-button_active px-5 py-3 text-white rounded-md font-semibold'>Add to favourites</button>
						</div>
					</div>
				</div>
			</section>
			{/* Problems being solved */}
			<section className='bg-slate-200 py-10 my-10 rounded-md shadow-lg text-center flex flex-col justify-center'>
				<div className='flex flex-col'>
					<h1 className='text-2xl font-semibold'> Problems being solved</h1>
					<p>{problemSolved}</p>
				</div>
				{/* Danger Posed */}
				<div className='flex flex-col m-5'>
					<h1 className='text-2xl font-semibold'>Dangers Posed</h1>
					<div className='grid grid-cols-2 gap-5 mx-auto w-1/2 my-5'>
						{dangers.map((danger, index) => (
							<div className='flex mx-auto' key={index}>
								<Tabs title={danger.title} imageSrc={danger.image} />
							</div>
						))}
					</div>
				</div>
				<div className='flex flex-col'>
					<h1 className='text-2xl font-semibold'> Solution</h1>
					<p>{solution}</p>
				</div>
				{/* Videos */}
				<div className='flex flex-col m-5'>
					<h1 className='text-2xl font-semibold'>Videos</h1>
					<div className='grid grid-cols-2 gap-5 mx-auto w-full my-5'>
						{videos.map((video, index) => (
							<div className='flex mx-auto h-80' key={index}>
								<ReactPlayer url={video.url} width='560px' height='315px' controls />
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Team members */}
			<section className='bg-slate-200 py-10 my-10 rounded-md shadow-lg text-center flex flex-col justify-center w-auto'>
				<div className='flex flex-col m-5'>
					<h1 className='text-2xl font-semibold'>Meet The Team</h1>
					<div className='grid grid-cols-2 gap-5 mx-auto w-1/2 my-5'>
						{teamMembers.map((member, index) => (
							<div className='flex mx-auto' key={index}>
								<Tabs title={member.name} imageSrc={member.image} subTitle={member.title} description={member.description} />
							</div>
						))}
					</div>
				</div>
			</section>
			<div className='my-5'>
				<Button label='Donate' onClick='' />
			</div>
		</main>
	);
};
function Startup() {
	return (
		// <main className='mx-20'>
		// 	{/* Startup Bio */}
		// 	<section className='bg-background '>
		// 		<div className='grid grid-cols-2 gap-5 m-5'>
		// 			<div className='flex flex-col space-y-5 text-center'>
		// 				<h1 className=' text-2xl'>Name</h1>
		// 				<img src='' alt='' className='w-auto h-auto' />
		// 				<p className='text-xl'>Description</p>
		// 			</div>
		// 			<div className='flex flex-col justify-end text-center'>
		// 				<ProgressBar maxValue={100} value={60} />
		// 				{/* Percentage of donations to goal */}
		// 				<p>80 % raised</p>
		// 				<h2>Goal</h2>
		// 				<p>$1,000,000</p>
		// 				<div className='w-full justify-center'>
		// 					<button className='w-fit bg-primary hover:bg-button_active px-5 py-3'>Add to favourites</button>
		// 				</div>
		// 			</div>
		// 		</div>
		// 	</section>
		// </main>
		<main className='mx-20'>
			{/* Startup Bio */}
			<section className='bg-slate-200 py-10 my-10 rounded-md shadow-lg'>
				<div className='grid grid-cols-2 gap-5 m-5'>
					<div className='flex flex-col space-y-5 text-center'>
						<h1 className='text-2xl font-semibold'>Name</h1>
						<img src={money} alt='img' className='w-auto h-auto max-h-fit rounded-md shadow-lg' />
						<p className='text-xl'>
							Lorem ipsum dolor sit amet. Vel rerum iure sed rerum debitis et quidem commodi qui itaque modi non error quia et nostrum quia. Sit dolores nesciunt eum eveniet dolore sed
							facilis ipsam qui cumque repellat aut quia repellat.Lorem ipsum dolor sit amet. Vel rerum iure sed rerum debitis et quidem commodi qui itaque modi non error quia et nostrum
							quia. Sit dolores nesciunt eum eveniet dolore sed facilis ipsam qui cumque repellat aut quia repellat.
						</p>
						<div className='flex justify-center space-x-5 text-2xl'>
							<p>Country</p>
							<p>Category</p>
						</div>
					</div>
					<div className='flex flex-col my-auto text-center space-y-4'>
						<div className='flex justify-center'>
							<ProgressBar maxValue={100} value={80} />
						</div>
						{/* Percentage of donations to goal */}
						<p className='text-xl font-semibold'>80 % raised</p>
						<h2 className='text-2xl'>Goal</h2>
						<p className='text-xl font-semibold'>$1,000,000</p>
						<div className='w-full justify-center'>
							<button className='w-fit bg-primary hover:bg-button_active px-5 py-3 text-white rounded-md font-semibold'>Add to favourites</button>
						</div>
					</div>
				</div>
			</section>
			{/* Problems being solved */}
			<section className='bg-slate-200 py-10 my-10 rounded-md shadow-lg text-center flex flex-col justify-center'>
				<div className='flex flex-col'>
					<h1 className=' text-2xl font-semibold '> Problems being solved</h1>
					<p>
						Lorem ipsum dolor sit amet. Vel rerum iure sed rerum debitis et quidem commodi qui itaque modi non error quia et nostrum quia. Sit dolores nesciunt eum eveniet dolore sed
						facilis ipsam qui cumque repellat aut quia repellat.Lorem ipsum dolor sit amet. Vel rerum iure sed rerum debitis et quidem commodi qui itaque modi non error quia et nostrum
						quia. Sit dolores nesciunt eum eveniet dolore sed facilis ipsam qui cumque repellat aut quia repellat.
					</p>
				</div>
				{/* Danger Posed */}
				<div className='flex flex-col m-5'>
					<h1 className='text-2xl font-semibold '>Dangers Posed</h1>
					<div className='grid grid-cols-2 gap-5 mx-auto w-1/2 my-5'>
						<div className='flex mx-auto'>
							<Tabs title='Danger 1' imageSrc={money} />
						</div>
						<div className='flex mx-auto'>
							<Tabs title='Danger 1' imageSrc={money} />
						</div>
					</div>
				</div>
				<div className='flex flex-col'>
					<h1 className=' text-2xl font-semibold '> Solution</h1>
					<p>
						Lorem ipsum dolor sit amet. Vel rerum iure sed rerum debitis et quidem commodi qui itaque modi non error quia et nostrum quia. Sit dolores nesciunt eum eveniet dolore sed
						facilis ipsam qui cumque repellat aut quia repellat.Lorem ipsum dolor sit amet. Vel rerum iure sed rerum debitis et quidem commodi qui itaque modi non error quia et nostrum
						quia. Sit dolores nesciunt eum eveniet dolore sed facilis ipsam qui cumque repellat aut quia repellat.
					</p>
				</div>
				{/* Videos */}
				<div className='flex flex-col m-5'>
					<h1 className='text-2xl font-semibold '>Videos</h1>
					<div className='grid grid-cols-2 gap-5 mx-auto w-full my-5'>
						<div className='flex mx-auto h-80'>
							<ReactPlayer url='https://youtu.be/bL8o1Z2kqlY' width='560px' height='315px' controls />
						</div>
						<div className='flex mx-auto h-80'>
							<ReactPlayer url='https://youtu.be/bL8o1Z2kqlY' width='560px' height='315px' controls />
						</div>
					</div>
				</div>
			</section>

			{/* Team members */}
			<section className='bg-slate-200 py-10 my-10 rounded-md shadow-lg text-center flex flex-col justify-center w-auto'>
				<div className='flex flex-col m-5'>
					<h1 className='text-2xl font-semibold '>Meet The Team</h1>
					<div className='grid grid-cols-2 gap-5 mx-auto w-1/2 my-5'>
						<div className='flex mx-auto'>
							<Tabs
								title='John Doe'
								imageSrc={Man}
								subTitle={'CEO'}
								description={'Lorem ipsum dolor sit amet. Vel rerum iure sed rerum debitis et quidem commodi qui itaque modi non error quia et nostrum quia.'}
							/>
						</div>
						<div className='flex mx-auto'>
							<Tabs
								title='Jane Doe'
								imageSrc={Woman}
								subTitle={'CFO'}
								description={'Lorem ipsum dolor sit amet. Vel rerum iure sed rerum debitis et quidem commodi qui itaque modi non error quia et nostrum quia. '}
							/>
						</div>
					</div>
				</div>
			</section>
			<div className='my-5'>
				<Button label='Donate' onClick='' />
			</div>
		</main>
	);
}

export default Startup;
