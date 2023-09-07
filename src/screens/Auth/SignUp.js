import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Image,
  TextInput,
  NativeModules,
  StatusBar,
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
import {fonts} from '../../styles/unistyle';
import {sendotp} from '../../auth/api/otpApi';
import { Modal,ActivityIndicator } from 'react-native';
import { reglocal } from '../../auth/api/localReg';

const LoadingModal=({modalVisible})=>{
  return(<Modal 
  animationType='fade'
  transparent={true}
  visible={modalVisible}
  statusBarTranslucent={true}
  >
    <View style={{justifyContent:'center',alignItems:'center',flex:1,backgroundColor: 'rgba(135, 135, 135,0.5)',}}>
      <View style={styles.modalView}>
        <ActivityIndicator size={"large"} color={theme.color.primary} />

      </View>

    </View>

  </Modal>)
}

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
  //console.log(noL, noTin);
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
  const optMutation = useMutation(
   sendotp,{onSuccess: data =>{
    console.log(data)
   }}
  )
  const handleOtp =async(name)=>{
    await optMutation.mutateAsync(name)
  }
//console.log("otp:mutetion",optMutation.isLoading)
  const checkLicence = useMutation(isLicence, {
    onSuccess: data => {
      queryClient.invalidateQueries([``]);
      data ? setOrganization(data.TradeName) : setOrganization('');
      console.log(data ? data.TradeName : '');
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
  const createUserQuery = useMutation(createUser, {
    onSuccess: data => {
      queryClient.invalidateQueries(['']);
      data
        ? data.msg
          ? Toast.show({
              type: 'error',
              text1: data.msg,
            })
          : Toast.show({
              type: 'success',
              text1: 'Done Check ur email',
            })
        : null;
      data
        ? console.log('data', data.msg ? data.msg : data.token)
        : console.log(data);
    },
  });
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
  const hamdleUser = async user => {
    const newuser = user;
    if (user) await createUserQuery.mutateAsync(newuser);
  };
  const handletin = async tin => {
    const newData = tin;
    //console.log(newData)
    if (tin) await checkTin.mutateAsync(newData);
  };
  const debounceTin = debounce(
    handletin,
    text => {
      setNoTin(true), setTin(text);
    },
    3000,
  );

  const handleLicence = async licence => {
    const newData = licence;
    //console.log(newData)
    await checkLicence.mutateAsync(newData);
  };
  const debounceLicence = debounce(
    handleLicence,
    text => {
      setNol(true), setLicense(text);
    },
    3000,
  );
  const locReg=async()=>{
    const user=  {
      "Fname": "abebe",
      "Lname": "lema",
      "BusinessName": "ABC Plc.",
      "password": "112233",
      "phone": "1234567",
      "PlanType": "basic",
      "email": "abebes@gmail.com"
    }
   reglocal(user)
  }

  const onSignUp = async () => {
    // aandleOtp
    if (email && phoneCode && phoneNumber && organization) {
    const result = await sendotp({name: phoneCode.dial_code + phoneNumber});
    console.log(result);
    if (result.message != undefined){
      const user={
        _id: uuid.v4(),
        email: email,
        phone: phoneNumber,
        license: license,
        organization: organization,
        tin: tin,
        phonecode: phoneCode.dial_code,
      }
      return navigation.navigate('OTP', {data: result,user});}
    else {
      return Toast.show({
        type: 'error',
        text1: 'unknown phone number',
      });
    }}
    // if (email && phoneCode && phoneNumber && organization) {
    //   const user = {
    //     businessname: organization,
    //     Fname: '',
    //     Lname: '',
    //     email: email,
    //     phone: phoneCode.dial_code + phoneNumber,
    //     licence_no: license,
    //     Country: 'Ethiopia',
    //     CityName: '',
    //   };
    //   // hamdleUser(user)

    //   sendotp({name: phoneCode.dial_code + phoneNumber});
    //   // return (
    //   //   realm.write(() =>
    //   //     realm.create('Profile', {
    //   //       _id: uuid.v4(),
    //   //       fullname: fullname,
    //   //       email: email,
    //   //       phone: phoneNumber,
    //   //       license: license,
    //   //       organization: organization,
    //   //       tin: tin,
    //   //       password: password,
    //   //       phonecode: phoneCode.dial_code,
    //   //     }),
    //   //   ),
    //   //   navigation.navigate('OTP')
    //   // );
    // } else {
    //   Toast.show({
    //     type: 'error',
    //     text1: 'Input required',
    //     text2: `this inputs are required ${fullname ? '' : 'full'} ${
    //       email ? '' : 'email'
    //     }, ${phoneNumber ? '' : 'phone'}, ${password ? '' : 'password'}`,
    //   });
    // }
  };

  return (
   
      <View style={{flex: 1, backgroundColor: theme.color.white}}>

        <LoadingModal modalVisible={optMutation.isLoading} />
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
        <DismissKeyboardHOC>
          <View style={{marginBottom: 50}}>
            <View style={{padding: 20, width: '100%'}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: verticalScale(20),
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
                    fontSize: 24,
                    marginVertical: verticalScale(10),
                  }}
                  locations={[0, 1]}
                  colors={[theme.color.blue, theme.color.primary]}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}>
                  <Text>M-POS</Text>
                </LinearTextGradient>
                <Text style={[fonts.h1]}>Sign Up</Text>
                {/* <View style={{marginTop: verticalScale(15)}}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: 500,
                   
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
                    style={[
                      {
                        marginBottom: 6,
                        color: '#cacaca',
                      },
                      fonts.ptext,
                    ]}>
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
                      style={[
                        {
                          flex: 1,
                          color: 'black',
                        },
                        fonts.h3,
                      ]}
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
                    style={[
                      {
                        marginBottom: 6,
                        color: theme.color.gray,
                      },
                      fonts.ptext,
                    ]}>
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
                      paddingLeft: 20,
                      alignItems: 'center',
                    }}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      {<phoneCode.Flag />}
                      <Text style={[{paddingLeft: 9}, fonts.ptext]}>
                        {phoneCode.dial_code}
                      </Text>
                      <Iconify icon="mdi:menu-down" size={18} />
                    </View>

                    <TextInput
                      value={phoneNumber}
                      onChangeText={text => {
                        if (/^\d+$/.test(text) || text === '')
                          setPhoneNumber(text);
                      }}
                      style={[
                        {
                          flex: 1,
                          alignItems: 'center',
                          color: 'black',
                        },
                        fonts.h3,
                      ]}
                      keyboardType="numeric"
                      placeholderTextColor={theme.color.gray}
                      placeholder="911223344"
                    />
                  </Pressable>
                </View>
                <View style={{marginTop: verticalScale(15)}}>
                  <Text
                    style={[
                      {
                        marginBottom: 6,
                        color: '#cacaca',
                      },
                      fonts.ptext,
                    ]}>
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
                      style={[
                        {
                          flex: 1,
                          color: 'black',
                        },
                        fonts.h3,
                      ]}
                      placeholder="organization"
                      placeholderTextColor={theme.color.gray}
                    />
                  </View>
                </View>
                <View style={{marginTop: verticalScale(15)}}>
                  <Text
                    style={[
                      {
                        marginBottom: 6,
                        color: '#cacaca',
                      },
                      fonts.ptext,
                    ]}>
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
                      onChangeText={text => {
                        if (!text) setNol(true);
                        if (text) setNol(false);
                        setLicense(text);
                      }} //debounceLicence //(text)=>{if(text)setNol(false)setLicense(text)}
                      style={[
                        {
                          flex: 1,
                          color: 'black',
                        },
                        fonts.h3,
                      ]}
                      placeholder="license"
                      placeholderTextColor={theme.color.gray}
                    />
                  </View>
                </View>
                <View style={{marginTop: verticalScale(15)}}>
                  <Text
                    style={[
                      {
                        marginBottom: 6,
                        color: '#cacaca',
                      },
                      fonts.ptext,
                    ]}>
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
                      onChangeText={text => {
                       if(!text) setNoTin(true);
                       if(text) setNoTin(false);
                        setTin(text);
                      }} //debounceTin //(text)=>{setNoTin(false);setTin(text)}
                      style={[
                        {
                          flex: 1,
                          color: 'black',
                        },
                        fonts.h3,
                      ]}
                      placeholder="TIN"
                      placeholderTextColor={theme.color.gray}
                    />
                  </View>
                </View>

                <Pressable
                  onPress={() => {
                    // console.log(licensePH == license);
                    // !noL && !noTin // && licensePH == license
                    //   ? onSignUp()
                    //   : Toast.show({
                    //       type: 'error',
                    //       text1: 'Check Your License',
                    //       text2: 'wrong License or Wait until its verified',
                    //     });
                    // handleOtp({name:phoneCode.dial_code+phoneNumber})
                    locReg()
                     navigation.navigate("OTP")
                  }}
                  style={{
                    borderRadius: 10,
                    backgroundColor:
                      !noL && !noTin //&& licensePH != license
                        ? theme.color.primary
                        : theme.color.gray,
                    paddingVertical: 18,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginVertical: verticalScale(40),

                    width: '100%',
                  }}>
                  <Text style={[{color: 'white'}, fonts.h1]}>SIGN UP</Text>
                </Pressable>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    columnGap: scale(7),
                  }}>
                  <Text style={[fonts.ptext]}>Have an account?</Text>
                  <Pressable onPress={() => navigation.navigate('LogIn')}>
                    <Text
                      style={[
                        {
                          color: theme.color.primary,
                        },
                        fonts.ptext,
                      ]}>
                      SIGN IN
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
          </DismissKeyboardHOC>
        </ScrollView>
      </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({});
