import { getDatabase, ref, get } from 'firebase/database';
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';

// Kullanıcıları Firestore'a aktarma fonksiyonu
const migrateUsersToFirestore = async () => {
   const db = getDatabase();
   const firestore = getFirestore();

   const usersRef = ref(db, 'users'); // Realtime DB'deki users
   const snapshot = await get(usersRef);

   if (snapshot.exists()) {
      const users = snapshot.val();
      const usersArray = Object.values(users);

      for (const user of usersArray) {
         const userDocRef = doc(collection(firestore, 'users'), user.userId);
         await setDoc(userDocRef, user);
      }

      console.log("✅ Kullanıcılar Firestore'a aktarıldı!");
   } else {
      console.log("❌ Realtime Database'de kullanıcı bulunamadı.");
   }
};

// Fonksiyonu çalıştır
migrateUsersToFirestore();
