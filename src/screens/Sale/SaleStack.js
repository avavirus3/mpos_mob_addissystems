import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SelectProduct from './SelectProduct';
import CreateSale from './create_sale/CreateSale';
import CustomerList from './CustomerList';
import SaleHome from './SaleHome';
import AllOrders from './AllOrders';
import AllSales from './AllSales';
import Draft from './Draft';
import InvoiceQR from './InvoiceQR';
import Payment from './payment/Payment';
const Stack = createNativeStackNavigator();

const SaleStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="sale-home">
      <Stack.Screen name="sale-home" component={SaleHome} />
      <Stack.Screen name="all-sales" component={AllSales} />
      <Stack.Screen name="all-orders" component={AllOrders} />
      <Stack.Screen name="draft" component={Draft} />
      <Stack.Screen name="select-product" component={SelectProduct} />
      <Stack.Screen name="create-sale" component={CreateSale} />
      <Stack.Screen name="customer-list" component={CustomerList} />
      <Stack.Screen name="invoice-qr" component={InvoiceQR} />
      <Stack.Screen name="payment" component={Payment} />
    </Stack.Navigator>
  );
};

/* Rules */
// screen path names should be in all lower case except for main Tab Navigations. (Home, Setting, Sale, Products) it is already done.
// for example if you want to use "product list" as a screen name use like (product-list) without parenthesis.
// Allways try to wright neat codes with comments as much as possible! someone may be maintain it latter.
// You can Ignore this after you read it. Feel free to modify this file and even create from scratch, this is just template to work with the same flow.

export default SaleStack;
