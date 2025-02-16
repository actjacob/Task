import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { doc, setDoc } from 'firebase/firestore';
import { firestoreDB } from '../../utils/fireStoreHelper';
import colors from '../../constants/colors';
import SubmitButton from '../SubmitButton';

const StaffBoardsModal = ({ modalVisible, setModalVisible, selectedTask }) => {
   const [status, setStatus] = useState(selectedTask.status || 'Üstlendi');

   const handleSaveStatus = async () => {
      if (!selectedTask) return;

      try {
         const staffRef = doc(firestoreDB, 'StaffCards', selectedTask.userEmail);
         await setDoc(staffRef, { status }, { merge: true });

         Alert.alert('Başarılı', 'Durum güncellendi!');
         setModalVisible(false);
      } catch (error) {
         console.error('Durum güncellenirken hata oluştu:', error);
      }
   };

   return (
      <Modal
         animationType="slide"
         presentationStyle="pageSheet"
         visible={modalVisible}
         onRequestClose={() => setModalVisible(false)}
      >
         <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
               <Text style={styles.modalTitle}>{selectedTask?.taskName}</Text>
               <View style={styles.staffCard}>
                  <Text style={styles.modalText}>Üstlenen: {selectedTask?.fullName}</Text>
                  <Text style={styles.modalText}>Email: {selectedTask?.userEmail}</Text>
                  <Text style={styles.modalText}>
                     Atanma Tarihi: {selectedTask?.assignedAt}
                  </Text>
               </View>

               <Text style={styles.modalText}>Durum:</Text>
               <View style={styles.buttonContainer}>
                  {['Üstlendi', 'Çalışıyor', 'Bitti'].map((option) => (
                     <TouchableOpacity
                        key={option}
                        style={[
                           styles.statusButton,
                           status === option && styles.selectedStatus,
                        ]}
                        onPress={() => setStatus(option)}
                     >
                        <Text style={styles.buttonText}>{option}</Text>
                     </TouchableOpacity>
                  ))}
               </View>

               <SubmitButton
                  title="Kaydet"
                  onPress={handleSaveStatus}
                  style={{ marginTop: 30 }}
                  color={colors.primary}
               />
               <SubmitButton
                  title="Kapat"
                  onPress={() => setModalVisible(false)}
                  style={{ marginTop: 30 }}
                  color={colors.red}
               />
            </View>
         </View>
      </Modal>
   );
};

export default StaffBoardsModal;

const styles = StyleSheet.create({
   modalContainer: {
      flex: 1,
   },
   modalContent: {
      flex: 1,
      backgroundColor: 'white',
      padding: 10,
      borderRadius: 10,
   },
   modalTitle: {
      margin: 10,
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
   },
   staffCard: {
      borderTopWidth: 1,
      borderRadius: 10,
      backgroundColor: colors.nearlyWhite,
   },
   modalText: {
      fontSize: 18,
      padding: 10,
   },

   buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
      marginTop: 10,
   },
   statusButton: {
      padding: 10,
      borderRadius: 5,
      backgroundColor: '#ddd',
      marginHorizontal: 5,
   },
   selectedStatus: {
      backgroundColor: '#3498db',
   },
   buttonText: {
      fontSize: 16,
      fontWeight: 'bold',
   },
   saveButton: {
      backgroundColor: '#2ecc71',
      padding: 10,
      borderRadius: 5,
      marginTop: 10,
   },
   closeButton: {
      backgroundColor: '#e74c3c',
      padding: 10,
      borderRadius: 5,
      marginTop: 10,
   },
});
