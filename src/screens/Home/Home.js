import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  FlatList,
} from 'react-native';
import React, {useState, useRef, useContext} from 'react';
import SearchBar from '../../components/SearchBar';
// import {FontAwesome, Entypo, Ionicons, FontAwesome5} from '@expo/vector-icons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {color, textStyles} from '../../styles/Styles';
import Button from '../../components/button/Button';
// import {AuthContext} from '../../Auth/Authentication';
import { AuthContext } from '../../hooks/useContext/AuthContext';
import ProductCard from '../../components/card/ProductCard';

const Home = () => {
  const [search, setSearch] = useState('');
  const {user, data, setUser, ProductStore, setProductStore} =
    useContext(AuthContext);
  const scrollViewRef = useRef(null);
  const [CurrentProduct, setCurrentProduct] = useState('All');
  const productCategory = [
    'All',
    'Laptop',
    'Phone',
    'Tablet',
    'Mouse',
    'Charger',
  ];

  const handleScroll = offset => {
    scrollViewRef.current.scrollTo({
      x: offset,
      animated: true,
    });
  };

  console.log('Data:', data);

  const handleQuantityInput = (id, num) => {
    const updatedProduct = ProductStore.filter(item => item.id == id)[0];
    updatedProduct.qty = parseInt(num);
    console.log('OnPress Output:', updatedProduct);
    setProductStore([...ProductStore]);
  };

  const handleQtyIncrement = id => {
    const updatedProduct = ProductStore.filter(item => item.id == id)[0];
    updatedProduct.qty += 1;
    console.log('OnPress Output:', updatedProduct);
    setProductStore([...ProductStore]);
  };

  const handleQtyDecrement = id => {
    const updatedProduct = ProductStore.filter(item => item.id == id)[0];
    updatedProduct.qty = updatedProduct.qty == 0 ? 0 : updatedProduct.qty - 1;
    console.log('OnPress Output:', updatedProduct);
    setProductStore([...ProductStore]);
  };

  const InitialButtons = ({label, icon, onPress}) => {
    return (
      <TouchableOpacity style={styles.mainButton} onPress={onPress}>
        {icon}
        <Text style={[textStyles.text_normal, {textAlign: 'center'}]}>{label}</Text>
      </TouchableOpacity>
    );
  };

  const InitailComponent = () => {
    return (
      <View style={{flexDirection: 'column', justifyContent: 'flex-start'}}>
        <View
          style={{
            marginTop: 30,
            marginBottom: 15,
            flexDirection: 'row',
            gap: 15,
            borderWidth: 0,
            borderColor: 'red',
          }}>
          <InitialButtons
            label={'Add New Product'}
            icon={
              <Ionicons
                name="pricetag"
                size={33}
                color={color.secondary}
              />
            }
          />
          <InitialButtons
            label={'Create New Sale'}
            onPress={() => navigation.navigate('Sale', {screen: 'create-sale'})}
            icon={
              <Ionicons
                name="cart"
                size={38}
                color={color.secondary}
              />
            }
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <InitialButtons
            label={'Add New Customer'}
            icon={
              <FontAwesome5
                name="user-alt"
                size={32}
                color={color.secondary}
              />
            }
          />
        </View>
      </View>
    );
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
          <View style={{marginTop: 10}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={textStyles.heading_bold}>Home</Text>
              <TouchableOpacity style={{borderWidth: 0, padding: 3}}>
                <FontAwesome name="bell" size={24} color="black" />
                <View
                  style={{
                    width: 12,
                    height: 12,
                    backgroundColor: color.primary,
                    borderRadius: 50,
                    position: 'absolute',
                    right: 2,
                    top: 3,
                  }}></View>
              </TouchableOpacity>
            </View>
            <Text style={textStyles.text_sm_gray}>Welcome Samuel A.</Text>
            <View
              style={{
                marginTop: 5,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={textStyles.text_normal}>Total Sale Today</Text>
              <Text style={textStyles.heading_blue}>100,000 ETB</Text>
            </View>
          </View>

          {true ? (
            <InitailComponent />
          ) : (
            <View style={{flex: 1}}>
              <View
                style={{
                  marginTop: 5,
                  // flex: 1,
                  // borderWidth: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  gap: 10,
                }}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingVertical: 5,
                    // borderWidth: 1,
                    borderColor: 'lightgray',
                  }}>
                  <TouchableOpacity onPress={() => handleScroll(0)}>
                    <Entypo name="chevron-small-left" size={26} color="black" />
                  </TouchableOpacity>
                  <ScrollView
                    ref={scrollViewRef}
                    horizontal
                    showsHorizontalScrollIndicator={false}>
                    <View
                      style={{
                        flexDirection: 'row',
                        gap: 5,
                        paddingHorizontal: 5,
                      }}>
                      {productCategory.map((category, index) => {
                        return (
                          <TouchableOpacity
                            style={{
                              backgroundColor:
                                CurrentProduct === category
                                  ? color.lightBlue
                                  : 'white',
                              paddingHorizontal:
                                CurrentProduct === category
                                  ? 13
                                  : index === 0
                                  ? 0
                                  : 8,
                              paddingVertical: 5,
                              paddingRight: index === 1 ? 13 : null,
                              borderRadius: 10,
                            }}
                            onPress={() =>
                              setCurrentProduct(productCategory[index])
                            }
                            key={category}>
                            <Text
                              style={[
                                styles.ProductCategoryText,
                                {
                                  color:
                                    CurrentProduct === category
                                      ? color.secondary
                                      : color.gray,
                                  fontWeight:
                                    CurrentProduct === category ? '600' : '500',
                                },
                              ]}>
                              {category}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  </ScrollView>
                  <TouchableOpacity onPress={() => handleScroll(250)}>
                    <Entypo
                      name="chevron-small-right"
                      size={26}
                      color="black"
                    />
                  </TouchableOpacity>
                </View>
                <View style={{flex: 1, maxWidth: 150}}>
                  <Button label={'Make Sale'} height={50} btnBG={color.gray} />
                </View>
              </View>

              <FlatList
                columnWrapperStyle={{
                  justifyContent: 'space-between',
                  marginHorizontal: 5,
                  gap: 15,
                }}
                contentContainerStyle={{
                  // flex: 1,
                  gap: 15,
                  // marginTop: 25,
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
    // paddingHorizontal: 12,
    backgroundColor: 'white',
    // paddingTop: 25,
    // borderWidth: 1,
    // alignSelf: 'center',
    borderColor: 'red',
  },

  bodyContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },

  mainButton: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    width: '100%',
    flex: 1,
    maxWidth: 180,
    // minHeight: 130,
    borderWidth: 1,
    borderColor: color.secondary,
    padding: 20,
    // margin: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: [{width: 2, height: 3}],
        shadowOpacity: 4,
        shadowRadius: 4,
      },
      android: {
        shadowColor: 'rgba(0,0,0,0.5)',
        elevation: 8,
      },
    }),
  },

  ProductCategoryText: {
    marginVertical: 2,
    textAlign: 'center',
    color: color.gray,
    fontSize: 16,
    fontWeight: '500',
  },
});

/* Rules */
// Screen names should be CamelCase like ProductStack.js
// Don't use fontWeight in number value like this (fontWeight: 500) rather use in string like (fontWeight: '500') it may throw an error!
// Allways try to wright neat codes with comments as much as possible! someone may be maintain it latter.
// You can Ignore this after you read it. Feel free to modify this file and even create from scratch, this is just template to work with the same flow.

export default Home;
