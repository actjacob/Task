import * as ImagePicker from 'expo-image-picker';
import { Platform } from 'react-native';

export const launchImagePicker = async () => {
   await checkMediaPermissions();

   const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
   });

   //  if (!result.canceled) {
   //     return result.uri;
   //  }sdk49 sonrası güncelleme
   if (!result.canceled && result.assets.length > 0) {
      return result.assets[0].uri;
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
