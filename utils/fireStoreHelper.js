import { getFirestore } from 'firebase/firestore';
import { getFirebaseApp } from './firebaseHelper';

const app = getFirebaseApp();
export const db = getFirestore(app);
