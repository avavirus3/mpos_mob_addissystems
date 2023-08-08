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
import { getItems } from '../../../database/services/itemServices';

const SelectProduct = ({navigation}) => {
  const PRODUCT_DATA = useSelector(state => state.product.items);
  const [CurrentProduct, setCurrentProduct] = useState('All');
  const [realmItemList, setRealmItemList] = useState([]);
  const [initialZeroQtyItems, setInitialZeroQtyItems] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const getRealmDbItems = async () => {
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
    }
    getRealmDbItems() 
  }, []);

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

  const selectedProducts = initialZeroQtyItems.filter(
    product => product.quantity > 0,
  );
  // console.log("Selected Products:", selectedProducts);

  const selectedItemNumber = selectedProducts
    .map(item => item.quantity)
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
            cartNumber={selectedProducts.length} 
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
            keyExtractor={item => item._id}
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
