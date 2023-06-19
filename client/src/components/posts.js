/** @format */

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BlogPosts = () => {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const response = await axios.get('/api/posts');
				setPosts(response.data);
			} catch (error) {
				console.error(error);
			}
		};

		fetchPosts();
	}, []);

	return (
		<div className='container mx-auto px-4'>
			<h1 className='text-2xl font-bold my-4'>Blog Posts</h1>
			{posts.map((post) => (
				<div key={post._id} className='my-4 p-4 border border-gray-200 rounded'>
					<h2 className='text-xl font-semibold'>{post.title}</h2>
					<p className='text-gray-600'>{post.body}</p>
				</div>
			))}
		</div>
	);
};

export default BlogPosts;
