import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAZ6i_tQSXJuuimCcaPVSvsgNE4h0acQ5Q',
  authDomain: 'howto-creative.firebaseapp.com',
  projectId: 'howto-creative',
  storageBucket: 'howto-creative.appspot.com',
  messagingSenderId: '938572061197',
  appId: '1:938572061197:web:4715ccc7d06dca432b9344',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
