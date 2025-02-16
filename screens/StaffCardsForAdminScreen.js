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
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {
   arrayRemove,
   arrayUnion,
   collection,
   doc,
   getDoc,
   getDocs,
   setDoc,
   updateDoc,
} from 'firebase/firestore';
import { firestoreDB } from '../utils/fireStoreHelper';
import { useSelector } from 'react-redux';
import colors from '../constants/colors';
import BoardMembersModal from '../components/taskManagement/BoardMembersModal';
import StaffBoardsModal from '../components/taskManagement/StaffBoardsModal';

const StaffCardsScreen = (props) => {
   const navigation = useNavigation();
   const userData = useSelector((state) => state.auth?.userData);
   const [staffModalVisible, setStaffModalVisible] = useState(false);
   const [assignedStaff, setAssignedStaff] = useState([]);
   const [selectedTask, setSelectedTask] = useState(null); // Seçili görev

   useEffect(() => {
      const fetchAssignedStaffBoard = async () => {
         try {
            const querySnapshot = await getDocs(collection(firestoreDB, 'StaffCards'));
            const tasks = [];

            querySnapshot.forEach((doc) => {
               const userEmail = doc.id;
               const TaskData = doc.data();

               tasks.push({
                  taskName: TaskData.name,
                  color: TaskData.color,
                  userEmail,
                  fullName: TaskData.fullName,
                  assignedAt: TaskData.assignedAt,
               });
            });

            setAssignedStaff(tasks);
         } catch (error) {
            console.error('Üstlenilen görevler çekilirken hata oluştu', error);
            Alert.alert('Hata', 'Görevleri çekerken bir hata oluştu.');
         }
      };
      fetchAssignedStaffBoard();
   }, []);

   return (
      <View style={styles.container}>
         <View style={styles.header}>
            <Text style={styles.headerText}>Görevliler</Text>
         </View>

         <FlatList
            data={assignedStaff}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
               <TouchableOpacity
                  style={[styles.boardItem, { backgroundColor: item.color }]}
                  onPress={() => {
                     setSelectedTask(item);
                     setStaffModalVisible(true);
                  }}
               >
                  <View style={styles.boardItemHeader}>
                     <Text style={styles.boardText}>{item.taskName}</Text>

                     <Ionicons
                        name="chevron-forward-circle-sharp"
                        size={25}
                        color={colors.white}
                     />
                  </View>

                  <Text style={styles.userText}>Üstlenen Görevli: {item.fullName}</Text>
               </TouchableOpacity>
            )}
         />
         {selectedTask && (
            <StaffBoardsModal
               modalVisible={staffModalVisible}
               setModalVisible={setStaffModalVisible}
               selectedTask={selectedTask}
            />
         )}
      </View>
   );
};

export default StaffCardsScreen;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center',
   },
   header: {
      flexDirection: 'row',
      justifyContent: 'center',
      backgroundColor: colors.midBlue,
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
      justifyContent: 'space-between',
      // width: '100%',
      padding: 20,
      borderRadius: 8,
      margin: 8,
   },
   boardItemHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
   },
   boardText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'white',
   },
   userText: {
      fontSize: 14,
      color: 'white',
      marginTop: 4,
   },
});
