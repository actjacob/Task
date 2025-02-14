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
import { collection, doc, getDocs } from 'firebase/firestore';
import { firestoreDB } from '../utils/fireStoreHelper';
import { useSelector } from 'react-redux';

const BoardScreen = (props) => {
   const navigation = useNavigation();
   const [menuVisible, setMenuVisible] = useState(false);
   const [boards, setBoards] = useState([]);
   const userData = useSelector((state) => state.auth?.userData);
   const userEmail = userData?.email;

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

   useEffect(() => {
      fetchBoards();
   });

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
            renderItem={({ item }) => (
               <TouchableOpacity
                  style={[styles.boardItem, { backgroundColor: item.color }]}
                  onPress={() =>
                     navigation.navigate('TasksScreen', {
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
                  <Ionicons name="chevron-forward" size={24} color="white" />
               </TouchableOpacity>
               // <View style={[styles.boardItem, { backgroundColor: item.color }]}>
               //    <Text style={styles.boardText}> {item.name} </Text>
               // </View>
            )}
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
      backgroundColor: '#0079bf',
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
   menuText: {
      fontSize: 16,
      color: '#333',
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
