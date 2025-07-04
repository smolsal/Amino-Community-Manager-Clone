import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// For demo purposes, using a mock Firebase config
// In production, these would be real Firebase configuration values
const firebaseConfig = {
  apiKey: "demo-api-key",
  authDomain: "amino-clone-demo.firebaseapp.com",
  projectId: "amino-clone-demo",
  storageBucket: "amino-clone-demo.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456789"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);

export default app;