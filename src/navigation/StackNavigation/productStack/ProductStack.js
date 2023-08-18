import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Product from '../../../screens/Products/productHome/ProductHome';
import AddProduct from '../../../screens/Products/addProduct/AddProduct';
import AllProducts from '../../../screens/Products/allProduct/AllProducts';
import CategoryList from '../../../screens/Products/category/CategoryList';
import AddCategory from '../../../screens/Products/category/AddCategory';
import index from '../../../screens/Products/ItemDetail/index';
const Stack = createNativeStackNavigator();

const ProductStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="product-home">
      <Stack.Screen name="product-home" component={Product} />
      <Stack.Screen name="all-product" component={AllProducts} />
      <Stack.Screen name="add-product" component={AddProduct} />
      <Stack.Screen name="add-category" component={AddCategory} />
      <Stack.Screen name="category-list" component={CategoryList} />
      <Stack.Screen name="item-detail" component={index} />
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
