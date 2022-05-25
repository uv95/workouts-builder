import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: 'AIzaSyAnqueduI3OY5QuMOAR3OXA2oPW_pCpWkU',
  authDomain: 'workouts-builder.firebaseapp.com',
  projectId: 'workouts-builder',
  storageBucket: 'workouts-builder.appspot.com',
  messagingSenderId: '274052840190',
  appId: '1:274052840190:web:6c1462c2e8d08ddada03af',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();
