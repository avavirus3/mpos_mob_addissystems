import { StyleSheet, Text, View, Pressable, Image } from 'react-native'
import React from 'react'
import { verticalScale, scale } from 'react-native-size-matters';
import { theme } from '../../styles/stylesheet';
import { Iconify } from 'react-native-iconify';
//import FloatActionButton from '../../components/FloatActionButton';
const Profile = ({ navigation }) => {
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
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
        <Text style={{ fontSize: scale(22), fontWeight: 600 }}>Profile</Text>
        <Pressable onPress={() => navigation.navigate("Edit")}>
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
          source={{ uri: 'https://randomuser.me/api/portraits/men/6.jpg' }}
          style={{
            height: 131,
            width: 131,
            borderRadius: 131,
            borderWidth: 1,
            borderColor: theme.color.blue,
            backgroundColor: theme.color.lightGray,
            marginTop: -65,
            //marginBottom:20
          }}
        />
        <View style={{ marginVertical: 20,height:verticalScale(27) }}><Text style={styles.boldMd}>ABC PLC</Text></View>
        <View style={{ paddingHorizontal: 0,  marginLeft: -54 ,}}>
        <View style={{ flexDirection: "row",height:verticalScale(27) }}>
        <Iconify icon='mdi:person-outline' size={20} color={theme.color.blue} />
        <Text style={{paddingHorizontal:10,fontSize:20}}>Abebe Kebede</Text></View>
        <View style={{ flexDirection: "row"  ,height:verticalScale(27) }}>
        <Iconify icon='clarity:email-line' size={20}  color={theme.color.blue}/>
        <Text style={{paddingHorizontal:10,fontSize:20}}>abcd@gmail.com</Text></View>
        <View style={{ flexDirection: "row",height:verticalScale(27)  }}>
        <Iconify icon='tabler:phone' size={20}  color={theme.color.blue}/>
        <Text style={{paddingHorizontal:10,fontSize:20,height:verticalScale(27)}}>0911223344</Text></View>
        <View style={{ flexDirection: "row",height:verticalScale(27) }}>
        <Iconify icon='carbon:license' size={20}  color={theme.color.blue}/>
        <Text style={{paddingHorizontal:10,fontSize:20}}>098765432</Text></View>
        <View style={{ flexDirection: "row", height:verticalScale(27),marginBottom:20  }}>
        <Iconify icon='pepicons-pencil:bulletin-notice' size={20} color={theme.color.blue} />
        <Text style={{paddingHorizontal:10,fontSize:20}}>1234567890</Text></View>
        </View>
      </View>
    </View>
  );
}

export default Profile

const styles = StyleSheet.create({
  boldMd: {
    fontSize: 20,
    fontWeight: "600",
    // fontFamily: "Nunito Sans;"
  },
})