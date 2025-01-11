import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const PageContainer = (props) => {
   return (
      <View style={{ ...styles.container, ...props.style }}>
         {props.children}
      </View>
   );
};

export default PageContainer;

const styles = StyleSheet.create({
   container: {
      paddingHorizontal: 20,
      flex: 1,
      backgroundColor: 'white',
      //backgroundColor: '#3498db',
   },
});
