import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Alert } from 'react-native';
import { collection, getDocs, doc, setDoc } from 'firebase/firestore';
import { firestoreDB } from '../utils/fireStoreHelper';
import { useSelector } from 'react-redux';
import colors from '../constants/colors';

const JoinBoardScreen = () => {
   const [boards, setBoards] = useState([]);
   const userData = useSelector((state) => state.auth?.userData);
   const userEmail = userData?.email;
   const [joinedBoards, setJoinedBoards] = useState([]);

   useEffect(() => {
      fetchBoards();
   }, []);

   const fetchBoards = async () => {
      try {
         const querySnapshot = await getDocs(collection(firestoreDB, 'boards'));

         if (!userEmail) return;

         const boardsList = querySnapshot.docs
            .map((doc) => ({
               id: doc.id,
               ...doc.data(),
            }))
            .filter((board) => !board.members || !board.members.includes(userEmail)) // Kullanıcı üye değilse göster
            .sort((a, b) => a.createAt - b.createAt);

         setBoards(boardsList);
      } catch (error) {
         console.error("Board'ları çekerken hata oluştu", error);
      }
   };

   const requestToJoin = async (board) => {
      if (!userEmail) {
         Alert.alert('Hata', 'Kullanıcı bilgisi bulunamadı.');
         return;
      }

      try {
         const requestRef = doc(firestoreDB, 'JoinRequests', `${board.id}_${userEmail}`);
         await setDoc(requestRef, {
            boardId: board.id,
            boardName: board.name,
            userEmail: userEmail,
            status: 'pending', // Admin onayına kadar bekleyen durum
            requestedAt: new Date().toISOString(),
         });
         setJoinedBoards((prev) => [...prev, board.id]);

         Alert.alert('Başarılı', `"${board.name}" için üyelik isteği gönderildi.`);
      } catch (error) {
         console.error('Üyelik isteği gönderirken hata oluştu', error);
         Alert.alert('Hata', 'İstek gönderme sırasında bir hata oluştu.');
      }
   };

   return (
      <View style={styles.container}>
         {/* Header */}
         <View style={styles.header}>
            <Text style={styles.headerText}>Board'a Katılma Talepleri</Text>
         </View>

         <FlatList
            data={boards}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
               const isJoined = joinedBoards.includes(item.id);
               return (
                  <TouchableOpacity
                     style={[styles.boardItem, { backgroundColor: item.color }]}
                  >
                     <Text style={styles.boardText}>{item.name}</Text>
                     <TouchableOpacity
                        style={[
                           styles.requestButton,
                           { backgroundColor: isJoined ? colors.gray : colors.midBlue },
                        ]}
                        onPress={() => requestToJoin(item)}
                        disabled={isJoined}
                     >
                        <Text style={styles.requestText}>
                           {' '}
                           {isJoined ? 'Beklemede' : 'Katıl'}{' '}
                        </Text>
                     </TouchableOpacity>
                  </TouchableOpacity>
               );
            }}
         />
      </View>
   );
};

export default JoinBoardScreen;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center',
   },
   header: {
      backgroundColor: colors.midBlue,
      justifyContent: 'center',
      padding: 24,
   },
   headerText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.white,
      textAlign: 'center',
      marginTop: 20,
   },
   boardItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 20,
      borderRadius: 8,
      margin: 8,
   },
   boardText: {
      color: 'white',
      fontSize: 16,
   },
   requestButton: {
      backgroundColor: colors.midBlue,
      padding: 10,
      borderRadius: 5,
   },
   requestText: {
      color: 'white',
      fontWeight: 'bold',
   },
});
