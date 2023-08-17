import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {color, containerStyles, textStyles} from '../../../styles/Styles';
import TopNavigationBar from '../../../components/top_navigation/TopNavigationBar';
import SearchBar from '../../../components/search/SearchBar';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

function ListItems({icon, listName, goTo, navigation}) {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
        paddingVertical: 10,
      }}
      onPress={() => navigation.navigate(goTo)}>
      {icon}
      <Text style={textStyles.heading_normal}>{listName}</Text>
    </TouchableOpacity>
  );
}

const Product = ({navigation}) => {
  const [search, setSearch] = useState('');

  return (
    <View style={containerStyles.mainContainer}>
      <View style={{}}>
        <TopNavigationBar
          backLabel={'Products'}
          thirdIcon
          onPressGo={() => navigation.navigate('add-product')}
        />
        <View style={{marginTop: 15}}>
          <SearchBar
            search={search}
            setSearch={setSearch}
            placeholder={'Search for products'}
          />
        </View>

        <View style={{marginTop: 25, marginLeft: 5}}>
          <ListItems
            icon={<Entypo name="download" size={24} color="black" />}
            listName={'All Products'}
            navigation={navigation}
            goTo={'all-product'}
          />
          <View
            style={{
              height: 2,
              backgroundColor: color.lightGray,
              marginVertical: 2,
            }}
          />
          <ListItems
            icon={
              <MaterialCommunityIcons
                name="file-document-multiple-outline"
                size={24}
                color="black"
              />
            }
            listName={'Inventory'}
            navigation={navigation}
            goTo={''}
          />
          <View
            style={{
              height: 2,
              backgroundColor: color.lightGray,
              marginVertical: 2,
            }}
          />
          <ListItems
            icon={<Ionicons name="options" size={24} color="black" />}
            listName={'Category'}
            navigation={navigation}
            goTo={'category-list'}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

/* Rules */
// Screen names should be CamelCase like ProductStack.js
// Don't use fontWeight in number value like this (fontWeight: 500) rather use in string like (fontWeight: '500') it may throw an error!
// Allways try to wright neat codes with comments as much as possible! someone may be maintain it latter.
// You can Ignore this after you read it. Feel free to modify this file and even create from scratch, this is just template to work with the same flow.

export default Product;
