import { child, get, getDatabase, ref } from 'firebase/database';
import { getFirebaseApp } from '../firebaseHelper';
import { db } from '../fireStoreHelper';

// const admin = require('firebase-admin');

// const serviceAccount = require('../serviceAccountKey.json');

// admin.initializeApp({
//    credential: admin.credential.cert(serviceAccount),
// });

export const getUserData = async (userId) => {
   try {
      const app = getFirebaseApp();
      const dbRef = ref(getDatabase(app));
      const userRef = child(dbRef, `users/${userId}`);

      const snapshot = await get(userRef);
      return snapshot.val();
   } catch (error) {
      console.log(error);
   }
};

export const getUserIdFromRealtimeDB = async (userId) => {
   try {
      const app = getFirebaseApp();
      const dbRef = ref(getDatabase(app));
      const userRef = child(dbRef, `users/${userId}/userId`); // userId içeren path'e bak

      const snapshot = await get(userRef);
      return snapshot.exists() ? snapshot.val() : null;
   } catch (error) {
      console.log('Realtime DB Hatası:', error);
      return null;
   }
};

export const getAllUsers = async () => {
   try {
      const usersRef = ref(db, 'users'); // Doğru veritabanını kullan
      const snapshot = await get(usersRef);
      return snapshot.exists() ? snapshot.val() : {};
   } catch (error) {
      console.error('Error fetching users:', error);
      return null;
   }
};

// export const getAllUsers = async () => {
//    try {
//       const app = getFirebaseApp();
//       const dbRef = ref(getDatabase(app));
//       const usersRef = child(ref(dbRef, 'users'));

//       const snapshot = await get(usersRef);
//       return snapshot.exists() ? snapshot.val() : {};
//    } catch (error) {
//       console.log('Error fetching users:', error);
//    }
// };
