import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TopNavigationBar from '../../components/top_navigation/TopNavigationBar'
import { Iconify } from 'react-native-iconify'
import { Lable } from './More'
import i18n from '../../language/i18n'


const Preference = ({navigation}) => {
    const lables =[ {
        lable: i18n.t("language"),
        Icon: () => <Iconify icon="clarity:language-solid" size={20} />,
        forwardTo: 'Language',
        arrow: false,
      },
      {
        lable: i18n.t("currency"),
        Icon: () => <Iconify icon="clarity:language-solid" size={20} />,
        forwardTo: 'Currency',
        arrow: false,
      },];

  return (
    <View style={{flex:1,backgroundColor:'#fff'}}>
     <View style={{paddingHorizontal:20}}><TopNavigationBar backIcon={true} onPressBack={()=>navigation.goBack()} middleLabel={"Preference"} /></View>
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

export default Preference

const styles = StyleSheet.create({})