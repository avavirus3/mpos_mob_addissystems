import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import React,{useState} from "react";
import { verticalScale, scale } from "react-native-size-matters";
import { Iconify } from "react-native-iconify";
import { theme } from "../../styles/stylesheet";
import PhoneCode from "../../components/modal/PhoneCode";

const Edit = ({ navigation }) => {
  const [phoneModal,setPhoneModal]= useState(false)
    const [phoneCode,setPhoneCode]=useState( {
      name: "Ethiopia",
      dial_code: "+251",
      code: "ET",
    Flag:()=><Iconify icon='twemoji:flag-ethiopia' size={30} />},)
  return (
    <View style={{ flex: 1, backgroundColor: "white", paddingBottom: 0 }}>
     <PhoneCode modalVisible={phoneModal} setModalVisible={setPhoneModal} setResult={setPhoneCode}/>
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#fff",
          height: verticalScale(66),
          justifyContent: "space-between",
          paddingHorizontal: scale(25),
          alignItems: "center",
          //paddingVertical:0
        }}
      >
        <Pressable onPress={() => navigation.goBack()}>
          <Iconify icon="ion:chevron-back-outline" size={20} />
        </Pressable>
        <Text style={{ fontSize: scale(22), fontWeight: 600 }}>Edit</Text>
        <View></View>
      </View>
      <ScrollView>
        <View style={{ alignItems: "center", marginHorizontal: scale(25) }}>
          <View><Image
            source={{ uri: "https://robohash.org/78" }}
            style={{
              height: 131,
              width: 131,
              borderRadius: 131,
              borderWidth: 1,
              borderColor: theme.color.blue,
              backgroundColor: theme.color.lightGray,
              //marginTop: -65,
              marginVertical: 15,
            }}
          />
          <View style={{backgroundColor:'#F9F7F7',height:40,width:40,position:'reletive',left:90,bottom:60,borderRadius:30,borderWidth:2,borderColor:'white',alignItems:'center',justifyContent:'center'}}>
            <Iconify icon="fluent:edit-24-filled" size={20}/>
          </View>
          </View>
          <View style={{ width: "100%" }}>
            <View style={{ marginBottom: verticalScale(15) }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 500,
                  height: 25,
                  marginBottom: 6,
                }}
              >
                Full Name
              </Text>
              <TextInput
                style={{
                  width: "100%",
                  borderRadius: 10,
                  borderWidth: 1.5,
                  borderColor: theme.color.blue,
                  fontSize: 18,
                  paddingLeft: 20,
                }}
                placeholder="Abebe Kebede"
              />
            </View>
            <View style={{ marginBottom: verticalScale(15) }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 500,
                  height: 25,
                  marginBottom: 6,
                }}
              >
                Email
              </Text>
              <TextInput
                style={{
                  width: "100%",
                  borderRadius: 10,
                  borderWidth: 1.5,
                  borderColor: theme.color.blue,
                  fontSize: 18,
                  paddingLeft: 20,
                }}
                placeholder="abcd@gmail.com"
              />
            </View>
            <View style={{ marginBottom: verticalScale(15),backgroundColor:"white" }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 500,
                  height: 25,
                  marginBottom: 6,
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
            </View>
            <View style={{ marginBottom: verticalScale(15) }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 500,
                  height: 25,
                  marginBottom: 6,
                }}
              >
                Organization Name
              </Text>
              <TextInput
                style={{
                  width: "100%",
                  borderRadius: 10,
                  borderWidth: 1.5,
                  borderColor: theme.color.blue,
                  fontSize: 18,
                  paddingLeft: 20,
                }}
                placeholder="ABC PLC"
              />
            </View>
            <View style={{ marginBottom: verticalScale(15) }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 500,
                  height: 25,
                  marginBottom: 6,
                }}
              >
                License Number
              </Text>
              <TextInput
                style={{
                  width: "100%",
                  borderRadius: 10,
                  borderWidth: 1.5,
                  borderColor: theme.color.blue,
                  fontSize: 18,
                  paddingLeft: 20,
                }}
                placeholder="2548516"
              />
            </View>
            <View style={{ marginBottom: verticalScale(15) }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 500,
                  height: 25,
                  marginBottom: 6,
                }}
              >
                TIN
              </Text>
              <TextInput
                style={{
                  width: "100%",
                  borderRadius: 10,
                  borderWidth: 1.5,
                  borderColor: theme.color.blue,
                  fontSize: 18,
                  paddingLeft: 20,
                }}
                placeholder="0987654321"
              />
            </View>
            <Pressable
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
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Edit;

const styles = StyleSheet.create({});
