import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { color } from '../../../styles/Styles';

const CustomerComponent = ({customer, setCustomer, navigation}) => {
  return (
    <View
    style={{
      // flex: 1,
      backgroundColor: color.lightGray,
      paddingTop: 15,
      paddingBottom: 25,
      paddingHorizontal: 20,
      // borderWidth: 1,
    }}>
    <Text style={{fontSize: 20, fontWeight: '600'}}>Customer</Text>
    {customer?.fullname !== 'Guest' ? (
      <View
        style={{
          marginTop: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={{gap: 5}}
          onPress={() => navigation.navigate('customer-list')}>
          <Text style={{fontSize: 18, fontWeight: '500'}}>
            {customer?.fullname}
          </Text>
          <Text style={{fontSize: 18, color: color.gray}}>
            {customer?.tin}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setCustomer({fullname: 'Guest'})}>
          <Ionicons name="trash" size={30} color={color.primary} />
        </TouchableOpacity>
      </View>
    ) : (
      <TouchableOpacity
        style={{
          marginTop: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
        onPress={() => navigation.navigate('customer-list')}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: '500',
          }}>
          Guest
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: color.lightBlue,
            borderRadius: 50,
            padding: 2,
          }}
          onPress={() => navigation.navigate('customer-list')}>
          <Entypo name="plus" size={28} color={color.secondary} />
        </TouchableOpacity>
      </TouchableOpacity>
    )}
  </View>
  )
}

const styles = StyleSheet.create({

})

export default CustomerComponent