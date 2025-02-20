import React, { useCallback, useReducer, useState } from 'react';
import {
   StyleSheet,
   View,
   Text,
   Button,
   Alert,
   ActivityIndicator,
   ScrollView,
} from 'react-native';

import PageContainer from '../components/PageContainer';
import PageTitle from '../components/PageTitle';
import Input from '../components/Input';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { validateInput } from '../utils/actions/formActions';
import { reducer } from '../utils/reducers/formReducer';
import { useDispatch, useSelector } from 'react-redux';
import SubmitButton from '../components/SubmitButton';
import colors from '../constants/colors';
import { updateSignedInUserData, userLogout } from '../utils/actions/authActions';
import { updateLoggedInUserData } from '../apps/store/authSlice';
import ProfileImage from '../components/ProfileImage';
import userImage from '../assets/userImage.jpeg';

const AccountScreen = (props) => {
   const dispatch = useDispatch();
   const [isLoading, setIsLoading] = useState(false);
   const [showSuccesMessage, setShowSuccesMessage] = useState(false);
   const userData = useSelector((state) => state.auth?.userData);
   // console.log('User Data:', userData);

   const firstName = userData?.firstName || '';
   const lastName = userData?.lastName || '';
   const email = userData?.email || '';
   const about = userData?.about || '';

   const initialState = {
      inputValues: {
         firstName,
         lastName,
         email,
         about,
      },
      inputValidities: {
         firstName: undefined,
         lastName: undefined,
         email: undefined,
         about: undefined,
      },
      formIsValid: false,
   };

   const [formState, dispatchFormState] = useReducer(reducer, initialState);

   const inputChangedHandler = useCallback(
      (inputId, inputValue) => {
         const result = validateInput(inputId, inputValue);
         dispatchFormState({ inputId, validationResult: result, inputValue });
         setShowSuccesMessage(true);

         setTimeout(() => {
            setShowSuccesMessage(false);
         }, 3000);
      },
      [dispatchFormState]
   );

   const saveHandler = useCallback(async () => {
      const updatedValues = formState.inputValues;

      try {
         setIsLoading(true);
         await updateSignedInUserData(userData.userId, updatedValues);
         dispatch(updateLoggedInUserData({ newData: updatedValues }));
      } catch (error) {
         console.log(error);
      } finally {
         setIsLoading(false);
      }
   }, [formState, dispatch]);

   const hasChanges = () => {
      const currentValues = formState.inputValues;

      return (
         currentValues.firstName != firstName ||
         currentValues.lastName != lastName ||
         currentValues.email != email ||
         currentValues.about != about
      );
   };

   return (
      <PageContainer>
         <PageTitle text="Account" />
         <ScrollView contentContainerStyle={styles.formConatiner}>
            <ProfileImage
               size={100}
               userId={userData.userId}
               uri={userData.profilePicture}
            />

            <Input
               id="firstName"
               label="First name"
               icon="user-o"
               iconPack={FontAwesome}
               onInputChanged={inputChangedHandler}
               autoCapitalize="none"
               errorText={formState.inputValidities['firstName']}
               initialValue={userData.firstName}
            />

            <Input
               id="lastName"
               label="Last name"
               icon="user-o"
               iconPack={FontAwesome}
               onInputChanged={inputChangedHandler}
               autoCapitalize="none"
               errorText={formState.inputValidities['lastName']}
               initialValue={userData.lastName}
            />

            <Input
               id="email"
               label="Email"
               icon="mail"
               iconPack={Feather}
               onInputChanged={inputChangedHandler}
               keyboardType="email-address"
               autoCapitalize="none"
               errorText={formState.inputValidities['email']}
               initialValue={userData.email}
            />

            <Input
               id="about"
               label="About"
               icon="user-o"
               iconPack={FontAwesome}
               onInputChanged={inputChangedHandler}
               autoCapitalize="none"
               errorText={formState.inputValidities['about']}
               initialValue={userData.about}
            />

            <View style={{ marginTop: 20 }}>
               {showSuccesMessage && <Text>Saved!</Text>}

               {isLoading ? (
                  <ActivityIndicator
                     size={'small'}
                     color={colors.primary}
                     style={{ marginTop: 10 }}
                  />
               ) : (
                  hasChanges() && (
                     <SubmitButton
                        title="Save"
                        onPress={saveHandler}
                        style={{ marginTop: 30 }}
                        disabled={!formState.formIsValid}
                     />
                  )
               )}
            </View>
            <SubmitButton
               title="Logout"
               onPress={() => dispatch(userLogout())}
               style={{ marginTop: 30 }}
               color={colors.red}
            />
         </ScrollView>
      </PageContainer>
   );
};

export default AccountScreen;

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
   text: {
      fontSize: 24,
   },
   formConatiner: {
      alignItems: 'center',
   },
});
