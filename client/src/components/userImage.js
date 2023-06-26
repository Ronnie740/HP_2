/** @format */

// UserImage.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useFetchUser from './useFetchUser';

const UserImage = ({ userId }) => {
	const [imageUrl, setImageUrl] = useState(null);

	return imageUrl ? <img src={imageUrl} alt='User' /> : null;
};

export default UserImage;
