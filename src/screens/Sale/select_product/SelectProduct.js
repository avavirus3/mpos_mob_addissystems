import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  FlatList,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import SellProductTopBar from '../../../components/top_navigation/SellProductTopBar';
import SearchBar from '../../../components/search/SearchBar';
import ProductCard from '../../../components/card/ProductCard';
import CategoryHead from './CategoryHead';
import Toast from 'react-native-toast-message';
import {useSelector, useDispatch} from 'react-redux';
import ProductItemSkeletonGrid from '../../../components/loading/ProductItemSkeletonGrid';

const SelectProduct = ({navigation}) => {
  const PRODUCT_DATA = useSelector(state => state.product.items);
  const [CurrentProduct, setCurrentProduct] = useState('All');
  const [initialZeroQtyItems, setInitialZeroQtyItems] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    try {
      const productWithZeroQty = PRODUCT_DATA.map(item => ({...item, qty: 0}));
      setInitialZeroQtyItems(productWithZeroQty);
    } catch (error) {
      console.log(
        'There is an Error storing the data from Redux Store:',
        error,
      );
    }
  }, []);

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
        backgroundColor: 'red', // Customize the toast background color
        leftIconColor: 'white', // Customize the left side color
      });
    }
  };

  const handleQtyDecrement = id => {
    const updatedProduct = initialZeroQtyItems.filter(item => item.id == id)[0];
    updatedProduct.qty = updatedProduct.qty == 0 ? 0 : updatedProduct.qty - 1;
    // console.log("OnPress Output:", updatedProduct);
    setInitialZeroQtyItems([...initialZeroQtyItems]);
  };

  const handleQuantityInput = (id, num) => {
    const inputNum = parseInt(num);
    const Prev_Item_Qty = PRODUCT_DATA.filter(item => item.id === id && item)[0]
      .qty;
    const Sale_Item = initialZeroQtyItems.filter(item => item.id == id)[0];

    console.log('InputNum:', inputNum);
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

    setInitialZeroQtyItems([...initialZeroQtyItems]);
  };

  const handleEventOnBlur = id => {
    const Sale_Item = initialZeroQtyItems.filter(item => item.id == id)[0];
    console.log('OnBlur Event Fired!');

    if (Sale_Item.qty === '') {
      Sale_Item.qty = 0;
      setInitialZeroQtyItems([...initialZeroQtyItems]);
    }
  };

  const selectedProducts = initialZeroQtyItems.filter(
    product => product.qty > 0,
  );
  // console.log("Selected Products:", selectedProducts);

  const selectedItemNumber = selectedProducts
    .map(item => item.qty)
    .reduce((acc, cur) => acc + cur, 0);

  // console.log(selectedItemNumber);

  const handleOnDone = () => {
    if (selectedProducts.length > 0) {
      const updatedProduct = PRODUCT_DATA.filter(item => item.qty > 0);
      navigation.navigate('create-sale', {
        passed_selected_product: selectedProducts,
      });
    }
  };

  /* Main Return */
  return (
    <View style={styles.mainContainer}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <>
          {/* Top Heading Component  */}
          <SellProductTopBar
            label1={'Select Products'}
            cartNumber={selectedItemNumber}
            onDone={handleOnDone}
            onCancel={() => navigation.goBack()}
          />

          {/* Category Selector  */}
          <CategoryHead
            CurrentProduct={CurrentProduct}
            setCurrentProduct={setCurrentProduct}
          />
        </>
      </TouchableWithoutFeedback>

      {/* Search Bar  */}
      <View style={{marginVertical: 10}}>
        <SearchBar search={search} setSearch={setSearch} />
      </View>

      {/*  Product List (using FlatList)  */}
      <View style={{flex: 1, borderWidth: 0, width: '100%'}}>
        {initialZeroQtyItems.length > 0 ? (
          <FlatList
            columnWrapperStyle={{
              justifyContent: 'space-between',
              marginHorizontal: 5,
              gap: 15,
            }}
            contentContainerStyle={{gap: 15, marginTop: 5, paddingBottom: 20}}
            data={
              CurrentProduct === 'All'
                ? initialZeroQtyItems.filter(product =>
                    new RegExp(search, 'gi').test(product.name),
                  )
                : initialZeroQtyItems.filter(
                    item =>
                      item.category === CurrentProduct.toLowerCase() &&
                      new RegExp(search, 'gi').test(item.name),
                  )
            }
            numColumns={2}
            renderItem={({item}) => (
              <ProductCard
                item={item}
                handleQtyDecrement={handleQtyDecrement}
                handleQtyIncrement={handleQtyIncrement}
                handleQuantityInput={handleQuantityInput}
                handleEventOnBlur={handleEventOnBlur}
              />
            )}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <ProductItemSkeletonGrid />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 12,
    backgroundColor: 'white',
    borderColor: 'red',
  },
});

export default SelectProduct;
