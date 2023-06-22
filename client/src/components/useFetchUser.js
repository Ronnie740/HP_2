/** @format */

import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchUser = () => {
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

	return user;
};

export default useFetchUser;
