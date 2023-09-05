import {StyleSheet, Text, View,Switch} from 'react-native';
import React,{useState} from 'react';
import TopNavigationBar from '../../components/top_navigation/TopNavigationBar';
import {Lable} from './More';
import {Iconify} from 'react-native-iconify';
import { theme } from '../../styles/stylesheet';
import i18n from '../../language/i18n';


const Security = ({navigation}) => {
    const [isEnabled2S, setIsEnabled2S] = useState(true)
    const toggleSwitch2S = () => setIsEnabled2S(previousState => !previousState);
  const lables = [
    {
      lable: i18n.t("changepassword"),
      Icon: () => <Iconify icon="mdi:password" size={20} />,
      forwardTo: 'ChangePassword',
      arrow: false,
    },
    {
      lable: 'Sync',
      Icon: () => <Iconify icon="eva:sync-fill" size={20} />,
      forwardTo: 'SyncScreen',
      arrow: ()=><View>
      <View style={{alignItems:'flex-end'}}>{false?<Iconify icon='ic:baseline-wifi-off' size={16} color={theme.color.primary}/>:<Iconify icon='ic:baseline-wifi' size={16} color={theme.color.green}/>}
      <View style={{flexDirection:'row',alignItems:'center',gap:10}}><Text>1 sec ago</Text><Iconify icon='eva:sync-fill' size={18} color={false?theme.color.primary:theme.color.green}  /></View></View>
    </View>,
    },
    {
      lable: 'Two-Step Authentication',
      Icon: () => <Iconify icon="carbon:two-factor-authentication" size={20} />,
      forwardTo: '',
      arrow: ()=> (<View>
      <Switch
        trackColor={{false: '#d8d8d8', true: theme.color.green}}
        thumbColor={isEnabled2S ? '#fff' : '#fff'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch2S}
        value={isEnabled2S}
      />
    </View>),
    },
    {
      lable: 'Active Sessions',
      Icon: () => <Iconify icon="fluent:phone-24-filled" size={20} />,
      forwardTo: 'ActiveSessionScreen',
      arrow: false,
    },
  ];
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{paddingHorizontal: 20}}>
        <TopNavigationBar backIcon={true} middleLabel={'Security'} onPressBack={()=>navigation.goBack()} />
      </View>
      <View style={{paddingHorizontal: 20}}>
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
  );
};

export default Security;

const styles = StyleSheet.create({});
