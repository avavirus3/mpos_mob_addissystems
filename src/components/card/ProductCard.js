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
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            height: 47,
            alignItems: 'center',
            justifyContent: 'space-around',
            backgroundColor: color.lightBlue,
            borderRadius: 10,
            marginVertical: 15,
            paddingHorizontal: 10,
          }}>
          <TouchableOpacity
            style={{}}
            onPress={() => qty && handleQtyDecrement(id)}>
            <Entypo
              name="minus"
              size={28}
              color={qty ? color.secondary : 'gray'}
            />
          </TouchableOpacity>
          <TextInput
            style={{
              fontSize: 18,
              textAlign: 'center',
              marginHorizontal: 5,
              width: 50,
              backgroundColor: '#f9f9f9',
              borderRadius: 5,
            }}
            value={qty > 0 ? qty.toString() : qty === 0 ? '0' : ''}
            onChangeText={num => handleQuantityInput(id, num)}
            onBlur={() => handleEventOnBlur(id)}
            keyboardType="number-pad"
          />
          <TouchableOpacity style={{}} onPress={() => handleQtyIncrement(id)}>
            <Entypo name="plus" size={28} color={color.secondary} />
          </TouchableOpacity>
        </View>
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
