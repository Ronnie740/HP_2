/** @format */

// ImageUpload.js

import React, { useState } from 'react';
import axios from 'axios';
import { storage } from '../firebaseConfig';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import useFetchUser from './useFetchUser';

const ImageUpload = () => {
	const [image, setImage] = useState(null);
	const [uploadProgress, setUploadProgress] = useState(0);

	const user = useFetchUser();
	const userId = user ? user._id : '';
	// console.log('Image upload', userId);
	const handleImageChange = (event) => {
		if (event.target.files[0]) {
			setImage(event.target.files[0]);
		}
	};

	const handleUpload = async () => {
		if (image) {
			// Remove the existing image
			if (user && user.image.fileName) {
				const storageRef = ref(storage, `images/${user.image.fileName}`);
				await deleteObject(storageRef)
					.then(() => {
						console.log('File deleted successfully');
					})
					.catch((error) => {
						// Uh-oh, an error occurred!
						console.log(error);
					});
			}
			const storageRef = ref(storage, `images/${image.name}`);
			const uploadTask = uploadBytesResumable(storageRef, image);

			uploadTask.on(
				'state_changed',
				(snapshot) => {
					const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
					setUploadProgress(progress);
				},
				(error) => {
					console.log(error);
				},
				async () => {
					try {
						const url = await getDownloadURL(uploadTask.snapshot.ref);

						// Save image metadata to MongoDB
						await axios.post(`/api/users/${user._id}/image`, {
							// userId: { userId }, // Replace with the actual user ID
							fileName: image.name,
							imageUrl: url,
						});

						console.log('Image uploaded successfully.');
					} catch (error) {
						console.error('Error uploading image:', error);
					}
				}
			);
		}
	};

	return (
		<div className='my-4'>
			<input type='file' onChange={handleImageChange} className='mb-2  text-sm text-gray-900 border border-gray-300 rounded-sm cursor-pointer bg-gray-100  focus:outline-none  ' />
			<p class='mt-1 text-sm text-gray-500 dark:text-gray-300' id='file_input_help'>
				SVG, PNG, JPG or GIF (MAX. 800x400px).
			</p>
			<button onClick={handleUpload} className='px-4 py-2 bg-blue-500 text-white rounded'>
				Upload
			</button>
			<p className='mt-2'>Upload Progress: {uploadProgress}%</p>
		</div>
	);
};

export default ImageUpload;
