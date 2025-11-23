import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAqAdpbCk9-V21-LvJN4UjUjLByxNaKLls",
  authDomain: "careercompanion-e4947.firebaseapp.com",
  projectId: "careercompanion-e4947",
  storageBucket: "careercompanion-e4947.firebasestorage.app",
  messagingSenderId: "411501418536",
  appId: "1:411501418536:web:40e9aafe1bc5d20b35bd1d",
  measurementId: "G-GENQ6Z0JJF"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);