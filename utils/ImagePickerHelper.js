import * as ImagePicker from 'expo-image-picker';
import { Platform } from 'react-native';

export const launchImagePicker = async () => {
   await checkMediaPermissions();

   const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
   });

   if (!result.canceled) {
      console.log(result.uri);
   }
};

const checkMediaPermissions = async () => {
   if (Platform.OS !== 'web') {
      const permisionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (permisionResult.granted === false) {
         return Promise.reject('We need permission to access your photos');
      }
   }

   return Promise.resolve();
};
