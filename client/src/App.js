/** @format */

import './App.css';
import Footer from './components/footer';
import Header from './components/header';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/home';
import About from './components/about';
import Contact from './components/contact';
import Discover from './components/discover';
import Facts from './components/facts';
import Startup from './components/startup';
import StartupReg from './components/startup_reg';

import { useState, useEffect } from 'react';

import { Auth0Provider } from '@auth0/auth0-react';

// const auth0Domain = process.env.REACT_APP_AUTH0_DOMAIN;
// const auth0ClientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
// const auth0Callback = process.env.REACT_APP_AUTH0_CALLBACK_URL;

const auth0Domain = 'dev-yzjbam3nbxrpmush.us.auth0.com';
const auth0ClientId = 'Qg6s0AI48wmC1d0ZKyAusNfDGNktZcGY';
const auth0Callback = 'http://localhost:3000/';
{
	/* Temporary! Replace with env variables*/
}

function App() {
	// Add state to persist authentication status
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	useEffect(() => {
		// Check for saved authentication state on application startup
		const savedAuth = localStorage.getItem('isAuthenticated');
		if (savedAuth) {
			setIsAuthenticated(JSON.parse(savedAuth));
		}
	}, []);

	useEffect(() => {
		// Save authentication state whenever it changes
		localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
	}, [isAuthenticated]);
	return (
		<Auth0Provider domain={auth0Domain} clientId={auth0ClientId} redirectUri={window.location.origin}>
			<Router>
				<Header />
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/about' element={<About />} />
					<Route path='/discover' element={<Discover />} />
					<Route path='/contact' element={<Contact />} />
					<Route path='/facts' element={<Facts />} />
					<Route path='/startup' element={<Startup />} />
					<Route path='/startup_registration' element={<StartupReg />} />
				</Routes>
				<Footer />
			</Router>
		</Auth0Provider>
	);
}

export default App;