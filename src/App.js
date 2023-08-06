import {View, Text} from 'react-native';
import React, {useContext, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthProvider} from './hooks/useContext/AuthContext';
import InitialRender from './auth/InitialRender';
import Toast from 'react-native-toast-message';
import {store} from './reduxToolkit/store';
import {Provider} from 'react-redux';

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
