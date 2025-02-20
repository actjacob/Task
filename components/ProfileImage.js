import React, { useEffect, useState } from 'react';
import {
   View,
   Text,
   StyleSheet,
   Image,
   TouchableOpacity,
   ActivityIndicator,
} from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome6';

import userImage from '../assets/userImage.jpeg';
import colors from '../constants/colors';
import { launchImagePicker, uploadImagePicker } from '../utils/ImagePickerHelper';
import { updateSignedInUserData } from '../utils/actions/authActions';
import { useDispatch } from 'react-redux';
import { updateLoggedInUserData } from '../apps/store/authSlice';

const ProfileImage = (props) => {
   const dispatch = useDispatch();
   const source = props.uri ? { uri: props.uri } : userImage;

   const [image, setImage] = useState(source);
   const [isLoading, setIsLoading] = useState(false);

   const userId = props.userId;

   const pickImage = async () => {
      try {
         const tempUri = await launchImagePicker();

         if (!tempUri) return;

         //Upload the image
         setIsLoading(true);
         const uploadUrl = await uploadImagePicker(tempUri);
         setIsLoading(false);

         if (!uploadUrl) {
            throw new Error('Could not upload image');
         }

         const newData = { profilePicture: uploadUrl };

         // await updateSignedInUserData(userId, { profilePicture: uploadUrl });
         await updateSignedInUserData(userId, newData);
         dispatch(updateLoggedInUserData({ newData }));

         setImage({ uri: uploadUrl });
      } catch (error) {
         // console.log('Selam Buradaki hata:', error);
         setIsLoading(false);
      }
   };

   return (
      <TouchableOpacity onPress={pickImage}>
         {isLoading ? (
            <View height={props.size} widht={props.size} style={styles.loadingContainer}>
               <ActivityIndicator size={'small'} color={colors.primary} />
            </View>
         ) : (
            <Image
               style={{ ...styles.image, ...{ width: props.size, height: props.size } }}
               source={image}
            />
         )}

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
   loadingContainer: {
      justifyContent: 'center',
      alignItems: 'center',
   },
});
