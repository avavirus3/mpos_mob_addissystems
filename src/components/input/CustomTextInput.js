import {View, Text, TextInput} from 'react-native';
import React from 'react';
import {color} from '../../styles/Styles';

const CustomTextInput = ({
  style,
  label,
  placeholder,
  lastPlaceholder,
  keyboardType,
  autoCapitalize,
  input,
  setInput,
  icon,
}) => {
  return (
    <View style={{}}>
      {label && <Text
        style={{
          marginVertical: 5,
          marginLeft: 2,
          fontSize: 17,
          color: color.gray,
        }}>
        {label}
      </Text>}
      <View
        style={[
          style,
          {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 5,
            borderWidth: 1,
            borderColor: color.secondary,
            borderRadius: 10,
            paddingLeft: 15,
            paddingRight: 10,
            paddingVertical: 6,
          },
        ]}>
        {icon}
        <TextInput
          style={{flex: 1, color: 'black', fontSize: 16}}
          value={input?.toString()}
          placeholder={placeholder ? placeholder : 'Pass Placeholder'}
          onChangeText={value => setInput(value)}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
        />
        <Text style={{color: color.gray, fontSize: 16, marginRight: 10}}>
          {lastPlaceholder}
        </Text>
      </View>
    </View>
  );
};

export default CustomTextInput;
