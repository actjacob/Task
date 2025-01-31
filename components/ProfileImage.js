import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome6';

import profilePicture from '../assets/profilephoto.jpg';
import colors from '../constants/colors';
import { launchImagePicker } from '../utils/ImagePickerHelper';

const ProfileImage = (props) => {
   const pickImage = () => {
      launchImagePicker();
   };

   return (
      <TouchableOpacity onPress={pickImage}>
         <Image
            style={{ ...styles.image, ...{ width: props.size, height: props.size } }}
            source={profilePicture}
         />

         <View style={styles.editIconContainer}>
            <FontAwesome name="pencil" size={15} color="black" />
         </View>
      </TouchableOpacity>
   );
};

export default ProfileImage;

const styles = StyleSheet.create({
   image: {
      borderRadius: 50,
      borderColor: colors.gray,
      borderWidth: 1,
   },
   editIconContainer: {
      position: 'absolute',
      bottom: -10,
      right: -5,
      backgroundColor: colors.lightGray,
      borderRadius: 20,
      padding: 8,
   },
});
