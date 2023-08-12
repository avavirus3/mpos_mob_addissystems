import React from 'react';
import {View , Text} from 'react-native'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Main from '../../../screens/Setting/Main';
import Profile from '../../../screens/Setting/Profile'
import Edit from '../../../screens/Setting/Edit';
import LockScreen from '../../../screens/Setting/LockScreen';
import PINScreen from '../../../screens/Setting/PINScreen';
import ChangePasswordScreen from '../../../screens/Setting/ChangePasswordScreen';
import Language from '../../../screens/Setting/Language';
import PaperWidth from '../../../screens/Setting/PaperWidth';
import PrinterSettingScreen from '../../../screens/Setting/PrinterSettingScreen';
import Currency from '../../../screens/Setting/Currency';
import Customer from '../../../screens/Setting/Customer';
import AddCustomer from '../../../screens/Setting/AddCustomer';
import Payment from '../../../screens/Setting/Payment';
import ChooseBank from '../../../screens/Setting/ChooseBank';
import Analytics from '../../../screens/Setting/Analytics';
import ActiveSessionsScreen from '../../../screens/Setting/ActiveSessionsScreen';
import Notification from '../../../screens/Setting/Notification';
import AccountNumber from '../../../screens/Setting/AccountNumber';
import PhoneNumber from '../../../screens/Setting/PhoneNumber';
import ActivationCode from '../../../screens/Setting/ActivationCode';
import SyncScreen from '../../../screens/Setting/SyncScreen';


const Stack = createNativeStackNavigator();

const Settingtack = () => {
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
      <Stack.Screen name="PrinterSettingcreen"  component={PrinterSettingScreen}/>
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
      <Stack.Screen name="SyncScreen" component={SyncScreen} />

    </Stack.Navigator>
  );
};

export default Settingtack;
