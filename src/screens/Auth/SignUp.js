import { StyleSheet, Text, View,ScrollView, Pressable, Image, TextInput, NativeModules } from 'react-native'
import React,{useState} from 'react'
import { theme } from '../../styles/stylesheet'
import { scale, verticalScale } from 'react-native-size-matters'
import { LinearTextGradient } from 'react-native-text-gradient'
import { Iconify } from 'react-native-iconify'
import { phoneData } from '../../../data/phonedata'
import PhoneCode from '../../components/modal/PhoneCode'
import uuid from 'react-native-uuid';
import realm from '../../database'

const SignUp = ({navigation}) => {
  const onSignUp=()=>{
      // console.log("Profile",{
      //   _id:"id",
      //   fullname:fullname,
      //   email:email,
      //   phone:phoneNumber,
      //   license:license,
      //   organization:organization,
      //   tin:tin,
      //   password:password,
      //   phonecode:phoneCode.dial_code,
        
      // })
      if(fullname && email && password && phoneCode && phoneNumber){

        return (realm.write(()=>realm.create("Profile",{
        _id:uuid.v4(),
        fullname:fullname,
        email:email,
        phone:phoneNumber,
        license:license,
        organization:organization,
        tin:tin,
        password:password,
        phonecode:phoneCode.dial_code,
        
      })),navigation.navigate("OTP"))

    }
      else{
        console.log('no input')
      }

  }
  const [phoneModal, setPhoneModal] = useState(false);
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('');
  const [organization, setOrganization] = useState('');
  const [license, setLicense] = useState('');
  const [tin, setTin] = useState('');
  const[profdata,setProfdata]=useState('');
  const [phoneCode, setPhoneCode] = useState(phoneData.find((d)=>d.dial_code=="+251"))
  return (
    
    <View style={{flex:1,backgroundColor:theme.color.white}}>
      <PhoneCode modalVisible={phoneModal} setModalVisible={setPhoneModal} setResult={setPhoneCode} />
      <ScrollView><View style={{marginBottom:50}}>
      <View style={{padding: 20, width: '100%'}}>
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
          <Text style={{fontSize: 25, fontWeight: 600}}>Sign Up</Text>
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
             {" "} Full Name
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
                icon="mdi:person-outline"
                size={18}
                color={"#cacaca"}
              />
              <TextInput
              value={fullname}
              onChangeText={(text)=>setFullname(text)}
                style={{
                  fontSize: 18,
                  flex: 1,
                  color:'black'
                }}
                placeholder="Full Name"
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
                            <Text style={{ fontSize: 18, paddingLeft: 9, }}>{phoneCode.dial_code}</Text>
                            <Iconify icon="mdi:menu-down" size={18} />
                        </View>

                        <TextInput
                        value={phoneNumber}
                        onChangeText={text=>setPhoneNumber(text)}
                            style={{ flex:1,fontSize: 18, alignItems: "center" ,color:'black'}}
                            keyboardType='numeric'
                            placeholderTextColor={theme.color.gray}
                            placeholder="911223344"
                        />
                    </Pressable>
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
             {" "}  Organization
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
                icon="icons8:organization"
                size={18}
                color={"#cacaca"}
              />
              <TextInput
              value={organization}
              onChangeText={(text)=>setOrganization(text)}
                style={{
                  fontSize: 18,
                  flex: 1,
                  color:'black'
                }}
                placeholder="organization"
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
             {" "}  License
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
                icon="carbon:license"
                size={18}
                color={"#cacaca"}
              />
              <TextInput
              value={license}
              keyboardType='numeric'
              onChangeText={(text)=>setLicense(text)}
                style={{
                  fontSize: 18,
                  flex: 1,
                  color:'black'
                }}
                placeholder="license"
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
             {" "}  TIN
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
                icon="pepicons-pencil:bulletin-notice"
                size={18}
                color={"#cacaca"}
              />
              <TextInput
              value={tin}
              keyboardType='numeric'
              onChangeText={(text)=>setTin(text)}
                style={{
                  fontSize: 18,
                  flex: 1,
                  color:'black'
                }}
                placeholder="TIN"
                placeholderTextColor={theme.color.gray}
              />
            </View>
            
          </View>
          
          <Pressable
          onPress={()=>{
            onSignUp()
            //navigation.navigate("OTP")
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
                SIGN UP
              </Text>
            </Pressable>
            <View style={{flexDirection:'row',alignItems:'center',columnGap:scale(7)}}><Text style={{fontSize:20,fontWeight:500}}>Have an account?</Text><Pressable onPress={()=>navigation.navigate("LogIn")}><Text style={{fontSize:20,fontWeight:600,color:theme.color.primary}}>SIGN IN</Text></Pressable></View>
        </View>
      </View></View></ScrollView>

      
    </View>
  )
}

export default SignUp

const styles = StyleSheet.create({})