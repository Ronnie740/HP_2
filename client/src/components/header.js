/** @format */
import logo from '../images/logo.png';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import notificationIcon from '../images/notification.png';
import useFetchUser from './useFetchUser';
// import md5 from 'md5';
const Header = () => {
	const navigate = useNavigate();
	const [user, setUser] = useState(null);

	const [notificationCount, setNotificationCount] = useState(0);
	const [notifications, setNotifications] = useState([]); // New state for notifications
	const [showDropdown, setShowDropdown] = useState(false);

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
	const fetchNotifications = async () => {
		try {
			// Fetch notifications from the API endpoint
			const response = await axios.get(`/user/${user._id}/notifications`);
			const notifications = response.data.notifications || [];
			const notificationCount = notifications.filter((notification) => !notification.isRead).length;
			return { notificationCount, notifications };
		} catch (error) {
			console.error(error);
			return { notificationCount: 0, notifications: [] };
		}
	};
	useEffect(() => {
		const fetchNotificationsData = async () => {
			const { notificationCount, notifications } = await fetchNotifications();
			setNotificationCount(notificationCount);
			setNotifications(notifications);
		};

		// Fetch notifications immediately when the component mounts
		fetchNotificationsData();

		// Fetch notifications every 5 seconds
		const interval = setInterval(fetchNotificationsData, 5000);

		// Cleanup the interval on component unmount
		return () => {
			clearInterval(interval);
		};
	}, [user]);

	const handleRemoveNotification = async (notificationIndex) => {
		try {
			// Make a DELETE request to remove the notification
			await axios.delete(`/user/${user._id}/notifications/${notificationIndex}`);

			// Update the notifications state by removing the notification at the specified index
			const updatedNotifications = [...notifications];
			updatedNotifications.splice(notificationIndex, 1);
			setNotifications(updatedNotifications);

			// Update the notification count by subtracting 1
			setNotificationCount(notificationCount - 1);
		} catch (error) {
			console.error(error);
		}
	};

	const handleToggleDropdown = () => {
		setShowDropdown(!showDropdown);
	};

	const handleLogout = () => {
		// Perform logout actions (e.g., clearing token from localStorage)
		// and redirect to the logout page or desired location
		localStorage.removeItem('token');
		// Refresh the user state to null
		setUser(null);
		// Redirect to the root directory
		navigate('/');
	};
	console.log(user);

	if (user) {
		console.log(user._id);
	}
	// Gravetar avatars
	// let gravatarUrl = ``;
	// if (user) {
	// 	gravatarUrl = `https://www.gravatar.com/avatar/${md5(user.email)}?s=200`;
	// }
	return (
		<header className='mx-20 flex flex-row justify-between my-5 w-f'>
			{/*Logo and navigation*/}
			<div className='flex space-x-5'>
				{/* Logo */}
				<Link to='/'>
					<img className='w-40 h-15' src={logo} alt='Logo' />
				</Link>
				{/* Nav */}
				<div className='w-auto space-x-5 mt-3'>
					<Link to='discover'>Discover</Link>
					<Link to='facts'>Climate Change Facts</Link>
					<Link to='about'>About Us</Link>
					<Link to='contact'>Contact Us</Link>
				</div>
			</div>
			{/* Login and Signup */}
			<div className=' flex w-auto space-x-5 mt-3 items-center'>
				{user ? (
					<>
						<div className='relative'>
							<div className='cursor-pointer' onClick={handleToggleDropdown}>
								<img src={notificationIcon} className='w-6 h-6' />
								{notificationCount > 0 && (
									<div className='absolute -top-1 -right-1 bg-red-500 text-white rounded-full h-4 w-4 flex items-center justify-center text-xs'>{notificationCount}</div>
								)}
							</div>
							{showDropdown && (
								<div className='absolute right-0 mt-2 bg-white border border-gray-200 rounded shadow-md'>
									{notifications.length > 0 ? (
										<ul className='py-2'>
											{notifications.map((notification) => (
												<li key={notification.id} className='px-4 py-2 w-60'>
													{notification.message}
													<button className='ml-2 text-blue-500' onClick={() => handleRemoveNotification(notification.id)}>
														Remove
													</button>
												</li>
											))}
										</ul>
									) : (
										<p className='px-4 py-2'>No notifications</p>
									)}
								</div>
							)}
						</div>
						<Link to='/account' className='flex space-x-5'>
							<span className='my-auto'>Hello! {user.name}</span>
							{/* <img src={gravatarUrl} alt='Profile' className='w-10 h-10 rounded-full' /> */}
							<img src='https://api.dicebear.com/6.x/fun-emoji/svg?seed=Bear' alt='Profile' className='w-10 h-10 rounded-full' />
							{/* <img src={<Avatar name={user.name} />} alt='Profile' className='w-10 h-10 rounded-full' /> */}
						</Link>
						<button onClick={handleLogout}>Logout</button>
					</>
				) : (
					<>
						<Link to='/login'>Login</Link>
						<Link to='/signup'>Signup</Link>
					</>
				)}
			</div>
		</header>
	);
};

export default Header;
