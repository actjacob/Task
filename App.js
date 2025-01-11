import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './app/store';
import 'react-native-gesture-handler';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './navigation/AppNavigator';

export default function App() {
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
