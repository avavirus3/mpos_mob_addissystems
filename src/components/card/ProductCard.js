import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import {color, textStyles} from '../../styles/Styles';
import IncrementDecrement from '../button/IncrementDecrement';

const noImage = require('../../assets/images/no-image.jpg');

const ProductCard = ({
  item,
  handleQtyDecrement,
  handleQtyIncrement,
  handleQuantityInput,
  handleEventOnBlur
}) => {
  const {name, price, qty, image, category, id} = item;

  return (
    <View
      style={[
        styles.productContainer,
        // { borderWidth: 1, borderColor: "red" },
      ]}>
      <View style={styles.imageContainer}>
        <Image
          style={{height: '100%', width: '100%', resizeMode: 'cover'}}
          source={image ? image : noImage}
        />
      </View>
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 15,
        }}>
        <Text style={[textStyles.heading_normal, {textAlign: 'center'}]}>
          {name}
        </Text>
        <Text style={styles.productCategoryText}>{category}</Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.priceText}>Price = </Text>
          <Text style={styles.priceText}>{price}</Text>
          <Text style={styles.priceText}> ETB</Text>
        </View>
        <IncrementDecrement id={id} qty={qty} handleEventOnBlur={handleEventOnBlur} handleQtyDecrement={handleQtyDecrement} handleQtyIncrement={handleQtyIncrement} handleQuantityInput={handleQuantityInput} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    fontWeight: '600',
  },

  productCategoryText: {
    marginVertical: 2,
    textAlign: 'center',
    color: color.gray,
    fontSize: 16,
    fontWeight: '500',
  },

  priceText: {
    fontSize: 16,
    color: color.normal,
  },
});

export default ProductCard;
