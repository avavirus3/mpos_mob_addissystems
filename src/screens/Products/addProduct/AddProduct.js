import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
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
import ImageCropPicker from 'react-native-image-crop-picker';
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
  const [showModal, setShowModal] = useState(false);
  const [itemTobeAdded, setItemTobeAdded] = useState({});
  const [succesModal, setSuccessModal] = useState(false);
  const [succesFailModalMessage, setSuccessFailModalMessage] = useState('');
  const [isFailModal, setIsFailModal] = useState(false);
  const [newInputData, setNewInputData] = useState({
    name: '',
    id: '',
    desc: '',
    price: '',
    quantity: 0,
    category: '',
    image: '',
  });

  const isFormFilled = Object.values(newInputData).some(value => value == '');

  const handleAddImage = async () => {

    const resultObject = await ImagePicker.launchImageLibrary({
      mediaType: 'photo',
    });
    const {didCancel} = resultObject;

    // Check if the image path is defined
    if (!didCancel) {
      const {fileName, fileSize, height, width, type, uri} =
        resultObject['assets'][0];
      setNewInputData({...newInputData, image: uri});
    } else {
      // The user canceled the image selection
    }

  };

  const imageUploadDAta = {
    assets: [
      {
        fileName: 'this is file name',
        fileSize: 546546,
        uri: 'file/path/c/',
      },
    ],
  };

  const handleConfirmAddItem = async () => {
    addItem(itemTobeAdded);
    dispatch(setCHANGE('Changed!'));

    setShowModal(false);

    setSuccessFailModalMessage('Product Added Successfully!');
    setIsFailModal(false);
    setSuccessModal(true);
    setTimeout(() => {
      navigation.navigate('all-product');
      setSuccessModal(false);
    }, 1300);
  };

  const handleAddItem = async () => {
    const newItem = {
      name: newInputData.name,
      _id: parseInt(newInputData.id),
      price: parseFloat(newInputData.price),
      quantity: parseInt(newInputData.quantity),
      image: newInputData.image,
      category: newInputData.category,
    };

    const isIDtaken = realmItemData.find(item => item._id === newItem._id);

    if (isIDtaken) {
      setSuccessFailModalMessage('Item ID is Reserved!');
      setIsFailModal(true);
      setSuccessModal(true);
    } else if (!isFormFilled && !isIDtaken) {
      try {
        setItemTobeAdded(newItem);
        setShowModal(true);
      } catch (err) {
        console.log('Unable to add the Item!', err);
      }
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
    dispatch(setCHANGE('Changed!'));
  };

  function handleQuantityIncrement() {
    setNewInputData({...newInputData, quantity: newInputData.quantity + 1});
  }

  function handleQuantityDecrement() {
    setNewInputData({
      ...newInputData,
      quantity:
        parseInt(newInputData.quantity) > 0 && newInputData.quantity - 1,
    });
  }

  function handleQuanitityInput(id, input) {
    setNewInputData({...newInputData, quantity: input});
  }

  function handleQuantitiyInputOnBlur() {
    setNewInputData({
      ...newInputData,
      quantity: newInputData.quantity === '' ? 0 : newInputData.quantity,
    });
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
        fail={isFailModal}
        modalVisibility={succesModal}
        setModalVisibility={setSuccessModal}
        message={succesFailModalMessage}
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
                source={{uri: itemTobeAdded.image}}
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
              <ProductInfo
                property={'Product Name'}
                value={itemTobeAdded.name}
              />
              <ProductInfo property={'Product ID'} value={itemTobeAdded._id} />
              <ProductInfo
                property={'Product Price'}
                value={itemTobeAdded.price}
              />
              <ProductInfo
                property={'Product Quantity'}
                value={itemTobeAdded.quantity}
              />
              <ProductInfo
                property={'Product Category'}
                value={itemTobeAdded.category}
              />
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
            {newInputData.image !== '' ? (
              <View style={{width: '100%', height: 200, paddingHorizontal: 10}}>
                <FastImage
                  style={{height: '100%', width: '100%', resizeMode: 'scale'}}
                  source={{uri: newInputData.image}}
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
              label={'Save'}
              btnBG={!isFormFilled ? color.primary : color.gray}
              onPress={handleAddItem}
            />
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
