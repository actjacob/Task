import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome6';

import profilePicture from '../assets/profilephoto.jpg';
import userImage from '../assets/userImage.jpeg';
import colors from '../constants/colors';
import { launchImagePicker } from '../utils/ImagePickerHelper';

const ProfileImage = (props) => {
   const source = props.uri ? { uri: props.uri } : userImage;

   const [image, setImage] = useState(source);

   const pickImage = async () => {
      try {
         const tempUri = await launchImagePicker();

         if (!tempUri) return;

         //Upload the image

         setImage({ uri: tempUri });
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <TouchableOpacity onPress={pickImage}>
         <Image
            style={{ ...styles.image, ...{ width: props.size, height: props.size } }}
            source={image}
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
