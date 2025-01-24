import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import colors from '../constants/colors';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const Input = (props) => {
   const [value, setValue] = useState(props.initialValue);

   const onChangeText = (text) => {
      setValue(text);
      props.onInputChanged(props.id, text);
   };

   return (
      <View style={styles.container}>
         <Text style={styles.label}> {props.label} </Text>

         <View style={styles.inputContainer}>
            {props.icon && (
               <props.iconPack
                  name={props.icon}
                  size={props.iconSize || 20}
                  style={styles.icon}
               />
            )}

            <TextInput
               {...props}
               style={styles.input}
               onChangeText={onChangeText}
               value={value}
            />
         </View>

         {props.errorText && (
            <View style={styles.errorContainer}>
               <Text style={styles.errorText}> {props.errorText[0]} </Text>
            </View>
         )}
      </View>
   );
};

export default Input;

const styles = StyleSheet.create({
   container: {
      width: '100%',
   },
   label: {
      marginVertical: 8,
      letterSpacing: 0.3,
      color: colors.textColor,
      fontWeight: 'bold',
   },
   inputContainer: {
      width: '100%',
      backgroundColor: 'red',
      paddingHorizontal: 10,
      borderRadius: 2,
      backgroundColor: colors.nearlyWhite,
      flexDirection: 'row',
      alignItems: 'center',
   },
   icon: {
      marginRight: 10,
      color: colors.gray,
      alignItems: 'center',
   },
   input: {
      color: colors.textColor,
      flex: 1,
      padding: 10,
      letterSpacing: 0.3,
   },
   errorContainer: {
      marginVertical: 5,
   },
   errorText: {
      color: 'red',
      fontSize: 13,
      fontWeight: 'regular',
   },
});
