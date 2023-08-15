import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WelcomeScreen from '../../../screens/Auth/WelcomeScreen';
import LogIn from '../../../screens/Auth/LogIn';
import SignUp from '../../../screens/Auth/SignUp';
import ForgotPassword from '../../../screens/Auth/ForgotPassword';
const Stack = createNativeStackNavigator();

const LoginStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
    >
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <Stack.Screen name="LogIn" component={LogIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />

      
      {/* add your screens here following the rules listed bellow */}
    </Stack.Navigator>
  );
};

/* Rules */
// screen path names should be in all lower case except for main Tab Navigations. (Home, Setting, Sale, Products) it is already done.
// for example if you want to use "product list" as a screen name use like (product-list) without parenthesis.
// Allways try to wright neat codes with comments as much as possible! someone may be maintain it latter.
// You can Ignore this after you read it. Feel free to modify this file and even create from scratch, this is just template to work with the same flow.

export default LoginStack;
