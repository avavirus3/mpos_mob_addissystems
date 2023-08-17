import { StyleSheet, Text, View,Pressable,Image,TextInput } from 'react-native'
import React,{useState} from 'react'
import { theme } from '../../styles/stylesheet'
import { verticalScale,scale } from 'react-native-size-matters'
import { Iconify } from 'react-native-iconify'
import { LinearTextGradient } from 'react-native-text-gradient'
import { phoneData } from '../../../data/phonedata'
import PhoneCode from '../../components/modal/PhoneCode'


const ForgotPassword = ({navigation}) => {
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
          <Text style={{fontSize: 25, fontWeight: 600}}>Forgot Password</Text>
          <View style={{width:'100%',alignItems:'center',paddingHorizontal:scale(20)}}>
         <View style={{marginVertical:20}}><Text style={{fontSize:18,fontWeight:500}}>Please enter your Phone Number</Text></View>
        <View style={{width:"100%"}}>
        <View style={{ marginTop: verticalScale(15),width:'100%' }}>
                    <Text
                        style={{
                            fontSize: 18,
                            fontWeight: 500,
                            height: 25,
                            marginBottom: 6,
                            color: theme.color.gray
                        }}
                    >
                        Phone Number
                    </Text>
                    <Pressable
                    onPress={()=>setPhoneModal(true)}
                        style={{
                          flexDirection: "row",
                          width: "100%",
                          borderRadius: 10,
                          borderWidth: 1.5,
                          borderColor: theme.color.blue,
                          fontSize: 18,
                          paddingLeft: 20,
                          alignItems: "center",
                        }}
                    >
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            {<phoneCode.Flag />}
                            <Text style={{ fontSize: 18, paddingLeft: 9 }}>{phoneCode.dial_code}</Text>
                            <Iconify icon="mdi:menu-down" size={18} />
                        </View>

                        <TextInput
                            style={{ fontSize: 18, alignItems: "center" }}
                            placeholderTextColor={theme.color.gray}
                            placeholder="911223344"
                        />
                    </Pressable>
                </View>
        </View>
        <Pressable
          onPress={()=>navigation.navigate("ResetPassword")}
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

export default ForgotPassword

const styles = StyleSheet.create({})