import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Alert } from 'react-native';
import { collection, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { firestoreDB } from '../utils/fireStoreHelper';
import colors from '../constants/colors';
import { useSelector } from 'react-redux';

const JoinRequestsScreen = () => {
   const [requests, setRequests] = useState([]);
   const userData = useSelector((state) => state.auth?.userData);
   const isAdmin = userData?.role === 'admin'; // Admin kontrolü

   useEffect(() => {
      fetchRequests();
   }, []);

   const fetchRequests = async () => {
      try {
         const querySnapshot = await getDocs(collection(firestoreDB, 'JoinRequests'));
         const requestsList = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
         }));
         setRequests(requestsList);
      } catch (error) {
         console.error('Katılma istekleri alınırken hata oluştu', error);
      }
   };

   const handleApprove = async (request) => {
      try {
         const boardRef = doc(firestoreDB, 'boards', request.boardId);

         // Board'un üyelerine kullanıcıyı ekle
         await updateDoc(boardRef, {
            members: request.userEmail,
         });

         // İsteği sil
         await deleteDoc(doc(firestoreDB, 'JoinRequests', request.id));

         // Ekranı güncelle
         setRequests((prev) => prev.filter((r) => r.id !== request.id));
         Alert.alert('Başarılı', `"${request.userEmail}" kullanıcısı board'a katıldı.`);
      } catch (error) {
         console.error('Onay işlemi sırasında hata oluştu', error);
      }
   };

   const handleReject = async (request) => {
      try {
         await deleteDoc(doc(firestoreDB, 'JoinRequests', request.id));

         setRequests((prev) => prev.filter((r) => r.id !== request.id));
         Alert.alert(
            'Reddedildi',
            `"${request.userEmail}" kullanıcısının isteği reddedildi.`
         );
      } catch (error) {
         console.error('Reddetme işlemi sırasında hata oluştu', error);
      }
   };

   if (!isAdmin) {
      return (
         <View style={styles.container}>
            <Text style={styles.errorText}>Yetkisiz Erişim</Text>
         </View>
      );
   }

   return (
      <View style={styles.container}>
         <View style={styles.header}>
            <Text style={styles.headerText}>Katılma Talepleri</Text>
         </View>

         <FlatList
            data={requests}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
               <View style={styles.requestItem}>
                  <Text style={styles.requestText}>
                     {item.userEmail} → {item.boardName}
                  </Text>
                  <View style={styles.buttonContainer}>
                     <TouchableOpacity
                        style={[styles.button, { backgroundColor: colors.midBlue }]}
                        onPress={() => handleApprove(item)}
                     >
                        <Text style={styles.buttonText}>Onayla</Text>
                     </TouchableOpacity>
                     <TouchableOpacity
                        style={[styles.button, { backgroundColor: colors.red }]}
                        onPress={() => handleReject(item)}
                     >
                        <Text style={styles.buttonText}>Reddet</Text>
                     </TouchableOpacity>
                  </View>
               </View>
            )}
         />
      </View>
   );
};

export default JoinRequestsScreen;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center',
   },
   header: {
      backgroundColor: colors.midBlue,
      padding: 24,
   },
   headerText: {
      marginTop: 20,
      fontSize: 22,
      fontWeight: 'bold',
      color: 'white',
      textAlign: 'center',
   },
   requestItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 16,
      backgroundColor: colors.lightGray,
      borderRadius: 8,
      margin: 10,
   },
   requestText: {
      fontSize: 16,
      flex: 1,
   },
   buttonContainer: {
      flexDirection: 'row',
   },
   button: {
      padding: 10,
      borderRadius: 5,
      marginHorizontal: 5,
   },
   buttonText: {
      color: 'white',
      fontWeight: 'bold',
   },
   errorText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'red',
      textAlign: 'center',
   },
});
