/** @format */

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import money from '../images/money.jpeg';
import Tabs from './tabs';
import ReactPlayer from 'react-player';
import Danger_1 from '../images/danger_1.jpg';
import Danger_2 from '../images/danger_2.jpg';
import Button from './button';
import axios from 'axios';
import useFetchUser from './useFetchUser';
import AddToFavoritesButton from './utils/addToFavourites';
const ProgressBar = ({ value, maxValue }) => {
	const progress = (value / maxValue) * 100;

	return (
		<div className='w-40 h-7 bg-white rounded-full overflow-hidden p-1'>
			<div className='h-full bg-blue-500 rounded-full' style={{ width: `${progress}%` }} />
		</div>
	);
};
const StartupTemplate = () => {
	const { id } = useParams();
	const [startup, setStartup] = useState(null);
	const [newPostTitle, setNewPostTitle] = useState('');
	const [newPostContent, setNewPostContent] = useState('');
	const [posts, setPosts] = useState([]);
	const navigate = useNavigate();
	const fetchPosts = async () => {
		try {
			const response = await axios.get(`/startup/${id}/posts`);
			setPosts(response.data);
		} catch (error) {
			console.error(error);
		}
	};
	useEffect(() => {
		const fetchStartup = async () => {
			try {
				const response = await axios.get(`/startup?id=${id}`);
				setStartup(response.data);
				console.log('This is the startup page:' + JSON.stringify(response.data));
			} catch (error) {
				console.error(error);
			}
		};

		fetchStartup();
		fetchPosts();
	}, [id]);

	const updatePost = async (postId) => {
		// Implement the logic to update the post
		try {
			// Fetch the post details from the backend (optional)
			const response = await axios.get(`/startup/${id}/posts/${postId}`);
			const post = response.data;
			console.log(`Post details`, post);
			// Prompt the user to enter updated title and content (you can use a modal or a form)
			const updatedTitle = prompt('Enter updated title:', post.title);
			const updatedContent = prompt('Enter updated content:', post.content);

			// Send a PUT request to update the post
			await axios.put(`/startup/${id}/posts/${postId}`, {
				title: updatedTitle,
				content: updatedContent,
			});

			// Refresh the posts list or update the specific post in the state
			fetchPosts();
		} catch (error) {
			console.error(error);
		}
	};

	const deletePost = async (postId) => {
		// Implement the logic to delete the post
		try {
			// Confirm with the user before deleting the post
			const confirmed = window.confirm('Are you sure you want to delete this post?');

			if (confirmed) {
				// Send a DELETE request to delete the post
				await axios.delete(`/startup/${id}/posts/${postId}`);

				// Refresh the posts list or remove the specific post from the state
				fetchPosts();
			}
		} catch (error) {
			console.error(error);
		}
	};

	const user = useFetchUser();

	const createPost = async () => {
		try {
			const config = {
				headers: { Authorization: localStorage.getItem('token') },
			};
			const data = { title: newPostTitle, content: newPostContent };
			const response = await axios.post(`/startup/${startup._id}/posts`, data, config);
			const newPost = response.data;
			// setPosts((prevPosts) => [...prevPosts, newPost]);
			// Check if posts array is null before spreading
			// setPosts((prevPosts) => (prevPosts !== null ? [...prevPosts, newPost] : [newPost]));
			// setPosts((prevPosts) => {
			// 	if (!prevPosts) {
			// 		return [newPost];
			// 	} else {
			// 		return [...prevPosts, newPost];
			// 	}
			// });
			fetchPosts();
			setNewPostTitle('');
			setNewPostContent('');
		} catch (error) {
			console.error(error);
		}
	};
	function redirectToLogin() {
		navigate('/login');
	}
	if (!startup) {
		return <div>Loading...</div>;
	}

	let { startupName, startupDesc, startupCountry, startupCategory, goalPercentage, goal, problemSolved, dangers, solution, videos, teamMembers } = startup;

	goalPercentage = 80;

	return (
		<main className='mx-20'>
			{/* Startup Bio */}
			<section className='bg-slate-200 py-10 my-10 rounded-md shadow-lg'>
				<div className='grid grid-cols-2 gap-5 m-5'>
					<div className='flex flex-col space-y-5 text-center'>
						<h1 className='text-2xl font-semibold'>{startupName}</h1>
						<img src={money} alt='img' className='w-auto h-auto max-h-fit rounded-md shadow-lg' />
						<p className='text-xl'>{startupDesc}</p>
						<div className='flex justify-center space-x-5 text-2xl'>
							<p>{startupCategory}</p>
							<p>{startupCountry}</p>
						</div>
					</div>
					<div className='flex flex-col my-auto text-center space-y-4'>
						<div className='flex justify-center'>
							{/* Add functionality to check for percentage from the paypal.me links later on */}
							{/* value={goalPercentage}  */}
							<ProgressBar maxValue={100} value={goalPercentage} />
						</div>
						{/* Percentage of donations to goal */}
						<p className='text-xl font-semibold'>{`${goalPercentage} % raised`}</p>
						<h2 className='text-2xl'>Goal</h2>
						<p className='text-xl font-semibold'>{goal}</p>
						<div className='w-full justify-center'>
							{/* <button className='w-fit bg-primary hover:bg-button_active px-5 py-3 text-white rounded-md font-semibold'>Add to favourites</button> */}
							{user ? <AddToFavoritesButton userId={user._id} startupId={startup._id} /> : ''}
						</div>
					</div>
				</div>
			</section>
			{/* Problems being solved */}
			<section className='bg-slate-200 py-10 my-10 rounded-md shadow-lg text-center flex flex-col justify-center'>
				<div className='flex flex-col'>
					<h1 className='text-2xl font-semibold'> Problems being solved</h1>
					<p>{problemSolved}</p>
				</div>
				{/* Danger Posed */}
				<div className='flex flex-col m-5'>
					<h1 className='text-2xl font-semibold'>Dangers Posed</h1>
					<div className='grid grid-cols-2 gap-5 mx-auto w-1/2 my-5'>
						{dangers.map((danger, index) => (
							<div className='flex mx-auto' key={index}>
								<Tabs title={danger} imageSrc={Danger_1} height={'h-60'} />
							</div>
						))}
					</div>
				</div>
				<div className='flex flex-col'>
					<h1 className='text-2xl font-semibold'> Solution</h1>
					<p>{solution}</p>
				</div>
				{/* Videos */}
				<div className='flex flex-col m-5'>
					<h1 className='text-2xl font-semibold'>Videos</h1>
					<div className='grid grid-cols-2 gap-5 mx-auto w-full my-5'>
						{videos.map((video, index) => (
							<div className='flex mx-auto h-80' key={index}>
								<ReactPlayer url={video} width='560px' height='315px' controls />
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Team members */}
			<section className='bg-slate-200 py-10 my-10 rounded-md shadow-lg text-center flex flex-col justify-center w-auto'>
				<div className='flex flex-col m-5'>
					<h1 className='text-2xl font-semibold'>Meet The Team</h1>
					<div className='grid grid-cols-2 gap-5 mx-auto w-1/2 my-5'>
						{teamMembers.map((member, index) => (
							<div className='flex mx-auto' key={index}>
								<Tabs title={member.name} imageSrc='' subTitle={member.title} description={member.description} />
							</div>
						))}
					</div>
				</div>
			</section>
			<div className='my-5'>
				<Button label='Donate' onClick='' />
			</div>
			<section className='bg-slate-200 py-10 my-10 rounded-md shadow-lg'>
				<div className='p-5 text-center'>
					<h1 className='text-2xl font-semibold'>Posts</h1>
					{user && user._id === startup.owner ? (
						<div className='space-y-10 mt-5'>
							{/* Render existing posts */}
							{posts.length > 0 ? (
								<div className='flex flex-col space-y-5'>
									{posts.map((post) => (
										<div className='mx-auto bg-slate-300 rounded-md p-5' key={post._id}>
											<h2 className='text-2xl font-bold underline'>{post.title}</h2>
											<p>{post.content}</p>
											<div className='flex space-x-2'>
												<button className='bg-primary hover:bg-button_active p-2 text-white font-semibold rounded-md' onClick={() => updatePost(post._id)}>
													Edit
												</button>
												<button className='bg-red-500 hover:bg-red-600 p-2 text-white font-semibold rounded-md' onClick={() => deletePost(post._id)}>
													Delete
												</button>
											</div>
										</div>
									))}
								</div>
							) : (
								<p>No posts yet.</p>
							)}
							{/* Create new post */}
							<div className='flex flex-col space-y-5'>
								<h1 className='text-2xl font-semibold'>Create New Post</h1>
								<input className='rounded-md p-3 shadow-md' type='text' placeholder='Title' value={newPostTitle} onChange={(e) => setNewPostTitle(e.target.value)} />
								<textarea className='rounded-md p-3 shadow-md' placeholder='Content' value={newPostContent} onChange={(e) => setNewPostContent(e.target.value)}></textarea>
								<button className=' bg-primary hover:bg-button_active p-3 text-white font-semibold rounded-md' onClick={createPost}>
									Create Post
								</button>
							</div>
						</div>
					) : (
						<div className='space-y-10 mt-5'>
							{/* Render existing posts */}
							{posts.length > 0 ? (
								<div className='flex flex-col space-y-5'>
									{posts.map((post) => (
										<div className='mx-auto bg-slate-300 rounded-md p-5' key={post._id}>
											<h2 className='text-2xl font-bold underline'>{post.title}</h2>
											<p>{post.content}</p>
										</div>
									))}
								</div>
							) : (
								<p>No posts yet.</p>
							)}
						</div>
					)}
				</div>
			</section>
		</main>
	);
};

// function Startup() {
// 	return (
// 		// <main className='mx-20'>
// 		// 	{/* Startup Bio */}
// 		// 	<section className='bg-background '>
// 		// 		<div className='grid grid-cols-2 gap-5 m-5'>
// 		// 			<div className='flex flex-col space-y-5 text-center'>
// 		// 				<h1 className=' text-2xl'>Name</h1>
// 		// 				<img src='' alt='' className='w-auto h-auto' />
// 		// 				<p className='text-xl'>Description</p>
// 		// 			</div>
// 		// 			<div className='flex flex-col justify-end text-center'>
// 		// 				<ProgressBar maxValue={100} value={60} />
// 		// 				{/* Percentage of donations to goal */}
// 		// 				<p>80 % raised</p>
// 		// 				<h2>Goal</h2>
// 		// 				<p>$1,000,000</p>
// 		// 				<div className='w-full justify-center'>
// 		// 					<button className='w-fit bg-primary hover:bg-button_active px-5 py-3'>Add to favourites</button>
// 		// 				</div>
// 		// 			</div>
// 		// 		</div>
// 		// 	</section>
// 		// </main>
// 		<main className='mx-20'>
// 			{/* Startup Bio */}
// 			<section className='bg-slate-200 py-10 my-10 rounded-md shadow-lg'>
// 				<div className='grid grid-cols-2 gap-5 m-5'>
// 					<div className='flex flex-col space-y-5 text-center'>
// 						<h1 className='text-2xl font-semibold'>Name</h1>
// 						<img src={money} alt='img' className='w-auto h-auto max-h-fit rounded-md shadow-lg' />
// 						<p className='text-xl'>
// 							Lorem ipsum dolor sit amet. Vel rerum iure sed rerum debitis et quidem commodi qui itaque modi non error quia et nostrum quia. Sit dolores nesciunt eum eveniet dolore sed
// 							facilis ipsam qui cumque repellat aut quia repellat.Lorem ipsum dolor sit amet. Vel rerum iure sed rerum debitis et quidem commodi qui itaque modi non error quia et nostrum
// 							quia. Sit dolores nesciunt eum eveniet dolore sed facilis ipsam qui cumque repellat aut quia repellat.
// 						</p>
// 						<div className='flex justify-center space-x-5 text-2xl'>
// 							<p>Country</p>
// 							<p>Category</p>
// 						</div>
// 					</div>
// 					<div className='flex flex-col my-auto text-center space-y-4'>
// 						<div className='flex justify-center'>
// 							<ProgressBar maxValue={100} value={80} />
// 						</div>
// 						{/* Percentage of donations to goal */}
// 						<p className='text-xl font-semibold'>80 % raised</p>
// 						<h2 className='text-2xl'>Goal</h2>
// 						<p className='text-xl font-semibold'>$1,000,000</p>
// 						<div className='w-full justify-center'>
// 							<button className='w-fit bg-primary hover:bg-button_active px-5 py-3 text-white rounded-md font-semibold'>Add to favourites</button>
// 						</div>
// 					</div>
// 				</div>
// 			</section>
// 			{/* Problems being solved */}
// 			<section className='bg-slate-200 py-10 my-10 rounded-md shadow-lg text-center flex flex-col justify-center'>
// 				<div className='flex flex-col'>
// 					<h1 className=' text-2xl font-semibold '> Problems being solved</h1>
// 					<p>
// 						Lorem ipsum dolor sit amet. Vel rerum iure sed rerum debitis et quidem commodi qui itaque modi non error quia et nostrum quia. Sit dolores nesciunt eum eveniet dolore sed
// 						facilis ipsam qui cumque repellat aut quia repellat.Lorem ipsum dolor sit amet. Vel rerum iure sed rerum debitis et quidem commodi qui itaque modi non error quia et nostrum
// 						quia. Sit dolores nesciunt eum eveniet dolore sed facilis ipsam qui cumque repellat aut quia repellat.
// 					</p>
// 				</div>
// 				{/* Danger Posed */}
// 				<div className='flex flex-col m-5'>
// 					<h1 className='text-2xl font-semibold '>Dangers Posed</h1>
// 					<div className='grid grid-cols-2 gap-5 mx-auto w-1/2 my-5'>
// 						<div className='flex mx-auto'>
// 							<Tabs title='Danger 1' imageSrc={money} />
// 						</div>
// 						<div className='flex mx-auto'>
// 							<Tabs title='Danger 1' imageSrc={money} />
// 						</div>
// 					</div>
// 				</div>
// 				<div className='flex flex-col'>
// 					<h1 className=' text-2xl font-semibold '> Solution</h1>
// 					<p>
// 						Lorem ipsum dolor sit amet. Vel rerum iure sed rerum debitis et quidem commodi qui itaque modi non error quia et nostrum quia. Sit dolores nesciunt eum eveniet dolore sed
// 						facilis ipsam qui cumque repellat aut quia repellat.Lorem ipsum dolor sit amet. Vel rerum iure sed rerum debitis et quidem commodi qui itaque modi non error quia et nostrum
// 						quia. Sit dolores nesciunt eum eveniet dolore sed facilis ipsam qui cumque repellat aut quia repellat.
// 					</p>
// 				</div>
// 				{/* Videos */}
// 				<div className='flex flex-col m-5'>
// 					<h1 className='text-2xl font-semibold '>Videos</h1>
// 					<div className='grid grid-cols-2 gap-5 mx-auto w-full my-5'>
// 						<div className='flex mx-auto h-80'>
// 							<ReactPlayer url='https://youtu.be/bL8o1Z2kqlY' width='560px' height='315px' controls />
// 						</div>
// 						<div className='flex mx-auto h-80'>
// 							<ReactPlayer url='https://youtu.be/bL8o1Z2kqlY' width='560px' height='315px' controls />
// 						</div>
// 					</div>
// 				</div>
// 			</section>

// 			{/* Team members */}
// 			<section className='bg-slate-200 py-10 my-10 rounded-md shadow-lg text-center flex flex-col justify-center w-auto'>
// 				<div className='flex flex-col m-5'>
// 					<h1 className='text-2xl font-semibold '>Meet The Team</h1>
// 					<div className='grid grid-cols-2 gap-5 mx-auto w-1/2 my-5'>
// 						<div className='flex mx-auto'>
// 							<Tabs
// 								title='John Doe'
// 								imageSrc={Man}
// 								subTitle={'CEO'}
// 								description={'Lorem ipsum dolor sit amet. Vel rerum iure sed rerum debitis et quidem commodi qui itaque modi non error quia et nostrum quia.'}
// 							/>
// 						</div>
// 						<div className='flex mx-auto'>
// 							<Tabs
// 								title='Jane Doe'
// 								imageSrc={Woman}
// 								subTitle={'CFO'}
// 								description={'Lorem ipsum dolor sit amet. Vel rerum iure sed rerum debitis et quidem commodi qui itaque modi non error quia et nostrum quia. '}
// 							/>
// 						</div>
// 					</div>
// 				</div>
// 			</section>
// 			<div className='my-5'>
// 				<Button label='Donate' onClick='' />
// 			</div>
// 		</main>
// 	);
// }

// export default Startup;
export default StartupTemplate;
