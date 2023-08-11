import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Button from '../../components/button/Button';
import {
  getItems,
  addItem,
  updateItem,
  deleteItem,
} from '../../database/services/itemServices';
import * as ImagePicker from 'react-native-image-picker';
import FastImage from 'react-native-fast-image';
import {color} from '../../styles/Styles';
import {setPRODUCT} from '../../reduxToolkit/features/product/productListSlice';
import {useDispatch} from 'react-redux';

const Product = () => {
  const [incomingImageData, setIncomingImageData] = useState('');
  const [imagePath, setImagePath] = useState(
    'file:///data/user/0/com.mpos/cache/rn_image_picker_lib_temp_e9bdaa79-8a9f-4903-b508-759f8b2a9aa1.jpg',
  );
  const [id, setId] = useState(0);
  const [name, setName] = useState('');
  const [isItemAdded, setIsItemAdded] = useState('')
  const dispatch = useDispatch();

  useEffect(() => {
    const getDatafromRealm = async () => {
      try {
        const items = await getItems();
        const newZeroItems = items
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
        dispatch(setPRODUCT(newZeroItems));
      } catch (error) {
        console.log('Error Retriving Items:', error);
      }
    };

    getDatafromRealm();
    console.log("useEffect Rendered & Item Added has Change!")
    setIsItemAdded('Not Added')
  }, [isItemAdded]);

  const handleAddItem = async () => {
    const itemId = parseInt(id);

    const newItem = {
      name: name,
      _id: itemId,
      price: 35000,
      quantity: 4,
      image: imagePath,
      category: 'Furniture',
    };

    try {
      const itemsDb = await getItems();
      const isItemAdded = itemsDb.find(item => item._id == itemId);
      if (!isItemAdded) {
        await addItem(newItem);
        console.log(`Item of ID: ${itemId} added Successfully!`);
        console.log('Items in Db:', itemsDb);
      } else {
        console.log('The Item is Already Added!');
      }
    } catch (err) {
      console.log('Unable to add the Item!', err);
    }
    
    setIsItemAdded('Added')
  };

  const handleUpdateItem = async () => {
    const updatingItemId = 2;
    const updatingData = {
      // name: 'Hp Pavilion',
      // price: 42800,
      quantity: 5,
    };
    try {
      const items = await getItems();
      const itemsToUpdate = items.find(item => item._id == updatingItemId);
      if (itemsToUpdate) {
        await updateItem(updatingItemId, updatingData);
        console.log('Item Updated!');
        console.log('Items in Db:', items);
      } else {
        console.log('Unable to get the Item! check The item in the Database!');
      }
    } catch (error) {
      console.log('Error retrieving and Updating the item:', error);
    }
    // console.log('Item Updated!');
  };

  const handleDeleteItem = async () => {
    const itemId = parseInt(id);
    try {
      const items = await getItems();
      const itemToDelete = items.find(item => item._id === itemId);
      if (itemToDelete) {
        await deleteItem(itemId);
        console.log('Item Deleted!');
        console.log('Items Left in Db:', items);
      } else {
        console.log('The item is Already Deleted!');
      }
    } catch (error) {
      console.log('Error retrieving items:', error);
    }

    setId('')
  };

  const handleAddImage = async () => {
    const result = await ImagePicker.launchImageLibrary();
    if (!result.canceled) {
      // setImage(result.assets[0].uri);
      const imageUri = result.assets[0].uri;
      console.log('Uploaded', imageUri);
      setImagePath(result.assets[0].uri);
    }
  };

  console.log('Image Data:', imagePath);

  return (
    <View style={{flex: 1}}>
      <TouchableOpacity
        style={{
          height: 200,
          width: '100%',
          backgroundColor: color.gray,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          borderWidth: 0,
          overflow: 'hidden',
        }}
        onPress={handleAddImage}>
        <Image
          style={{height: '100%', width: '100%', resizeMode: 'contain'}}
          source={{uri: imagePath}}
        />
      </TouchableOpacity>
      <View style={{gap: 15}}>
        <View style={{borderWidth: 1, padding: 15}}>
          <TextInput
            style={{}}
            placeholder="Item Id"
            value={id.toString()}
            onChangeText={setId}
            keyboardType="number-pad"
          />
        </View>
        <View style={{borderWidth: 1, padding: 15}}>
          <TextInput
            style={{}}
            placeholder="Item Name"
            onChangeText={setName}
          />
        </View>
      </View>
      <View style={styles.mainContainer}>
        <Text
          style={{
            fontSize: 20,
            textAlign: 'center',
            marginTop: 15,
            marginBottom: 35,
          }}>
          Add Product Item
        </Text>

        {/* CRUD components */}
        <View style={{paddingHorizontal: 10}}>
          <View style={{flexDirection: 'row', gap: 10}}>
            <View style={{flex: 1}}>
              <Button
                theme={'secondary'}
                label={'Add Item'}
                onPress={handleAddItem}
              />
            </View>
            <View style={{flex: 1}}>
              <Button
                theme={'secondary'}
                label={'Update Item'}
                onPress={handleUpdateItem}
              />
            </View>
          </View>
          <Button
            theme={'primary'}
            label={'Delete Item'}
            onPress={handleDeleteItem}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  imageContainer: {
    height: 100,
    width: '100%',
    backgroundColor: color.gray,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderWidth: 0,
    overflow: 'hidden',
  },
});

/* Rules */
// Screen names should be CamelCase like ProductStack.js
// Don't use fontWeight in number value like this (fontWeight: 500) rather use in string like (fontWeight: '500') it may throw an error!
// Allways try to wright neat codes with comments as much as possible! someone may be maintain it latter.
// You can Ignore this after you read it. Feel free to modify this file and even create from scratch, this is just template to work with the same flow.

export default Product;
