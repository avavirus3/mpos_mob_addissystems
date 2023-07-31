import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import React, {useState, useRef} from 'react';
import Button from '../../../components/button/Button';
import {color, textStyles} from '../../../styles/Styles';
import Entypo from 'react-native-vector-icons/Entypo';

const ProductHead = ({
  CurrentProduct,
  setCurrentProduct,
  activeMakeSale,
  selectedProducts,
  navigation,
}) => {
  const scrollViewRef = useRef(null);
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

  return (
    <View
      style={{
        marginTop: 5,
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
                      CurrentProduct === category ? color.lightBlue : 'white',
                    paddingHorizontal:
                      CurrentProduct === category ? 13 : index === 0 ? 0 : 8,
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
                        fontWeight: CurrentProduct === category ? '600' : '500',
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
          <Entypo name="chevron-small-right" size={26} color="black" />
        </TouchableOpacity>
      </View>
      <View style={{flex: 1, maxWidth: 150}}>
        <Button
          label={'Make Sale'}
          height={50}
          btnBG={activeMakeSale ? color.primary : color.gray}
          onPress={() => navigation.navigate('Sale', {screen: 'create-sale', params: {"passed_selected_product": selectedProducts} })}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ProductCategoryText: {
    marginVertical: 2,
    textAlign: 'center',
    color: color.gray,
    fontSize: 16,
    fontWeight: '500',
  },
});

export default ProductHead;
