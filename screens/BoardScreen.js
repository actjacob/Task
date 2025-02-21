import React, { useEffect, useState } from 'react';
import {
   StyleSheet,
   View,
   Text,
   Button,
   Alert,
   TouchableOpacity,
   FlatList,
   Modal,
} from 'react-native';
import MyCardScreen from './MyCardScreen';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
import { firestoreDB } from '../utils/fireStoreHelper';
import { useSelector } from 'react-redux';
import colors from '../constants/colors';

const BoardScreen = (props) => {
   const navigation = useNavigation();
   const [boards, setBoards] = useState([]);
   const userData = useSelector((state) => state.auth?.userData);
   const userEmail = userData?.email;
   const [assignedBoards, setAssignedBoards] = useState([]);

   useEffect(() => {
      console.log('UserData BoardScreen:', userData); // Kullanıcı verilerini kontrol et
   }, [userData]);

   useEffect(() => {
      fetchBoards();
      fetchAssignedBoards();
   });

   const fetchBoards = async () => {
      try {
         const querySnapshot = await getDocs(collection(firestoreDB, 'boards'));

         if (!userEmail) return;

         const boardsList = querySnapshot.docs
            .map((doc) => ({
               id: doc.id,
               ...doc.data(),
            }))
            .filter((board) => board.members && board.members.includes(userEmail))
            .sort((a, b) => a.createAt - b.createAt);

         setBoards(boardsList);
      } catch (error) {
         console.error("Firestore'dan boardları çekerken hata oluştu", error);
      }
   };

   const fetchAssignedBoards = async () => {
      if (!userEmail) return;

      try {
         const userBoardsRef = doc(firestoreDB, 'StaffCards', userEmail);
         const userBoardsSnap = await getDoc(userBoardsRef);

         if (userBoardsSnap.exists()) {
            setAssignedBoards([userBoardsSnap.data().id]); // Kullanıcının aldığı görevleri kaydet
         }
      } catch (error) {
         console.error('Üstlenilen görevler çekilierken hata oluştu', error);
      }
   };

   const moveToMyCards = async (board) => {
      try {
         if (!userEmail) {
            Alert.alert('Hata', 'Kullanıcı bilgisi bulunamadı.');
            return;
         }

         const fullName = userData?.firstLast || 'Bilinmeyen Kullanıcı';
         console.log('User full name:', fullName);

         const boardRef = doc(firestoreDB, 'boards', board.id);
         const staffCardsRef = doc(firestoreDB, 'StaffCards', userEmail); // Her kullanıcı için ayrı bir doküman

         const assignedAt = new Date().toLocaleString();

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
               assignedAt: assignedAt,
               fullName: fullName,
            },
            { merge: true }
         ); // Mevcut veriye ekleme işlemi

         Alert.alert('Başarılı', `"${board.name}" board'ı StaffCards'a eklendi!`);

         setAssignedBoards((prev) => [...prev, board.id]);
         navigation.jumpTo('TaskCard');
      } catch (error) {
         console.error(
            'Board bilgisi StaffCards koleksiyonuna eklerken hata oluştu',
            error
         );
         Alert.alert('Hata', 'Board ekleme sırasında bir hata oluştu.');
      }
   };

   return (
      <View style={styles.container}>
         {/* Header */}
         <View style={styles.header}>
            <Text style={styles.headerText}>İş Takip</Text>
         </View>

         {/*Board List*/}

         <FlatList
            data={boards}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
               const isAssigned = assignedBoards.includes(item.id);
               return (
                  <TouchableOpacity
                     style={[styles.boardItem, { backgroundColor: item.color }]}
                     onPress={() =>
                        navigation.navigate('TasksScreen', {
                           taskName: item.name,
                           taskColor: item.color,
                           boardId: item.id,
                        })
                     }
                  >
                     <Text style={styles.boardText}> {item.name} </Text>

                     <TouchableOpacity
                        style={[styles.acceptButton, isAssigned && styles.disabledButton]}
                        onPress={(event) => {
                           event.stopPropagation(); // BoardItem'e tıklanmasını engellemek için
                           if (!isAssigned) {
                              moveToMyCards(item);
                           }
                        }}
                        disabled={isAssigned}
                     >
                        <Text style={styles.acceptText}>
                           {isAssigned ? 'Görev Alındı' : 'Görevi Üstlen'}
                        </Text>
                     </TouchableOpacity>
                  </TouchableOpacity>
               );
            }}
         />
      </View>
   );
};

export default BoardScreen;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center',
   },
   header: {
      flexDirection: 'row',
      justifyContent: 'center',
      backgroundColor: colors.midBlue,
      padding: 24,
      width: '100%',
   },
   headerText: {
      flex: 1,
      fontSize: 24,
      textAlign: 'center',
      color: 'white',
      marginTop: 20,
   },
   addIcon: {
      justifyContent: 'flex-end',
   },
   title: {
      color: 'white',
      fontSize: 20,
      fontWeight: 'bold',
   },
   boardItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      // width: '100%',
      padding: 20,
      borderRadius: 8,
      margin: 8,
   },
   boardText: {
      color: 'white',
      fontSize: 16,
   },
   menuItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 16,
      paddingHorizontal: 16,
   },
   acceptButton: {
      backgroundColor: colors.midBlue,
      padding: 15,
      borderRadius: 5,
   },
   disabledButton: {
      backgroundColor: colors.red,
      padding: 15,
      marginRight: 10,
   },
   acceptText: {
      color: 'white',
      fontWeight: 'bold',
   },
});

{
   /* <Button
title="press"
onPress={() => {
   props.navigation.navigate('MyCard');
}}
/> */
}
