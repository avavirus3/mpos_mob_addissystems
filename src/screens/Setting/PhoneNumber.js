import { StyleSheet, Text, View, TextInput,Pressable } from 'react-native'
import React,{useState} from 'react'
import TopNavigationBar from '../../components/top_navigation/TopNavigationBar'
import { theme } from '../../styles/stylesheet'
import { verticalScale } from 'react-native-size-matters'
import { Iconify } from 'react-native-iconify'
import PhoneCode from '../../components/modal/PhoneCode'
const PhoneNumber = ({ navigation }) => {
    const [phoneModal,setPhoneModal]= useState(false)
    const [phoneCode,setPhoneCode]=useState( {
      name: "Ethiopia",
      dial_code: "+251",
      code: "ET",
    Flag:()=><Iconify icon='twemoji:flag-ethiopia' size={30} />},)
    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <PhoneCode modalVisible={phoneModal} setModalVisible={setPhoneModal} setResult={setPhoneCode}/>
            <View style={{ paddingHorizontal: 20 }}>
                <TopNavigationBar backIcon={true} onPressBack={() => navigation.goBack()} middleLabel={"Phone Number"} thirdLabel={"Next"} onGoCondition={theme.color.primary} onPressGo={()=>navigation.navigate("ActivationCode")} /></View>
            <View style={{ paddingHorizontal: 20 }}>
                <View style={{ marginBottom: verticalScale(15) }}>
                    <Text
                        style={{
                            fontSize: 18,
                            fontWeight: 500,
                            height: 25,
                            marginBottom: 6,
                            color: theme.color.lightGray
                        }}
                    >
                        Phone Number
                    </Text>
                    <Pressable
                    onPress={()=>setPhoneModal(true)}
                        style={{
                            width: "100%",
                            borderRadius: 10,
                            borderWidth: 1.5,
                            borderColor: theme.color.blue,
                            flexDirection: "row",
                            alignItems: "center",
                            paddingLeft: 20,
                        }}
                    >
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            {<phoneCode.Flag />}
                            <Text style={{ fontSize: 18, paddingLeft: 9 }}>{phoneCode.dial_code}</Text>
                            <Iconify icon="mdi:menu-down" size={18} />
                        </View>

                        <TextInput
                            style={{ fontSize: 18, alignItems: "center" }}
                            placeholderTextColor={theme.color.lightGray}
                            placeholder="911223344"
                        />
                    </Pressable>
                </View></View>
        </View>
    )
}

export default PhoneNumber

const styles = StyleSheet.create({})