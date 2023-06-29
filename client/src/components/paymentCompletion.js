/** @format */

import { React, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
const PaymentSuccessPage = () => {
	const location = useLocation();
	const [amount, setAmount] = useState('');

	// useEffect(() => {
	// 	const searchParams = new URLSearchParams(location.search);
	// 	console.log(decodeURIComponent(searchParams));
	// 	const amountString = searchParams.get('amount');
	// 	console.log(decodeURIComponent(amountString));
	// 	if (amountString) {
	// 		// setAmount(JSON.parse(decodeURIComponent(amountString)));
	// 		const formattedAmount = parseFloat(amountString).toLocaleString(undefined, {
	// 			minimumFractionDigits: 2,
	// 			maximumFractionDigits: 2,
	// 		});
	// 		setAmount(formattedAmount);
	// 	}
	// }, [location]);
	useEffect(() => {
		const searchParams = new URLSearchParams(location.search);
		const payerId = decodeURIComponent(searchParams.get('PayerID'));
		// const amount = decodeURIComponent(searchParams.get('amount'));
		const paymentId = decodeURIComponent(searchParams.get('paymentId'));
		console.log(paymentId);
		axios
			// .get(`/success/${payerId}/${paymentId}`) // Make a GET request to the server to retrieve payment details
			.get(`/success?payerId=${payerId}&paymentId=${paymentId}`) // Make a GET request to the server to retrieve payment details
			.then((response) => {
				// Process the payment details as needed
				console.log(response.data);
			})
			.catch((error) => {
				console.error(error);
			});
	}, [location]);
	return (
		<div className='bg-gray-100 h-full'>
			<div className='bg-white h-screen flex- p-6 md:mx-auto my-auto'>
				<svg viewBox='0 0 24 24' className='text-green-600 w-16 h-16 mx-auto my-6'>
					<path
						fill='currentColor'
						d='M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z'></path>
				</svg>
				<div className='text-center'>
					<h3 className='md:text-2xl text-base text-gray-900 font-semibold text-center'>Payment Done!</h3>
					{amount && <p>Amount: ${amount}</p>}
					<p className='text-gray-600 my-2'>Thank you for completing your secure online payment.</p>
					<p>Have a great day!</p>
					<div className='py-10 text-center'>
						<Link to='/discover' className='px-12 bg-primary hover:bg-button_active text-white font-semibold py-3 rounded-md'>
							GO BACK
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};
const PaymentCancelPage = () => {
	return (
		<div className='bg-gray-100 h-full'>
			<div className='bg-white h-screen flex- p-6 md:mx-auto my-auto'>
				<svg fill='#FA5252' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 50 50' className='text-green-600 w-16 h-16 mx-auto my-6'>
					<path d='M25,2C12.319,2,2,12.319,2,25s10.319,23,23,23s23-10.319,23-23S37.681,2,25,2z M33.71,32.29c0.39,0.39,0.39,1.03,0,1.42	C33.51,33.9,33.26,34,33,34s-0.51-0.1-0.71-0.29L25,26.42l-7.29,7.29C17.51,33.9,17.26,34,17,34s-0.51-0.1-0.71-0.29	c-0.39-0.39-0.39-1.03,0-1.42L23.58,25l-7.29-7.29c-0.39-0.39-0.39-1.03,0-1.42c0.39-0.39,1.03-0.39,1.42,0L25,23.58l7.29-7.29	c0.39-0.39,1.03-0.39,1.42,0c0.39,0.39,0.39,1.03,0,1.42L26.42,25L33.71,32.29z' />
				</svg>
				<div className='text-center'>
					<h3 className='md:text-2xl text-base text-gray-900 font-semibold text-center'>Payment Cancelled!</h3>
					<p className='text-gray-600 my-2'>Sorry, your payment was canceled.</p>
					<p>Please try again later.</p>
					<div className='py-10 text-center'>
						<Link to='/discover' className='px-12 bg-primary hover:bg-button_active text-white font-semibold py-3 rounded-md'>
							GO BACK
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export { PaymentSuccessPage, PaymentCancelPage };
