import {View, StyleSheet, FlatList} from 'react-native';
import React, {useState, useRef, useContext} from 'react';
import SearchBar from '../../../components/SearchBar';
import {AuthContext} from '../../../hooks/useContext/AuthContext';
import ProductCard from '../../../components/card/ProductCard';
import HomeHeading from './HomeHeading';
import ProductHead from './ProductHead';
import InitialHomeComponent from './InitialHomeComponent';

const Home = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [CurrentProduct, setCurrentProduct] = useState('All');
  const {user, data, setUser, ProductStore, setProductStore} =
    useContext(AuthContext);

  const handleQuantityInput = (id, num) => {
    const updatedProduct = ProductStore.filter(item => item.id == id)[0];
    updatedProduct.qty = parseInt(num);
    // console.log('OnPress Output:', updatedProduct);
    setProductStore([...ProductStore]);
  };

  const handleQtyIncrement = id => {
    const updatedProduct = ProductStore.filter(item => item.id == id)[0];
    updatedProduct.qty += 1;
    // console.log('OnPress Output:', updatedProduct);
    setProductStore([...ProductStore]);
  };

  const handleQtyDecrement = id => {
    const updatedProduct = ProductStore.filter(item => item.id == id)[0];
    updatedProduct.qty = updatedProduct.qty == 0 ? 0 : updatedProduct.qty - 1;
    // console.log('OnPress Output:', updatedProduct);
    setProductStore([...ProductStore]);
  };

  /* Main Function Return */
  return (
    <View style={styles.mainContainer}>
      <View style={{flex: 1, borderWidth: 0, borderColor: 'green'}}>
        {/* Search Bar */}
        <View style={{marginTop: 35, marginHorizontal: 10}}>
          <SearchBar
            placeholder={'Search'}
            search={search}
            setSearch={setSearch}
          />
        </View>

        {/* Main Body Container */}
        <View style={styles.bodyContainer}>
          {/* Heading Component */}
          <HomeHeading user={'Abebe Kebede'} sale={'50,000'} />

          {true ? (
            <InitialHomeComponent navigation={navigation} />
          ) : (
            <View style={{flex: 1}}>
              {/* Product Top Bar */}
              <ProductHead
                CurrentProduct={CurrentProduct}
                setCurrentProduct={setCurrentProduct}
              />

              {/* Product List */}
              <FlatList
                columnWrapperStyle={{
                  justifyContent: 'space-between',
                  marginHorizontal: 5,
                  gap: 15,
                }}
                contentContainerStyle={{
                  gap: 15,
                  paddingBottom: 80,
                  borderWidth: 0,
                  borderColor: 'red',
                  animated: true,
                }}
                data={
                  CurrentProduct === 'All'
                    ? ProductStore.filter(product =>
                        new RegExp(search, 'gi').test(product.name),
                      )
                    : ProductStore.filter(
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
                  />
                )}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
              />
            </View>
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
