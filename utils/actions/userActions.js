import { child, get, getDatabase, ref } from 'firebase/database';
import { getFirebaseApp } from '../firebaseHelper';

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

export const getAllUsers = async () => {
   try {
      const app = getFirebaseApp();
      const dbRef = ref(getDatabase(app));
      const usersRef = child(ref(dbRef, 'users'));

      const snapshot = await get(usersRef);
      return snapshot.exists() ? snapshot.val() : {};
   } catch (error) {
      console.log('Error fetching users:', error);
   }
};
