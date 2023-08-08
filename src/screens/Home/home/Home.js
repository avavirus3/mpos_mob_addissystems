import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import SearchBar from '../../../components/search/SearchBar';
import HomeHeading from './HomeHeading';
import InitialHomeComponent from './InitialHomeComponent';
import MainComponent from './MainComponent';
import Toast from 'react-native-toast-message';
import {useSelector} from 'react-redux';
import ProductItemSkeletonGrid from '../../../components/loading/ProductItemSkeletonGrid';
import {
  getItems,
  addItem,
  updateItem,
  deleteItem,
} from '../../../database/services/itemServices';
import Button from '../../../components/button/Button';

const Home = ({navigation}) => {
  const PRODUCT_DATA = useSelector(state => state.product.items);
  const [realmItemList, setRealmItemList] = useState([]);
  const [search, setSearch] = useState('');
  const [CurrentProduct, setCurrentProduct] = useState('All');
  const [initialZeroQtyItems, setInitialZeroQtyItems] = useState([]);

  useEffect(() => {
    const getDatafromRealm = async () => {
      try {
        const items = await getItems();
        console.log('realm items', items);
        setRealmItemList(items);
        const newZeroItems = items.slice().map(item => ({
          name: item.name,
          _id: item._id,
          price: item.price,
          quantity: 0,
          image: item.image,
          category: item.category, 
        }));
        setInitialZeroQtyItems(newZeroItems);
      } catch (error) {
        console.log('Error Retriving Items:', error);
      }
    };

    getDatafromRealm();
  }, [getItems]);

  const handleAddItem = async () => {
    const itemId = 4; 

    const newItem = {
      name: 'iPhone 14',
      _id: itemId,
      price: 120000,
      quantity: 5,
      image: require('../../../assets/images/phone-3.jpg').toString(),
      category: 'Phone',
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
  };

  const handleUpdateItem = async () => {
    const updatingItemId = 1;
    const updatingData = {
      // name: 'Hp Pavilion',
      // price: 42800,
      quantity: 7,
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
    const itemId = 2;
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
  };

  const handleQtyIncrement = id => {
    const Prev_Item_Qty = realmItemList.filter(
      item => item._id === id && item,
    )[0].quantity;
    const Sale_Item = initialZeroQtyItems.filter(item => item._id == id)[0];

    if (Prev_Item_Qty - (Sale_Item.quantity + 1) >= 0) {
      Sale_Item.quantity += 1;
      setInitialZeroQtyItems([...initialZeroQtyItems]);
    } else if (Prev_Item_Qty - (Sale_Item.quantity + 1) < 0) {
      Toast.show({
        type: 'error',
        text1: 'No Enough Items!',
        text2: `There is Only ${Prev_Item_Qty} Items Left In The Stock`,
      });
    }
  };

  const handleQtyDecrement = id => {
    const updatedProduct = initialZeroQtyItems.filter(
      item => item._id == id,
    )[0];
    updatedProduct.quantity =
      updatedProduct.quantity == 0 ? 0 : updatedProduct.quantity - 1;
    setInitialZeroQtyItems([...initialZeroQtyItems]);
  };

  const handleQuantityInput = (id, num) => {
    const inputNum = parseInt(num);
    const Prev_Item_Qty = realmItemList.filter(
      item => item._id === id && item,
    )[0].quantity;
    const Sale_Item = initialZeroQtyItems.filter(item => item._id == id)[0];

    if (Prev_Item_Qty - (Sale_Item.quantity + inputNum) >= 0) {
      // console.log('Can be Deducted!');
      Sale_Item.quantity = inputNum;
    } else if (inputNum > Prev_Item_Qty) {
      // console.log("Item Can't Set!");
      Toast.show({
        type: 'error',
        text1: 'There Is No This Amount of Items',
        text2: `There is Only ${Prev_Item_Qty} Items Left In The Stock`,
      });
      Sale_Item.quantity = Prev_Item_Qty;
    } else {
      Sale_Item.quantity = '';
    }

    setInitialZeroQtyItems([...initialZeroQtyItems]);
  };

  const handleEventOnBlur = id => {
    const Sale_Item = initialZeroQtyItems.filter(item => item._id == id)[0];
    // console.log('OnBlur Event Fired!');
    if (Sale_Item.quantity === '') {
      Sale_Item.quantity = 0;
      setInitialZeroQtyItems([...initialZeroQtyItems]);
    }
  };

  /* This is to activate the "Make Sale" Button to go to the next step */
  const selectedProducts = initialZeroQtyItems.filter(
    item => item.quantity > 0,
  );

  const handleMakeSale = () => {
    if (selectedProducts.length > 0) {
      const resettedProductQty = initialZeroQtyItems.map(item => ({
        ...item,
        quantity: 0,
      }));

      setInitialZeroQtyItems(resettedProductQty);
      navigation.navigate('Sale', {
        screen: 'create-sale',
        params: {passed_selected_product: selectedProducts},
      });
    }
  };

  /* Main Function Return */
  return (
    <View style={styles.mainContainer}>
      <View style={{flex: 1, borderWidth: 0, borderColor: 'green'}}>
        {/* Search Bar */}
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={{paddingTop: 35, marginHorizontal: 10}}>
            <SearchBar
              placeholder={'Search'}
              search={search}
              setSearch={setSearch}
            />
          </View>
        </TouchableWithoutFeedback>

        {/* Main Body Container */}
        <View style={styles.bodyContainer}>
          {/* Heading Component */}
          <HomeHeading user={'Abebe Kebede'} sale={'50,000'} />

          {false ? (
            <InitialHomeComponent navigation={navigation} />
          ) : CurrentProduct.length > 0 ? (
            <MainComponent
              CurrentProduct={CurrentProduct}
              setCurrentProduct={setCurrentProduct}
              ProductStore={initialZeroQtyItems}
              search={search}
              handleQtyDecrement={handleQtyDecrement}
              handleQtyIncrement={handleQtyIncrement}
              handleQuantityInput={handleQuantityInput}
              handleEventOnBlur={handleEventOnBlur}
              handleMakeSale={handleMakeSale}
              activeMakeSale={selectedProducts.length > 0}
            />
          ) : (
            <ProductItemSkeletonGrid />
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderColor: 'red',
  },

  bodyContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
});

/* Rules */
// Screen names should be CamelCase like ProductStack.js
// Don't use fontWeight in number value like this (fontWeight: 500) rather use in string like (fontWeight: '500') it may throw an error!
// Allways try to wright neat codes with comments as much as possible! someone may be maintain it latter.
// You can Ignore this after you read it. Feel free to modify this file and even create from scratch, this is just template to work with the same flow.

export default Home;
