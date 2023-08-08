import React from 'react';
import {View, Text, TextInput, TouchableOpacity, Image} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {color} from '../../../styles/Styles';
import IncrementDecrement from '../../../components/button/IncrementDecrement';
import FastImage from 'react-native-fast-image';


const RenderItem = ({
  item,
  handleDeleteItem,
  handleQtyDecrement,
  handleQtyIncrement,
  handleQuantityInput,
  handleEventOnBlur,
}) => {
  const {name, price, quantity, image, category, _id} = item;

  const noImage = require('../../../assets/images/no-image.jpg');

  return (
    <View style={{flexDirection: 'row', marginVertical: 0}} key={_id}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          gap: 10,
        }}>
        <View
          style={{
            backgroundColor: 'gray',
            width: '100%',
            maxWidth: 80,
            height: '100%',
            maxHeight: 80,
            borderRadius: 5,
            overflow: 'hidden',
          }}>
          {/* <Image
            style={{height: '100%', width: '100%', resizeMode: 'cover'}}
            source={image ? image : noImage}
          /> */}
           <FastImage
          style={{height: '100%', width: '100%', resizeMode: 'cover'}}
          source={image ? image : noImage}
        />
        </View>
        <View style={{flex: 1}}>
          <Text style={{fontSize: 18, fontWeight: '600'}}>{name}</Text>
          <Text style={{fontSize: 16, color: color.gray}}>{category}</Text>
          <Text style={{fontSize: 18, fontWeight: '500'}}>
            {quantity} X {price} ETB
          </Text>
          <Text style={{fontSize: 18, fontWeight: '500'}}>
            = {quantity * price} ETB
          </Text>
        </View>
      </View>
      <View style={{alignItems: 'flex-end'}}>
        {/* <View
          style={{
            flexDirection: 'row',
            height: 47,
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: color.lightBlue,
            borderRadius: 10,
            marginTop: 5,
            marginBottom: 10,
            paddingHorizontal: 10,
            // borderWidth: 1,
          }}>
          <TouchableOpacity
            style={{}}
            onPress={() => qty > 1 && handleQtyDecrement(id)}>
            <Entypo name="minus" size={28} color={color.secondary} />
          </TouchableOpacity>
          <TextInput
            style={{
              fontSize: 18,
              textAlign: 'center',
              marginHorizontal: 5,
              width: 50,
              borderWidth: 1,
              borderColor: color.gray,
              borderRadius: 5,
              color: '#000',
              backgroundColor: '#f7f7f7',
            }}
            value={qty > 0 ? qty.toString() : qty === 0 ? '0' : ''}
            onChangeText={num => handleQuantityInput(id, num)}
            onBlur={() => handleEventOnBlur(id)}
            keyboardType="number-pad"
          />
          <TouchableOpacity
            style={{}}
            onPress={num => handleQtyIncrement(id, num)}>
            <Entypo name="plus" size={28} color={color.secondary} />
          </TouchableOpacity>
        </View> */}
        <IncrementDecrement
          id={_id}
          qty={quantity}
          handleEventOnBlur={handleEventOnBlur}
          handleQtyDecrement={handleQtyDecrement}
          handleQtyIncrement={handleQtyIncrement}
          handleQuantityInput={handleQuantityInput}
        />
        <TouchableOpacity
          style={{borderWidth: 0, borderColor: 'red', padding: 5}}
          onPress={() => handleDeleteItem(_id)}>
          <Ionicons name="trash" size={30} color={color.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RenderItem;
