import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import colors from '../constants/colors';
import commonStyles from '../constants/commonStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';

const StartupScreen = () => {
   const dispatch = useDispatch();
   useEffect(() => {
      const tryLogin = async () => {
         const storedAuthInfo = await AsyncStorage.getItem('userData');

         if (!storedAuthInfo) {
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
