import {StyleSheet, Text, View, Pressable, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import TopNavigationBar from '../../components/top_navigation/TopNavigationBar';
import {theme} from '../../styles/stylesheet';
import {Iconify} from 'react-native-iconify';
import {scale, verticalScale} from 'react-native-size-matters';
import {fonts} from '../../styles/unistyle';
import i18n from '../../language/i18n';

export const Lable = ({lable, Icon, navigation, arrow,forward}) => {
  const Arrow =arrow
  return (
    <Pressable
      onPress={forward?() => navigation.navigate(forward, {screen: 'setting'}):()=>null}
      style={{
        backgroundColor: '#fff',
        paddingVertical: 10,
        //marginHorizontal: scale(25),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderColor: theme.color.lightGray,
        //   borderBottomWidth: 1,
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {/* <Iconify icon="mdi:password" size={scale(20)} /> */}
        <Icon />
        <View style={{paddingHorizontal: scale(10)}}>
          <Text style={[fonts.h3, {fontWeight: '500'}]}>{lable}</Text>
        </View>
      </View>
      <View>
        {arrow ? (
         <Arrow />
        ) :  <Iconify icon="ion:chevron-forward-outline" size={20} />}
      </View>
    </Pressable>
  );
};

const More = ({navigation}) => {
  const [isEnabled, setIsEnabled] = useState(true);
  const [isEnabled2S, setIsEnabled2S] = useState(true);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const toggleSwitch2S = () => setIsEnabled2S(previousState => !previousState);
  const [modalVisible, setModalVisible] = useState(false);
  // const {data:imgdata,pending:pendingimage} = useFetchRealm({uri:"Image",id:"300"})
  const [imgdata, setImgdata] = useState(); //.filter(`_id==`)
  const [token, setToken] = useState();
  const [profiledata, setProfiledata] = useState();
  const [langs, setLangs] = useState();
  // const {data:profiledata,pending:pe

 
  const lables = [
    {
      lable: 'CONTENT',
      Icon: () => (
        <Iconify
          icon="streamline:interface-content-archive-folder-outbox-content-folder-archive-file-inbox"
          size={20}
        />
      ),
      forwardTo: 'Content',
      arrow: false,
    },
    {
      lable: 'SECURITY',
      Icon: () => <Iconify icon="material-symbols:security" size={20} />,
      forwardTo: 'Security',
      arrow: false,
    },
    {
      lable: 'PREFERENCE',
      Icon: () => <Iconify icon="pajamas:preferences" size={20} />,
      forwardTo: 'Preference',
      arrow: false,
    },
    {
      lable: 'SETTING',
      Icon: () => <Iconify icon="uil:setting" size={20} />,
      forwardTo: 'Settings',
      arrow: false,
    }, {
      lable: 'LEGACY',
      Icon: () => <Iconify icon="ep:info-filled" size={20} />,
      forwardTo: 'Legacy',
      arrow: false,
    },
  ];
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{paddingHorizontal: 20}}>
        <TopNavigationBar
          backLabel={'More'}
          thirdLabel={'Log Out'}
          onGoCondition={theme.color.primary}
        />
      </View>
      <Pressable
        onPress={() => navigation.navigate('Profile')}
        style={{
          backgroundColor: '#fff',
          height: verticalScale(89),
          marginHorizontal: scale(25),
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderColor: theme.color.lightGray,
          // borderBottomWidth: 1,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={{
              uri: imgdata?.length
                ? imgdata[0].uri
                : 'https://robohash.org/${profiledata[0]._id}=&size=400x400',
            }} //
            style={{
              height: 64,
              width: 64,
              borderRadius: 32,
              borderWidth: 1,
              borderColor: theme.color.blue,
              backgroundColor: theme.color.lightGray,
            }}
          />
          <View style={{paddingHorizontal: scale(10)}}>
            <Text style={[{color: theme.color.blue}, fonts.h3]}>
              {profiledata ? profiledata[0].organization : 'new'}
            </Text>
            <Text
              style={[
                {
                  color: theme.color.gray,
                },
                fonts.smText,
              ]}>
              {profiledata ? profiledata[0].phonecode : 'new'}{' '}
              {profiledata ? profiledata[0].phone : null}
            </Text>
          </View>
        </View>
        <View>
          <Iconify
            icon="ion:chevron-forward-outline"
            size={20}
            color={'#000'}
          />
        </View>
      </Pressable>
      <View style={{paddingHorizontal: 20}}>
        {lables.map(index => (
          <Lable
            key={index.lable}
            lable={index.lable}
            Icon={index.Icon}
            navigation={navigation}
            arrow={index.arrow}
            forward={index.forwardTo}
          />
        ))}
      </View>
    </View>
  );
};

export default More;

const styles = StyleSheet.create({});
