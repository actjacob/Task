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
   TextInput,
} from 'react-native';
import MyCardScreen from './MyCardScreen';
import {
   NavigationContainerRefContext,
   useNavigation,
   useRoute,
} from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import colors from '../constants/colors';
import BoardModal from '../components/dropdownModal/BoardModal';
import { db, firestoreDB } from '../utils/fireStoreHelper';
import { collection, addDoc, onSnapshot, getDocs } from 'firebase/firestore';

const AdminBoardScreen = (props) => {
   const navigation = useNavigation();
   const route = useRoute();

   const [menuVisible, setMenuVisible] = useState(false);
   const [modalVisible, setModalVisible] = useState(false);
   const [boards, setBoards] = useState([]);
   // const [newBoardName, setNewBoardName] = useState('');
   // import Swipeable from 'react-native-gesture-handler/Swipeable';

   const addNewBoard = async (name, color) => {
      if (name.trim() === '') return;

      try {
         const docRef = await addDoc(collection(firestoreDB, 'boards'), {
            name: name,
            color: color,
            createAt: new Date(),
         });

         console.log('Firestore - Board eklendi, ID:', docRef.id);

         // const newBoard = {
         //    id: Math.random().toString(),
         //    name,
         //    color,
         // };

         const newBoard = {
            id: docRef.id,
            name,
            color,
         };
         setBoards((prevBoards) => [...prevBoards, newBoard]);

         // setNewBoardName('');
         setModalVisible(false);
      } catch (error) {
         console.error('Firestore - Board eklerken hata oluştu:', error);
      }
   };

   const fetchBoards = async () => {
      try {
         const querySnapshot = await getDocs(collection(firestoreDB, 'boards'));
         const boardsList = querySnapshot.docs
            .map((doc) => ({
               id: doc.id,
               ...doc.data(),
            }))
            .sort((a, b) => a.createAt - b.createAt);

         setBoards(boardsList);
      } catch (error) {
         console.error("Firestore'dan boardları çekerken hata oluştu", error);
      }
   };

   useEffect(() => {
      fetchBoards();
   }, []);

   useEffect(() => {
      if (route.params?.deletedTask) {
         console.log('AdminBoardScreen - Silinen Task:', route.params.deletedTask);

         setBoards((prevBoards) =>
            prevBoards.filter((board) => board.name !== route.params.deletedTask)
         );

         // Parametreyi temizleyerek tekrar focus olduğunda işlem yapmasını engelle
         navigation.setParams({ deletedTask: null });
      }
   }, [route.params?.deletedTask]);

   return (
      <View style={styles.container}>
         {/* Header */}
         <View style={styles.header}>
            <Text style={styles.headerText}>Task</Text>
            <TouchableOpacity style={styles.addIcon} onPress={() => setMenuVisible(true)}>
               <Ionicons name="add" size={24} color="white" />
            </TouchableOpacity>
         </View>

         {/*Board List*/}

         <FlatList
            data={boards}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
               <TouchableOpacity
                  style={[styles.boardItem, { backgroundColor: item.color }]}
                  onPress={() =>
                     navigation.navigate('TaskScreen', {
                        taskName: item.name,
                        taskColor: item.color,
                        boardId: item.id,
                        onBoardDeleted: (deletedBoardId) => {
                           setBoards((prevBoards) =>
                              prevBoards.filter((board) => board.id !== deletedBoardId)
                           );
                        },
                     })
                  }
               >
                  <Text style={styles.boardText}> {item.name} </Text>

                  <Ionicons
                     name="chevron-forward-circle-sharp"
                     size={25}
                     color={colors.white}
                  />
               </TouchableOpacity>
            )}
         />
         <BoardModal
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            onCreate={addNewBoard}
         />

         {/* Popover Menu */}
         {menuVisible && (
            <View style={styles.popoverMenu}>
               <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => {
                     setMenuVisible(false);
                     setModalVisible(true);
                  }}
               >
                  <Text style={styles.menuText}> Create a board </Text>
                  <Feather name="columns" size={24} color="black" />
               </TouchableOpacity>
               <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => setMenuVisible(false)}
               >
                  <Text style={styles.menuText}> Create a card </Text>
                  <MaterialIcons name="credit-card" size={24} color="black" />
               </TouchableOpacity>
               <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => setMenuVisible(false)}
               >
                  <Text style={styles.menuText}> Browse Templates </Text>
                  <Ionicons name="copy-outline" size={24} color="black" />
               </TouchableOpacity>
            </View>
         )}
      </View>
   );
};

export default AdminBoardScreen;

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
      padding: 16,
      borderRadius: 8,
      margin: 10,
   },
   boardText: {
      color: 'white',
      fontSize: 16,
   },
   popoverMenu: {
      position: 'absolute',
      top: 60,
      right: 16,
      backgroundColor: 'white',
      borderRadius: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      paddingVertical: 8,
      paddingHorizontal: 12,
   },

   menuItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 16,
      paddingHorizontal: 16,
   },
   menuText: {
      fontSize: 16,
      color: '#333',
   },
   modalContainer: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: colors.nearlyWhite,
   },
   modalTitle: {
      fontSize: 24,
      marginBottom: 20,
   },
   input: {
      width: '80%',
      height: 40,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      paddingHorizontal: 10,
      backgroundColor: colors.nearlyWhite,
      marginBottom: 20,
   },
   createButton: {
      backgroundColor: '#0079bf',
      padding: 12,
      borderRadius: 8,
   },
   createButtonText: {
      color: 'white',
      fontSize: 18,
   },
   closeButton: {
      marginTop: 20,
   },
   closeButtonText: {
      color: 'red',
      fontSize: 16,
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
