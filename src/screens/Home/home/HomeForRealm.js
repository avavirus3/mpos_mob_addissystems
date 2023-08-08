import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import SearchBar from '../../../components/search/SearchBar';
import MainComponent from './MainComponent';
import Toast from 'react-native-toast-message';
import {useSelector} from 'react-redux';
import {
  getItems,
  addItem,
  updateItem,
  deleteItem,
} from '../../../database/services/itemServices';
import Button from '../../../components/button/Button';

const HomeforRealm = ({navigation}) => {
  const PRODUCT_DATA = useSelector(state => state.product.items);
  const [search, setSearch] = useState('');
  const [CurrentProduct, setCurrentProduct] = useState('All');
  const [initialZeroQtyItems, setInitialZeroQtyItems] = useState([]);

  useEffect(() => {
    getItems()
      .then(items => {
        setInitialZeroQtyItems(items);
        console.log('Loaded Items:', items);
      })
      .catch(error => {
        console.log('Error retriving items:', error);
      });
  }, []);

  // console.log('PRODUCT DATA:', PRODUCT_DATA);
  console.log('Local Item Database:', initialZeroQtyItems);

  /* This is to activate the "Make Sale" Button to go to the next step */
  const selectedProducts = initialZeroQtyItems.filter(
    product => product.qty > 0,
  );

  const handleAddItem = async () => {
    const itemId = 4;

    const newItem = {
      name: 'HP Pavilion dkx001',
      _id: itemId,
      price: 47500,
      quantity: 3,
      image: require('../../../assets/images/laptop-3.jpg').toString(),
      category: 'laptop'
    };

    try {
      const itemsDb = await getItems();
      const isItemAdded = itemsDb.find(item => item._id == itemId);
      if (!isItemAdded) {
        await addItem(newItem);
        setInitialZeroQtyItems(itemsDb)
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
      name: 'Samsung S9+',
      price: 42800,
      quantity: 1,
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
    const itemId = 1;
    try {
      const items = await getItems();
      const itemToDelete = items.find(item => item._id === itemId);

      if (itemToDelete) {
        await deleteItem(itemId);
        setInitialZeroQtyItems(items)
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
    const Prev_Item_Qty = PRODUCT_DATA.filter(item => item.id === id && item)[0]
      .qty;
    const Sale_Item = initialZeroQtyItems.filter(item => item.id == id)[0];

    if (Prev_Item_Qty - (Sale_Item.qty + 1) >= 0) {
      Sale_Item.qty += 1;
      setInitialZeroQtyItems([...initialZeroQtyItems]);
    } else if (Prev_Item_Qty - (Sale_Item.qty + 1) < 0) {
      Toast.show({
        type: 'error',
        text1: 'No Enough Items!',
        text2: `There is Only ${Prev_Item_Qty} Items Left In The Stock`,
      });
    }
  };

  const handleQtyDecrement = id => {
    const updatedProduct = initialZeroQtyItems.filter(item => item.id == id)[0];
    updatedProduct.qty = updatedProduct.qty == 0 ? 0 : updatedProduct.qty - 1;
    setInitialZeroQtyItems([...initialZeroQtyItems]);
  };

  const handleQuantityInput = (id, num) => {
    const inputNum = parseInt(num);
    const Prev_Item_Qty = PRODUCT_DATA.filter(item => item.id === id && item)[0]
      .qty;
    const Sale_Item = initialZeroQtyItems.filter(item => item.id == id)[0];

    if (Prev_Item_Qty - (Sale_Item.qty + inputNum) >= 0) {
      // console.log('Can be Deducted!');
      Sale_Item.qty = inputNum;
    } else if (inputNum > Prev_Item_Qty) {
      // console.log("Item Can't Set!");
      Toast.show({
        type: 'error',
        text1: 'There Is No This Amount of Items',
        text2: `There is Only ${Prev_Item_Qty} Items Left In The Stock`,
      });
      Sale_Item.qty = Prev_Item_Qty;
    } else {
      Sale_Item.qty = '';
    }

    setInitialZeroQtyItems([...initialZeroQtyItems]);
  };

  const handleEventOnBlur = id => {
    const Sale_Item = initialZeroQtyItems.filter(item => item.id == id)[0];
    // console.log('OnBlur Event Fired!');
    if (Sale_Item.qty === '') {
      Sale_Item.qty = 0;
      setInitialZeroQtyItems([...initialZeroQtyItems]);
    }
  };

  const handleMakeSale = () => {
    if (selectedProducts.length > 0) {
      const resettedProductQty = initialZeroQtyItems.map(item => ({
        ...item,
        qty: 0,
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

        <View
          style={{
            paddingHorizontal: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              gap: 15,
            }}>
            <View style={{flex: 1}}>
              <Button
                label={'Add Items'}
                theme="secondary"
                onPress={handleAddItem}
              />
            </View>
            <View style={{flex: 1}}>
              <Button
                label={'Update Item'}
                theme="secondary"
                onPress={handleUpdateItem}
              />
            </View>
          </View>
          <Button
            label={'Delete Item'}
            theme={'primary'}
            onPress={handleDeleteItem}
          />
        </View>

        {/* Main Body Container */}
        <View style={styles.bodyContainer}>
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

export default HomeforRealm;
