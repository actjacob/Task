import React, { useState } from 'react';
import {
   Modal,
   View,
   TouchableOpacity,
   FlatList,
   Text,
   StyleSheet,
   TextInput,
} from 'react-native';
import colors from '../../constants/colors';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useSelector } from 'react-redux';

const TaskSettingsModal = ({
   route,
   visible,
   onClose,
   taskName,
   members,
   onUpdateBoardName,
   onInvite,
   onCloseBoard,
}) => {
   const [editedBoardName, setEditedBoardName] = useState(taskName);

   const capitalizeFirstLetter = (string) => {
      return string ? string.charAt(0).toUpperCase() + string.slice(1).toLowerCase() : '';
   };

   //Redux information
   const userData = useSelector((state) => state.auth?.userData);
   const firstName = capitalizeFirstLetter(userData?.firstName || '');
   const lastName = capitalizeFirstLetter(userData?.lastName || '');
   const userEmail = userData.email || '';

   const userName = `${firstName} ${lastName}`.trim();

   return (
      <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
         <View style={styles.container}>
            <View style={styles.header}>
               <TouchableOpacity onPress={onClose}>
                  <Text style={styles.closeText}>Close</Text>
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
                  <Text style={styles.boardName}> {userName} </Text>
               </View>

               <Text style={styles.boardName}> {userEmail} </Text>
            </View>
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
      backgroundColor: colors.white,
   },
   headerTitle: {
      fontSize: 20,
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
      fontSize: 12,
      color: colors.lightGray,
   },
   boardName: {
      fontSize: 24,
      color: colors.midBlue,
   },
   membersContainer: {
      marginTop: 20,
      backgroundColor: colors.white,
   },
   membersHeader: {
      flexDirection: 'row',
   },
});
