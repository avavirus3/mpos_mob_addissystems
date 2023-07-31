import {
  View,
  Text,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {color} from '../../styles/Styles';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SearchBar = ({search, setSearch, placeholder}) => {
  return (

      <View
        style={{
          backgroundColor: color.lightGray,
          borderRadius: 10,
          height: 54,
          flexDirection: 'row',
          // paddingVertical: 15,
          justifyContent: 'space-between',
          paddingLeft: 15,
          alignItems: 'center',
          // borderWidth: 1,
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
          marginBottom: 10,
          borderColor: color.gray,
        }}>
        <View
          style={[
            styles.flexRow,
            {
              flex: 1,
              justifyContent: 'space-between',
              gap: 10,
              height: '100%',
            },
          ]}>
          <Ionicons name="search" size={24} color={color.gray} />
          <TextInput
            style={{flex: 1, height: '100%', fontSize: 18, borderWidth: 0}}
            value={search}
            placeholder={placeholder}
            onChangeText={setSearch}
          />
        </View>
        <TouchableOpacity
          style={{
            borderWidth: 0,
            paddingVertical: 10,
            paddingHorizontal: 8,
            marginRight: 5,
            display: search?.length > 0 ? 'flex' : 'none',
          }}
          onPress={() => search && setSearch('')}>
          <Ionicons name="close" size={28} color={color.normal} />
        </TouchableOpacity>
      </View>
  );
};

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default SearchBar;
