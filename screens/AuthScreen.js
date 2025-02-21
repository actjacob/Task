import React, { useState } from 'react';
import {
   View,
   Text,
   StyleSheet,
   TouchableOpacity,
   Image,
   KeyboardAvoidingView,
   ScrollView,
   Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../constants/colors';
import PageContainer from '../components/PageContainer';
import SignUpForm from '../components/SignUpForm';
import SignInForm from '../components/SignInForm';

import logo from '../assets/task.jpg';

const AuthScreen = (props) => {
   const [isSignUp, setIsSignUp] = useState(true);

   const toggleForm = () => {
      setIsSignUp((prevState) => !prevState);
   };
   return (
      <SafeAreaView style={[styles.container, { flex: 1 }]}>
         <ScrollView showsVerticalScrollIndicator={false}>
            <KeyboardAvoidingView
               style={styles.keyboardAvoidingView}
               behavior={Platform.OS === 'ios' ? 'height' : undefined}
               keyboardVerticalOffset={100}
            >
               <PageContainer style={styles.container}>
                  <View style={styles.imageContainer}>
                     <Image style={styles.image} source={logo} resizeMode="center" />
                  </View>
                  {isSignUp ? <SignInForm /> : <SignUpForm />}
                  <TouchableOpacity onPress={toggleForm} style={styles.linkContainer}>
                     {/* <Text>
                  {isSignUp
                     ? 'Already have an account ? Sign In'
                     : "Don't have an account? Sign Up"}
               </Text> */}
                     <Text style={styles.link}>
                        {`Switch to ${isSignUp ? 'Sign Up' : 'Sign In'}`}{' '}
                     </Text>
                  </TouchableOpacity>
               </PageContainer>
            </KeyboardAvoidingView>
         </ScrollView>
      </SafeAreaView>
   );
};

export default AuthScreen;

const styles = StyleSheet.create({
   container: {
      backgroundColor: colors.purple,
   },

   keyboardAvoidingView: {
      flex: 1,
      justifyContent: 'center',
   },
   imageContainer: {
      alignItems: 'center',
      justifyContent: 'center',
   },
   image: {
      width: '100%',
   },
   linkContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 15,
   },
   link: {
      marginTop: 10,
      fontSize: 15,
      color: colors.nearlyWhite,
      fontWeight: 'medium',
      letterSpacing: 0.3,
   },
});
