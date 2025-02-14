import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { getUserIdByEmail } from './userActions';

/**
 * Kullanıcının üye olduğu boardları getirir.
 * @param {string} userEmail - Kullanıcının email adresi
 * @returns {Promise<Array>} Kullanıcının üye olduğu boardlar
 */
export const getUserBoardsByEmail = async (userEmail) => {
   try {
      const userId = await getUserIdByEmail(userEmail); // Email → userId dönüşümü yap

      if (!userId) {
         console.error('Kullanıcı bulunamadı!');
         return [];
      }

      const firestore = getFirestore();
      const boardsRef = collection(firestore, 'boards');

      // Kullanıcının email'inin bulunduğu boardları getir
      const q = query(boardsRef, where('members', 'array-contains', userEmail));
      const querySnapshot = await getDocs(q);

      const userBoards = querySnapshot.docs.map((doc) => ({
         id: doc.id,
         ...doc.data(),
      }));

      return userBoards;
   } catch (error) {
      console.error('Kullanıcının boardları alınırken hata oluştu:', error);
      return [];
   }
};
