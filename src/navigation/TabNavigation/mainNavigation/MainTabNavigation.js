import {SafeAreaView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import {color} from '../../../styles/Styles';
import ProductStack from '../../StackNavigation/productStack/ProductStack';
// import SettingStack from '../routes/SettingStack';
import HomeStack from '../../StackNavigation/homeStack/HomeStack';
import SaleStack from '../../StackNavigation/saleStack/SaleStack';
import Setting from '../../../screens/Setting/Setting';
import SettingStack from '../../StackNavigation/settingStack/SettingStack';
import {useDispatch, useSelector} from 'react-redux';
import {setPRODUCT} from '../../../reduxToolkit/features/product/productListSlice';
import useGetRealmData from '../../../hooks/customHooks/useGetRealmData';
import { setCHANGE } from '../../../reduxToolkit/features/change/trackChangeSlice';

const Tab = createBottomTabNavigator();

// This is the Main Four Bottom Tab Navigations
const MainTabNavigation = () => {
  const realmItemData = useGetRealmData("Items")
  const changeTracker = useSelector(state => state.change.change)
  const dispatch = useDispatch();

  useEffect(() => {
    const newZeroItems = realmItemData
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
    console.log('Initial Render UseEffect Console!');
    dispatch(setPRODUCT(newZeroItems));
    dispatch(setCHANGE("Unchanged!"))
  }, [changeTracker]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <Tab.Navigator
        screenOptions={({route, size}) => ({
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarLabelStyle: {
            fontSize: 14,
          },
          tabBarActiveTintColor: color.primary,
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            backgroundColor: 'white',
            // height: size,
            minHeight: 65,
            paddingBottom: 8,
            paddingTop: 8,
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 30,
          },
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Sale') {
              iconName = focused ? 'ribbon' : 'ribbon-outline';
            } else if (route.name === 'Product') {
              iconName = focused ? 'pricetag' : 'pricetag-outline';
            } else if (route.name === 'Setting') {
              iconName = focused ? 'settings-sharp' : 'settings-outline';
            }
            return <Ionicons name={iconName} color={color} size={size} />;
          },
        })}>
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen
          name="Sale"
          component={SaleStack}
          options={{
            tabBarIcon: ({focused, size, color}) => (
              <Entypo name="download" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen name="Product" component={ProductStack} />
        <Tab.Screen name="Setting" component={SettingStack} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default MainTabNavigation;
