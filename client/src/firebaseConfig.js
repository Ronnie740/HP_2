/** @format */

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: 'honours-application.firebaseapp.com',
	projectId: 'honours-application',
	storageBucket: 'honours-application.appspot.com',
	messagingSenderId: '75957329966',
	appId: '1:75957329966:web:22d3ad6f2c0f47cb78ffbf',
	measurementId: 'G-EG411R24VR',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
