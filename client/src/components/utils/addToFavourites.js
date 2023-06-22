/** @format */

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddToFavoritesButton = ({ userId, startupId }) => {
	const [isFavorite, setIsFavorite] = useState(false);

	useEffect(() => {
		const checkIfFavorite = async () => {
			try {
				const response = await axios.get(`/users/${userId}/favorites/${startupId}`);
				setIsFavorite(response.data.isFavorite);
			} catch (error) {
				console.error(error);
			}
		};

		checkIfFavorite();
	}, [userId, startupId]);

	const handleAddToFavorites = async () => {
		try {
			await axios.put(`/users/${userId}/favorites/${startupId}`);
			setIsFavorite(true);
		} catch (error) {
			console.error(error);
		}
	};

	const handleRemoveFromFavorites = async () => {
		try {
			await axios.delete(`/users/${userId}/favorites/${startupId}`);
			setIsFavorite(false);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<button className='w-fit bg-primary hover:bg-button_active px-5 py-3 text-white rounded-md font-semibold' onClick={isFavorite ? handleRemoveFromFavorites : handleAddToFavorites}>
			{isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
		</button>
	);
};

export default AddToFavoritesButton;
