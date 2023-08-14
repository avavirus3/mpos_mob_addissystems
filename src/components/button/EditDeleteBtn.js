import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { color } from '../../styles/Styles';

const EditDeleteBtn = ({handleEditItem, handleDeleteItem}) => {
  return (
    <View
      style={{
        borderWidth: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 15,
        marginTop: 5,
        marginBottom: 5
      }}>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 1,
        }}
        onPress={handleEditItem}>
        <MaterialIcons name="edit" size={24} color={color.primary} />
        <Text style={{fontSize: 16}}>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 1,
        }}
        onPress={handleDeleteItem}>
        <Ionicons name="trash" size={24} color={color.primary} />
        <Text style={{fontSize: 16}}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditDeleteBtn;
