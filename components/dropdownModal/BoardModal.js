import React, { useState } from 'react';
import { Modal, TouchableOpacity, StyleSheet, View, Text, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import colors from '../../constants/colors';
import BoardBackgroundModal from './BoardBackgroundModal';
import { useDispatch } from 'react-redux';

const BoardModal = ({ visible, onClose, onCreate }) => {
   const [boardName, setBoardName] = useState('');
   const [selectedColor, setSelectedColor] = useState(colors.blue);
   const [bgModalVisible, setBgModalVisible] = useState(false);
   const dispatch = useDispatch();

   return (
      <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
         <View style={styles.modalHeader}>
            <TouchableOpacity onPress={onClose}>
               <Ionicons name="close" size={24} color={colors.nearlyDarkBlue} />
            </TouchableOpacity>
            <Text style={styles.modalTitle}> Board</Text>
            <TouchableOpacity
               onPress={() => {
                  onCreate(boardName, selectedColor);
                  setBoardName('');
               }}
               setBoardName
            >
               <Text style={styles.createText}>Create</Text>
            </TouchableOpacity>
         </View>

         {/* Board Name Input */}
         <View style={styles.inputContainer}>
            <TextInput
               style={styles.input}
               placeholder="New board"
               value={boardName}
               onChangeText={setBoardName}
            />
         </View>

         {/* Background Selection */}
         <TouchableOpacity
            style={styles.optionRow}
            onPress={() => setBgModalVisible(true)}
         >
            <Text style={styles.optionText}>Background</Text>
            <View style={styles.colorContainer}>
               <View style={[styles.colorBox, { backgroundColor: selectedColor }]} />

               <Ionicons name="chevron-forward" size={24} color="black" />
            </View>
         </TouchableOpacity>
         <BoardBackgroundModal
            visible={bgModalVisible}
            onClose={() => setBgModalVisible(false)}
            onSelectColor={setSelectedColor}
         />
      </Modal>
   );
};
export default BoardModal;

const styles = StyleSheet.create({
   modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 16,
      borderBottomWidth: 1,
      borderColor: colors.lightGray,
      backgroundColor: colors.nearlyWhite,
   },
   modalTitle: {
      fontSize: 18,
      fontWeight: '500',
   },
   createText: {
      fontSize: 16,
      color: colors.nearlyDarkBlue,
   },
   inputContainer: {
      padding: 16,
      borderWidth: 1,
      borderColor: colors.lightGray,
   },
   input: {
      fontSize: 18,
      paddingVertical: 8,
   },
   optionRow: {
      marginTop: 50,
      borderTopWidth: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 16,
      borderBottomWidth: 1,
      borderColor: colors.lightGray,
   },
   optionText: { fontSize: 16 },
   colorContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
   },
   colorBox: {
      width: 24,
      height: 24,
      borderRadius: 4,
      borderWidth: 1,

      borderBlockColor: colors.lightGray,
   },
});
