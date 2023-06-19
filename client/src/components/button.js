/** @format */

import React from 'react';

const Button = ({ label, onClick }) => {
	return (
		<button type='submit' className='bg-primary hover:bg-button_active text-white rounded-md py-2 w-full' onClick={onClick}>
			{label}
		</button>
	);
};

export default Button;
