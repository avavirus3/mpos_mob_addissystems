import {SafeAreaView} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import {color} from '../styles/Styles';
import ProductStack from '../screens/Products/ProductStack';
// import SettingStack from '../routes/SettingStack';
import HomeStack from '../screens/Home/HomeStack';
import SaleStack from '../screens/Sale/SaleStack';
import Setting from '../screens/Setting/Setting';
import SettingStack from '../screens/Setting/SettingStack';

const Tab = createBottomTabNavigator();

// This is the Main Four Bottom Tab Navigations
const MainTabNavigation = () => {
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
