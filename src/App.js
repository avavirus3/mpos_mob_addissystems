import {View, Text, SafeAreaView} from 'react-native';
import React, {useContext, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthProvider} from './hooks/useContext/AuthContext';
import InitialRender from './auth/InitialRender';
import Toast from 'react-native-toast-message';
import {store} from './reduxToolkit/store';
import {Provider} from 'react-redux';
// import { SafeAreaView } from 'react-native-safe-area-context';

const App = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <NavigationContainer>
          <InitialRender />
          <Toast />
        </NavigationContainer>
      </AuthProvider>
    </Provider>
  );
};

export default App;
