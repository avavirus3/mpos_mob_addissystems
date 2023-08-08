import { StyleSheet, Text, View, TextInput,Pressable } from 'react-native'
import React,{useState} from 'react'
// import TabNavigation from '../../routes/TabNavigation'
// import  from '../../components/top_navigation/TopNavigationBar'
import { verticalScale, scale } from 'react-native-size-matters'
import { theme } from '../../styles/stylesheet'
import { Iconify } from 'react-native-iconify'
import TopNavigationBar from '../../components/top_navigation/TopNavigationBar'
import { DoneModals} from '../../components/modal/Modals'
import PhoneCode from "../../components/modal/PhoneCode";
import { phoneData } from "../../../data/phonedata";

import realm from '../../../data/Realm'
const AddCustomer = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneModal, setPhoneModal] = useState(false);
  const [phoneCode,setPhoneCode]=useState( {
    name: "Ethiopia",
    dial_code: "+251",
    code: "ET",
  Flag:()=><Iconify icon='twemoji:flag-ethiopia' size={30} />},)
  const [done,setDone]=useState(false)
  return (
    <View style={{flex:1}}>
    <DoneModals message={"done"} modalVisible={done} setModalVisible={setDone}/>
    <PhoneCode modalVisible={phoneModal} setModalVisible={setPhoneModal} setResult={setPhoneCode} />
      <View style={{ paddingHorizontal: 0 }}>
      <View style={{ paddingHorizontal: scale(20) }}>
        <TopNavigationBar
        onPressBack={()=>navigation.goBack()}
        backIcon={"back"}
        middleLabel={"Add Customer"}
          onGoCondition={theme.color.primary}
           />
      </View>
        <View style={{ marginHorizontal: scale(25),marginVertical:verticalScale(15) }}>
          <View style={{ marginBottom: verticalScale(15) }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 500,
                height: 25,
                marginBottom: 6,
                color: "#cacaca"
              }}
            >
              Full Name
            </Text>
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                borderRadius: 10,
                borderWidth: 1.5,
                borderColor: theme.color.blue,
                fontSize: 18,
                paddingLeft: 20,
                alignItems: "center",
              }}
            >
              <Iconify
                icon="mdi:person-outline"
                size={18}
                color={"#cacaca"}
              />
              <TextInput
                style={{
                  fontSize: 18,
                  flex: 1
                }}
                placeholder="Full Name"
              />
            </View>
          </View>
          <View style={{ marginBottom: verticalScale(15) }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 500,
                height: 25,
                marginBottom: 6,
                color: "#cacaca"
              }}
            >
              Email
            </Text>
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                borderRadius: 10,
                borderWidth: 1.5,
                borderColor: theme.color.blue,
                fontSize: 18,
                paddingLeft: 20,
                alignItems: "center",
              }}
            >
              <Iconify
                icon="mdi:email-outline"
                size={18}
                color={"#cacaca"}
              />
              <TextInput
                style={{
                  fontSize: 18,
                  flex: 1
                }}
                placeholder="Email"
              />
            </View>
          </View>
          <View style={{ marginBottom: verticalScale(15)}}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 500,
                  height: 25,
                  marginBottom: 6,
                  color: 'gray'
                }}
              >
                Phone Number
              </Text>
              <Pressable
                onPress={() => setPhoneModal(true)}
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
                {phoneCode?<View style={{ flexDirection: "row", alignItems: "center" }}>
                 {<phoneCode.Flag />}
                  <Text style={{ fontSize: 18, paddingLeft: 9 }}>{phoneCode?.dial_code}</Text>
                  <Iconify icon="mdi:menu-down" size={18} />
                </View>:null}

                <TextInput
                  value={phoneNumber}
                  onChangeText={(text) => setPhoneNumber(text)}
                  keyboardType="numeric"
                  style={{ fontSize: 18, alignItems: "center", flex: 1, color: 'black' }}
                  placeholderTextColor={"black"}
                  placeholder={"98765433"}
                />
              </Pressable>
            </View>
          <View style={{ marginBottom: verticalScale(15) }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 500,
                height: 25,
                marginBottom: 6,
                color: "#cacaca"
              }}
            >
              Address
            </Text>
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                borderRadius: 10,
                borderWidth: 1.5,
                borderColor: theme.color.blue,
                fontSize: 18,
                paddingLeft: 20,
                alignItems: "center",
              }}
            >
              <Iconify
                icon="mdi:address-marker-outline"
                size={18}
                color={"#cacaca"}
              />
              <TextInput
                style={{
                  fontSize: 18,
                  flex: 1
                }}
                placeholder="City, Street Address, Woreda, H.No"
              />
            </View>
          </View>
          <View style={{ marginBottom: verticalScale(15) }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 500,
                height: 25,
                marginBottom: 6,
                color: "#cacaca"
              }}
            >
              TIN
            </Text>
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                borderRadius: 10,
                borderWidth: 1.5,
                borderColor: theme.color.blue,
                fontSize: 18,
                paddingLeft: 20,
                alignItems: "center",
              }}
            >
              <Iconify
                icon="pepicons-pencil:bulletin-notice"
                size={18}
                color={"#cacaca"}
              />
              <TextInput
              keyboardType='numeric'
                style={{
                  fontSize: 18,
                  flex: 1
                }}
                placeholder="TIN"
              />
            </View>
          </View>
          <Pressable
          onPress={()=>setDone(true)}
              style={{
                borderRadius: 10,
                backgroundColor: theme.color.primary,
                paddingVertical: 18,
                alignItems: "center",
                justifyContent: "center",
                marginVertical: verticalScale(15),
              }}
            >
              <Text style={{ color: "white", fontSize: 22, fontWeight: 600 }}>
                Save
              </Text>
            </Pressable>
          </View></View>
    </View>
  )
}

export default AddCustomer

const styles = StyleSheet.create({})