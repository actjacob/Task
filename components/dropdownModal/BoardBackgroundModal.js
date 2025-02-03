import React from 'react';
import { Modal, View, TouchableOpacity, FlatList, Text, StyleSheet } from 'react-native';
import colors from '../../constants/colors';

const colorr = [
   '#4682B4',
   '#DAA520',
   '#32CD32',
   '#B22222',
   '#8A2BE2',
   '#D14795',
   '#90EE90',
   '#5F9EA0',
   '#A9A9A9',
   'blue',
   'purple',
   'darkblue',
   colors.midBlue,
];

const BoardBackgroundModal = ({ visible, onClose, onSelectColor }) => {
   return (
      <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
         <View style={styles.container}>
            <TouchableOpacity onPress={onClose}>
               <Text style={styles.closeText}>Back</Text>
            </TouchableOpacity>

            <Text style={styles.header}>Board Background</Text>
            <FlatList
               data={colorr}
               numColumns={3}
               keyExtractor={(item) => item}
               renderItem={({ item }) => (
                  <TouchableOpacity
                     style={[styles.colorBox, { backgroundColor: item }]}
                     onPress={() => {
                        onSelectColor(item);
                        onClose();
                     }}
                  />
               )}
            />
         </View>
      </Modal>
   );
};

export default BoardBackgroundModal;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      padding: 20,
      backgroundColor: colors.white,
   },
   closeText: {
      fontSize: 18,
      borderwidth: '500',
      marginTop: 20,
      color: colors.blue,
      marginBottom: 10,
   },
   header: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
   },
   colorBox: {
      width: 100,
      height: 100,
      margin: 13,
      borderRadius: 10,
   },
});
