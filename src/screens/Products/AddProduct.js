import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import {color, containerStyles} from '../../styles/Styles';
import TopNavigationBar from '../../components/top_navigation/TopNavigationBar';
import CustomTextInput from '../../components/input/CustomTextInput';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Octicons from 'react-native-vector-icons/Octicons';
import FastImage from 'react-native-fast-image';
import * as ImagePicker from 'react-native-image-picker';
import Button from '../../components/button/Button';
import useGetItems from '../../hooks/customHooks/useGetItems';
import {addItem, updateItem} from '../../database/services/itemServices';
import {useSelector, useDispatch} from 'react-redux';
import {setCHANGE} from '../../reduxToolkit/features/change/trackChangeSlice';
import CustomModal from '../../components/modal/CustomModal';
import SuccessFailModal from '../../components/modal/SuccessFailModal';
import { resetTotalSale } from '../../database/services/totalSaleService';

const AddProduct = () => {
  const dispatch = useDispatch();
  const realmItemData = useGetItems();
  const [productName, setProductName] = useState('');
  const [id, setId] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [category, setCategory] = useState('');
  const [imagePath, setImagePath] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [itemTobeAdded, setItemTobeAdded] = useState({});
  const [succesModal, setSuccessModal] = useState(false);

  const handleAddImage = async () => {
    const result = await ImagePicker.launchImageLibrary();
    if (result.canceled) {
      return;
    }
    if (!result.canceled) {
      // setImage(result.assets[0].uri);
      const imageUri = result.assets[0].uri;
      console.log('Uploaded', imageUri);
      setImagePath(result.assets[0].uri);
    }
  };

  const handleConfirmAddItem = async () => {
    await addItem(itemTobeAdded);
    // dispatch(setCHANGE('Changed!'));

    setShowModal(false)
    setSuccessModal(true);

    setTimeout(() => {
      setSuccessModal(false);
      setProductName(''),
        setId(''),
        setPrice(''),
        setQuantity(''),
        setCategory(''),
        setImagePath('');
    }, 1300);
  };

  console.log('Item Tobe Added:', itemTobeAdded);

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
    console.log('Has Empty Value:', hasEmptyValue);

    console.log('NewItem:', newItem);

    try {
      const isItemAdded = realmItemData.find(
        item => item._id == itemTobeAdded._id,
      );
      if (!isItemAdded && !hasEmptyValue) {
        setItemTobeAdded(newItem);
        setShowModal(true);
        console.log(`Item of ${itemTobeAdded.name} added Successfully!`);
        // console.log('Items in Db:', realmItemData);
      } else {
        console.log('The Item is Already Added!');
      }
    } catch (err) {
      console.log('Unable to add the Item!', err);
    }
    //
    // if (!hasEmptyValue) {
    //   setItemTobeAdded(newItem);
    //   setShowModal(true);
  };


  const handleUpdateItem = async () => {
    const tobeUpdatedId = 1
    const updatedData = {
      _id: tobeUpdatedId,
      quantity: 4
    }

    try {;
      const itemsToUpdate = realmItemData.find(item => item._id == tobeUpdatedId);
      if (itemsToUpdate) {
        await updateItem(tobeUpdatedId, updatedData);
        console.log('Item Updated!');
        console.log('Items in Db:', realmItemData);
        dispatch(setCHANGE("Changed!"))
      } else {
        console.log('Unable to get the Item! check The item in the Database!');
      }
    } catch(err) {
      console.log("Error while updating Item:", err)
    }
  }

  const handleResetTotalSale = async () => {
    await resetTotalSale()
    console.log("Total Sale Reseted!")
    dispatch(setCHANGE("Changed!"))
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
      <TopNavigationBar backIcon middleLabel={'Add Product'} />
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
      <ScrollView style={{flex: 1}}>
        <View style={{marginTop: 15, paddingHorizontal: 8, gap: 25}}>
          <CustomTextInput
            placeholder={'Product Name'}
            input={productName}
            setInput={setProductName}
            icon={<AntDesign name={'tagso'} size={24} />}
            autoCapitalize={'words'}
          />
          <CustomTextInput
            placeholder={'ID'}
            input={id}
            setInput={setId}
            icon={<Entypo name="text-document" size={24} color="black" />}
            keyboardType={'number-pad'}
          />
          <CustomTextInput
            placeholder={'Price'}
            input={price}
            setInput={setPrice}
            icon={<FontAwesome name="money" size={24} color="black" />}
            keyboardType={'number-pad'}
          />
          <CustomTextInput
            placeholder={'Quantity'}
            input={quantity}
            setInput={setQuantity}
            icon={<Octicons name="number" size={24} color="black" />}
            keyboardType={'number-pad'}
          />
          <CustomTextInput
            placeholder={'Category'}
            input={category}
            setInput={setCategory}
            icon={<AntDesign name="menu-unfold" size={24} color="black" />}
            autoCapitalize={'words'}
          />
          <TouchableOpacity style={{}} onPress={handleAddImage}>
            {imagePath ? (
              <View style={{width: '100%', height: 200, paddingHorizontal: 10}}>
                <FastImage
                  style={{height: '100%', width: '100%', resizeMode: 'scale'}}
                  source={{uri: imagePath}}
                />
              </View>
            ) : (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: color.gray,
                  paddingVertical: 25,
                  borderRadius: 10,
                }}>
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
            <View style={{}}>
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
          </View>
          </View>
          
        </View>
      </ScrollView>
    </View>
  );
};

export default AddProduct;
