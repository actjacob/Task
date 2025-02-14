import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { getDatabase, ref, onValue } from 'firebase/database';
import { db } from '../../utils/fireStoreHelper';

const UsersList = () => {
   const [users, setUsers] = useState([]);

   useEffect(() => {
      const usersRef = ref(db, 'users');
      onValue(usersRef, (snapshot) => {
         const data = snapshot.val();
         if (data) {
            const userList = Object.entries(data).map(([id, user]) => ({
               id,
               ...user,
            }));
            setUsers(userList);
         }
      });
   }, []);

   return (
      <View style={styles.container}>
         <Text style={styles.title}>Kayıtlı Kullanıcılar</Text>
         <FlatList
            data={users}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
               <View style={styles.userCard}>
                  <Text style={styles.userText}>
                     {item.email || 'Bilinmeyen Kullanıcı'}
                  </Text>
               </View>
            )}
         />
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#f8f9fa',
   },
   title: {
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 10,
   },
   userCard: {
      backgroundColor: '#ffffff',
      padding: 15,
      marginVertical: 5,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 3,
      elevation: 3,
   },
   userText: {
      fontSize: 16,
   },
});

export default UsersList;
