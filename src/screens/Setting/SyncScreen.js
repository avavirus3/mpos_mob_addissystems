import { StyleSheet, Text, View,Pressable } from 'react-native'
import React from 'react'
import { Iconify } from 'react-native-iconify'
import { verticalScale,scale } from 'react-native-size-matters'


const SyncScreen = ({navigation}) => {
  return (
    <View style={{flex:1,backgroundColor:'white'}}>
       <View
        style={{
          flexDirection: "row",
          backgroundColor: "#fff",
          height: verticalScale(66),
          justifyContent: "space-between",
          paddingHorizontal: scale(25),
          alignItems: "center",
          //paddingVertical:0
        }}
      >
        <Pressable onPress={() => navigation.goBack()}>
          <Iconify icon="ion:chevron-back-outline" size={20} />
        </Pressable>
        <Text style={{ fontSize: scale(22), fontWeight: 600 }}>{"Sync"}</Text>
        <Pressable><Iconify icon='ic:outline-history' size={20}/></Pressable>
      </View>
      <View>
        <View style={{flexDirection:'row'}}>
            <View>
                <Text>Total</Text>
            </View>
        </View>
      </View>
    </View>
  )
}

export default SyncScreen

const styles = StyleSheet.create({})