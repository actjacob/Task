import { getFirebaseApp } from '../../services/firebaseHelper.js';
import {
   createUserWithEmailAndPassword,
   getAuth,
   signInWithEmailAndPassword,
} from 'firebase/auth';
import { child, getDatabase, ref, set, update } from 'firebase/database';
import { authenticate, logout } from '../../apps/store/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserData } from './userActions';

let timer;

export const signUp = (firstName, lastName, email, password, role) => {
   return async (dispatch) => {
      console.log('signUp fonksiyonuna gelen rol:', role);
      const app = getFirebaseApp();
      const auth = getAuth(app);

      try {
         const result = await createUserWithEmailAndPassword(auth, email, password);
         const { uid, stsTokenManager } = result.user;
         const { accessToken, expirationTime } = stsTokenManager;

         const expiryDate = new Date(expirationTime);
         const timeNow = new Date();
         const millisecondsUntilExpiry = expiryDate - timeNow;

         const userData = await createUser(firstName, lastName, email, uid, role);

         dispatch(authenticate({ token: accessToken, userData }));
         saveDataToStorage(accessToken, uid, expiryDate);

         timer = setTimeout(() => {
            dispatch(userLogout());
         }, millisecondsUntilExpiry);
      } catch (error) {
         console.log(error);
         const errorCode = error.code;

         let message = 'Something went wrong.';

         if (errorCode === 'auth/email-already-in-use') {
            message = 'This email is already in use';
         }

         throw new Error(message);
      }
   };
};

export const signIn = (email, password) => {
   return async (dispatch) => {
      const app = getFirebaseApp();
      const auth = getAuth(app);

      try {
         const result = await signInWithEmailAndPassword(auth, email, password);
         const { uid, stsTokenManager } = result.user;
         const { accessToken, expirationTime } = stsTokenManager;

         const expiryDate = new Date(expirationTime);
         const timeNow = new Date();
         const millisecondsUntilExpiry = expiryDate - timeNow;

         const userData = await getUserData(uid);

         dispatch(authenticate({ token: accessToken, userData }));
         saveDataToStorage(accessToken, uid, expiryDate);

         timer = setTimeout(() => {
            dispatch(userLogout());
         }, millisecondsUntilExpiry);
      } catch (error) {
         console.log(error);
         const errorCode = error.code;
         console.log(errorCode);

         let message = 'Something went wrong.';

         if (
            errorCode === '(auth/invalid-credential)' ||
            errorCode === 'auth/invalid-credential' ||
            errorCode === 'auth/wrong-password' ||
            errorCode === 'auth/user-not-found'
         ) {
            message = 'The username or password  was incorrect';
         }

         throw new Error(message);
      }
   };
};

export const userLogout = () => {
   return async (dispatch) => {
      const { logout } = require('../../apps/store/authSlice');
      AsyncStorage.clear();
      clearTimeout(timer);
      dispatch(logout());
   };
};

export const updateSignedInUserData = async (userId, newData) => {
   if (newData.firstName && newData.lastName) {
      const firstLast = `${newData.firstName} ${newData.lastName}`.toLowerCase();
      newData.firstLast = firstLast;
   }

   const dbRef = ref(getDatabase());
   const childRef = child(dbRef, `users/${userId}`);
   await update(childRef, newData);
};

const createUser = async (firstName, lastName, email, userId, role) => {
   console.log("Firebase'e kaydedilecek rol:", role);
   const firstLast = `${firstName} ${lastName}`.toLowerCase();

   const userData = {
      firstName,
      lastName,
      firstLast,
      email,
      userId,
      role,
      signUpDate: new Date().toISOString(),
      boardIds: [],
   };

   const dbRef = ref(getDatabase());
   const childRef = child(dbRef, `users/${userId}`);
   await set(childRef, userData);
   return userData;
};

const saveDataToStorage = (token, userId, expiryDate) => {
   AsyncStorage.setItem(
      'userData',
      JSON.stringify({
         token,
         userId,
         expiryDate: expiryDate.toISOString(),
      })
   );
};
