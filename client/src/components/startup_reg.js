/** @format */

import React, { useState, useEffect } from 'react';
import axios from 'axios';

// axios.defaults.baseURL = 'http://localhost:4000';

// const StartupReg = () => {
// 	const handleSubmit = async (event) => {
// 		event.preventDefault();

// 		try {
// 			const newStartup = {
// 				name: 'Example Startup',
// 				description: 'This is an example startup',
// 				problems: 'Some problems',
// 				dangers: 'Potential dangers',
// 				solution: 'Proposed solution',
// 				video_urls: 'http://example.com/videos',
// 				team: [
// 					{
// 						name: 'John Doe',
// 						jobTitle: 'CEO',
// 						description: 'Some description',
// 					},
// 					{
// 						name: 'Jane Smith',
// 						jobTitle: 'CTO',
// 						description: 'Another description',
// 					},
// 				],
// 			};

// 			const response = await axios.post('/startups', newStartup);
// 			console.log(response.data); // Handle the response as needed
// 		} catch (error) {
// 			console.error(error);
// 		}
// 	};

// 	return (
// 		<div className='flex'>
// 			<form onSubmit={handleSubmit} className='mx-auto'>
// 				{/* form fields */}
// 				<button type='submit' className='p-5 rounded-md hover:bg-button_active m-5 bg-primary text-white text-3xl font-bold capitalize'>
// 					Submit
// 				</button>
// 			</form>
// 		</div>
// 	);
// };
const StartupReg = () => {
	const [startupData, setStartupData] = useState({
		startupName: '',
		startupDesc: '',
		startupCountry: '',
		startupCategory: '',
		// goalPercentage: '',
		paypalLink: '',
		goal: '',
		problemSolved: '',
		dangers: [],
		solution: '',
		videos: [],
		teamMembers: [],
		owner: '',
	});
	const [user, setUser] = useState(null);

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const token = localStorage.getItem('token');
				console.log('header token:', token);
				if (token) {
					const response = await axios.get('/getUserInfo', {
						headers: { Authorization: token },
					});
					setUser(response.data);
				}
			} catch (error) {
				console.error(error);
			}
		};

		fetchUser();
	}, []);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setStartupData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleAddDanger = () => {
		setStartupData((prevState) => ({
			...prevState,
			dangers: [...prevState.dangers, ''],
		}));
	};

	const handleRemoveDanger = (index) => {
		setStartupData((prevState) => {
			const updatedDangers = [...prevState.dangers];
			updatedDangers.splice(index, 1);
			return {
				...prevState,
				dangers: updatedDangers,
			};
		});
	};

	const handleDangerInputChange = (e, index) => {
		const { value } = e.target;
		setStartupData((prevState) => {
			const updatedDangers = [...prevState.dangers];
			updatedDangers[index] = value;
			return {
				...prevState,
				dangers: updatedDangers,
			};
		});
	};

	const handleAddVideo = () => {
		setStartupData((prevState) => ({
			...prevState,
			videos: [...prevState.videos, ''],
		}));
	};

	const handleRemoveVideo = (index) => {
		setStartupData((prevState) => {
			const updatedVideos = [...prevState.videos];
			updatedVideos.splice(index, 1);
			return {
				...prevState,
				videos: updatedVideos,
			};
		});
	};

	const handleVideoInputChange = (e, index) => {
		const { value } = e.target;
		setStartupData((prevState) => {
			const updatedVideos = [...prevState.videos];
			updatedVideos[index] = value;
			return {
				...prevState,
				videos: updatedVideos,
			};
		});
	};

	const handleAddTeamMember = () => {
		setStartupData((prevState) => ({
			...prevState,
			teamMembers: [...prevState.teamMembers, { name: '', title: '', description: '' }],
		}));
	};

	const handleRemoveTeamMember = (index) => {
		setStartupData((prevState) => {
			const updatedTeamMembers = [...prevState.teamMembers];
			updatedTeamMembers.splice(index, 1);
			return {
				...prevState,
				teamMembers: updatedTeamMembers,
			};
		});
	};

	const handleTeamMemberInputChange = (e, index, field) => {
		const { value } = e.target;
		setStartupData((prevState) => {
			const updatedTeamMembers = [...prevState.teamMembers];
			updatedTeamMembers[index][field] = value;
			return {
				...prevState,
				teamMembers: updatedTeamMembers,
			};
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Set the user ID as the owner of the startup data
		// if (user) {
		// 	console.log('User ID: ' + user._id);
		// 	setStartupData((prevState) => ({
		// 		...prevState,
		// 		owner: user._id,
		// 	}));
		// }

		// Send startupData to the server
		// console.log(startupData);
		// try {
		// 	const response = await axios.post('/startup', startupData);
		// 	console.log(response.data); // Handle the response as needed
		// } catch (error) {
		// 	console.error(error);
		// }
		// Set the user ID as the owner of the startup data
		if (user) {
			console.log('User ID: ' + user._id);
			const updatedStartupData = { ...startupData, owner: user._id };

			// Send updatedStartupData to the server
			console.log(updatedStartupData);
			try {
				const response = await axios.post('/startup', updatedStartupData);
				console.log(response.data); // Handle the response as needed
			} catch (error) {
				console.error(error);
			}
		}
		// Reset the form fields
		setStartupData({
			startupName: '',
			startupDesc: '',
			startupCountry: '',
			startupCategory: '',
			// goalPercentage: '',
			paypalLink: '',
			goal: '',
			problemSolved: '',
			dangers: [],
			solution: '',
			videos: [],
			teamMembers: [],
			owner: '',
		});
	};
	if (user) {
		console.log('User log from Startup page' + user._id);
	}

	return (
		<main className='mx-20 bg-slate-200 m-10 p-5 rounded-md shadow-lg'>
			<form className='' onSubmit={handleSubmit}>
				{/* Startup Name */}
				<div className='flex flex-row space-x-10'>
					<div className='w-full'>
						<label htmlFor='startupName' className=' text-2xl font-semibold'>
							Startup Name
						</label>
						<input
							type='text'
							id='startupName'
							name='startupName'
							value={startupData.startupName}
							placeholder='The name of the startup'
							onChange={handleInputChange}
							className='w-full bg-white border border-gray-300 py-2 px-4 rounded-md shadow-sm mt-2'
							required
						/>
					</div>

					{/* Startup Country */}
					<div className='w-full'>
						<label htmlFor='startupCountry' className=' text-2xl font-semibold mt-6'>
							Startup Country
						</label>
						<input
							type='text'
							id='startupCountry'
							name='startupCountry'
							value={startupData.startupCountry}
							placeholder='Country where the startup is based'
							onChange={handleInputChange}
							className='w-full bg-white border border-gray-300 py-2 px-4 rounded-md shadow-sm mt-2'
							required
						/>
					</div>
				</div>
				{/* Startup Description */}
				<label htmlFor='startupDesc' className='block text-2xl font-semibold mt-6'>
					Startup Description
				</label>
				<textarea
					id='startupDesc'
					name='startupDesc'
					value={startupData.startupDesc}
					onChange={handleInputChange}
					className='w-full bg-white border border-gray-300 py-2 px-4 rounded-md shadow-sm mt-2'
					required
				/>

				{/* Startup Category */}
				<label htmlFor='startupCategory' className='block text-2xl font-semibold mt-6'>
					Startup Category
				</label>
				<input
					type='text'
					id='startupCategory'
					name='startupCategory'
					value={startupData.startupCategory}
					placeholder='What category does this startups fall under?'
					onChange={handleInputChange}
					className='w-full bg-white border border-gray-300 py-2 px-4 rounded-md shadow-sm mt-2'
					required
				/>

				{/* Goal Percentage */}
				<div className='flex flex-row space-x-10'>
					{/* <div className='w-full'>
						<label htmlFor='goalPercentage' className='block text-2xl font-semibold mt-6'>
							Goal Percentage
						</label>
						<input
							type='number'
							id='goalPercentage'
							name='goalPercentage'
							value={startupData.goalPercentage}
							onChange={handleInputChange}
							className='w-full bg-white border border-gray-300 py-2 px-4 rounded-md shadow-sm mt-2'
							required
						/>
					</div> */}
					<div className='w-full'>
						<label htmlFor='paypalLink' className='block text-2xl font-semibold mt-6'>
							Paypal.Me Link
						</label>
						<input
							type='text'
							id='paypalLink'
							name='paypalLink'
							value={startupData.paypalLink}
							placeholder='Please enter your Paypal.me link to facilitate the donations'
							onChange={handleInputChange}
							className='w-full bg-white border border-gray-300 py-2 px-4 rounded-md shadow-sm mt-2'
							required
						/>
					</div>

					{/* Goal */}
					<div className='w-full'>
						<label htmlFor='goal' className='block text-2xl font-semibold mt-6'>
							Goal Amount
						</label>
						<input
							type='text'
							id='goal'
							name='goal'
							placeholder='Goal amount needed'
							value={startupData.goal}
							onChange={handleInputChange}
							className='w-full bg-white border border-gray-300 py-2 px-4 rounded-md shadow-sm mt-2'
							required
						/>
					</div>
				</div>

				{/* Problem Solved */}
				<label htmlFor='problemSolved' className='block text-2xl font-semibold mt-6'>
					Problem this startup is solving
				</label>
				<textarea
					id='problemSolved'
					name='problemSolved'
					value={startupData.problemSolved}
					placeholder='Problems being solved'
					onChange={handleInputChange}
					className='w-full bg-white border border-gray-300 py-2 px-4 rounded-md shadow-sm mt-2'
					required
				/>

				{/* Dangers */}
				<label className='block text-2xl font-semibold mt-6'>Dangers posed by the problems your solving</label>
				{startupData.dangers.map((danger, index) => (
					<div key={index} className='flex mt-2'>
						<input
							type='text'
							name='danger'
							value={danger}
							placeholder='Danger'
							onChange={(e) => handleDangerInputChange(e, index)}
							className='w-full bg-white border border-gray-300 py-2 px-4 rounded-md shadow-sm'
							required
						/>
						<button type='button' onClick={() => handleRemoveDanger(index)} className='ml-2 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md'>
							Remove
						</button>
					</div>
				))}
				<button type='button' onClick={handleAddDanger} className='bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-md mt-2'>
					Add Danger
				</button>

				{/* Solution */}
				<label htmlFor='solution' className='block text-2xl font-semibold mt-6'>
					Solution
				</label>
				<textarea
					id='solution'
					name='solution'
					value={startupData.solution}
					placeholder='Your solution'
					onChange={handleInputChange}
					className='w-full bg-white border border-gray-300 py-2 px-4 rounded-md shadow-sm mt-2'
					required
				/>

				{/* Videos */}
				<label className='block text-2xl font-semibold mt-6'>Video Link</label>
				{startupData.videos.map((video, index) => (
					<div key={index} className='flex mt-2'>
						<input
							type='text'
							name='video'
							value={video}
							onChange={(e) => handleVideoInputChange(e, index)}
							placeholder='Paste Link'
							className='w-full bg-white border border-gray-300 py-2 px-4 rounded-md shadow-sm'
							required
						/>
						<button type='button' onClick={() => handleRemoveVideo(index)} className='ml-2 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md'>
							Remove
						</button>
					</div>
				))}
				<button type='button' onClick={handleAddVideo} className='bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-md mt-2'>
					Add Video
				</button>

				{/* Team Members */}
				<label className='block text-2xl font-semibold mt-6'>Team Members</label>
				{startupData.teamMembers.map((teamMember, index) => (
					<div key={index} className='flex flex-col mt-4'>
						<input
							type='text'
							name='name'
							value={teamMember.name}
							onChange={(e) => handleTeamMemberInputChange(e, index, 'name')}
							className='w-full bg-white border border-gray-300 py-2 px-4 rounded-md shadow-sm'
							placeholder='Name'
							required
						/>
						<input
							type='text'
							name='title'
							value={teamMember.title}
							onChange={(e) => handleTeamMemberInputChange(e, index, 'title')}
							className='w-full bg-white border border-gray-300 py-2 px-4 rounded-md shadow-sm mt-2'
							placeholder='Title'
							required
						/>
						<textarea
							name='description'
							value={teamMember.description}
							onChange={(e) => handleTeamMemberInputChange(e, index, 'description')}
							className='w-full bg-white border border-gray-300 py-2 px-4 rounded-md shadow-sm mt-2'
							placeholder='Description'
							required
						/>
						<button type='button' onClick={() => handleRemoveTeamMember(index)} className='bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md mt-2'>
							Remove
						</button>
					</div>
				))}
				<div className='flex flex-col space-y-10'>
					<button type='button' onClick={handleAddTeamMember} className='w-fit bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-md mt-2'>
						Add Team Member
					</button>

					{/* Submit Button */}
					<button type='submit' className='bg-primary hover:bg-button_active text-white px-5 py-3 rounded-md mt-6'>
						Submit
					</button>
				</div>
			</form>
		</main>
	);
};

export default StartupReg;

// export default StartupReg;
