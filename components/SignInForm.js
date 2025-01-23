import React, { useCallback, useEffect, useReducer, useState } from 'react';
import Input from './Input';
import { FontAwesome } from '@expo/vector-icons';
import Feather from '@expo/vector-icons/Feather';
import colors from '../constants/colors';
import SubmitButton from '../components/SubmitButton';
import { validateInput } from '../utils/actions/formActions';
import { reducer } from '../utils/reducers/formReducer';
import { signIn } from '../utils/actions/authActions';
import { Alert } from 'react-native';
import { useDispatch } from 'react-redux';

const initialState = {
   inputValues: {
      email: '',
      password: '',
   },
   inputValidities: {
      email: false,
      password: false,
   },
   formIsValid: false,
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
      }
   }, [error]);

   const authHandler = useCallback(async () => {
      try {
         setIsLoading(true);
         const action = signIn(
            formState.inputValues.email,
            formState.inputValues.password
         );
         dispatch(action);
         setError(null);
      } catch (error) {
         setError(error.message);
         setIsLoading(false);
      }
   }, [dispatch]);

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
            errorText={formState.inputValidities['password']}
         />
         <SubmitButton
            title="Sign in"
            onPress={authHandler}
            style={{ marginTop: 30 }}
            disabled={!formState.formIsValid}
         />
      </>
   );
};

export default SignInForm;
