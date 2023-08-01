import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  FlatList,
  ScrollView,
  TextInput,
  Platform,
  Image,
} from 'react-native';
import React, {useState, useRef} from 'react';
import {color, textStyles} from '../../styles/Styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import SellProductTopBar from '../../components/top_navigation/SellProductTopBar';
import SearchBar from '../../components/search/SearchBar';
import ProductCard from '../../components/card/ProductCard';

const SelectProduct = ({navigation}) => {
  const scrollViewRef = useRef(null);
  const [CurrentProduct, setCurrentProduct] = useState('All');
  const [search, setSearch] = useState('');
  // const [searchReg, setSearchReg] = new RegExp()
  const productCategory = [
    'All',
    'Laptop',
    'Phone',
    'Tablet',
    'Mouse',
    'Charger',
  ];
  const noImage = require('../../assets/images/no-image.jpg');

  const [ProductStore, setProductStore] = useState([
    {
      id: 'mob1',
      name: 'iPhone',
      price: 34940,
      qty: 0,
      image: require('../../assets/images/phone-2.jpg'),
      category: 'phone',
    },
    {
      id: 'mob2',
      name: 'Samsung S9+',
      price: 16400,
      qty: 0,
      image: require('../../assets/images/phone-3.jpg'),
      category: 'phone',
    },
    {
      id: 'mob3',
      name: 'iPhone 5',
      price: 9541,
      qty: 0,
      image: require('../../assets/images/phone-4.jpg'),
      category: 'phone',
    },
    {
      id: 'mob4',
      name: 'HTC 4',
      price: 64134,
      qty: 0,
      image: require('../../assets/images/phone-5.jpg'),
      category: 'phone',
    },
    {
      id: 'mob5',
      name: 'Samsung S9+',
      price: 16400,
      qty: 0,
      image: require('../../assets/images/phone-6.jpg'),
      category: 'phone',
    },
    {
      id: 'mob6',
      name: 'iPhone 5',
      price: 9541,
      qty: 0,
      image: require('../../assets/images/phone-7.jpg'),
      category: 'phone',
    },
    {
      id: 'mob7',
      name: 'HTC 4',
      price: 64134,
      qty: 0,
      image: require('../../assets/images/phone-8.jpg'),
      category: 'phone',
    },
    {
      id: 'lap1',
      name: 'Hp Pavilion',
      price: 120000,
      qty: 0,
      image: require('../../assets/images/laptop-1.jpg'),
      category: 'laptop',
    },
    {
      id: 'lap2',
      name: 'Mac 15',
      price: 260000,
      qty: 0,
      image: require('../../assets/images/laptop-2.jpg'),
      category: 'laptop',
    },
    {
      id: 'lap3',
      name: 'Omen Gaming',
      price: 135000,
      qty: 0,
      image: require('../../assets/images/laptop-3.jpg'),
      category: 'laptop',
    },
    {
      id: 'lap4',
      name: 'Dell Inspire',
      price: 87000,
      qty: 0,
      image: require('../../assets/images/laptop-4.jpg'),
      category: 'laptop',
    },
    {
      id: 'lap5',
      name: 'Samsung Tablet',
      price: 35000,
      qty: 0,
      image: require('../../assets/images/tablet-1.jpeg'),
      category: 'tablet',
    },
    {
      id: 'tab1',
      name: 'Mini Tablet',
      price: 15000,
      qty: 0,
      image: require('../../assets/images/tablet-2.jpg'),
      category: 'tablet',
    },
    {
      id: 'tab2',
      name: 'Tablet A03',
      price: 35000,
      qty: 0,
      image: require('../../assets/images/tablet-3.jpg'),
      category: 'tablet',
    },
    {
      id: 'tab3',
      name: 'iPad Tablet',
      price: 35000,
      qty: 0,
      image: require('../../assets/images/tablet-4.jpeg'),
      category: 'tablet',
    },
    {
      id: 'mous1',
      name: 'Gaming Mouse',
      price: 3200,
      qty: 0,
      image: require('../../assets/images/mouse-1.jpg'),
      category: 'mouse',
    },
    {
      id: 'mous2',
      name: 'Wired Mouse',
      price: 999,
      qty: 0,
      image: require('../../assets/images/mouse-2.jpg'),
      category: 'mouse',
    },
    {
      id: 'mous3',
      name: 'Gaming Mouse',
      price: 4500,
      qty: 0,
      image: require('../../assets/images/mouse-3.jpg'),
      category: 'mouse',
    },
    {
      id: 'mous4',
      name: 'Wireless Mouse',
      price: 3200,
      qty: 0,
      image: require('../../assets/images/mouse-4.jpeg'),
      category: 'mouse',
    },
    {
      id: 'charg1',
      name: 'Wireless Charger',
      price: 3200,
      qty: 0,
      image: require('../../assets/images/charger-1.jpg'),
      category: 'charger',
    },
    {
      id: 'charg2',
      name: 'Micro Mini',
      price: 3200,
      qty: 0,
      image: require('../../assets/images/charger-2.jpg'),
      category: 'charger',
    },
    {
      id: 'charg3',
      name: 'Type C Charger',
      price: 3200,
      qty: 0,
      image: require('../../assets/images/charger-3.jpg'),
      category: 'charger',
    },
    {
      id: 'charg4',
      name: 'Original Samsung',
      price: 3200,
      qty: 0,
      image: require('../../assets/images/charger-4.jpg'),
      category: 'charger',
    },
    {
      id: 'charg5',
      name: 'Data Cable',
      price: 3200,
      qty: 0,
      image: require('../../assets/images/charger-5.jpeg'),
      category: 'charger',
    },
  ]);

  const handleScroll = scrollOffset => {
    scrollViewRef.current.scrollTo({x: scrollOffset, animated: true});
  };

  const handleQuantityInput = (id, num) => {
    const updatedProduct = ProductStore.filter(item => item.id == id)[0];
    updatedProduct.qty = parseInt(num);
    console.log('OnPress Output:', updatedProduct);
    setProductStore([...ProductStore]);
  };

  const handleQtyIncrement = id => {
    const updatedProduct = ProductStore.filter(item => item.id == id)[0];
    updatedProduct.qty += 1;
    // console.log("OnPress Output:", updatedProduct);
    setProductStore([...ProductStore]);
  };

  const handleQtyDecrement = id => {
    const updatedProduct = ProductStore.filter(item => item.id == id)[0];
    updatedProduct.qty = updatedProduct.qty == 0 ? 0 : updatedProduct.qty - 1;
    // console.log("OnPress Output:", updatedProduct);
    setProductStore([...ProductStore]);
  };

  const selectedProducts = ProductStore.filter(product => product.qty > 0);
  // console.log("Selected Products:", selectedProducts);

  const selectedItemNumber = selectedProducts
    .map(item => item.qty)
    .reduce((acc, cur) => acc + cur, 0);

  // console.log(selectedItemNumber);

  const handleOnDone = () => {
    if (selectedProducts.length > 0) {
      const updatedProduct = ProductStore.filter(item => item.qty > 0);
      // updatedProduct.map((item) => (item.qty = 0));
      // console.log("QTY > 0", ProductStore);
      // setProductStore([...ProductStore])
      navigation.navigate('create-sale', selectedProducts);
    }
  };

  // console.log(ProductStore);
  // const ProductCard = ({ item }) => {
  //   const { name, price, qty, image, category, id } = item;
  //   // console.log(name);
  //   return (
  //     <View
  //       style={[
  //         styles.productContainer,
  //         // { borderWidth: 1, borderColor: "red" },
  //       ]}
  //     >
  //       <View style={styles.imageContainer}>
  //         <Image
  //           style={{ height: "100%", width: "100%", resizeMode: "cover" }}
  //           source={image ? image : noImage}
  //         />
  //       </View>
  //       <View
  //         style={{
  //           width: "100%",
  //           alignItems: "center",
  //           justifyContent: "space-between",
  //           paddingHorizontal: 15,
  //         }}
  //       >
  //         <Text style={styles.productName}>{name}</Text>
  //         <Text style={styles.productCategoryText}>{category}</Text>
  //         <View style={{ flexDirection: "row" }}>
  //           <Text style={styles.priceText}>Price = </Text>
  //           <Text style={styles.priceText}>{price}</Text>
  //           <Text style={styles.priceText}> ETB</Text>
  //         </View>
  //         <View
  //           style={{
  //             width: "100%",
  //             flexDirection: "row",
  //             height: 47,
  //             alignItems: "center",
  //             justifyContent: "space-around",
  //             backgroundColor: color.lightBlue,
  //             borderRadius: 10,
  //             marginVertical: 15,
  //             paddingHorizontal: 10,
  //           }}
  //         >
  //           <TouchableOpacity
  //             style={{}}
  //             onPress={() => qty && handleQtyDecrement(id)}
  //           >
  //             <Entypo
  //               name="minus"
  //               size={28}
  //               color={qty ? color.secondary : "gray"}
  //             />
  //           </TouchableOpacity>
  //           <TextInput
  //             style={{
  //               fontSize: 18,
  //               textAlign: "center",
  //               marginHorizontal: 5,
  //               width: 50,
  //               // borderWidth: 1,
  //               borderColor: color.gray,
  //               backgroundColor: "#f9f9f9",
  //               borderRadius: 5,
  //             }}
  //             value={qty ? qty.toString() : "0"}
  //             onChangeText={(num) => handleQuantityInput(id, num)}
  //             keyboardType="number-pad"
  //           />
  //           <TouchableOpacity style={{}} onPress={() => handleQtyIncrement(id)}>
  //             <Entypo name="plus" size={28} color={color.secondary} />
  //           </TouchableOpacity>
  //         </View>
  //       </View>
  //     </View>
  //   );
  // };

  /* Main Return */
  return (
    <View style={styles.mainContainer}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={{}}>
          {/* Top Heading Component  */}
          <SellProductTopBar
            label1={'Select Products'}
            cartNumber={selectedItemNumber}
            onDone={handleOnDone}
            onCancel={() => navigation.goBack()}
          />

          {/* Category Selector  */}
          <View
            style={{
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
              <View style={{flexDirection: 'row', gap: 5}}>
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
                      onPress={() => setCurrentProduct(productCategory[index])}
                      key={category}>
                      <Text
                        style={[
                          styles.ProductCategoryText,
                          {
                            color:
                              CurrentProduct === category
                                ? color.secondary
                                : color.gray,
                            fontWeight: CurrentProduct === category ? 600 : 500,
                          },
                        ]}>
                        {category}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </ScrollView>
            <TouchableOpacity onPress={() => handleScroll(200)}>
              <Entypo name="chevron-small-right" size={26} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>

      {/* Search Bar  */}
      <View style={{marginVertical: 10}}>
        <SearchBar search={search} setSearch={setSearch} />
      </View>

      {/*  Product List (using FlatList)  */}
      <View style={{flex: 1, borderWidth: 0, width: '100%'}}>
        <FlatList
          columnWrapperStyle={{
            justifyContent: 'space-between',
            marginHorizontal: 5,
            gap: 15,
          }}
          contentContainerStyle={{gap: 15, marginTop: 5, paddingBottom: 20}}
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
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 12,
    backgroundColor: 'white',
    // paddingTop: 30,
    // borderWidth: 1,
    // alignSelf: 'center',
    borderColor: 'red',
  },
  topHeading: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // borderWidth: 1
    // borderWidth: 1,
  },
  topHeadingText: {
    // flex: 1,
    fontSize: 20,
    fontWeight: '500',
  },
  productCatagoryContainer: {
    flexDirection: 'row',
  },
  ProductCategoryText: {
    fontSize: 18,
  },

  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  productContainer: {
    flex: 1,
    width: '100%',
    maxWidth: 200,
    backgroundColor: color.lightGray,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
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

  productName: {
    marginTop: 5,
    textAlign: 'center',
    fontSize: 19,
    fontWeight: 600,
  },

  productCategoryText: {
    marginVertical: 2,
    textAlign: 'center',
    color: color.gray,
    fontSize: 16,
    fontWeight: 500,
  },

  priceText: {
    fontSize: 16,
    color: color.normal,
  },
});

export default SelectProduct;
