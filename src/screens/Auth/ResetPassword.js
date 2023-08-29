import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import {theme} from '../../styles/stylesheet';
import {verticalScale, scale} from 'react-native-size-matters';
import {Iconify} from 'react-native-iconify';
import {LinearTextGradient} from 'react-native-text-gradient';
import {phoneData} from '../../../data/phonedata';
import PhoneCode from '../../components/modal/PhoneCode';
import { fonts } from '../../styles/unistyle';

const ResetPassword = ({navigation}) => {
  const [password, setPassword] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');

  return (
    <View style={{flex: 1, backgroundColor: theme.color.white}}>
      <View style={{paddingHorizontal: 20}}>
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
      </View>
      <View style={{alignItems: 'center'}}>
        <LinearTextGradient
          style={{
            fontWeight: '600',
            fontSize: 24,
            marginVertical: verticalScale(20),
          }}
          locations={[0, 1]}
          colors={[theme.color.blue, theme.color.primary]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}>
          <Text>M-POS</Text>
        </LinearTextGradient>
        <Text style={[fonts.h1]}>Reset Password</Text>
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            paddingHorizontal: scale(20),
          }}>
          <View style={{marginVertical: 20}}>
            <Text style={[fonts.ptext]}>
              Please enter your New Password
            </Text>
          </View>
          <View style={{width: '100%'}}>
            <View style={{marginTop: verticalScale(15)}}>
              <Text
                style={[{
                  marginBottom: 6,
                  color: '#cacaca',
                },fonts.ptext]}>
                {' '}
                New Password
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
                  icon="material-symbols:lock-outline"
                  size={18}
                  color={'#cacaca'}
                />
                <TextInput
                  value={password}
                  onChangeText={text => setPassword(text)}
                  style={[{
                    flex: 1,
                    color: 'black',
                  },fonts.h3]}
                  placeholder="New Password"
                  placeholderTextColor={theme.color.gray}
                />
              </View>
            </View>
            <View style={{marginTop: verticalScale(15)}}>
              <Text
                style={[{
                  marginBottom: 6,
                  color: '#cacaca',
                },fonts.ptext]}>
                {' '}
                Confirm Password
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
                  icon="material-symbols:lock-outline"
                  size={18}
                  color={'#cacaca'}
                />
                <TextInput
                  value={ConfirmPassword}
                  onChangeText={text => setConfirmPassword(text)}
                  style={[{
                    flex: 1,
                    color: 'black',
                  },fonts.h3]}
                  placeholder="Confirm Password"
                  placeholderTextColor={theme.color.gray}
                />
              </View>
            </View>
          </View>
          <Pressable
            onPress={() => navigation.navigate('ResetPassword')}
            style={{
              borderRadius: 10,
              backgroundColor: theme.color.primary,
              paddingVertical: 18,
              alignItems: 'center',
              justifyContent: 'center',
              marginVertical: verticalScale(30),

              width: '100%',
            }}>
            <Text style={[{color: 'white',},fonts.h1]}>
              Reset
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({});
