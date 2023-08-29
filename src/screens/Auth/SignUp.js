import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Image,
  TextInput,
  NativeModules,
  StatusBar
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {theme} from '../../styles/stylesheet';
import {scale, verticalScale} from 'react-native-size-matters';
import {LinearTextGradient} from 'react-native-text-gradient';
import {Iconify} from 'react-native-iconify';
import {phoneData} from '../../../data/phonedata';
import PhoneCode from '../../components/modal/PhoneCode';
import uuid from 'react-native-uuid';
import realm from '../../database';
import DismissKeyboardHOC from '../../components/DismissKeyboard';
import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import {createUser, isLicence, isTin} from '../../auth/api/fetchData';

const SignUp = ({navigation}) => {
  const queryClient = useQueryClient();
  const [licensePH, setLicensePH] = useState();
  const [timeoutToClear, setTimeoutToClear] = useState();
  const [noTin, setNoTin] = useState(true);
  const [noL, setNol] = useState(true);
  const [phoneModal, setPhoneModal] = useState(false);
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [organization, setOrganization] = useState('');
  const [license, setLicense] = useState('');
  const [tin, setTin] = useState('');
  const [profdata, setProfdata] = useState('');
  const [phoneCode, setPhoneCode] = useState(
    phoneData.find(d => d.dial_code == '+251'),
  );

  useEffect(() => {
    return () => {
      clearTimeout(timeoutToClear);
    };
  }, []);
  const debounce = (callback, alwaysCall, ms = 3000) => {
    return (...args) => {
      alwaysCall(...args);
      clearTimeout(timeoutToClear);
      setTimeoutToClear(
        setTimeout(() => {
          callback(...args);
        }, ms),
      );
    };
  };

  

  const checkLicence = useMutation(isLicence, {
    onSuccess: data => {
      queryClient.invalidateQueries([``]);
      data?setOrganization(data.TradeName):setOrganization("")
      console.log(
        data
          ? data.TradeName
          : '',
      );
      data ? setNol(false) : setNol(true);
      data
        ? Toast.show({
        type: 'success',
        text1: 'correct License',
        //text2: `this inputs are required ${fullname?"":"full"} ${email?"":"email"}, ${phoneNumber?"":"phone"}, ${password?"":"password"}`
      })
        : Toast.show({
            type: 'error',
            text1: 'Wrong License',
            //text2: `this inputs are required ${fullname?"":"full"} ${email?"":"email"}, ${phoneNumber?"":"phone"}, ${password?"":"password"}`
          });
    },
  });
  const createUserQuery = useMutation(createUser,{
    onSuccess:data=>{
      queryClient.invalidateQueries([''])
      data?data.msg?Toast.show({
        type:'error',
        text1:data.msg
      }):(Toast.show({
        type:'success',
        text1:'Done Check ur email'
      })):null
      data?console.log("data",data.msg?data.msg:data.token):console.log(data)
    }
  })
  const checkTin = useMutation(isTin, {
    onSuccess: data => {
      queryClient.invalidateQueries([``]);
      data
        ? setLicensePH(data.BusinessInfo.Businesses[0].LicenceNumber)
        : setLicensePH('');
      data ? setNoTin(false) : setNoTin(true);
      data
        ? /*Toast.show({
        type: 'success',
        text1: 'correct Tin',
        //text2: `this inputs are required ${fullname?"":"full"} ${email?"":"email"}, ${phoneNumber?"":"phone"}, ${password?"":"password"}`
      })*/ null
        : Toast.show({
            type: 'error',
            text1: 'Wrong Tin',
            //text2: `this inputs are required ${fullname?"":"full"} ${email?"":"email"}, ${phoneNumber?"":"phone"}, ${password?"":"password"}`
          });
    },
  });
 const hamdleUser=async(user)=>{
  const newuser =user 
  if(user) await createUserQuery.mutateAsync(newuser) 
 }
  const handletin = async tin => {
    const newData = tin;
    //console.log(newData)
    if (tin) await checkTin.mutateAsync(newData);
  };
  const debounceTin = debounce(handletin,(text => {
    setNoTin(true), setTin(text);
  }), 3000);

  const handleLicence = async licence => {
    const newData = licence;
    //console.log(newData)
    await checkLicence.mutateAsync(newData);
  };
  const debounceLicence = debounce(handleLicence,(text => {
    setNol(true), setLicense(text);
  }), 3000);
  

  const onSignUp = () => {
    if (  email  && phoneCode && phoneNumber&&organization) {
      
     const user= {
      
        "businessname": organization,
        "Fname": "",
        "Lname": "",
        "email": email,
        "phone": phoneCode.dial_code + phoneNumber,
        "licence_no": license,
        "Country": "Ethiopia",
        "CityName": ""
      
     }
      hamdleUser(user)
      // return (
      //   realm.write(() =>
      //     realm.create('Profile', {
      //       _id: uuid.v4(),
      //       fullname: fullname,
      //       email: email,
      //       phone: phoneNumber,
      //       license: license,
      //       organization: organization,
      //       tin: tin,
      //       password: password,
      //       phonecode: phoneCode.dial_code,
      //     }),
      //   ),
      //   navigation.navigate('OTP')
      // );
    } else {
      Toast.show({
        type: 'error',
        text1: 'Input required',
        text2: `this inputs are required ${fullname ? '' : 'full'} ${
          email ? '' : 'email'
        }, ${phoneNumber ? '' : 'phone'}, ${password ? '' : 'password'}`,
      });
    }
  };
 

  return (
    <DismissKeyboardHOC>
      <View style={{flex: 1, backgroundColor: theme.color.white}}>
         <StatusBar
        translucent={false}
        backgroundColor={theme.color.white}
        barStyle={'dark-content'}
      />

        <PhoneCode
          modalVisible={phoneModal}
          setModalVisible={setPhoneModal}
          setResult={setPhoneCode}
        />
        <ScrollView>
          <View style={{marginBottom: 50}}>
            <View style={{padding: 20, width: '100%'}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: verticalScale(30),
                }}>
                <Pressable
                  onPress={() => navigation.goBack()}
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
              <View
                style={{alignItems: 'center', paddingHorizontal: scale(10)}}>
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
                {/* <View style={{marginTop: verticalScale(15)}}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: 500,
                      height: 25,
                      marginBottom: 6,
                      color: '#cacaca',
                    }}>
                    {' '}
                    Full Name
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      width: '100%',
                      borderRadius: 10,
                      borderWidth: 1.5,
                      borderColor: theme.color.blue,
                      fontSize: 18,
                      paddingLeft: 20,
                      alignItems: 'center',
                    }}>
                    <Iconify
                      icon="mdi:person-outline"
                      size={18}
                      color={'#cacaca'}
                    />
                    <TextInput
                      value={fullname}
                      onChangeText={text => setFullname(text)}
                      style={{
                        fontSize: 18,
                        flex: 1,
                        color: 'black',
                      }}
                      placeholder="Full Name"
                      placeholderTextColor={theme.color.gray}
                    />
                  </View>
                </View> */}
                <View style={{marginTop: verticalScale(15)}}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: 500,
                      height: 25,
                      marginBottom: 6,
                      color: '#cacaca',
                    }}>
                    {' '}
                    Email
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      width: '100%',
                      borderRadius: 10,
                      borderWidth: 1.5,
                      borderColor: theme.color.blue,
                      fontSize: 18,
                      paddingLeft: 20,
                      alignItems: 'center',
                    }}>
                    <Iconify
                      icon="mdi:email-outline"
                      size={18}
                      color={'#cacaca'}
                    />
                    <TextInput
                      value={email}
                      onChangeText={text => setEmail(text)}
                      style={{
                        fontSize: 18,
                        flex: 1,
                        color: 'black',
                      }}
                      placeholder="Email"
                      placeholderTextColor={theme.color.gray}
                    />
                  </View>
                </View>
                {/* <View style={{marginTop: verticalScale(15)}}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: 500,
                      height: 25,
                      marginBottom: 6,
                      color: '#cacaca',
                    }}>
                    {' '}
                    Password
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      width: '100%',
                      borderRadius: 10,
                      borderWidth: 1.5,
                      borderColor: theme.color.blue,
                      fontSize: 18,
                      paddingLeft: 20,
                      alignItems: 'center',
                    }}>
                    <Iconify
                      icon="material-symbols:lock-outline"
                      size={18}
                      color={'#cacaca'}
                    />
                    <TextInput
                      value={password}
                      onChangeText={text => setPassword(text)}
                      style={{
                        fontSize: 18,
                        flex: 1,
                        color: 'black',
                      }}
                      placeholder="Password"
                      placeholderTextColor={theme.color.gray}
                    />
                  </View>
                </View> */}

                <View style={{marginTop: verticalScale(15), width: '100%'}}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: 500,
                      height: 25,
                      marginBottom: 6,
                      color: theme.color.gray,
                    }}>
                    Phone Number
                  </Text>
                  <Pressable
                    onPress={() => setPhoneModal(true)}
                    style={{
                      flexDirection: 'row',
                      width: '100%',
                      borderRadius: 10,
                      borderWidth: 1.5,
                      borderColor: theme.color.blue,
                      fontSize: 18,
                      paddingLeft: 20,
                      alignItems: 'center',
                    }}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      {<phoneCode.Flag />}
                      <Text style={{fontSize: 18, paddingLeft: 9}}>
                        {phoneCode.dial_code}
                      </Text>
                      <Iconify icon="mdi:menu-down" size={18} />
                    </View>

                    <TextInput
                      value={phoneNumber}
                      onChangeText={text =>{
                        if (/^\d+$/.test(text)||text === '')setPhoneNumber(text);
                      }}
                      style={{
                        flex: 1,
                        fontSize: 18,
                        alignItems: 'center',
                        color: 'black',
                      }}
                      keyboardType="numeric"
                      placeholderTextColor={theme.color.gray}
                      placeholder="911223344"
                    />
                  </Pressable>
                </View>
                <View style={{marginTop: verticalScale(15)}}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: 500,
                      height: 25,
                      marginBottom: 6,
                      color: '#cacaca',
                    }}>
                    {' '}
                    Organization
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      width: '100%',
                      borderRadius: 10,
                      borderWidth: 1.5,
                      borderColor: theme.color.blue,
                      fontSize: 18,
                      paddingLeft: 20,
                      alignItems: 'center',
                    }}>
                    <Iconify
                      icon="icons8:organization"
                      size={18}
                      color={'#cacaca'}
                    />
                    <TextInput
                      value={organization}
                      onChangeText={text => setOrganization(text)}
                      style={{
                        fontSize: 18,
                        flex: 1,
                        color: 'black',
                      }}
                      placeholder="organization"
                      placeholderTextColor={theme.color.gray}
                    />
                  </View>
                </View>
                <View style={{marginTop: verticalScale(15)}}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: 500,
                      height: 25,
                      marginBottom: 6,
                      color: '#cacaca',
                    }}>
                    {' '}
                    License
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      width: '100%',
                      borderRadius: 10,
                      borderWidth: 1.5,
                      borderColor: theme.color.blue,
                      fontSize: 18,
                      paddingLeft: 20,
                      alignItems: 'center',
                    }}>
                    <Iconify
                      icon="carbon:license"
                      size={18}
                      color={'#cacaca'}
                    />
                    <TextInput
                      value={license}
                      //keyboardType='numeric'
                      onChangeText={debounceLicence}
                      style={{
                        fontSize: 18,
                        flex: 1,
                        color: 'black',
                      }}
                      placeholder="license"
                      placeholderTextColor={theme.color.gray}
                    />
                  </View>
                </View>
                <View style={{marginTop: verticalScale(15)}}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: 500,
                      height: 25,
                      marginBottom: 6,
                      color: '#cacaca',
                    }}>
                    {' '}
                    TIN
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      width: '100%',
                      borderRadius: 10,
                      borderWidth: 1.5,
                      borderColor: theme.color.blue,
                      fontSize: 18,
                      paddingLeft: 20,
                      alignItems: 'center',
                    }}>
                    <Iconify
                      icon="pepicons-pencil:bulletin-notice"
                      size={18}
                      color={'#cacaca'}
                    />
                    <TextInput
                      value={tin}
                      keyboardType="numeric"
                      onChangeText={debounceTin}
                      style={{
                        fontSize: 18,
                        flex: 1,
                        color: 'black',
                      }}
                      placeholder="TIN"
                      placeholderTextColor={theme.color.gray}
                    />
                  </View>
                </View>

                <Pressable
                  onPress={() => {
                    console.log(licensePH == license);
                    !noL && !noTin && licensePH == license
                      ? onSignUp()
                      : Toast.show({
                          type: 'error',
                          text1: 'Check Your License',
                          text2: 'wrong License or Wait until its verified',
                        });
                    //navigation.navigate("OTP")
                  }}
                  style={{
                    borderRadius: 10,
                    backgroundColor:
                    noL && noTin && licensePH != license
                        ? theme.color.gray
                        : theme.color.primary,
                    paddingVertical: 18,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginVertical: verticalScale(60),

                    width: '100%',
                  }}>
                  <Text style={{color: 'white', fontSize: 22, fontWeight: 600}}>
                    SIGN UP
                  </Text>
                </Pressable>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    columnGap: scale(7),
                  }}>
                  <Text style={{fontSize: 20, fontWeight: 500}}>
                    Have an account?
                  </Text>
                  <Pressable onPress={() => navigation.navigate('LogIn')}>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: 600,
                        color: theme.color.primary,
                      }}>
                      SIGN IN
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </DismissKeyboardHOC>
  );
};

export default SignUp;

const styles = StyleSheet.create({});
