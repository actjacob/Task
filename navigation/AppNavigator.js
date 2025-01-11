import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './MainNavigator';
import AuthScreen from '../screens/AuthScreen';

const isAuth = false;

const AppNavigator = (props) => {
   return (
      <NavigationContainer>
         {isAuth && <MainNavigator />}
         {!isAuth && <AuthScreen />}
         {/* <MainNavigator /> */}
      </NavigationContainer>
   );
};

export default AppNavigator;
