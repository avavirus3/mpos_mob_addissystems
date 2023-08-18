import {StyleSheet, Text, View, Pressable, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {verticalScale, scale} from 'react-native-size-matters';
import {theme} from '../../styles/stylesheet';
import {Iconify} from 'react-native-iconify';
//import FloatActionButton from '../../components/FloatActionButton';
import realm from '../../database/index';
import useFetchRealm from '../../hooks/customHooks/useFetchRealm';
import {useFocusEffect} from '@react-navigation/native';
import {getToken, loadCredentials} from '../../auth/token/Token';

const Profile = ({navigation}) => {
  const imageuri = `https://robohash.org/${Math.random() * 100}=&size=400x400`;
  const [profiledata, setProfiledata] = useState();
  const [token, setToken] = useState();
  const[imgdata,setImgdata]=useState()
  //const {data:imgdata,pending:pendingimage} = useFetchRealm({uri:"Image",id:"300"})
  const pendingimage = false;
  //const[profiledata,setprofiledata]=useState('');

  useEffect(() => {
    loadCredentials().then(r => (r ? setProfiledata(r) : null));
    //getData();
  }, []);
  useEffect(() => {
    const img = realm.objects("Image")
    if (img.length <= 0 && profiledata) {
      realm.write(() =>
        realm.create('Image', {
          _id: uuid.v4(),
          profileId: profiledata[0]._id,
          type: 'url',
          name: 'profilename',
          uri: `https://robohash.org/${profiledata[0]._id}=&size=400x400`,
        }),
      );
    }
    if (img.length > 0 && profiledata)
      setImgdata(
        img ? img.filter(d => d.profileId == profiledata[0]._id) : null,
      );
  }, [profiledata]);
  useFocusEffect(
    React.useCallback(() => {
      loadCredentials().then(r => (r ? setProfiledata(r) : null));
      //  console.log("hi");

      return () => loadCredentials().then(r => (r ? setProfiledata(r) : null));
    }, []),
  );
  // u
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
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
        <Text style={{fontSize: scale(22), fontWeight: 600}}>Profile</Text>
        <Pressable onPress={() => navigation.navigate('Edit')}>
          <Text
            style={{
              fontSize: scale(22),
              color: theme.color.primary,
              fontWeight: 600,
            }}>
            Edit
          </Text>
        </Pressable>
      </View>
      <View
        style={{
          // height:verticalScale(361),
          backgroundColor: '#F9F7F7',
          borderRadius: 10,
          marginVertical: 122,
          marginHorizontal: 25,
          alignItems: 'center',
          //paddingVertical:-10
        }}>
        <Image
          source={{uri: imgdata?imgdata[0].uri:`https://robohash.org/${Math.random() * 100}=&size=400x400`}}
          style={{
            height: 131,
            width: 131,
            borderRadius: 131,
            borderWidth: 1,
            borderColor: theme.color.blue,
            backgroundColor: theme.color.lightPrimary,
            marginTop: -65,
            //marginBottom:20
          }}
        />
        <View style={{marginVertical: 20, height: verticalScale(27)}}>
          <Text style={styles.boldMd}>
            {profiledata ? profiledata[0].organization : 'ABC Plc'}
          </Text>
        </View>
        <View style={{paddingHorizontal: 0, marginLeft: -54}}>
          <View style={{flexDirection: 'row', height: verticalScale(27)}}>
            <Iconify
              icon="mdi:person-outline"
              size={20}
              color={theme.color.blue}
            />
            <Text style={{paddingHorizontal: 10, fontSize: 20}}>
              {profiledata ? profiledata[0].fullname : 'abebe'}
            </Text>
          </View>
          <View style={{flexDirection: 'row', height: verticalScale(27)}}>
            <Iconify
              icon="clarity:email-line"
              size={20}
              color={theme.color.blue}
            />
            <Text style={{paddingHorizontal: 10, fontSize: 20}}>
              {profiledata ? profiledata[0].email : 'abc@gmail.com'}
            </Text>
          </View>
          <View style={{flexDirection: 'row', height: verticalScale(27)}}>
            <Iconify icon="tabler:phone" size={20} color={theme.color.blue} />
            <Text
              style={{
                paddingHorizontal: 10,
                fontSize: 20,
                height: verticalScale(27),
              }}>
              {profiledata
                ? profiledata[0]?.phonecode + ' ' + profiledata[0]?.phone
                : '+2518254558'}
            </Text>
          </View>
          <View style={{flexDirection: 'row', height: verticalScale(27)}}>
            <Iconify icon="carbon:license" size={20} color={theme.color.blue} />
            <Text style={{paddingHorizontal: 10, fontSize: 20}}>
              {profiledata ? profiledata[0].license : '762345'}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              height: verticalScale(27),
              marginBottom: 20,
            }}>
            <Iconify
              icon="pepicons-pencil:bulletin-notice"
              size={20}
              color={theme.color.blue}
            />
            <Text style={{paddingHorizontal: 10, fontSize: 20}}>
              {profiledata ? profiledata[0].tin : '65432345'}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  boldMd: {
    fontSize: 20,
    fontWeight: '600',
    // fontFamily: "Nunito Sans;"
  },
});
