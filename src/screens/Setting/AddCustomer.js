import {StyleSheet, Text, View, TextInput, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
// import TabNavigation from '../../routes/TabNavigation'
// import  from '../../components/top_navigation/TopNavigationBar'
import {verticalScale, scale} from 'react-native-size-matters';
import {color} from '../../styles/Styles';
// import {Iconify} from 'react-native-iconify';
import TopNavigationBar from '../../components/top_navigation/TopNavigationBar';
import {
  addCustomer,
  getCustomers,
} from '../../database/services/customerServices';
import useGetRealmData from '../../hooks/customHooks/useGetRealmData';

const AddCustomer = ({navigation}) => {
  const [done, setDone] = useState(false);
  const [customerData, setCustomerData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    _tin: '',
  });
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const getCustomersFunc = async () => {
        try {
          const Customers = await getCustomers();
          console.log('realm Customers', Customers);
          setCustomers(Customers);
        } catch (error) {
          console.log('Error Retriving Items:', error); 
        }
      };
    
      getCustomersFunc();
  }, [])

  console.log('Customer Data:', customerData);

  const handleAddCustomer = () => {
    const _tin = '1124523656897';

    addCustomer(customerData);

    console.log('Customer Added');
  };
  return (
    <View style={{flex: 1}}>
      <Text>{customers.map(customer => customer.name)}</Text>
      <View style={{paddingHorizontal: 0}}>
        <View style={{paddingHorizontal: scale(20)}}>
          <TopNavigationBar
            onPressBack={() => navigation.goBack()}
            backIcon={'back'}
            middleLabel={'Add Customer'}
            onGoCondition={color.primary}
          />
        </View>
        <View
          style={{
            marginHorizontal: scale(25),
            marginVertical: verticalScale(15),
          }}>
          <View style={{marginBottom: verticalScale(15)}}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 500,
                height: 25,
                marginBottom: 6,
                color: '#cacaca',
              }}>
              Full Name
            </Text>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                borderRadius: 10,
                borderWidth: 1.5,
                borderColor: color.blue,
                fontSize: 18,
                paddingLeft: 20,
                alignItems: 'center',
              }}>
              {/* <Iconify icon="mdi:person-outline" size={18} color={'#cacaca'} /> */}
              <TextInput
                style={{
                  fontSize: 18,
                  flex: 1,
                }}
                placeholder="Full Name"
                value={customerData.name}
                onChangeText={name => setCustomerData({...customerData, name})}
              />
            </View>
          </View>
          <View style={{marginBottom: verticalScale(15)}}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 500,
                height: 25,
                marginBottom: 6,
                color: '#cacaca',
              }}>
              Email
            </Text>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                borderRadius: 10,
                borderWidth: 1.5,
                borderColor: color.blue,
                fontSize: 18,
                paddingLeft: 20,
                alignItems: 'center',
              }}>
              {/* <Iconify icon="mdi:email-outline" size={18} color={'#cacaca'} /> */}
              <TextInput
                style={{
                  fontSize: 18,
                  flex: 1,
                }}
                placeholder="Email"
                value={customerData.email}
                onChangeText={email =>
                  setCustomerData({...customerData, email})
                }
              />
            </View>
          </View>
          <View style={{marginBottom: verticalScale(15)}}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 500,
                height: 25,
                marginBottom: 6,
                color: 'gray',
              }}>
              Phone Number
            </Text>
            <View
              style={{
                width: '100%',
                borderRadius: 10,
                borderWidth: 1.5,
                borderColor: color.blue,
                flexDirection: 'row',
                alignItems: 'center',
                paddingLeft: 20,
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                {/* <Iconify icon="twemoji:flag-ethiopia" size={30} /> */}
                <Text style={{fontSize: 18, paddingLeft: 9}}>+251</Text>
                {/* <Iconify icon="mdi:menu-down" size={18} /> */}
              </View>

              <TextInput
                style={{fontSize: 18, alignItems: 'center'}}
                //placeholderTextColor="black"
                placeholder="911223344"
                value={customerData.phone}
                onChangeText={phone =>
                  setCustomerData({...customerData, phone})
                }
              />
            </View>
          </View>
          <View style={{marginBottom: verticalScale(15)}}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 500,
                height: 25,
                marginBottom: 6,
                color: '#cacaca',
              }}>
              Address
            </Text>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                borderRadius: 10,
                borderWidth: 1.5,
                borderColor: color.blue,
                fontSize: 18,
                paddingLeft: 20,
                alignItems: 'center',
              }}>
              {/* <Iconify
                icon="mdi:address-marker-outline"
                size={18}
                color={'#cacaca'}
              /> */}
              <TextInput
                style={{
                  fontSize: 18,
                  flex: 1,
                }}
                placeholder="City, Street Address, Woreda, H.No"
                value={customerData.address}
                onChangeText={address =>
                  setCustomerData({...customerData, address})
                }
              />
            </View>
          </View>
          <View style={{marginBottom: verticalScale(15)}}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 500,
                height: 25,
                marginBottom: 6,
                color: '#cacaca',
              }}>
              TIN
            </Text>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                borderRadius: 10,
                borderWidth: 1.5,
                borderColor: color.blue,
                fontSize: 18,
                paddingLeft: 20,
                alignItems: 'center',
              }}>
              {/* <Iconify
                icon="pepicons-pencil:bulletin-notice"
                size={18}
                color={'#cacaca'}
              /> */}
              <TextInput
                style={{
                  fontSize: 18,
                  flex: 1,
                }}
                placeholder="TIN"
                value={customerData._tin}
                onChangeText={_tin => setCustomerData({...customerData, _tin})}
              />
            </View>
          </View>
          <Pressable
            onPress={handleAddCustomer}
            style={{
              borderRadius: 10,
              backgroundColor: color.primary,
              paddingVertical: 18,
              alignItems: 'center',
              justifyContent: 'center',
              marginVertical: verticalScale(15),
            }}>
            <Text style={{color: 'white', fontSize: 22, fontWeight: 600}}>
              Save
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default AddCustomer;

const styles = StyleSheet.create({});
