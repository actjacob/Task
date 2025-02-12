import React, { useEffect, useState } from 'react';
import {
   View,
   Text,
   FlatList,
   TouchableOpacity,
   Modal,
   TextInput,
   StyleSheet,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import colors from '../constants/colors';
import { set } from 'firebase/database';
import { useNavigation, useRoute } from '@react-navigation/native';
import TaskSettingsModal from '../components/taskManagement/TaskSettingsModal';

const TaskScreen = () => {
   const navigation = useNavigation();
   const route = useRoute();
   const { taskName, taskColor } = route.params;
   const [tasks, setTasks] = useState(['Learn React Native', 'Read Book 30 Page']);
   // const [modalVisible, setModalVisible] = useState(false);
   const [newTask, setNewTask] = useState('');
   const [isEditing, setIsEditing] = useState(false);
   const [settingModalVisible, setSettingModalVisible] = useState(false);
   const [selectedTaskName, setSelectedTaskName] = useState(null);

   const { boardId, onBoardDeleted } = route.params || {};

   const deleteBoard = async () => {
      try {
         await deleteDoc(doc(db, 'boards', boardId));
         console.log('Board başarıyla silindi:', boardId);

         // Eğer callback fonksiyonu varsa çağır
         if (onBoardDeleted) {
            onBoardDeleted(boardId);
         }

         navigation.goBack(); // AdminBoardScreen'e geri dön
      } catch (error) {
         console.error('Board silme hatası:', error);
      }
   };

   const openSettingsModal = () => {
      setSelectedTaskName(taskName);
      setSettingModalVisible(true);
   };

   const handleAddTask = () => {
      if (!newTask.trim()) {
         alert('Task cannot be empty!');
         return;
      }
      setTasks([...tasks, newTask.trim()]);
      setNewTask('');
      setIsEditing(false);
      // setModalVisible(false);
   };

   useEffect(() => {
      if (route.params?.deletedTask) {
         // navigation.goBack(route.params); // Silinen task'ı bir üst ekrana ilet
         console.log('TaskScreen - Silinen Task:', route.params.deletedTask);
         navigation.goBack();
      }
   }, [route.params?.deletedTask]);
   return (
      <View style={[styles.container, { backgroundColor: taskColor }]}>
         {/* Üst başlık */}
         <View style={styles.header}>
            <View style={styles.headerLeft}>
               <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Ionicons name="close" size={30} color={colors.white} />
               </TouchableOpacity>
               <Text style={styles.title}> {taskName} </Text>
            </View>
            <View style={styles.headerRight}>
               <TouchableOpacity>
                  <Ionicons name="reorder-four-sharp" size={24} color={colors.white} />
               </TouchableOpacity>
               <TouchableOpacity>
                  <Ionicons name="notifications" size={24} color={colors.white} />
               </TouchableOpacity>
               <TouchableOpacity onPress={() => openSettingsModal(true)}>
                  <Entypo name="dots-three-horizontal" size={24} color={colors.white} />
               </TouchableOpacity>
            </View>
         </View>
         <View style={styles.inputContainer}>
            <FlatList
               data={tasks}
               keyExtractor={(item, index) => index.toString()}
               renderItem={({ item }) => (
                  <View style={styles.taskCard}>
                     <Text style={styles.taskText}> {item} </Text>
                  </View>
               )}
            />

            <TextInput
               style={styles.input}
               placeholder="enter new task"
               value={newTask}
               onChangeText={(text) => {
                  setNewTask(text);
                  setIsEditing(text.length > 0);
               }}
            />

            {/* Kullanıcı yazmaya başladıysa Butonlar Görünsün */}
            {isEditing ? (
               <View style={styles.buttonRow}>
                  <TouchableOpacity
                     onPress={() => {
                        setNewTask('');
                        setIsEditing(false);
                     }}
                  >
                     <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={handleAddTask}>
                     <Text style={styles.saveButtonText}>Save</Text>
                  </TouchableOpacity>
               </View>
            ) : (
               <View style={styles.addCardContainer}>
                  <TouchableOpacity onPress={() => setIsEditing(true)}>
                     <Text style={styles.addCardButtonText}>+ Add new card</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setIsEditing(true)}>
                     <AntDesign name="picture" size={24} color="black" />
                  </TouchableOpacity>
               </View>
            )}
         </View>

         <TaskSettingsModal
            visible={settingModalVisible}
            onClose={() => setSettingModalVisible(false)}
            taskName={selectedTaskName}
            onBoardDeleted={onBoardDeleted}
         />
      </View>
   );
};

export default TaskScreen;

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
   header: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 30,
      padding: 20,
      borderBottomWidth: 1,
      borderBottomColor: colors.white,
   },
   headerLeft: {
      flexDirection: 'row',
      alignItems: 'center',
   },
   headerRight: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 15,
   },
   title: {
      marginLeft: 20,
      color: colors.white,
      fontSize: 18,
   },
   inputContainer: {
      backgroundColor: colors.nearlyWhite,
      padding: 15,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      marginHorizontal: 10,
      marginTop: 10,
   },
   input: {
      backgroundColor: colors.nearlyWhite,
      padding: 10,
      borderRadius: 8,
      fontSize: 16,
      borderWidth: 1,
   },

   taskCard: {
      backgroundColor: colors.white,
      padding: 10,
      borderRadius: 5,
      marginBottom: 5,
   },
   taskText: {
      fontSize: 16,
   },
   buttonRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 10,
   },
   cancelButtonText: {
      color: colors.red,
      fontSize: 16,
      marginBottom: 10,
   },
   saveButtonText: {
      fontSize: 16,
      color: colors.nearlyDarkBlue,
   },
   addCardContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 10,
   },
});
