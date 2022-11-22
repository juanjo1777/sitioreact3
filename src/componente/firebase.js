// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyBPNiCzHryqO-6LMyZf6bENFLH_ROvtlFw',
    authDomain: 'fb-react-764f9.firebaseapp.com',
    projectId: 'fb-react-764f9',
    storageBucket: "fb-react-764f9.appspot.com",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export default app;