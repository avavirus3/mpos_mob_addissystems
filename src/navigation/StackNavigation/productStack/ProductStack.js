import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Product from '../../../screens/Products/Product';
import AddProduct from '../../../screens/Products/AddProduct';
import AllProducts from '../../../screens/Products/allProduct/AllProducts';
const Stack = createNativeStackNavigator();

const ProductStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="all-product">
      <Stack.Screen name="all-product" component={AllProducts} />
      <Stack.Screen name="add-product" component={AddProduct} />
      {/* add your screens here following the rules listed bellow */}
    </Stack.Navigator>
  );
};

/* Rules */
// screen path names should be in all lower case except for main Tab Navigations. (Home, Setting, Sale, Products) it is already done.
// for example if you want to use "product list" as a screen name use like (product-list) without parenthesis.
// Allways try to wright neat codes with comments as much as possible! someone may be maintain it latter.
// You can Ignore this after you read it. Feel free to modify this file and even create from scratch, this is just template to work with the same flow.

export default ProductStack;
