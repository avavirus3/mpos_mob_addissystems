import {StyleSheet, Text, View, TextInput, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
// import TabNavigation from '../../routes/TabNavigation'
// import  from '../../components/top_navigation/TopNavigationBar'
import {verticalScale, scale} from 'react-native-size-matters';
import {color} from '../../styles/Styles';
import {Iconify} from 'react-native-iconify';
import TopNavigationBar from '../../components/top_navigation/TopNavigationBar';
import { getItems, addItem } from '../../database/services/itemServices';

const AddProduct = ({navigation}) => {
  const [newProductData, setNewProductData] = useState({
    name: '',
    _id: 0,
    price: 0,
    quantity: 0,
    category: '',
    image: require('../../assets/images/charger-1.jpg').toString()
  });

  const handleAddProduct = () => {
    console.log("NewProductData:", typeof parseInt(newProductData._id))
    const newItem = {
      name: newProductData.name,
      _id: parseInt(newProductData._id),
      price: parseInt(newProductData.price)
    }
    // addItem(newProductData)
    // console.log('Customer Added');
  };


  return (
    <View style={{flex: 1}}>
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
              Product Name
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
              <Iconify icon="mdi:person-outline" size={18} color={'#cacaca'} />
              <TextInput
                style={{
                  fontSize: 18,
                  flex: 1,
                }}
                placeholder="Product Name"
                value={newProductData.name}
                onChangeText={name => setNewProductData({...newProductData, name})}
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
              Id
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
              <Iconify icon="mdi:email-outline" size={18} color={'#cacaca'} />
              <TextInput
                style={{
                  fontSize: 18,
                  flex: 1,
                }}
                placeholder="Id"
                value={newProductData._id.toString()}
                onChangeText={_id =>
                  setNewProductData({...newProductData, _id: parseInt(_id) })
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
              quantity
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
                <Iconify icon="twemoji:flag-ethiopia" size={30} />
                <Text style={{fontSize: 18, paddingLeft: 9}}>+251</Text>
                <Iconify icon="mdi:menu-down" size={18} />
              </View>

              <TextInput
                style={{fontSize: 18, alignItems: 'center'}}
                //placeholderTextColor="black"
                placeholder="911223344"
                value={newProductData.quantity.toString()}
                onChangeText={quantity =>
                  setNewProductData({...newProductData, quantity})
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
              Category
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
              <Iconify
                icon="mdi:address-marker-outline"
                size={18}
                color={'#cacaca'}
              />
              <TextInput
                style={{
                  fontSize: 18,
                  flex: 1,
                }}
                placeholder="category"
                value={newProductData.category}
                onChangeText={category =>
                  setNewProductData({...newProductData, category})
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
              Price
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
              <Iconify
                icon="pepicons-pencil:bulletin-notice"
                size={18}
                color={'#cacaca'}
              />
              <TextInput
                style={{
                  fontSize: 18,
                  flex: 1,
                }}
                placeholder="Price"
                value={newProductData.price}
                onChangeText={price => setNewProductData({...newProductData, price})}
              />
            </View>
          </View>
          <View style={{backgroundColor: color.primary, paddingVertical: 15, borderRadius: 5, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: '#fff', fontSize: 16}}>Add Image</Text>
          </View>
          <Pressable
            onPress={handleAddProduct}
            style={{
              borderRadius: 10,
              backgroundColor: color.primary,
              paddingVertical: 18,
              alignItems: 'center',
              justifyContent: 'center',
              marginVertical: verticalScale(15),
            }}>
            <Text style={{color: 'white', fontSize: 22, fontWeight: 600}}>
              Add Product
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default AddProduct;
