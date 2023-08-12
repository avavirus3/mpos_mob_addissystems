import {View, Text, TextInput} from 'react-native';
import React from 'react';
import {color} from '../../styles/Styles';

const CustomTextInput = ({style, placeholder, keyboardType, autoCapitalize, input, setInput, icon}) => {
  return (
    <View
      style={[
        style,
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 5,
          borderWidth: 1,
          borderColor: color.secondary,
          borderRadius: 5,
          marginHorizontal: 10,
          paddingHorizontal: 10,
          paddingVertical: 8
        },
      ]}>
      {icon}
      <TextInput
        style={{flex: 1, color: 'black'}}
        value={input?.toString()}
        placeholder={placeholder ? placeholder : 'Pass Placeholder'}
        onChangeText={(value) => setInput(value)}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
      />
    </View>
  );
};

export default CustomTextInput;
