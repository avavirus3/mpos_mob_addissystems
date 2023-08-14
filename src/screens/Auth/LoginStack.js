import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LogIn from './LogIn';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Otp from './Otp';
import Confirm from './Confirm';
import Forgot from './Forgot';
const Stack = createNativeStackNavigator();

const LoginStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="login">
      <Stack.Screen name="login" component={LogIn} />
      <Stack.Screen name="signin" component={SignIn} />
      <Stack.Screen name="signup" component={SignUp} />
      <Stack.Screen name="otp" component={Otp} />
      <Stack.Screen name="confirm" component={Confirm} />
      <Stack.Screen name="forgot" component={Forgot} />

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
