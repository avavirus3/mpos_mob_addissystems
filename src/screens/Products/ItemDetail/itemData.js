import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {color} from '../../../styles/Styles';
import FastImage from 'react-native-fast-image';

function LabelWithIcon({icon, label}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingVertical: 10,
      }}>
      {icon}
      <Text style={{fontSize: 20, fontWeight: '500'}}>{label}</Text>
    </View>
  );
}

const ItemComponent = ({itemData}) => {
  return (
    <View
      style={{
        paddingTop: 20,
      }}>
      {/* Image Container */}
      <View style={styles.imageContianer}>
        <FastImage
          style={{width: '100%', height: '100%', resizeMode: 'cover'}}
          source={{uri: itemData.image}}
        />
      </View>
      <View style={{marginTop: 15, alignItems: 'center'}}>
        <Text style={{fontSize: 20, fontWeight: '600'}}>{itemData.name}</Text>
        <Text style={{color: color.gray, fontSize: 18}}>{itemData._id}</Text>
      </View>
      <View style={{paddingHorizontal: 25, gap: 0, marginTop: 20}}>
        <LabelWithIcon
          icon={
            <Ionicons name="document-text-outline" size={30} color={'black'} />
          }
          label={itemData.desc ? itemData.desc : 'No Description!'}
        />
        <LabelWithIcon
          icon={<Ionicons name="options" size={30} color="black" />}
          label={itemData.category}
        />
        <LabelWithIcon
          icon={<AntDesign name="tagso" size={30} color="black" />}
          label={itemData.price}
        />
        <LabelWithIcon
          icon={<MaterialIcons name="storefront" size={30} color="black" />}
          label={`${itemData.quantity} in stock`}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContianer: {
    height: 200,
    width: 250,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: color.lightGray,
    alignSelf: 'center',
    overflow: 'hidden',
    backgroudColor: '#fff',
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
});

export default ItemComponent;
