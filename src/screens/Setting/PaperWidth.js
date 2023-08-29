import { StyleSheet, Text, View,Pressable } from 'react-native'
import React,{useState} from 'react'
import { Iconify } from 'react-native-iconify'
import { theme } from '../../styles/stylesheet'
import { verticalScale,scale } from 'react-native-size-matters'
import { fonts } from '../../styles/unistyle'
const RadioButton = ({name,state,setState})=>{
  //console.log(flag)
  return(<Pressable onPress={()=>setState(name)} style={{marginHorizontal:25,backgroundColor:'#fff',height:61,borderRadius:10,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
      <View style={{flexDirection:'row',}}>
      <Text style={[{paddingRight:10,},fonts.ptext]}>{name}</Text></View>
        {state==name?<Iconify icon='ic:outline-radio-button-checked' color={theme.color.primary}/>:<Iconify icon='ic:round-radio-button-unchecked' color={theme.color.gray}/>}
      </Pressable>)
}

const PaperWidth = ({navigation}) => {
  const[active,setActive]=useState('A4')

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
        <Text style={[fonts.h1]}>Paper Width</Text>
        <Pressable>
        </Pressable>
      </View>
      <View style={{marginHorizontal:25}}><Text style={[fonts.ptext]}>Select your paper preference </Text></View>
    <View style={{flexDirection:'row'}}>
      <RadioButton name="A4" state={active} setState={setActive} />
      <RadioButton name="A3" state={active} setState={setActive} /></View>
    </View>
  )
}

export default PaperWidth

const styles = StyleSheet.create({})