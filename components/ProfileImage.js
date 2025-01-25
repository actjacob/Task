import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

import profilePicture from '../assets/profilephoto.jpg';
import colors from '../constants/colors';

const ProfileImage = (props) => {
   return (
      <View>
         <Image style={styles.image} source={profilePicture} />
      </View>
   );
};

export default ProfileImage;

const styles = StyleSheet.create({
   image: {
      borderRadius: 50,
      borderColor: colors.gray,
      borderWidth: 1,
      height: 80,
      width: 80,
   },
});
