import React from 'react';
import {View, TextInput, TouchableOpacity} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {color} from '../../styles/Styles';

const IncrementDecrement = ({
  qty,
  id,
  handleEventOnBlur,
  handleQtyDecrement,
  handleQtyIncrement,
  handleQuantityInput,
}) => {
  return (
    <View
      style={{
        flex: 1,
        // width: '100%',
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
        <Entypo name="minus" size={28} color={qty ? color.secondary : 'gray'} />
      </TouchableOpacity>
      <TextInput
        style={{
          fontSize: 18,
          textAlign: 'center',
          marginHorizontal: 5,
          width: 50,
          backgroundColor: '#f9f9f9',
          borderRadius: 5,
          color: '#000',
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
  );
};

export default IncrementDecrement;
