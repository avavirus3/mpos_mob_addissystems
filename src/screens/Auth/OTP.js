import { StyleSheet, Text, View,Pressable,Image,TextInput,Keyboard } from 'react-native'
import React,{useState,useEffect,useRef} from 'react'
import { theme } from '../../styles/stylesheet'
import { verticalScale,scale } from 'react-native-size-matters'
import { Iconify } from 'react-native-iconify'
import { LinearTextGradient } from 'react-native-text-gradient'
import { dat, phoneData } from '../../../data/phonedata'
import PhoneCode from '../../components/modal/PhoneCode'
import { Toast } from 'react-native-toast-message/lib/src/Toast'


const OTP = ({navigation,route}) => {
 const data= route.params?.data
 const user = route.params?.user
  console.log(data,user)
 
  const [phoneModal, setPhoneModal] = useState(false);
  const[otp,setOtp]=useState(["","","",""])
  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp)
  };const sum=(otp) => {
    let result =""
    for(const x of otp) { result += x}
    return result
  }
  //console.log(sum(otp))
  const input1=useRef()
  const input2=useRef()
  const input3=useRef()
  const input4=useRef()
  const [phoneCode, setPhoneCode] = useState(phoneData.find((d)=>d.dial_code=="+251"))
  useEffect(() => {
if(!otp[0])input1.current?.focus()
else if(otp[0]&&!otp[1])input2.current?.focus()
else if(otp[1]&&!otp[2])input3.current?.focus()
else if(otp[2]&&!otp[3])input4.current?.focus()
else Keyboard.dismiss()
  }, [otp])
  
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
    <TextInput ref={input1} style={styles.inputCode} value={otp[0]} onChangeText={(text)=>handleOtpChange(0,text)}  maxLength={1} keyboardType='numeric' />
        </View>
        <View style={{borderWidth:1,borderColor:theme.color.blue,}}>
    <TextInput ref={input2} style={styles.inputCode}  value={otp[1]} onChangeText={(text)=>handleOtpChange(1,text)}  maxLength={1} keyboardType='numeric' />
        </View>
        <View style={{borderWidth:1,borderColor:theme.color.blue,}}>
    <TextInput ref={input3} style={styles.inputCode}  value={otp[2]} onChangeText={(text)=>handleOtpChange(2,text)} maxLength={1} keyboardType='numeric' />
        </View>
        <View style={{borderWidth:1,borderColor:theme.color.blue,}}>
    <TextInput ref={input4} style={styles.inputCode}  value={otp[3]} onChangeText={(text)=>handleOtpChange(3,text)}  maxLength={1} keyboardType='numeric' />
        </View>
          </View>
        
        </View>
        <Pressable
          // onPress={()=>(sum(otp)==data.message.otp)?navigation.navigate("MainStack"):Toast.show({type:'error',text1:"wrong otp"})}
          onPress={()=>navigation.navigate("ChangePasswordScreen",{screen:'otp'})}  
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