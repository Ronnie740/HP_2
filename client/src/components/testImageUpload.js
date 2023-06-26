/** @format */

import React, { useState } from 'react';
import ImageUpload from './imageUpload';
import UserImage from './userImage';
import useFetchUser from './useFetchUser';
const TestPage = () => {
	// const [userId, setUserId] = useState('');
	// const [fileName, setFileName] = useState('');

	// // const user = useFetchUser();
	// // const userId = user ? user._id : '';
	// // const imageUrl = user ? user.image.imageUrl : '';
	// // const userImageFilename = user ? user.image.fileName : '';
	// // setFileName(user ? user.image.fileName : '');
	// const handleFormSubmit = (event) => {
	// 	event.preventDefault();
	// 	// Reset the input fields after form submission
	// 	// setUserId('');
	// 	setFileName('');
	// };

	return (
		<div className='mx-20 text-center h-screen'>
			{/* <h1 >Test Page</h1> */}

			<h2 className='text-3xl font-bold'>Upload Image</h2>
			<ImageUpload />

			{/* {userId && (
				<>
					<h2>Display User Image</h2>
					<form onSubmit={handleFormSubmit}>
						<label>
							User ID:
							<input type='text' value={userId} />
						</label>
						<br />
						<label>
							Image File Name:
							<input type='text' value={userImageFilename} />
						</label>
						<br />
						<button type='submit'>Display Image</button>
					</form>

					{imageUrl && <img src={imageUrl} alt={userImageFilename} />}
				</>
			)} */}
		</div>
	);
};

export default TestPage;
