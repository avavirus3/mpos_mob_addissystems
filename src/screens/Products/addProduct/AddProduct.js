import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Touchable,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import {color, containerStyles} from '../../../styles/Styles';
import TopNavigationBar from '../../../components/top_navigation/TopNavigationBar';
import CustomTextInput from '../../../components/input/CustomTextInput';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FastImage from 'react-native-fast-image';
import * as ImagePicker from 'react-native-image-picker';
import Button from '../../../components/button/Button';
import useGetItems from '../../../hooks/customHooks/useGetItems';
import {addItem, updateItem} from '../../../database/services/itemServices';
import {useSelector, useDispatch} from 'react-redux';
import {setCHANGE} from '../../../reduxToolkit/features/change/trackChangeSlice';
import CustomModal from '../../../components/modal/CustomModal';
import SuccessFailModal from '../../../components/modal/SuccessFailModal';
import {resetTotalSale} from '../../../database/services/totalSaleService';
import IncrementDecrement from '../../../components/button/IncrementDecrement';
import CustomDropDown from '../../../components/input/CustomDropDown';
import useGetRealmData from '../../../hooks/customHooks/useGetRealmData';

const AddProduct = ({navigation}) => {
  const dispatch = useDispatch();
  const realmItemData = useGetItems();
  const realmCategoryList = useGetRealmData('Category');
  const [newInputData, setNewInputData] = useState({
    name: null,
    id: null,
    desc: null,
    price: null,
    quantity: 0,
    category: null,
  });
  const [productName, setProductName] = useState('');
  const [productDesc, setProductDesc] = useState('');
  const [id, setId] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [category, setCategory] = useState('');
  const [imagePath, setImagePath] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [itemTobeAdded, setItemTobeAdded] = useState({});
  const [succesModal, setSuccessModal] = useState(false);

  // console.log('CategoryItemList:', realmCategoryList);
  console.log('newInputData:', newInputData);

  const handleAddImage = async () => {
    const result = await ImagePicker.launchImageLibrary();
    if (result.canceled) {
      return;
    }
    if (!result.canceled) {
      setImagePath(result.assets[0].uri);
    }
  };

  const handleConfirmAddItem = async () => {
    addItem(itemTobeAdded);
    dispatch(setCHANGE('Changed!'));

    setShowModal(false);
    setSuccessModal(true);
    console.log('Item Successfully Added!');

    setTimeout(() => {
      navigation.navigate('all-product');
      setSuccessModal(false);
      setProductName(''),
        setId(''),
        setPrice(''),
        setQuantity(''),
        setCategory(''),
        setImagePath('');
    }, 1300);
  };

  const handleAddItem = async () => {
    const newItem = {
      name: productName,
      _id: parseInt(id),
      price: parseFloat(price),
      quantity: parseInt(quantity),
      image: imagePath,
      category: category,
    };

    const hasEmptyValue = Object.values(newItem).some(value => value === '');

    try {
      const isItemAdded = realmItemData.find(item => item._id == newItem._id);
      if (!isItemAdded && !hasEmptyValue) {
        setItemTobeAdded(newItem);
        setShowModal(true);
      } else {
        console.log('The Item ID is Already Added!');
      }
    } catch (err) {
      console.log('Unable to add the Item!', err);
    }
  };

  const handleUpdateItem = async () => {
    const tobeUpdatedId = 1;
    const updatedData = {
      _id: tobeUpdatedId,
      quantity: 4,
    };

    try {
      const itemsToUpdate = realmItemData.find(
        item => item._id == tobeUpdatedId,
      );
      if (itemsToUpdate) {
        updateItem(tobeUpdatedId, updatedData);
        console.log('Item Updated!');
        console.log('Items in Db:', realmItemData);
        dispatch(setCHANGE('Changed!'));
      } else {
        console.log('Unable to get the Item! check The item in the Database!');
      }
    } catch (err) {
      console.log('Error while updating Item:', err);
    }
  };

  const handleResetTotalSale = async () => {
    await resetTotalSale();
    console.log('Total Sale Reseted!');
    dispatch(setCHANGE('Changed!'));
  };

  function handleQuantityIncrement() {
    setNewInputData({...newInputData, quantity: newInputData.quantity + 1});
    console.log('handle Increment Pressed!');
  }

  function handleQuantityDecrement() {
    setNewInputData({
      ...newInputData,
      quantity:
        parseInt(newInputData.quantity) > 0 && newInputData.quantity - 1,
    });
    console.log('handle Decrement Pressed!');
  }

  function handleQuanitityInput(id, input) {
    console.log('passed INput', input);
    setNewInputData({...newInputData, quantity: input});
    console.log('handleQuantityInput');
  }

  function handleQuantitiyInputOnBlur() {
    setNewInputData({...newInputData, quantity: 0})
    console.log('Input Blurred!');
  }

  const ProductInfo = ({property, value}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: color.lightPrimary,
          padding: 5,
        }}>
        <Text style={{fontSize: 16, fontWeight: '500'}}>{property}:</Text>
        <Text
          style={{
            fontSize: 16,
            fontWeight: '600',
            color: color.green,
          }}>
          {value}
        </Text>
      </View>
    );
  };

  return (
    <View style={containerStyles.mainContainer}>
      <TopNavigationBar
        backIcon
        middleLabel={'Add Product'}
        onPressBack={() => navigation.goBack()}
      />
      <SuccessFailModal
        modalVisibility={succesModal}
        setModalVisibility={setSuccessModal}
        message={'Product Added Successfully!'}
      />
      <CustomModal
        modalVisibility={showModal}
        setModalVisibility={setShowModal}
        innerModal={
          <View
            style={{
              width: '100%',
              maxWidth: 350,
              backgroundColor: 'white',
              paddingHorizontal: 25,
              paddingTop: 15,
              paddingBottom: 25,
              borderRadius: 10,
            }}>
            <View
              style={{
                width: '100%',
                height: 200,
                // paddingHorizontal: 10,
                borderWidth: 2,
                borderColor: color.green,
                alignSelf: 'center',
              }}>
              <FastImage
                style={{height: '100%', width: '100%', resizeMode: 'resize'}}
                source={{uri: imagePath}}
              />
            </View>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 18,
                marginTop: 15,
                fontWeight: '600',
              }}>
              Product Info
            </Text>
            <View style={{gap: 10, marginTop: 10, marginBottom: 20}}>
              <ProductInfo property={'Product Name'} value={productName} />
              <ProductInfo property={'Product ID'} value={id} />
              <ProductInfo property={'Product Price'} value={price} />
              <ProductInfo property={'Product Quantity'} value={quantity} />
              <ProductInfo property={'Product Category'} value={category} />
            </View>
            <View style={{flexDirection: 'row', gap: 15}}>
              <View style={{flex: 1}}>
                <Button
                  theme={'primary'}
                  label={'Confirm'}
                  onPress={handleConfirmAddItem}
                />
              </View>
              <View style={{flex: 1}}>
                <Button
                  theme={'secondary'}
                  label={'Cancel'}
                  onPress={() => setShowModal(false)}
                />
              </View>
            </View>
          </View>
        }
      />
      <ScrollView style={{flex: 1}} nestedScrollEnabled={true}>
        <View style={{paddingHorizontal: 8, gap: 10}}>
          {/* Custome Inputs */}
          <CustomTextInput
            label={'Product Name'}
            placeholder={'Product Name'}
            input={newInputData.name}
            setInput={input => {
              setNewInputData({...newInputData, name: input});
            }}
            icon={<AntDesign name={'tagso'} size={24} color={color.gray} />}
            autoCapitalize={'words'}
          />
          <CustomTextInput
            label={'Product Description'}
            placeholder={'Product Description'}
            input={newInputData.desc}
            setInput={input => {
              setNewInputData({...newInputData, desc: input});
            }}
            icon={
              <Ionicons
                name="document-text-outline"
                size={24}
                color={color.gray}
              />
            }
          />
          <CustomTextInput
            label={'Product ID'}
            placeholder={'ID'}
            input={newInputData.id}
            setInput={input => {
              setNewInputData({...newInputData, id: input});
            }}
            icon={<AntDesign name="idcard" size={24} color={color.gray} />}
            keyboardType={'number-pad'}
          />
          <CustomTextInput
            label={'Price'}
            placeholder={'0.00'}
            lastPlaceholder={'ETB'}
            input={newInputData.price}
            setInput={input => {
              setNewInputData({...newInputData, price: input});
            }}
            keyboardType={'number-pad'}
          />

          <CustomDropDown
            label={'Select Category'}
            data={
              realmCategoryList.length > 0 &&
              realmCategoryList?.map(item => item.name)
            }
            setSelected={input =>
              setNewInputData({...newInputData, category: input})
            }
          />

          {/* Quantity handle Component */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 10,
            }}>
            <Text style={{fontSize: 20, fontWeight: '500'}}>Available</Text>
            <View>
              <IncrementDecrement
                qty={newInputData.quantity}
                handleQtyIncrement={handleQuantityIncrement}
                handleQtyDecrement={handleQuantityDecrement}
                handleQuantityInput={handleQuanitityInput}
                handleEventOnBlur={handleQuantitiyInputOnBlur}
              />
            </View>
          </View>
          <TouchableOpacity
            style={{marginVertical: 10}}
            onPress={handleAddImage}>
            {imagePath ? (
              <View style={{width: '100%', height: 200, paddingHorizontal: 10}}>
                <FastImage
                  style={{height: '100%', width: '100%', resizeMode: 'scale'}}
                  source={{uri: imagePath}}
                />
              </View>
            ) : (
              <View style={styles.uploadImageContianer}>
                <Entypo name="images" size={35} color="black" />
                <Text style={{marginTop: 5, fontSize: 16}}>Upload Image</Text>
              </View>
            )}
          </TouchableOpacity>
          <View style={{marginBottom: 15}}>
            <Button
              theme={'primary'}
              label={'Add Product'}
              onPress={handleAddItem}
            />
            {/* <View style={{}}>
              <Button
                theme={'secondary'}
                label={'Update Existing'}
                onPress={handleUpdateItem}
              />
              <Button
                theme={'secondary'}
                label={'Reset Total Sale'}
                onPress={handleResetTotalSale}
              />
            </View> */}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  uploadImageContianer: {
    width: 230,
    minHeight: 150,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.lightGray,
    paddingVertical: 25,
    borderRadius: 10,
  },
});
export default AddProduct;
