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
import React,{useState} from 'react';
import {theme} from '../../styles/stylesheet';
import {Iconify} from 'react-native-iconify';
import {LinearTextGradient} from 'react-native-text-gradient';
import {verticalScale, scale} from 'react-native-size-matters';

const LogIn = ({navigation}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const onLogin=async()=>{
    await AsyncStorage.setItem("User", true);
  }
  return (
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
          <View style={{width:'100%',alignItems:'flex-end',paddingHorizontal:scale(8),marginTop:verticalScale(10)}}><Pressable onPress={()=>navigation.navigate("ForgotPassword")}><Text style={{color:theme.color.primary,fontSize:18,fontWeight:600}}>Forgot Password?</Text></Pressable></View>
          <Pressable
          onPress={()=>navigation.navigate("MainStack")}
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
    </View>
  );
};

export default LogIn;

const styles = StyleSheet.create({});
