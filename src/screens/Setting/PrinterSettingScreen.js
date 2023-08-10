import { StyleSheet, Text, View,Pressable } from 'react-native'
import React,{useState} from 'react'
import { Iconify } from 'react-native-iconify'
import { theme } from '../../styles/stylesheet'
import { verticalScale,scale } from 'react-native-size-matters'
const RadioButton = ({name,state,setState})=>{
  //console.log(flag)
  return(<Pressable onPress={()=>setState(name)} style={{marginHorizontal:25,backgroundColor:'#fff',height:61,borderRadius:10,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
      <View style={{flexDirection:'row',}}>
      <Text style={{fontSize:20,paddingRight:10,}}>{name}</Text></View>
        {state==name?<Iconify icon='ic:outline-radio-button-checked' color={theme.color.primary}/>:<Iconify icon='ic:round-radio-button-unchecked' color={theme.color.gray}/>}
      </Pressable>)
}

const PrinterSettingScreen = ({navigation}) => {
  const[active,setActive]=useState('Bluetooth')

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
        <Text style={{ fontSize: scale(22), fontWeight: 600 }}> Printer Setting</Text>
        <Pressable>
        </Pressable>
      </View>
      <View style={{marginHorizontal:25}}><Text style={{fontSize:20,fontWeight:500}}>Select your preference to print invoice </Text></View>
    <View style={{flexDirection:'row'}}>
      <RadioButton name="Wi-Fi" state={active} setState={setActive} />
      <RadioButton name="Bluetooth" state={active} setState={setActive} /></View>
    </View>
  )
}

export default PrinterSettingScreen

const styles = StyleSheet.create({})