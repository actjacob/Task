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
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {
   arrayRemove,
   arrayUnion,
   collection,
   doc,
   getDoc,
   getDocs,
   setDoc,
   updateDoc,
} from 'firebase/firestore';
import { firestoreDB } from '../utils/fireStoreHelper';
import { useSelector } from 'react-redux';
import colors from '../constants/colors';

const MyCardScreen = (props) => {
   const navigation = useNavigation();
   const [myBoards, setMyBoards] = useState([]);
   const userData = useSelector((state) => state.auth?.userData);
   const userEmail = userData?.email;

   useEffect(() => {
      if (!userEmail) return;

      const fetchMyBoards = async () => {
         try {
            const userBoardsRef = doc(firestoreDB, 'StaffCards', userEmail);
            const userBoardsSnap = await getDoc(userBoardsRef);

            if (userBoardsSnap.exists()) {
               setMyBoards([userBoardsSnap.data()]);
            } else {
               setMyBoards([]);
            }
         } catch (error) {
            console.error("FireStore'dan verileri çekerken hata oluştu", error);
         }
      };
      fetchMyBoards();
   }, [userEmail]);

   return (
      <View style={styles.container}>
         <View style={styles.header}>
            <Text style={styles.headerText}>Görevlerim</Text>
         </View>

         <FlatList
            data={myBoards}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
               <TouchableOpacity
                  style={[styles.boardItem, { backgroundColor: item.color }]}
               >
                  <Text style={styles.boardText}> {item.name} </Text>
                  <Ionicons
                     name="chevron-forward-circle-outline"
                     size={25}
                     color={colors.white}
                  />
               </TouchableOpacity>
            )}
         />
      </View>
   );
};

export default MyCardScreen;

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
      backgroundColor: 'green',
      padding: 10,
      borderRadius: 5,
   },
   acceptText: {
      color: 'white',
      fontWeight: 'bold',
   },
});
