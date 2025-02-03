// import React from 'react';
// import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import colors from '../constants/colors';

// const TaskScreen = ({ route, onClose }) => {
//    const { taskName, taskColor } = route.params || {};

//    return (
//       <View style={[styles.container, { backgroundColor: taskColor || 'white' }]}>
//          <View style={styles.header}>
//             <TouchableOpacity onPress={onClose}>
//                <Ionicons name="close" size={24} color={colors.nearlyDarkBlue} />
//             </TouchableOpacity>
//             <Text style={styles.text}>Task: {taskName}</Text>
//          </View>
//       </View>
//    );
// };

// export default TaskScreen;

// const styles = StyleSheet.create({
//    container: {
//       flex: 1,
//       backgroundColor: '#f5f5f5',
//    },
//    header: {
//       padding: 16,
//       margin: 30,
//       flexDirection: 'row',
//       justifyContent: 'space-between',
//    },
//    text: {
//       fontSize: 20,
//       fontWeight: 'bold',
//    },
// });

import React, { useState } from 'react';
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
import colors from '../constants/colors';

const TaskScreen = ({ route }) => {
   const { taskName, taskColor } = route.params;
   const [tasks, setTasks] = useState(['Learn React Native']);
   const [modalVisible, setModalVisible] = useState(false);

   return (
      <View style={[styles.container, { backgroundColor: taskColor }]}>
         {/* Üst başlık */}
         <View style={styles.header}>
            <View style={styles.headerLeft}>
               <TouchableOpacity>
                  <Ionicons name="close" size={24} color={colors.white} />
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
               <TouchableOpacity>
                  <Entypo name="dots-three-horizontal" size={24} color={colors.white} />
               </TouchableOpacity>
            </View>
         </View>

         {/* Task Listesi */}
         <View style={styles.listContainer}>
            <Text style={styles.listTitle}>Today</Text>

            <FlatList
               data={tasks}
               keyExtractor={(item, index) => index.toString()}
               renderItem={({ item }) => (
                  <View style={styles.taskCard}>
                     <Text style={styles.taskText}>{item}</Text>
                  </View>
               )}
            />

            {/* + Add Card Butonu */}
            <TouchableOpacity
               style={styles.addCardButton}
               onPress={() => setModalVisible(true)}
            >
               <Text style={styles.addCardText}>+ Add card</Text>
            </TouchableOpacity>
         </View>

         {/* Modal (Alttan Açılan Menü) */}
         <Modal
            visible={modalVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setModalVisible(false)}
         >
            <View style={styles.modalContainer}>
               <View style={styles.modalContent}>
                  <TouchableOpacity onPress={() => setModalVisible(false)}>
                     <Text style={styles.cancelText}>Cancel</Text>
                  </TouchableOpacity>

                  <TextInput style={styles.input} value="Today" editable={false} />

                  <TouchableOpacity
                     style={styles.closeListButton}
                     onPress={() => setModalVisible(false)}
                  >
                     <Text style={styles.closeListText}>Close List</Text>
                  </TouchableOpacity>
               </View>
            </View>
         </Modal>
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
      marginTop: 20,
      padding: 20,
      borderBottomWidth: 1,
      borderBottomColor: '#fff',
   },
   headerLeft: {
      flexDirection: 'row',
   },
   headerRight: {
      flexDirection: 'row',
      gap: 15,
      justifyContent: 'space-between',
   },
   title: {
      marginLeft: 20,
      color: '#fff',
      fontSize: 18,
   },

   listContainer: {
      margin: 20,
      backgroundColor: '#EDEDED',
      padding: 15,
      borderRadius: 8,
   },
   listTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },

   taskCard: { backgroundColor: '#fff', padding: 10, borderRadius: 5, marginBottom: 5 },
   taskText: { fontSize: 16 },

   addCardButton: { padding: 10, marginTop: 10 },
   addCardText: { color: '#666' },

   modalContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(0,0,0,0.3)',
   },
   modalContent: {
      backgroundColor: '#fff',
      padding: 20,
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
   },
   cancelText: { color: 'blue', marginBottom: 10 },
   input: { backgroundColor: '#f0f0f0', padding: 10, borderRadius: 5, fontSize: 16 },
   closeListButton: {
      backgroundColor: '#EDEDED',
      padding: 15,
      marginTop: 20,
      borderRadius: 5,
   },
   closeListText: { textAlign: 'center', fontSize: 16, fontWeight: 'bold' },
});
