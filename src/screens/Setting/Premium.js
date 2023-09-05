import {StyleSheet, Text, View,Pressable} from 'react-native';
import React from 'react';
import TopNavigationBar from '../../components/top_navigation/TopNavigationBar';
import {theme} from '../../styles/stylesheet';
import { fonts } from '../../styles/unistyle';
import { Iconify } from 'react-native-iconify';
import { scale, verticalScale } from 'react-native-size-matters';


const Premium = ({navigation}) => {
    const packages=[{
        name:'Lorem Ipsum',
        basic:true,
        Premium:true
    },
    {
        name:'Lorem Ipsum',
        basic:true,
        Premium:true
    },
    {
        name:'Lorem Ipsum',
        basic:true,
        Premium:true
    },
    {
        name:'Lorem Ipsum',
        basic:false,
        Premium:true
    },
    {
        name:'Lorem Ipsum',
        basic:false,
        Premium:true
    },
    {
        name:'Lorem Ipsum',
        basic:false,
        Premium:true
    },    
]
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{paddingHorizontal: 20}}>
        <TopNavigationBar
          backIcon={true}
          middleLabel={'Premium'}
          onPressBack={() => navigation.goBack()}
        />
      </View>
      <View style={{paddingHorizontal:20,}}>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: theme.color.lighterBlue,
          justifyContent:"space-between",
          alignItems:'center',
          padding:20,
          borderTopLeftRadius:10,
          borderTopRightRadius:10,
        }}>
        <View >
          <Text style={[fonts.h1,{color:theme.color.blue,fontWeight:"600"}]}>Package</Text>
        </View>
        <View>
          <Text style={[fonts.h1,,{fontWeight:"400",color:theme.color.blue}]}>Basic</Text>
        </View>
        <View>
          <Text style={[fonts.h1,{fontWeight:"400",color:theme.color.blue}]}>Premium</Text>
        </View>
      </View>
      {packages.map(({name,basic,Premium})=><View style={{
          flexDirection: 'row',
          //backgroundColor: theme.color.lighterBlue,
          justifyContent:"space-between",
          alignItems:'center',
          padding:20,
          backgroundColor:theme.color.lighterGray
        }}><View><Text style={[fonts.ptext]}>{name}</Text></View>
        <View>{basic?<Iconify icon='mdi:tick-circle' size={20} color={theme.color.green} />:<Iconify icon='ph:x-circle-fill' color={theme.color.primary}/>}</View>
        <View>{Premium?<Iconify icon='mdi:tick-circle' size={20} color={theme.color.green} />:<Iconify icon='ph:x-circle-fill' color={theme.color.primary}/>}</View></View>)}
        <Pressable
      onPress={()=>null}
              style={{
                width:'100%',
                borderRadius: 10,
                backgroundColor: theme.color.primary,
                paddingVertical: 18,
                alignItems: "center",
                justifyContent: "center",
                marginVertical: verticalScale(20),
                elevation:5
              }}
            >
              <Text style={[{ color: "white" },fonts.h1]}>
              UPGRADE TO PREMIUM
              </Text>
            </Pressable>
      </View>
    </View>
  );
};

export default Premium;

const styles = StyleSheet.create({});
