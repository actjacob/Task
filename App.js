import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { store } from './apps/store';
import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './navigation/AppNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import { getFirebaseApp } from './services/firebaseHelper';

//AsyncStorage.clear();

export default function App() {
   useEffect(() => {
      getFirebaseApp;
   }, []);

   return (
      <Provider store={store}>
         <SafeAreaProvider>
            <StatusBar style="auto" />
            <AppNavigator />
         </SafeAreaProvider>
      </Provider>
   );
}

// const styles = StyleSheet.create({
//    container: {
//       flex: 1,
//       backgroundColor: '#fff',
//       alignItems: 'center',
//       justifyContent: 'center',
//    },
// });
