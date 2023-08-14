import { StyleSheet, Text, View,Pressable } from 'react-native'
import React from 'react'
import { Iconify } from 'react-native-iconify'
import { verticalScale,scale } from 'react-native-size-matters'
import { theme } from '../../styles/stylesheet'


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
        <Pressable onPress={()=>navigation.navigate("SyncHistory")}><Iconify icon='ic:outline-history' size={20}/></Pressable>
      </View>
      <View style={{paddingHorizontal:25}}>
        <View style={{flexDirection:'row',width:"100%",justifyContent:'space-between',paddingHorizontal:21,paddingVertical:20,marginTop:10}}>
            <View>
                <Text style={{fontSize:18,fontWeight:600}}>Total</Text>
            </View>
            <View><Text style={{fontSize:18,fontWeight:600}}>Unsynced</Text></View>
            <View><Iconify icon='ic:baseline-wifi-off' size={20} color={theme.color.primary}/></View>
        </View>
        <View style={{flexDirection:'row',width:"100%",justifyContent:'space-between',borderWidth:1,borderRadius:10,borderColor:theme.color.blue,paddingVertical:20,marginTop:10,paddingHorizontal:21}}>
            <View >
                <Text style={{fontSize:18,fontWeight:400}}>Sale</Text>
            </View>
            <View><Text style={{fontSize:18,fontWeight:400}}>2</Text></View>
            <View><Iconify icon='eva:sync-fill' size={20} color={theme.color.primary}/></View>
            
            
        </View>
        <View style={{flexDirection:'row',width:"100%",justifyContent:'space-between',borderWidth:1,borderRadius:10,borderColor:theme.color.blue,paddingVertical:20,marginTop:10,paddingHorizontal:21}}>
            <View >
                <Text style={{fontSize:18,fontWeight:400}}>Product</Text>
            </View>
            <View><Text style={{fontSize:18,fontWeight:400}}></Text></View>
            <View><Iconify icon='eva:sync-fill' size={20} color={theme.color.green}/></View>
        </View>
        <View style={{flexDirection:'row',width:"100%",justifyContent:'space-between',borderWidth:1,borderRadius:10,borderColor:theme.color.blue,paddingVertical:20,marginTop:10,paddingHorizontal:21}}>
            <View >
                <Text style={{fontSize:18,fontWeight:400}}>Customer</Text>
            </View>
            <View><Text style={{fontSize:18,fontWeight:400}}>10</Text></View>
            <View><Iconify icon='eva:sync-fill' size={20} color={theme.color.primary}/></View>
        </View>
        <Pressable
              style={{
                borderRadius: 10,
                backgroundColor: theme.color.primary,
                paddingVertical: 18,
                alignItems: "center",
                justifyContent: "center",
                marginVertical: verticalScale(15),
              }}
            >
              <Text style={{ color: "white", fontSize: 22, fontWeight: 600 }}>
                Sync Now
              </Text>
            </Pressable>
        
      </View>
    </View>
  )
}

export default SyncScreen

const styles = StyleSheet.create({})