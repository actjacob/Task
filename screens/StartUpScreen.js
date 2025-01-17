import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import colors from '../constants/colors';
import commonStyles from '../constants/commonStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { setDidTryAutoLogin } from '../app/store/authSlice';

const StartupScreen = () => {
   const dispatch = useDispatch();
   useEffect(() => {
      const tryLogin = async () => {
         const storedAuthInfo = await AsyncStorage.getItem('userData');

         if (!storedAuthInfo) {
            dispatch(setDidTryAutoLogin());
            return;
         }

         const parseData = JSON.parse(storedAuthInfo);
         const { token, userId, expiryDate: expiryDateString } = parseData;

         const expiryDate = new Date(expiryDateString);
         if (expiryDate <= new Date() || !token || userId) {
            dispatch(setDidTryAutoLogin());
            return;
         }
      };

      tryLogin();
   }, []);

   return (
      <View style={commonStyles.center}>
         <ActivityIndicator size={'large'} color={colors.primary} />
      </View>
   );
};

export default StartupScreen;
