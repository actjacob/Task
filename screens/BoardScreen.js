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
} from 'react-native';
import MyCardScreen from './MyCardScreen';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const boards = [
   { id: '1', name: 'Jacob', color: 'purple' },
   { id: '2', name: 'Sedef', color: 'blue' },
];

const BoardScreen = (props) => {
   // const navigation = useNavigation();

   const [menuVisible, setMenuVisible] = useState(false);

   return (
      <View style={styles.container}>
         {/* Header */}
         <View style={styles.header}>
            <Text style={styles.headerText}>İş Takip</Text>
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

         {/* Popover Menu */}
         {menuVisible && (
            <View style={styles.popoverMenu}>
               <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => setMenuVisible(false)}
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

export default BoardScreen;

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
});

{
   /* <Button
title="press"
onPress={() => {
   props.navigation.navigate('MyCard');
}}
/> */
}
