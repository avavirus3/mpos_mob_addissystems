import { StyleSheet, Text, View,Pressable, } from 'react-native'
import React from 'react'
import { verticalScale,scale } from 'react-native-size-matters'
import { Iconify } from 'react-native-iconify'
import {theme} from '../../styles/stylesheet'
import { fonts } from '../../styles/unistyle'

const LockScreen = ({navigation}) => {
  return (
    <View style={{flex:1,backgroundColor:"#fff"}}>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: '#fff',
          height: verticalScale(66),
          justifyContent: 'space-between',
          paddingHorizontal: scale(25),
          alignItems: 'center',
          //paddingVertical:0
        }}>
        <Pressable onPress={() => navigation.goBack()}>
          <Iconify icon="ion:chevron-back-outline" size={20} />
        </Pressable>
        <Text style={[fonts.h1]}>Lock Screen</Text>
        <Pressable>
        </Pressable>
      </View>
      <Pressable
          onPress={()=>navigation.navigate("PINScreen")}
            style={{
              backgroundColor: '#fff',
              height: verticalScale(50),
              marginHorizontal: scale(25),
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderColor: theme.color.lightGray,
              borderBottomWidth: 1,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Iconify
                icon="material-symbols:pin"
                size={scale(20)}
              />
              <View style={{paddingHorizontal: scale(10)}}>
                <Text style={[fonts.h1]}>
                 PIN
                </Text>
              </View>
            </View>
            <View>
              <Iconify icon="ion:chevron-forward-outline" size={20} />
            </View>
          </Pressable>
    </View>
  )
}

export default LockScreen

const styles = StyleSheet.create({})