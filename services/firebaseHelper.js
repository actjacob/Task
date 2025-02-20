// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { Platform } from 'react-native';

export const getFirebaseApp = () => {
   console.log('Firebase başlatıldı!');
   // https://firebase.google.com/docs/web/setup#available-libraries

   const firebaseWebConfig = {
      apiKey: 'AIzaSyBGdhzpLOHPubv-4YD2QxV29kJHDjC766Y',
      authDomain: 'istakip-87ae2.firebaseapp.com',
      projectId: 'istakip-87ae2',
      storageBucket: 'istakip-87ae2.firebasestorage.app',
      messagingSenderId: '78398604874',
      appId: '1:78398604874:web:aa17672c678629d3f388b3',
      measurementId: 'G-NWS88BKEC8',
   };

   const firebaseAndroidConfig = {
      apiKey: 'AIzaSyBfUC1Vs8vxNUF2AnY5UpF2TV6azCUuZ5w',
      authDomain: 'istakip-87ae2.firebaseapp.com',
      projectId: 'istakip-87ae2',
      storageBucket: 'istakip-87ae2.firebasestorage.app',
      messagingSenderId: '78398604874',
      appId: '1:78398604874:android:0a1f33097235d5b8f388b3',
   };

   const firebaseConfig =
      Platform.OS === 'web' ? firebaseWebConfig : firebaseAndroidConfig;

   const app = initializeApp(firebaseConfig);

   return app;
};
