import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React, {useEffect, useState, useRef, useContext} from 'react';
import SearchBar from '../../../components/search/SearchBar';
import {AuthContext} from '../../../hooks/useContext/AuthContext';
import HomeHeading from './HomeHeading';
import InitialHomeComponent from './InitialHomeComponent';
import MainComponent from './MainComponent';

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
    setCurrentProduct('All')
  }, [])

  // console.log('Product Store:', ProductStore);
  // console.log('Selected Product:', fetchedProduct);

  const handleQtyIncrement = id => {
    const product_prev_qty = ProductStore.filter(item => item.id === id && item)[0].qty
    const updatedProduct = fetchedProduct.filter(item => item.id == id)[0];
    const updatedQty = updatedProduct.qty

    updatedProduct.qty += 1;
    // console.log('OnPress Output:', product_prev_qty);
    // console.log(updatedProduct.qty)
    // setFetchedProduct([...fetchedProduct]);
  };

  const handleQtyDecrement = id => {
    const updatedProduct = fetchedProduct.filter(item => item.id == id)[0];
    updatedProduct.qty = updatedProduct.qty == 0 ? 0 : updatedProduct.qty - 1;
    // console.log('OnPress Output:', updatedProduct);
    setFetchedProduct([...fetchedProduct]);
  };

  const handleQuantityInput = (id, num) => {
    const updatedProduct = fetchedProduct.filter(item => item.id == id)[0];
    updatedProduct.qty = parseInt(num);
    // console.log('OnPress Output:', updatedProduct);
    setFetchedProduct([...fetchedProduct]);
  };

  const handleMakeSale = () => {
    if(selectedProducts.length > 0) {const resettedProductQty = fetchedProduct.map((item) => ({...item, qty: 0}))
    console.log("Fetched:",fetchedProduct)
    console.log("Resseted:",resettedProductQty)
    setFetchedProduct(resettedProductQty)
    navigation.navigate('Sale', {screen: 'create-sale', params: {"passed_selected_product": selectedProducts}})
  }}

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
