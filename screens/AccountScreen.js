import React from 'react';
import { StyleSheet, View, Text, Button, Alert } from 'react-native';

const AccountScreen = (props) => {
   return (
      <View style={styles.container}>
         <Text style={styles.text}>Account Screen</Text>
      </View>
   );
};

export default AccountScreen;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
   },
   text: {
      fontSize: 24,
   },
});
