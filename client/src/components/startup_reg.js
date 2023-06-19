/** @format */

import React from 'react';
import axios from 'axios';

// axios.defaults.baseURL = 'http://localhost:4000';

const StartupReg = () => {
	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			const newStartup = {
				name: 'Example Startup',
				description: 'This is an example startup',
				problems: 'Some problems',
				dangers: 'Potential dangers',
				solution: 'Proposed solution',
				video_urls: 'http://example.com/videos',
				team: [
					{
						name: 'John Doe',
						jobTitle: 'CEO',
						description: 'Some description',
					},
					{
						name: 'Jane Smith',
						jobTitle: 'CTO',
						description: 'Another description',
					},
				],
			};

			const response = await axios.post('/startups', newStartup);
			console.log(response.data); // Handle the response as needed
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className='flex'>
			<form onSubmit={handleSubmit} className='mx-auto'>
				{/* form fields */}
				<button type='submit' className='p-5 rounded-md hover:bg-button_active m-5 bg-primary text-white text-3xl font-bold capitalize'>
					Submit
				</button>
			</form>
		</div>
	);
};

export default StartupReg;
