import {
   View,
   Text,
   TouchableOpacity,
   StyleSheet,
   FlatList,
   Modal,
   Image,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import colors from '../../constants/colors';
import userImage from '../../assets/userImage.jpeg';
import { getAllUsers } from '../../utils/actions/userActions';
import { useSelector, useDispatch } from 'react-redux';
import { setBoardId } from '../../app/store/boardSlice';
import { getFirestore, doc, updateDoc, arrayUnion, getDoc } from 'firebase/firestore';

const BoardMembersModal = ({ visible, onClose, boardId, taskName, ...props }) => {
   const [users, setUsers] = useState([]);
   const [members, setMembers] = useState([]);
   const dispatch = useDispatch();
   const userData = useSelector((state) => state.auth?.userData);
   const currentUserEmail = userData?.email || '';
   const boardIdFromRedux = useSelector((state) => state.board?.boardId);

   useEffect(() => {
      if (boardId && !boardIdFromRedux) {
         console.log('Prop olarak gelen boardId:', boardId);
         dispatch(setBoardId(boardId));
      }
   }, [boardId, boardIdFromRedux, dispatch]);

   // Kullanıcı listesini çek
   useEffect(() => {
      const fetchUsers = async () => {
         const allUsers = await getAllUsers([]);
         if (allUsers) {
            const userList = Object.values(allUsers).filter(
               (user) => user.email !== currentUserEmail
            );

            setUsers(userList);
         }
      };
      fetchUsers();
   }, []);

   //Boarddaki üyeleri çek
   useEffect(() => {
      const fetchBoardMembers = async () => {
         if (!boardIdFromRedux) return;

         try {
            const firestore = getFirestore();
            const boardRef = doc(firestore, 'boards', boardIdFromRedux);
            const boardSnap = await getDoc(boardRef); // Burada getDoc kullanılıyor

            if (boardSnap.exists()) {
               const boardData = boardSnap.data();
               setMembers(boardData.members || []); // Eğer members yoksa boş dizi ata
            }
         } catch (error) {
            console.error('Board üyeleri çekilirken hata oluştu:', error);
         }
      };

      fetchBoardMembers();
   }, [boardIdFromRedux]);

   // Kullanıcıyı board'un `members` dizisine ekle
   const addUserToBoard = async (userEmail) => {
      try {
         if (!boardIdFromRedux) {
            console.error('Board ID bulunamadı!');
            return;
         }

         if (members.includes(userEmail)) {
            console.log(`${userEmail} zaten board üyesi.`);
            alert(`${userEmail} zaten board üyesi!`);
            return; // Kullanıcı zaten varsa, işlem yapılmaz
         }

         const firestore = getFirestore();
         const boardRef = doc(firestore, 'boards', boardIdFromRedux);

         await updateDoc(boardRef, {
            members: arrayUnion(userEmail), // Kullanıcıyı `members` dizisine ekle
         });

         setMembers((prevMembers) => [...prevMembers, userEmail]);

         console.log(`Kullanıcı ${userEmail}, ${boardIdFromRedux} board'ına eklendi!`);

         alert(`${userEmail}  ${taskName}  board'una başarıyla eklendi!`);
      } catch (error) {
         console.error('Kullanıcı eklenirken hata oluştu:', error);
      }
   };

   const handleAddUserToBoard = async (user) => {
      if (!user?.email) {
         console.error('Geçersiz Kullanıcı Verisi !');

         return;
      }

      // if (members.includes(user.email)) {
      //    alert(`${user.email} zaten board üyesi!`);
      //    return;
      // }
      await addUserToBoard(user.email);
   };

   const isValidUrl = (url) => {
      return typeof url === 'string' && url.startsWith('http');
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
               keyExtractor={(item) => item.email}
               renderItem={({ item }) => (
                  <TouchableOpacity
                     style={styles.userContainer}
                     onPress={() => handleAddUserToBoard(item)}
                  >
                     {/* <Image
                        source={{ uri: item.profilePicture || userImage }}
                        style={styles.profileImage}
                     /> */}
                     <Image
                        source={
                           isValidUrl(item.profilePicture)
                              ? { uri: item.profilePicture }
                              : userImage
                        }
                        style={styles.profileImage}
                     />

                     <View style={styles.userInfoContainer}>
                        <Text style={styles.userName}>
                           {item.firstName} {item.lastName}
                        </Text>

                        <Text style={styles.userEmail}>{item.email}</Text>
                     </View>
                  </TouchableOpacity>
               )}
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
      // borderBlockColor: colors.lightGray,
      borderColor: colors.lightGray,
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
      alignItems: 'center',
      padding: 15,
      // borderWidth: 1,
      borderBottomWidth: 1,
      borderColor: colors.lightGray,
      borderBottomColor: colors.lightGray,
   },
   profileImage: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginRight: 15,
   },
   userInfoContainer: {},
   userEmail: {
      fontSize: 14,
      color: colors.gray,
   },
});
