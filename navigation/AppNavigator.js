// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import MainNavigator from './MainNavigator';
// import AuthScreen from '../screens/AuthScreen';
// import { useSelector } from 'react-redux';
// import StartUpScreen from '../screens/StartUpScreen';

// const AppNavigator = () => {
//    // Redux state'deki auth slice'ını güvenli bir şekilde kontrol ediyoruz
//    const authState = useSelector((state) => state.auth || {}); // Eğer state.auth tanımlı değilse boş obje döner
//    const isAuth = authState.token !== null && authState.token !== ''; // Token kontrolü
//    const didTryAutoLogin = authState.didTryAutoLogin || false; // Auto-login deneme kontrolü

//    // console.log('Auth State:', authState); // Debugging için auth state'in loglanması

//    return (
//       <NavigationContainer>
//          {/* Authentication durumuna göre uygun ekranı göster */}
//          {isAuth && <MainNavigator />}
//          {!isAuth && didTryAutoLogin && <AuthScreen />}
//          {!isAuth && !didTryAutoLogin && <StartUpScreen />}
//       </NavigationContainer>
//    );
// };

// export default AppNavigator;

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import MainNavigator from './MainNavigator';
import AuthScreen from '../screens/AuthScreen';
import { useSelector } from 'react-redux';
import StartUpScreen from '../screens/StartUpScreen';
import AdminBoardScreen from '../screens/AdminBoardScreen';
import AdminMainNavigator from './AdminMainNavigator';

const AppNavigator = (props) => {
   const isAuth = useSelector(
      (state) => state.auth.token !== null && state.auth.token !== ''
   );
   const didTryAutoLogin = useSelector((state) => state.auth.didTryAutoLogin);

   const userRole = useSelector((state) => state.auth.userData?.role);

   return (
      <NavigationContainer>
         {isAuth && userRole === 'admin' && <AdminMainNavigator />}
         {isAuth && (userRole === 'staff' || !userRole) && <MainNavigator />}
         {!isAuth && didTryAutoLogin && <AuthScreen />}
         {!isAuth && !didTryAutoLogin && <StartUpScreen />}
      </NavigationContainer>
   );
};

export default AppNavigator;
