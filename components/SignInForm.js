import React, { useCallback, useEffect, useReducer, useState } from 'react';
import Input from './Input';
import { FontAwesome } from '@expo/vector-icons';
import Feather from '@expo/vector-icons/Feather';
import colors from '../constants/colors';
import SubmitButton from '../components/SubmitButton';
import { validateInput } from '../utils/actions/formActions';
import { reducer } from '../utils/reducers/formReducer';
import { signIn } from '../utils/actions/authActions';
import { ActivityIndicator, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { validateEmail } from '../utils/validationConstraints';

const isTestMode = true;

const initialState = {
   inputValues: {
      email: isTestMode ? 'test@gmail.com' : '',
      password: isTestMode ? '123456' : '',
   },
   inputValidities: {
      // email: isTestMode,
      // password: isTestMode,
      email: false,
      password: false,
   },
   formIsValid: isTestMode ? true : false,
};

const SignInForm = (props) => {
   const dispatch = useDispatch();

   const [error, setError] = useState();
   const [isLoading, setIsLoading] = useState(false);
   const [formState, dispatchFormState] = useReducer(reducer, initialState);

   const inputChangedHandler = useCallback(
      (inputId, inputValue) => {
         const result = validateInput(inputId, inputValue);
         dispatchFormState({ inputId, validationResult: result, inputValue });
      },
      [dispatchFormState]
   );

   // const authHandler = () => {
   //    signIn(formState.inputValues.email, formState.inputValues.password);
   // };

   useEffect(() => {
      if (error) {
         Alert.alert('An error occured', error, [{ text: 'Okay' }]);
         console.log(error);
      }
   }, [error]);

   const authHandler = useCallback(async () => {
      try {
         setIsLoading(true);
         const action = signIn(
            formState.inputValues.email,
            formState.inputValues.password
         );
         setError(null);
         await dispatch(action);
      } catch (error) {
         setError(error.message);
         setIsLoading(false);
      }
   }, [dispatch, formState]);

   return (
      <>
         <Input
            id="email"
            label="Email"
            icon="mail"
            iconPack={Feather}
            autoCapitalize="none"
            keyboardType="email-address"
            onInputChanged={inputChangedHandler}
            initialValue={formState.inputValues.email}
            errorText={formState.inputValidities['email']}
         />
         <Input
            id="password"
            label="Password"
            icon="lock"
            iconPack={Feather}
            autoCapitalize="none"
            secureTextEntry
            onInputChanged={inputChangedHandler}
            initialValue={formState.inputValues.password}
            errorText={formState.inputValidities['password']}
         />
         {/* <SubmitButton
            title="Sign in"
            onPress={authHandler}
            style={{ marginTop: 30 }}
            disabled={!formState.formIsValid}
         /> */}

         {isLoading ? (
            <ActivityIndicator
               size={'small'}
               color={colors.primary}
               style={{ marginTop: 10 }}
            />
         ) : (
            <SubmitButton
               title="Sign in"
               onPress={authHandler}
               style={{ marginTop: 20 }}
               disabled={!formState.formIsValid}
            />
         )}
      </>
   );
};

export default SignInForm;
