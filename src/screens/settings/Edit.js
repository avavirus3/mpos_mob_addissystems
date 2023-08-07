import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { verticalScale, scale } from "react-native-size-matters";
import { Iconify } from "react-native-iconify";
import { theme } from "../../styles/stylesheet";
import PhoneCode from "../../components/modal/PhoneCode";
import Realm from "realm";
import realm from "../../../data/Realm";
import { phoneData } from "../../../data/phonedata";





const Edit = ({ navigation }) => {
  const [phoneModal, setPhoneModal] = useState(false);
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [organization, setOrganization] = useState('');
  const [license, setLicense] = useState('');
  const [tin, setTin] = useState('');
  const[profdata,setProfdata]=useState('');
  const [phoneCode, setPhoneCode] = useState({
    name: "Ethiopia",
    dial_code: "+251",
    code: "ET",
    Flag: () => <Iconify icon='twemoji:flag-ethiopia' size={30} />
  },)
  const getData= ()=>{
    const profile = realm.objects('MyProfileData').filtered('_id == 198981');
    setProfdata(profile[0])
    console.log(profdata.phonecode)
  }
  console.log(profdata)
  useEffect(()=>{
    getData();
  },[])
  useEffect(()=>{
    if(profdata)setPhoneCode(phoneData.find(phonecodes => phonecodes.dial_code === profdata.phonecode));
  },[profdata])

  const onSaveCreateProfile = async () => {
   // console.log({ fullname, email, phoneNumber, phonecode: phoneCode.dial_code, license, organization, tin })
    // try {
    //   await realm.write(() => {
    //     realm.create("MyProfileData", {
    //       _id: Math.random() * 1000000,
    //       fullname: fullname,
    //       email: email,
    //       phonecode: phoneCode.dial_code,
    //       phone: phoneNumber,
    //       license: license,
    //       organization: organization,
    //       tin: tin,
    //     })
    //   });
    //   // co
    // } catch (e) {
    //   console.log(e)
    // }
    //const tasks = realm.objects('Task').filtered('completed == false');
    // const realm = await Realm.open({
    //     schema:[MyProfileSchema],
    //   });
    // console.log({_id:parseInt(Math.random()*1000),
    //     fullname:fullname,
    //     email:email,
    //     phonecode: phoneCode.dial_code,
    //     phone: phoneNumber,
    //     license:license,
    //     organization:organization,
    //     tin:tin,})
    //       let myprof ={
    //         _id:2,
    //         fullname:fullname,
    //         email:email,
    //         phonecode: phoneCode.dial_code,
    //         phone: phoneNumber,
    //         license:license,
    //         organization:organization,
    //         tin:tin,};
    //         console.log(myprof);
    //  try{ realm.write("MyProfile",{...myprof
    //   });}catch(e){ console.log(e)}
    // realm.write(() => {
    //   const taskToDelete = realm.objects('MyProfileData').filtered('_id == 639323')[0];
    //   if (taskToDelete) {
    //     realm.delete(taskToDelete);
    //   }
    // });
    realm.write(() => {
      const taskToUpdate = realm.objects('MyProfileData').filtered('_id == 198981')[0];
      if (taskToUpdate) {
        // console.log(phoneCode.dial_code!=profdata.phonecode)
        if(phoneCode.dial_code!=profdata.phonecode){taskToUpdate.phonecode = phoneCode.dial_code;}
        if(fullname){taskToUpdate.fullname = fullname}
        if(email){taskToUpdate.email = email}
        if(license){taskToUpdate.license = license}
        if(tin){taskToUpdate.tin =tin}
        if(phoneNumber){taskToUpdate.phone = phoneNumber}
        if(organization){taskToUpdate.organization = organization}
      }
    });
    const Profile = realm.objects("MyProfileData");
    console.log(Profile.length);
    Profile.map((i)=>console.log("\n\r",i))
  }
  return (
    <View style={{ flex: 1, backgroundColor: "white", paddingBottom: 0 }}>
      <PhoneCode modalVisible={phoneModal} setModalVisible={setPhoneModal} setResult={setPhoneCode} />
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
            source={{ uri: "https://randomuser.me/api/portraits/men/6.jpg" }}
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
            <View style={{ backgroundColor: '#F9F7F7', height: 40, width: 40, position: 'reletive', left: 90, bottom: 60, borderRadius: 30, borderWidth: 2, borderColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
              <Iconify icon="fluent:edit-24-filled" size={20} />
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
                value={fullname}
                onChangeText={(text) => setFullname(text)}
                style={{
                  width: "100%",
                  borderRadius: 10,
                  borderWidth: 1.5,
                  borderColor: theme.color.blue,
                  fontSize: 18,
                  paddingLeft: 20,
                  flex: 1,
                  color: 'black',
                }}
                placeholder={profdata.fullname}
                placeholderTextColor='black'
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
                value={email}
                onChangeText={(text) => setEmail(text)}
                style={{
                  width: "100%",
                  borderRadius: 10,
                  borderWidth: 1.5,
                  borderColor: theme.color.blue,
                  fontSize: 18,
                  paddingLeft: 20,
                  color: 'black'
                }}
                placeholder={profdata.email}
                placeholderTextColor='black'
              />
            </View>
            <View style={{ marginBottom: verticalScale(15), backgroundColor: "white" }}>
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
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                 {<phoneCode.Flag />}
                  <Text style={{ fontSize: 18, paddingLeft: 9 }}>{phoneCode?.dial_code}</Text>
                  <Iconify icon="mdi:menu-down" size={18} />
                </View>

                <TextInput
                  value={phoneNumber}
                  onChangeText={(text) => setPhoneNumber(text)}
                  keyboardType="numeric"
                  style={{ fontSize: 18, alignItems: "center", flex: 1, color: 'black' }}
                  placeholderTextColor={"black"}
                  placeholder={profdata.phone}
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
                value={organization}
                onChangeText={(text) => setOrganization(text)}
                style={{
                  width: "100%",
                  borderRadius: 10,
                  borderWidth: 1.5,
                  borderColor: theme.color.blue,
                  fontSize: 18,
                  paddingLeft: 20,
                  flex: 1,
                  color: 'black',
                }}
                placeholder={profdata.organization}
                placeholderTextColor={'black'}
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
                value={license}
                onChangeText={(text) => setLicense(text)}
                keyboardType="numeric"
                style={{
                  width: "100%",
                  borderRadius: 10,
                  borderWidth: 1.5,
                  borderColor: theme.color.blue,
                  fontSize: 18,
                  paddingLeft: 20,
                  color: 'black',
                }}
                placeholder={profdata.license}
                placeholderTextColor={'black'}
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
                value={tin}
                onChangeText={(text) => setTin(text)}
                keyboardType="numeric"
                style={{
                  width: "100%",
                  borderRadius: 10,
                  borderWidth: 1.5,
                  borderColor: theme.color.blue,
                  fontSize: 18,
                  paddingLeft: 20,
                  color: 'black',
                }}
                placeholder={profdata.tin}
                placeholderTextColor={'black'}
              />
            </View>
            <Pressable
              onPress={onSaveCreateProfile}
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
