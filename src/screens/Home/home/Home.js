import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useState, useRef, useContext} from 'react';
import SearchBar from '../../../components/search/SearchBar';
import {AuthContext} from '../../../hooks/useContext/AuthContext';
import HomeHeading from './HomeHeading';
import InitialHomeComponent from './InitialHomeComponent';
import MainComponent from './MainComponent';
import Toast from 'react-native-toast-message'

const Home = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [CurrentProduct, setCurrentProduct] = useState('All');
  const {ProductStore, setProductStore} = useContext(AuthContext);
  const [fetchedProduct, setFetchedProduct] = useState([]);

  const selectedProducts = fetchedProduct.filter(product => product.qty > 0);
  // console.log("fetchedProduct", fetchedProduct)

  useEffect(() => {
    try {
      const productWithZeroQty = ProductStore.map(item => ({...item, qty: 0}));
      setFetchedProduct(productWithZeroQty);
    } catch (error) {
      console.log('There is an Error @ fething the data, Error msg:', error);
    }
  }, [ProductStore]);

  useEffect(() => {
    setCurrentProduct('All');
  }, []);

  // console.log('Product Store:', ProductStore);
  // console.log('Selected Product:', fetchedProduct);

  const handleQtyIncrement = id => {
    const Prev_Item_Qty = ProductStore.filter(item => item.id === id && item)[0]
      .qty;
    const Sale_Item = fetchedProduct.filter(item => item.id == id)[0];

    if (Prev_Item_Qty - (Sale_Item.qty + 1) >= 0) {
      Sale_Item.qty += 1;
      setFetchedProduct([...fetchedProduct]);
    } else if (Prev_Item_Qty - (Sale_Item.qty + 1) < 0) {
      Toast.show({
        type: 'error',
        text1: 'No Enough Items!',
        text2: `There is Only ${Prev_Item_Qty} Items Left In The Stock`,
          // backgroundColor: 'red', // Customize the toast background color
          // leftIconColor: 'white', // Customize the left side color
      });
    }

    
  };

  const handleQtyDecrement = id => {
    const updatedProduct = fetchedProduct.filter(item => item.id == id)[0];
    updatedProduct.qty = updatedProduct.qty == 0 ? 0 : updatedProduct.qty - 1;
    // console.log('OnPress Output:', updatedProduct);
    setFetchedProduct([...fetchedProduct]);
  };

  const handleQuantityInput = (id, num) => {
    const inputNum = parseInt(num);
    const Prev_Item_Qty = ProductStore.filter(item => item.id === id && item)[0]
      .qty;
    const Sale_Item = fetchedProduct.filter(item => item.id == id)[0];

    if (Prev_Item_Qty - (Sale_Item.qty + inputNum) >= 0) {
      // console.log('Can be Deducted!');
      Sale_Item.qty = inputNum;
    } else if (inputNum > Prev_Item_Qty) {
      // console.log("Item Can't Set!");
      Toast.show({
        type: 'error',
        text1: 'There Is No This Amount of Items',
        text2: `There is Only ${Prev_Item_Qty} Items Left In The Stock`,
          // backgroundColor: 'red', // Customize the toast background color
          // leftIconColor: 'white', // Customize the left side color
      });
      Sale_Item.qty = Prev_Item_Qty;
    } else {
      Sale_Item.qty = '';
    }

    setFetchedProduct([...fetchedProduct]);

    console.log(Sale_Item.qty);
  };

  const handleEventOnBlur = id => {
    const Sale_Item = fetchedProduct.filter(item => item.id == id)[0];
    console.log('OnBlur Event Fired!');

    if (Sale_Item.qty === '') {
      Sale_Item.qty = 0;
      setFetchedProduct([...fetchedProduct]);
    }
  };

  const handleMakeSale = () => {
    if (selectedProducts.length > 0) {
      const resettedProductQty = fetchedProduct.map(item => ({
        ...item,
        qty: 0,
      }));
      console.log('Fetched:', fetchedProduct);
      console.log('Resseted:', resettedProductQty);
      setFetchedProduct(resettedProductQty);
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
          ) : (
            <MainComponent
              CurrentProduct={CurrentProduct}
              setCurrentProduct={setCurrentProduct}
              ProductStore={fetchedProduct}
              search={search}
              handleQtyDecrement={handleQtyDecrement}
              handleQtyIncrement={handleQtyIncrement}
              handleQuantityInput={handleQuantityInput}
              handleEventOnBlur={handleEventOnBlur}
              handleMakeSale={handleMakeSale}
              activeMakeSale={selectedProducts.length > 0}
            />
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
