import { View, Text } from 'react-native';
import React from 'react';

const MoveToMyCards = () => {
   const moveToMyCards = async (board) => {
      try {
         if (!userEmail) {
            Alert.alert('Hata', 'Kullanıcı bilgisi bulunamadı.');
            return;
         }

         const boardRef = doc(firestoreDB, 'boards', board.id);
         const staffCardsRef = doc(firestoreDB, 'StaffCards', userEmail); // Her kullanıcı için ayrı bir doküman

         // Firestore'dan board'u al
         const boardSnap = await getDoc(boardRef);
         if (!boardSnap.exists()) {
            Alert.alert('Hata', 'Board bulunamadı.');
            return;
         }

         // StaffCards koleksiyonuna onaylayan kullanıcıya ait board verisini ekle
         await setDoc(
            staffCardsRef,
            {
               id: board.id,
               name: board.name,
               color: board.color,
               createAt: board.createAt,
               members: board.members,
            },
            { merge: true }
         ); // Mevcut veriye ekleme işlemi

         Alert.alert('Başarılı', `"${board.name}" board'ı StaffCards'a eklendi!`);
         navigation.navigate('MyCardScreen');
      } catch (error) {
         console.error(
            'Board bilgisi StaffCards koleksiyonuna eklerken hata oluştu',
            error
         );
         Alert.alert('Hata', 'Board ekleme sırasında bir hata oluştu.');
      }
   };

   return (
      <View>
         <Text>MoveToMyCards</Text>
      </View>
   );
};

export default MoveToMyCards;
