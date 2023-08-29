import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  StatusBar,
  Image,
  Pressable
} from 'react-native';
import React,{useEffect, useState} from 'react';
import {theme} from '../../styles/stylesheet';
import {Iconify} from 'react-native-iconify';
import {LinearTextGradient} from 'react-native-text-gradient';
import {verticalScale, scale} from 'react-native-size-matters';
import realm from '../../database';
import DismissKeyboardHOC from '../../components/DismissKeyboard';
// import useFetchRealm from '../../hooks/customHooks/useFetchRealm';
import EncryptedStorage from 'react-native-encrypted-storage';
import { getToken } from '../../auth/token/Token';
import * as Keychain from 'react-native-keychain';

const LogIn = ({navigation}) => {
  const [email, setEmail] = useState('')
  const [incorrect, setIncorrect] = useState(false)
  const [password, setPassword] = useState('')
  //const [token,setToken]=useState()
  const saveCredentials = async (email,password) => {
    try {
      await Keychain.setGenericPassword(email,password);

    } catch (error) {
      console.error('Error saving credentials:', error);
    }
  };
  const loadCredentials = async (user,password) => {
    try {
      const credentials = await Keychain.getGenericPassword();
      if (credentials) {
        let x
        x=(user==credentials.username&& password==credentials.password)
        return x
      } else {
  
        return null
      }
    } catch (error) {
      console.error('Error retrieving credentials:', error);
    }
  };
 
  useEffect(()=>{
    
  },[])
  const onLogin=()=>{
if(email&&password){
  const data=  realm.objects("Profile");
  //console.log("New",data)
  
  
}
   const data=  realm.objects("Profile");
  
  try{
    let d=data.filter(d=>email==d.email)
  
  if(!password || !email || 
    (data.filter(d=>email==d.email)[0]==undefined||data.filter(d=>email==d.email)[0].password!=password))return setIncorrect(true)
  if(password && 
    data.filter(d=>email==d.email)[0].password==password){
    
 loadCredentials(data?.filter(d=>email==d.email)[0]._id,password).then(result=>result?navigation.navigate("MainStack"):saveCredentials(data.filter(d=>email==d.email)[0]._id,password))

     
      
      
      //loadCredentials(data.filter(d=>email==d.email)[0]._id,password).then(result=>console.log(result))
      navigation.navigate("MainStack")

}}
  catch(e){
    console.log(e)
  } 
   
  }
  return (<DismissKeyboardHOC>
    <View style={{backgroundColor: theme.color.white, flex: 1}}>
      <StatusBar
        translucent={false}
        backgroundColor={theme.color.white}
        barStyle={'dark-content'}
      />
      <View style={{padding: 20, width: '100%'}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: verticalScale(30),
          }}>
          <View
            style={{
              padding: 5,
              borderRadius: 20,
              backgroundColor: theme.color.white,
            }}>
            {/* <Iconify icon="ic:round-arrow-back" size={30} /> */}
          </View>
          <Image
            source={require('../../assets/images/addissystemslogoinline.png')}
            resizeMode="contain"
            style={{maxWidth: 262, maxHeight: scale(38)}}
          />
          <View></View>
        </View>
        <View style={{alignItems: 'center',paddingHorizontal:scale(10)}}>
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
          <Text style={{fontSize: 25, fontWeight: 600}}>Sign In</Text>
          <View style={{ marginTop: verticalScale(15) }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 500,
                height: 25,
                marginBottom: 6,
                color: "#cacaca"
              }}
            >
             {" "}  Email
            </Text>
            <View
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
              <Iconify
                icon="mdi:email-outline"
                size={18}
                color={"#cacaca"}
              />
              <TextInput
              value={email}
              onChangeText={(text)=>setEmail(text)}
                style={{
                  fontSize: 18,
                  flex: 1,
                  color:'black'
                }}
                placeholder="Email"
                placeholderTextColor={theme.color.gray}
              />
            </View>
          </View>
          <View style={{ marginTop: verticalScale(15) }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 500,
                height: 25,
                marginBottom: 6,
                color: "#cacaca"
              }}
            >
             {" "}  Password
            </Text>
            <View
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
              <Iconify
                icon="material-symbols:lock-outline"
                size={18}
                color={"#cacaca"}
              />
              <TextInput
              value={password}
              onChangeText={(text)=>setPassword(text)}
                style={{
                  fontSize: 18,
                  flex: 1,
                  color:'black'
                }}
                placeholder="Password"
                placeholderTextColor={theme.color.gray}
              />
            </View>
          </View>
          <View style={{width:'100%',alignItems:'flex-start',justifyContent:'space-between',flexDirection:'row',paddingHorizontal:scale(8),marginTop:verticalScale(10)}}><Text style={{color:theme.color.primary,fontSize:18,fontWeight:600}}>{incorrect?"Incorrect Input":null}</Text><Pressable onPress={()=>navigation.navigate("ForgotPassword")}><Text style={{color:theme.color.primary,fontSize:18,fontWeight:600}}>Forgot Password?</Text></Pressable></View>
          <Pressable
          onPress={()=>{
            onLogin()
           // navigation.navigate("MainStack")
          }}
              style={{
                borderRadius: 10,
                backgroundColor: theme.color.primary,
                paddingVertical: 18,
                alignItems: "center",
                justifyContent: "center",
                marginVertical: verticalScale(60),
                
                width:'100%'
              }}
            >
              <Text style={{ color: "white", fontSize: 22, fontWeight: 600 }}>
                SIGN IN
              </Text>
            </Pressable>
            <View style={{flexDirection:'row',alignItems:'center',columnGap:scale(7)}}><Text style={{fontSize:20,fontWeight:500}}>Don’t have an account?</Text><Pressable onPress={()=>navigation.navigate("SignUp")}><Text style={{fontSize:20,fontWeight:600,color:theme.color.primary}}>SIGN UP</Text></Pressable></View>
        </View>
      </View>
    </View></DismissKeyboardHOC>
  );
};

export default LogIn;

const styles = StyleSheet.create({});
