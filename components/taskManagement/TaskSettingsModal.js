import React, { useEffect, useState } from 'react';
import {
   Modal,
   View,
   TouchableOpacity,
   FlatList,
   Text,
   StyleSheet,
   TextInput,
   Image,
   Button,
} from 'react-native';
import colors from '../../constants/colors';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import ProfileImage from '../ProfileImage';
import userImage from '../../assets/userImage.jpeg';
import BoardMembersModal from './BoardMembersModal';
import { useNavigation } from '@react-navigation/native';
import { db, firestoreDB } from '../../utils/fireStoreHelper';
// import { doc, deleteDoc } from 'firebase/firestore';
import { doc, deleteDoc, query, where, getDocs, collection } from 'firebase/firestore';

const TaskSettingsModal = ({
   route,
   visible,
   onClose,
   taskName,
   onBoardDeleted,
   members,
   onUpdateBoardName,
   onInvite,
   onCloseBoard,

   ...props
}) => {
   const boardId = route?.params?.boardId || props.boardId || '';

   const navigation = useNavigation();
   const [editedBoardName, setEditedBoardName] = useState(taskName);
   const [modalVisible, setModalVisible] = useState(false);

   useEffect(() => {
      console.log('TaskSettingsModal açıldı - Gelen boardId:', boardId);
   }, [boardId]);

   const capitalizeFirstLetter = (string) => {
      return string ? string.charAt(0).toUpperCase() + string.slice(1).toLowerCase() : '';
   };

   const handleDeleteBoard = async () => {
      if (!taskName) return;
      try {
         // 'boards' koleksiyonunda, 'name' alanına göre sorgulama yapıyoruz
         const q = query(
            collection(firestoreDB, 'boards'),
            where('name', '==', taskName)
         );
         const querySnapshot = await getDocs(q);

         if (querySnapshot.empty) {
            console.log('Board bulunamadı');
            return;
         }

         // İlk eşleşen board'un ID'sini alıyoruz
         const boardId = querySnapshot.docs[0].id;

         // Şimdi, bu ID'yi kullanarak board'u silmek
         const boardRef = doc(firestoreDB, 'boards', boardId);
         await deleteDoc(boardRef);

         console.log(`Firestore - ${taskName} isimli board silindi`);

         onBoardDeleted?.(boardId);
         onClose(); // Modalı kapat
         navigation.goBack(); // Geri git
      } catch (error) {
         console.error('Board silinirken bir hata oluştu:', error);
      }
   };

   //Redux information
   const userData = useSelector((state) => state.auth?.userData);
   const firstName = capitalizeFirstLetter(userData?.firstName || '');
   const lastName = capitalizeFirstLetter(userData?.lastName || '');
   const userEmail = userData.email || '';
   const profileImageUri = userData?.profilePicture || userImage;

   const userName = `${firstName} ${lastName}`.trim();

   return (
      <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
         <View style={styles.container}>
            <View style={styles.header}>
               <TouchableOpacity onPress={onClose}>
                  <Ionicons
                     name="close"
                     size={24}
                     color={colors.black}
                     style={{
                        backgroundColor: colors.nearlyWhite,
                        borderRadius: 50,
                        padding: 10,
                     }}
                  />
               </TouchableOpacity>

               <Text style={styles.headerTitle}>Board Menu</Text>
            </View>
            <View style={styles.boardNameContainer}>
               <Text style={styles.boardNameText}>Board Name </Text>
               <Text style={styles.boardName}>{taskName} </Text>
            </View>

            {/* <TextInput
               style={styles.input}
               value={editedBoardName}
               onChangeText={setEditedBoardName}
               onBlur={() => onUpdateBoardName}
            /> */}

            <View style={styles.membersContainer}>
               <View style={styles.membersHeader}>
                  <FontAwesome5 name="user" size={24} color="black" />
                  <Text style={styles.memberName}> {userName} </Text>
               </View>

               <View style={styles.profileContainer}>
                  <Image style={styles.profileImage} source={{ uri: profileImageUri }} />

                  <Text style={styles.memberMail}> {userEmail} </Text>
               </View>
               <TouchableOpacity
                  style={styles.inviteButton}
                  onPress={() => setModalVisible(true)}
               >
                  <Text style={styles.inviteText}>Manage Board Members</Text>
               </TouchableOpacity>

               <BoardMembersModal
                  visible={modalVisible}
                  onClose={() => setModalVisible(false)}
                  boardId={boardId || ''}
                  boardMembers={members || []}
                  taskName={taskName}
               />
               {/* <InviteUsersModal
                  visible={inviteModalVisible}
                  onClose={() => setInviteModalVisible(false)}
                  boardId={boardId}
               /> */}
            </View>

            <TouchableOpacity
               style={styles.deleteBoardButton}
               onPress={handleDeleteBoard}
            >
               <Text style={styles.closeBoardText}>Delete Board</Text>
            </TouchableOpacity>
         </View>
      </Modal>
   );
};

export default TaskSettingsModal;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: colors.nearlyWhite,
   },

   header: {
      flexDirection: 'row',
      alignItems: 'center',
      fontSize: 18,
      fontWeight: 'bold',
      padding: 20,
      borderBottomWidth: 1,
      borderBlockColor: colors.lightGray,
      backgroundColor: colors.white,
   },
   headerTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      flex: 1,
      textAlign: 'center',
      marginRight: 40,
   },
   closeText: {
      fontSize: 18,
      borderwidth: '500',
      color: colors.blue,
   },
   boardNameContainer: {
      backgroundColor: colors.white,
      marginTop: 20,
      padding: 4,
      paddingHorizontal: 20,
   },
   boardNameText: {
      marginTop: 10,
      fontSize: 12,
      color: colors.lightGray,
   },
   boardName: {
      padding: 10,
      fontSize: 24,
      color: colors.midBlue,
   },
   membersContainer: {
      marginTop: 50,
      backgroundColor: colors.white,
      padding: 20,
   },
   membersHeader: {
      flexDirection: 'row',
      marginBottom: 30,
      alignItems: 'center',
      gap: 10,
   },
   memberName: {
      color: colors.black,
      fontSize: 20,
   },
   profileContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 8,
      gap: 10,
   },
   profileImage: {
      width: 50,
      height: 50,
      borderRadius: 50,
      borderWidth: 1,
      borderColor: colors.gray,
   },
   memberMail: {
      fontSize: 18,
      color: colors.gray,
   },
   inviteButton: {
      backgroundColor: colors.blue2,
      padding: 12,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 10,
   },
   inviteText: {
      color: 'white',
      fontSize: 16,
   },
   deleteBoardButton: {
      backgroundColor: colors.red,
      padding: 12,
      margin: 20,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 10,
   },
   closeBoardText: {
      color: colors.white,
      fontSize: 16,
   },
});
