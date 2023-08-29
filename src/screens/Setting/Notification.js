import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TopNavigationBar from '../../components/top_navigation/TopNavigationBar'
import { Iconify } from 'react-native-iconify'
import{scale,verticalScale} from 'react-native-size-matters'
import Svg, { Use, Defs, Image,Path } from "react-native-svg"
import { theme } from '../../styles/stylesheet'
import { fonts } from '../../styles/unistyle'

const NotificationView =({message='null'})=>{
  return (
    <View style={{flexDirection:"row",alignItems:'center',justifyContent:'space-between',backgroundColor:theme.color.lightBlue,paddingHorizontal:20,paddingVertical:22}}>
      <View style={{flexDirection:'row',gap:10}}><View style={{backgroundColor:theme.color.green,borderRadius:13 ,padding:2,height:23,width:23}}>
        <Iconify icon='charm:tick' size={18} color={'#fff'} />
      </View>
      <View style={{maxWidth:250}}>
      <Text style={[{maxWidth:300},fonts.ptext]}>{message}</Text>
      </View></View>
      <View style={{backgroundColor:theme.color.blue,width:scale(10),height:verticalScale(10),borderRadius:20}}></View>
      </View>
  )
}

const Notification = ({navigation}) => {
  return (
    <View style={{flex:1,backgroundColor:"#fff"}}>
      <View style={{paddingHorizontal:20}}><TopNavigationBar backIcon={true} onPressBack={()=>navigation.goBack()} middleLabel={'Notification'} /></View>
      <NotificationView width={25} height={25} message='You have successfully changed your password.' />
      <View style={{paddingHorizontal:20}}>
      <View style={{borderBottomWidth:1,borderColor:theme.color.lightGray,paddingVertical:20}}><Text style={[fonts.h3]}>Update Available</Text></View></View>
    </View>
  )
}

export default Notification

// const styles = StyleSheet.create({})

//import { View, StyleSheet } from 'react-native';



export const MySvgComponent = (props) => {
  return (
    <View style={styles.container}>
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    style={{
      fillRule: "evenodd",
      clipRule: "evenodd",
      strokeLinejoin: "round",
      strokeMiterlimit: 2,
    }}
    viewBox="0 0 503 489"
    {...props}
  >
    <Path
      d="M216 251.774c-14.118-.002-27.737-.002-42.502-.002 4.416-7.457 8.14-14.047 12.147-20.46 21.44-34.314 42.877-68.632 64.467-102.853 12.82-20.321 44.514-19.755 57.872.872 24.62 38.018 49.392 75.938 73.81 114.085 16.245 25.379 31.726 51.248 48.008 76.602 28.318 44.093.035 100.533-44.502 113.677-3.182.939-6.492 1.449-9.75 2.125-9.182 1.903-15.933-.951-21.188-9.109-35.974-55.846-72.234-111.508-108.235-167.337-3.268-5.067-7.501-7.288-13.132-7.462-5.494-.169-10.996-.1-16.995-.138Z"
      style={{
        fill: "#01a16a",
        fillRule: "nonzero",
      }}
    />
    <Path
      d="M126.654 323.635c6.754-10.538 13.424-20.703 19.825-31.035 3.875-6.254 9.407-9.418 16.554-9.384 21.323.102 42.646.409 63.969.69 4.899.065 8.681 2.574 11.244 6.49 18.79 28.708 37.467 57.49 56.161 86.261.235.362.233.878.645 2.563-8.289.142-16.33 1.321-24.041.211-21.056-3.03-37.566 3.291-49.855 20.889-14.59 20.894-35.871 30.511-60.185 34.619-10.53 1.78-21.035 2.642-31.708.331-27.524-5.958-46.599-39.328-29.812-68.716 8.333-14.587 17.962-28.434 27.203-42.919Z"
      style={{
        fill: "#fca01b",
        fillRule: "nonzero",
      }}
    />
  </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});


