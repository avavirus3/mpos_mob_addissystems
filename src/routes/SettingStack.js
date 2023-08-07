import React from 'react';
import {View , Text} from 'react-native'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Main from '../screens/settings/Main';
import Profile from '../screens/settings/Profile'
import Edit from '../screens/settings/Edit';
import LockScreen from '../screens/settings/LockScreen';
import PINScreen from '../screens/settings/PINScreen';
import ChangePasswordScreen from '../screens/settings/ChangePasswordScreen';
import Language from '../screens/settings/Language';
import PaperWidth from '../screens/settings/PaperWidth';
import PrinterSettingScreen from '../screens/settings/PrinterSettingScreen';
import Currency from '../screens/settings/Currency';
import Customer from '../screens/settings/Customer';
import AddCustomer from '../screens/settings/AddCustomer';
import Payment from '../screens/settings/Payment';
import ChooseBank from '../screens/settings/ChooseBank';
import Analytics from '../screens/settings/Analytics';
import ActiveSessionsScreen from '../screens/settings/ActiveSessionsScreen';
import Notification from '../screens/settings/Notification';
import AccountNumber from '../screens/settings/AccountNumber';
import PhoneNumber from '../screens/settings/PhoneNumber';
import ActivationCode from '../screens/settings/ActivationCode';

const Stack = createNativeStackNavigator();

const SettingStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Main" component={Main} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Edit"  component={Edit}/>
      <Stack.Screen name="LockScreen"  component={LockScreen}/>
      <Stack.Screen name="PINScreen"  component={PINScreen}/>
      <Stack.Screen name="ChangePassword"  component={ChangePasswordScreen}/>
      <Stack.Screen name="Language"  component={Language}/>
      <Stack.Screen name="PaperWidth"  component={PaperWidth}/>
      <Stack.Screen name="PrinterSettingScreen"  component={PrinterSettingScreen}/>
      <Stack.Screen name="Currency"  component={Currency}/>
      <Stack.Screen name="Customer"  component={Customer}/>
      <Stack.Screen name="AddCustomer"  component={AddCustomer}/>
      <Stack.Screen name="Payment"  component={Payment}/>
      <Stack.Screen name="ChooseBank"  component={ChooseBank}/>
      <Stack.Screen name="Analytics"  component={Analytics}/>
      <Stack.Screen name="ActiveSessionScreen"  component={ActiveSessionsScreen}/>
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen name="AccountNumber" component={AccountNumber} />
      <Stack.Screen name="PhoneNumber" component={PhoneNumber} />
      <Stack.Screen name="ActivationCode" component={ActivationCode} />

    </Stack.Navigator>
  );
};

export default SettingStack;
