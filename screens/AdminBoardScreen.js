import React, { useState } from 'react';
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
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import colors from '../constants/colors';
import BoardModal from './dropdownModal/BoardModal';

const AdminBoardScreen = (props) => {
   // const navigation = useNavigation();

   const [menuVisible, setMenuVisible] = useState(false);
   const [modalVisible, setModalVisible] = useState(false);
   const [boards, setBoards] = useState([
      { id: '1', name: 'Shared', color: 'purple' },
      { id: '2', name: 'My own', color: 'blue' },
      { id: '3', name: 'My workweek', color: 'darkblue' },
   ]);
   // const [newBoardName, setNewBoardName] = useState('');

   const addNewBoard = (name, color) => {
      if (name.trim() === '') return;
      const newBoard = {
         id: Math.random().toString(),
         name,
         color,
      };
      setBoards((prevBoards) => [...prevBoards, newBoard]);
      // setNewBoardName('');
      setModalVisible(false);
   };

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
               <View style={[styles.boardItem, { backgroundColor: item.color }]}>
                  <Text style={styles.boardText}> {item.name} </Text>
               </View>
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

               {/* Fullscreen Modal */}

               {/* <Modal
                  visible={modalVisible}
                  animationType="slide"
                  presentationStyle="pageSheet"
               >
                  <View style={styles.modalContainer}>
                     <Text style={styles.modalTitle}>Create a New Board</Text>
                     <TextInput
                        style={styles.input}
                        placeholder="Enter board name"
                        value={newBoardName}
                        onChangeText={setNewBoardName}
                     />
                     <TouchableOpacity style={styles.createButton} onPress={addNewBoard}>
                        <Text style={styles.createButtonText}>Create</Text>
                     </TouchableOpacity>
                     <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => setModalVisible(false)}
                     >
                        <Text style={styles.closeButtonText}>Close</Text>
                     </TouchableOpacity>
                  </View>
               </Modal> */}
            </View>
         )}
      </View>
   );
};

export default AdminBoardScreen;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: 'center',
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
      width: '100%',
      padding: 16,
      borderRadius: 8,
      margin: 8,
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
