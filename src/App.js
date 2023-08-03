import {View, Text} from 'react-native';
import React, {useContext, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainTabNavigation from './navigation/MainTabNavigation';
import {AuthProvider} from './hooks/useContext/AuthContext';
import InitialRender from './auth/InitialRender';

const App = () => {

  return (
    <AuthProvider>
      <NavigationContainer>
        <InitialRender />
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
