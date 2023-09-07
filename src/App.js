import {View, Text, SafeAreaView} from 'react-native';
import React, {useContext, useState,useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthProvider} from './hooks/useContext/AuthContext';
import InitialRender from './auth/InitialRender';
import Toast from 'react-native-toast-message';
import {store} from './reduxToolkit/store';
import {Provider} from 'react-redux';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
  onlineManager,
} from '@tanstack/react-query';
import { Linking } from 'react-native';

// import { SafeAreaView } from 'react-native-safe-area-context';

const queryClient = new QueryClient();

const App = () => {
  const linking = {
    prefixes: [
      "addissystems.mpos://","http://www.addissystems.mpos.com"
    ],
    config:{
      screens:{
        LoginStack:"login"
      }
    }
  }
  useEffect(() => {
    const handleDeepLink = async () => {
      const url = await Linking.getInitialURL();
      if (url) {
        // Handle the deep link URL and navigate to the appropriate screen
        console.log(url)
      }
      else {console.log(null)}
    };
  
    handleDeepLink();
  
    Linking.addEventListener('url', handleDeepLink);
  
    return () => {
      Linking.removeEventListener('url', handleDeepLink);
    };
  }, []);

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <NavigationContainer  linking={linking}>
        
          <InitialRender />
          <Toast />
         
        </NavigationContainer>
      </AuthProvider></QueryClientProvider>
    </Provider>
  );
};

export default App;
