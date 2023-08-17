import { StyleSheet, Text, View,Pressable,Image,TextInput } from 'react-native'
import React,{useState} from 'react'
import { theme } from '../../styles/stylesheet'
import { verticalScale,scale } from 'react-native-size-matters'
import { Iconify } from 'react-native-iconify'
import { LinearTextGradient } from 'react-native-text-gradient'
import { phoneData } from '../../../data/phonedata'
import PhoneCode from '../../components/modal/PhoneCode'


const OTP = ({navigation}) => {
  const [phoneModal, setPhoneModal] = useState(false);
  const [phoneCode, setPhoneCode] = useState(phoneData.find((d)=>d.dial_code=="+251"))
  return (
    <View style={{flex:1,backgroundColor:theme.color.white}}>
      <PhoneCode modalVisible={phoneModal} setModalVisible={setPhoneModal} setResult={setPhoneCode} />
      <View style={{paddingHorizontal:20}}>
      <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: verticalScale(30),
          }}>
          <Pressable
          onPress={()=>navigation.goBack()}
            style={{
              padding: 5,
              borderRadius: 20,
              backgroundColor: theme.color.lighterGray,
            }}>
            <Iconify icon="ic:round-arrow-back" size={30} />
          </Pressable>
          <Image
            source={require('../../assets/images/addissystemslogoinline.png')}
            resizeMode="contain"
            style={{maxWidth: 262, maxHeight: scale(38)}}
          />
          <View></View>
          
        </View>
        </View>
        <View style={{alignItems:'center'}}>
        <LinearTextGradient
            style={{
              fontWeight: '600',
              fontSize: 25,
              marginVertical: verticalScale(20),
            }}
            locations={[0, 1]}
            colors={[theme.color.blue, theme.color.primary]}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}>
            <Text>M-POS</Text>
          </LinearTextGradient>
          <Text style={{fontSize: 25, fontWeight: 600}}>Enter OTP</Text>
          <View style={{width:'100%',alignItems:'center',paddingHorizontal:scale(20)}}>
         <View style={{marginVertical:20}}><Text style={{fontSize:18,fontWeight:500}}>We have sent the code to your Phone Number</Text></View>
        <View style={{width:"100%"}}>
          <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
          <View style={{borderWidth:1,borderColor:theme.color.blue,}}>
    <TextInput style={styles.inputCode}  maxLength={1} keyboardType='numeric' />
        </View>
        <View style={{borderWidth:1,borderColor:theme.color.blue,}}>
    <TextInput style={styles.inputCode}  maxLength={1} keyboardType='numeric' />
        </View>
        <View style={{borderWidth:1,borderColor:theme.color.blue,}}>
    <TextInput style={styles.inputCode}  maxLength={1} keyboardType='numeric' />
        </View>
        <View style={{borderWidth:1,borderColor:theme.color.blue,}}>
    <TextInput style={styles.inputCode}  maxLength={1} keyboardType='numeric' />
        </View>
          </View>
        
        </View>
        <Pressable
          onPress={()=>navigation.navigate("MainStack")}
              style={{
                borderRadius: 10,
                backgroundColor: theme.color.primary,
                paddingVertical: 18,
                alignItems: "center",
                justifyContent: "center",
                marginVertical: verticalScale(30),
                
                width:'100%'
              }}
            >
              <Text style={{ color: "white", fontSize: 22, fontWeight: 600 }}>
                Next
              </Text>
            </Pressable>
        </View>
        </View>
    </View>
  )
}

export default OTP

const styles = StyleSheet.create({inputCode:{
  backgroundColor:'#F9F7F7',
  //padding:0,
  fontSize:40,
  paddingHorizontal:verticalScale(20),
  color:theme.color.blue,

  
}})