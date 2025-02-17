import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getFirebaseApp } from '../firebaseHelper';
import { getDatabase } from 'firebase/database';

const app = getFirebaseApp();
export const firestoreDB = getFirestore(app);

export const db = getDatabase(app); // Realtime Database için
