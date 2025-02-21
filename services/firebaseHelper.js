import { initializeApp } from 'firebase/app';
import { Platform } from 'react-native';
import {
   FIREBASE_WEB_API_KEY,
   FIREBASE_WEB_AUTH_DOMAIN,
   FIREBASE_WEB_PROJECT_ID,
   FIREBASE_WEB_STORAGE_BUCKET,
   FIREBASE_WEB_MESSAGING_SENDER_ID,
   FIREBASE_WEB_APP_ID,
   FIREBASE_WEB_MEASUREMENT_ID,
   FIREBASE_WEB_DATABASE_URL,
   FIREBASE_ANDROID_API_KEY,
   FIREBASE_ANDROID_APP_ID,
   FIREBASE_ANDROID_DATABASE_URL,
} from '@env';

export const getFirebaseApp = () => {
   console.log('Firebase başlatıldı!');
   console.log('FIREBASE_WEB_API_KEY:', FIREBASE_WEB_API_KEY);
   console.log('FIREBASE_ANDROID_API_KEY:', FIREBASE_ANDROID_API_KEY);

   const firebaseConfig = {
      apiKey: Platform.OS === 'web' ? FIREBASE_WEB_API_KEY : FIREBASE_ANDROID_API_KEY,
      authDomain: FIREBASE_WEB_AUTH_DOMAIN,
      projectId: FIREBASE_WEB_PROJECT_ID,
      storageBucket: FIREBASE_WEB_STORAGE_BUCKET,
      messagingSenderId: FIREBASE_WEB_MESSAGING_SENDER_ID,
      appId: Platform.OS === 'web' ? FIREBASE_WEB_APP_ID : FIREBASE_ANDROID_APP_ID,
      measurementId: FIREBASE_WEB_MEASUREMENT_ID,
      databaseURL:
         Platform.OS === 'web'
            ? FIREBASE_WEB_DATABASE_URL
            : FIREBASE_ANDROID_DATABASE_URL,
   };

   const app = initializeApp(firebaseConfig);

   return app;
};

// const firebaseConfig = {
//    apiKey:
//       Platform.OS === 'web'
//          ? Config.FIREBASE_WEB_API_KEY
//          : Config.FIREBASE_ANDROID_API_KEY,
//    authDomain: Config.FIREBASE_WEB_AUTH_DOMAIN,
//    projectId: Config.FIREBASE_WEB_PROJECT_ID,
//    storageBucket: Config.FIREBASE_WEB_STORAGE_BUCKET,
//    messagingSenderId: Config.FIREBASE_WEB_MESSAGING_SENDER_ID,
//    appId:
//       Platform.OS === 'web'
//          ? Config.FIREBASE_WEB_APP_ID
//          : Config.FIREBASE_ANDROID_APP_ID,
//    measurementId: Config.FIREBASE_WEB_MEASUREMENT_ID,
//    databaseURL:
//       Platform.OS === 'web'
//          ? Config.FIREBASE_WEB_DATABASE_URL
//          : Config.FIREBASE_ANDROID_DATABASE_URL,
// };
