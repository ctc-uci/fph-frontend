// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDXuUssjCZ-ZZ3G3SxcVIYD0w7uzbjrO-w',
  authDomain: 'fph-auth.firebaseapp.com',
  projectId: 'fph-auth',
  storageBucket: 'fph-auth.appspot.com',
  messagingSenderId: '506846569179',
  appId: '1:506846569179:web:5e0a49f65d010f506422fe',
  measurementId: 'G-E6BYTR35DP',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
