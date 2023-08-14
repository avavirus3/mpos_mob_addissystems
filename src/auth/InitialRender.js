import {View, Text} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../hooks/useContext/AuthContext';
import MainTabNavigation from '../navigation/TabNavigation/mainNavigation/MainTabNavigation';
import LoginStack from '../navigation/StackNavigation/authStack/LoginStack';
import {getItems} from '../database/services/itemServices';
import {useSelector, useDispatch} from 'react-redux';
import {
  setPRODUCT,
} from '../reduxToolkit/features/product/productListSlice';
import { setCHANGE } from '../reduxToolkit/features/change/trackChangeSlice';

const InitialRender = () => {
  const PRODUCT_DATA = useSelector(state => state.product.items);
  const changeTracker = useSelector(state => state.change.change)
  const dispatch = useDispatch();

  useEffect(() => {
    const getDatafromRealm =  () => {
      try {
        const items = getItems();
        const newZeroItems = items
          .slice()
          .filter(filt => filt.quantity > 0)
          .map(
            item =>
              item.quantity > 0 && {
                name: item.name,
                _id: item._id,
                price: item.price,
                quantity: 0,
                image: item.image,
                category: item.category,
              },
          );
        // console.log('Initial Render UseEffect Console!', items);
        dispatch(setPRODUCT(newZeroItems));
        // console.log('Product Data At Initial:', PRODUCT_DATA); 
      } catch (error) {
        console.log('Error Retriving Items:', error);
      }
    };

    getDatafromRealm();
    dispatch(setCHANGE('Unchanged!'))
  }, [changeTracker]); 



  return false ? <MainTabNavigation /> : <LoginStack />;
};

export default InitialRender;
