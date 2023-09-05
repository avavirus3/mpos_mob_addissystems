import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TopNavigationBar from '../../components/top_navigation/TopNavigationBar'
import { Lable } from './More'
import { Iconify } from 'react-native-iconify'

const Setting = ({navigation}) => {
  const lables=[{
    lable: 'Notification',
    Icon: () => (
      <Iconify
        icon="clarity:notification-solid"
        size={20}
      />
    ),
    forwardTo: 'Notification',
    arrow: false,
  },
  {
    lable: 'Printer Setting',
    Icon: () => <Iconify icon="mdi:printer" size={20} />,
    forwardTo: 'PrinterSettingcreen',
    arrow: false,
  },
  {
    lable: 'Paper Width',
    Icon: () => <Iconify icon="mingcute:paper-fill" size={20} />,
    forwardTo: 'PaperWidth',
    arrow: false,
  },
]
  return (
    <View style={{flex:1,backgroundColor:'#fff'}}>
      <View style={{paddingHorizontal:20}}><TopNavigationBar backIcon={true} onPressBack={()=>navigation.goBack()} middleLabel={"Setting"} /></View>
      <View style={{paddingHorizontal:20}}>
      {lables.map(({lable, Icon, forwardTo, arrow}) => (
          <Lable
          key={lable}
            forward={forwardTo}
            arrow={arrow}
            lable={lable}
            Icon={Icon}
            navigation={navigation}
          />
        ))}
      </View>
    </View>
  )
}

export default Setting

const styles = StyleSheet.create({})