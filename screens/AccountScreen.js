import React, { useCallback, useReducer } from 'react';
import { StyleSheet, View, Text, Button, Alert } from 'react-native';

import PageContainer from '../components/PageContainer';
import PageTitle from '../components/PageTitle';
import Input from '../components/Input';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { validateInput } from '../utils/actions/formActions';
import { reducer } from '../utils/reducers/formReducer';

const initialState = {
   inputValues: {
      firstName: '',
      lastName: '',
      email: '',
      about: '',
   },
   inputValidities: {
      firstName: false,
      lastName: false,
      email: false,
      about: false,
   },
   formIsValid: false,
};

const AccountScreen = (props) => {
   const [formState, dispatchFormState] = useReducer(reducer, initialState);

   const inputChangedHandler = useCallback(
      (inputId, inputValue) => {
         const result = validateInput(inputId, inputValue);
         dispatchFormState({ inputId, validationResult: result, inputValue });
      },
      [dispatchFormState]
   );
   return (
      <PageContainer>
         <PageTitle text="Account" />

         <Input
            id="firstName"
            label="First name"
            icon="user-o"
            iconPack={FontAwesome}
            onInputChanged={inputChangedHandler}
            autoCapitalize="none"
            errorText={formState.inputValidities['firstName']}
         />

         <Input
            id="lastName"
            label="Last name"
            icon="user-o"
            iconPack={FontAwesome}
            onInputChanged={inputChangedHandler}
            autoCapitalize="none"
            errorText={formState.inputValidities['lastName']}
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
         />

         <Input
            id="about"
            label="About"
            icon="user-o"
            iconPack={FontAwesome}
            onInputChanged={inputChangedHandler}
            autoCapitalize="none"
            errorText={formState.inputValidities['about']}
         />
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
});
