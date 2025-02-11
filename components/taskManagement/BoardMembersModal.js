import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getAllUsers } from '../../utils/actions/userActions';
import { Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../../constants/colors';
import userImage from '../../assets/userImage.jpeg';

const BoardMembersModal = ({ visible, onClose }) => {
   const [users, setUsers] = useState([]);

   useEffect(() => {
      if (visible) {
         fetchUsers();
      }
   }, [visible]);

   const fetchUsers = async () => {
      const userData = await getAllUsers();
      const userArray = userData ? Object.values(userData) : [];
      setUsers(userArray);
   };

   return (
      <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
         <View style={styles.container}>
            <View style={styles.headerContainer}>
               <TouchableOpacity onPress={onClose}>
                  <Ionicons
                     name="close"
                     size={24}
                     color="black"
                     style={{
                        backgroundColor: colors.nearlyWhite,
                        borderRadius: 50,
                        padding: 10,
                     }}
                  />
               </TouchableOpacity>
               <Text style={styles.headerTitle}>Board Members List</Text>
            </View>

            <FlatList
               data={users}
               keyExtractor={(item, index) => index.toString()}
               renderItem={({ item }) => {
                  <TouchableOpacity style={styles.userContainer}>
                     <Image
                        source={{ uri: item.profilePicture || userImage }}
                        style={styles.profileImage}
                     />
                     <Text style={styles.userName}>
                        {item.firstName} {item.lastName}
                     </Text>
                  </TouchableOpacity>;
               }}
            />
         </View>
      </Modal>
   );
};

export default BoardMembersModal;

const styles = StyleSheet.create({
   headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',

      padding: 20,
      borderWidth: 1,
      borderBlockColor: colors.lightGray,
      backgroundColor: colors.white,
   },
   headerTitle: {
      flex: 1,
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
      marginRight: 35,
   },
   userContainer: {
      flexDirection: 'row',
   },
});
