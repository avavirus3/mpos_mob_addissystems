import {View, Text} from 'react-native';
import React, {useContext, useState} from 'react';
import {AuthContext} from '../hooks/useContext/AuthContext';
import MainTabNavigation from '../navigation/MainTabNavigation';
import LoginStack from './login/LoginStack';

const InitialRender = () => {
  const {user} = useContext(AuthContext);
  return user.isLoggedIn ? <MainTabNavigation /> : <LoginStack />;
};

export default InitialRender;
