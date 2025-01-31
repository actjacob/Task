import * as ImagePicker from 'expo-image-picker';
import { Platform } from 'react-native';

export const launchImagePicker = async () => {
   await checkMediaPermissions();
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
