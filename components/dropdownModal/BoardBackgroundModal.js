import React from 'react';
import { Modal, View, TouchableOpacity, FlatList, Text, StyleSheet } from 'react-native';
import colors from '../../constants/colors';

const colorr = [
   '#4682B4',
   '#DAA520',
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
   '#FF3B30',
   '#FF453A',
   '#D70015',
   '#FF6961',
   '#FF9500',
   '#FF9F0A',
   '#C93400',
   '#FFB340',
   '#FFCC00',
   '#FFD60A',
   '#B25000',
   '#FFDA26',
   '#34C759',
   '#30D158',
   '#248A3D',
   '#30DB5A',
   '#00C7BE',
   '#63E6E2',
   '#0C817B',
   '#66D4CF',
   '#30B0C7',
   '#40C8E0',
   '#008299',
   '#5DB6FF',
   '#32B7E6',
   '#64D2FF',
   '#0071A4',
   '#70C0FF',
   '#007AFF',
   '#0A84FF',
   '#003FFF',
   '#406CFF',
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
               showsVerticalScrollIndicator={false}
               numColumns={4}
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
      width: 85,
      height: 85,
      margin: 5,
      borderRadius: 10,
   },
});
