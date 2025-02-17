import { child, get, getDatabase, ref } from 'firebase/database';
import { getFirebaseApp } from '../../firebaseHelper';
import { db } from '../fireStoreHelper';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';

// const admin = require('firebase-admin');

// const serviceAccount = require('../serviceAccountKey.json');

// admin.initializeApp({
//    credential: admin.credential.cert(serviceAccount),
// });

/**
 * Kullanıcının email adresine göre userId'sini getirir.
 * @param {string} email - Kullanıcının email adresi
 * @returns {Promise<string | null>} Kullanıcının UID'si (Yoksa null)
 */

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

export const getUserIdByEmail = async (email) => {
   try {
      const firestore = getFirestore();
      const usersRef = collection(firestore, 'users');

      const q = query(usersRef, where('email', '==', email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
         const userData = querySnapshot.docs[0].data();
         return userData.userId;
      }
      return null;
   } catch (error) {
      console.error('Kullanıcı ID alınırken hata oluştu:', error);
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
