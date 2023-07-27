import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainTabNavigation from './navigation/MainTabNavigation';
import {AuthProvider} from './hooks/useContext/AuthContext';

const App = () => {
  const [search, setSearch] = useState('');
  return (
    <AuthProvider>
      <NavigationContainer>
        <MainTabNavigation />
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
