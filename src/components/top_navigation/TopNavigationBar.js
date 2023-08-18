import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {color, textStyles} from '../../styles/Styles';

const TopNavigationBar = ({
  backIcon,
  backLabel,
  middleLabel,
  thirdLabel,
  thirdIcon,
  onPressBack,
  onPressGo,
  onGoCondition,
  edit,
  onPressEdit,
  onPressDelete,
}) => {
  return (
    <View style={{paddingHorizontal: 0}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: 15,
        }}>
        <TouchableOpacity onPress={onPressBack}>
          {backIcon ? (
            <Entypo name="chevron-left" size={26} color="black" />
          ) : (
            <Text style={{fontSize: 22, fontWeight: '600', color: 'black'}}>
              {!backIcon && backLabel}
            </Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={{fontSize: 22, fontWeight: '600', color: 'black'}}>
            {middleLabel}
          </Text>
        </TouchableOpacity>
        {edit ? (
          <View style={{flexDirection: 'row', gap: 20}}>
            <TouchableOpacity style={{padding: 4}} onPress={onPressEdit}>
              <MaterialIcons name="edit" size={24} color={color.primary} />
            </TouchableOpacity>
            <TouchableOpacity style={{padding: 4}} onPress={onPressDelete}>
              <Ionicons name="trash" size={24} color={color.primary} />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity onPress={onPressGo}>
            {thirdIcon ? (
              <Entypo name="plus" size={32} color={color.secondary} />
            ) : (
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: '600',
                  color: onGoCondition ? color.primary : color.gray,
                }}>
                {!thirdIcon && thirdLabel}
              </Text>
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default TopNavigationBar;
