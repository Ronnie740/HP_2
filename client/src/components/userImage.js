/** @format */

// UserImage.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useFetchUser from './useFetchUser';

const UserImage = ({ userId }) => {
	const [imageUrl, setImageUrl] = useState(null);
	useEffect(() => {
		const fetchUserImage = async () => {
			try {
				const response = await axios.get(`/api/users/${userId}/image`);
				setImageUrl(response.data.imageUrl);
			} catch (error) {
				console.error('Error retrieving user image:', error);
			}
		};

		fetchUserImage();
	}, [userId]);

	return imageUrl ? <img src={imageUrl} alt='User' /> : null;
};

export default UserImage;
