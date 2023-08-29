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
import realm from "../../database/index";
import { phoneData } from "../../../data/phonedata";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import useFetchRealm from "../../hooks/customHooks/useFetchRealm";
import { getToken,loadCredentials } from "../../auth/token/Token";
import { fonts } from "../../styles/unistyle";




const Edit = ({ navigation }) => {
  
  // const {data:imgdata,pending:pendingimage} = useFetchRealm({uri:"Image",id:300})
  const [profiledata, setProfiledata] = useState()

  const [phoneModal, setPhoneModal] = useState(false);
  const [fullname, setFullname] = useState('');
  const [token, setToken] = useState()
  const[id,setId] = useState()
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [organization, setOrganization] = useState('');
  const [license, setLicense] = useState('');
  const [tin, setTin] = useState('');
  const[profdata,setProfdata]=useState('');
  const [phoneCode, setPhoneCode] = useState()
  const[imgUri, setImgUri] = useState("https://avatars.dicebear.com/v2/avataaars/c9b7a24f10562a9f9bc899431f4c9d26.svg")
  const[imgdata,setImgdata]=useState()

  useEffect(()=>{
    loadCredentials().then((r)=>r?setProfiledata(r):null)
  },[])

  useEffect(()=>{
    const img = realm.objects("Image")
    if(profiledata)setPhoneCode(phoneData.find(phonecodes => phonecodes?.dial_code === profiledata[0].phonecode));
    const d=realm.objects("Image")
    //if(profiledata) console.log(d.length?realm.objects("Image"):`https://robohash.org/${profiledata[0]._id}=&size=400x400`)
    if(img.length>0 && profiledata)setImgdata(img?img.filter(d=>d.profileId==profiledata[0]._id):null)
    //console.log("update:",'\n\r',profiledata,'\n\r',phoneData.find(phonecodes => phonecodes?.dial_code === profiledata.phonecode));
  },[profiledata])

  const onSaveCreateProfile = ()=> realm.write(() => {
    const taskToUpdate = realm.objects('Profile').find(e=>e._id==profiledata[0]._id);

    if (taskToUpdate) {
      // console.log(phoneCode.dial_code!=profdata.phonecode)
      if(phoneCode.dial_code!=taskToUpdate.phonecode){taskToUpdate.phonecode = phoneCode.dial_code;}
      if(fullname){taskToUpdate.fullname = fullname}
      if(email){taskToUpdate.email = email}
      if(license){taskToUpdate.license = license}
      if(tin){taskToUpdate.tin =tin}
      if(phoneNumber){taskToUpdate.phone = phoneNumber}
      if(organization){taskToUpdate.organization = organization}
    }
  }
  )
  const options =   {
    title: 'Select Image',
    type: 'library',
    options: {
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: false,
    },}
  const goToGallery =async()=>{
    const open = await launchImageLibrary(options)
    //const profile = realm.objects('Image')
      //console.log(profile)
      // realm.write(() => {
      //   realm.create('Image', {
      //     _id: 300,
      //     name: ,
      //     type: 'photo',
      //     uri:'fldldd'
      //   });
      // });
    if(open){
      //setImgUri(open.assets[0].uri)
  
      try{realm.write(() => {
        const img=realm.objects('Image')
        const imgHolder = img.filter(d=>d._id==imgdata[0]._id)[0];
        console.log("open",imgHolder.name)
        if(imgHolder) {
          imgHolder.name= open.assets[0].fileName
          imgHolder.uri= open.assets[0].uri
          imgHolder.type= open.assets[0].type

        }
        if(!imgHolder) realm.create("Image",{
              _id:300,
              name:open.assets[0].fileName,
              type:open.assets[0].type,
              uri:open.assets[0].uri,
            })
          })
             setImgUri(open.assets[0].uri)
      }catch(e){console.log(e)}
    }
    //console.log(open.assets[0])
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
        <Text style={[fonts.h1]}>Edit</Text>
        <View></View>
      </View>
      <ScrollView>
        <View style={{ alignItems: "center", marginHorizontal: scale(25) }}>
          <View><Image
            source={{ uri: imgdata?imgdata[0].uri:`https://robohash.org/${Math.random() * 100}=&size=400x400` }}
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
            <Pressable onPress={goToGallery} style={{ backgroundColor: '#F9F7F7', height: 40, width: 40, position: 'reletive', left: 90, bottom: 60, borderRadius: 30, borderWidth: 2, borderColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
              <Iconify icon="fluent:edit-24-filled" size={20} />
            </Pressable>
          </View>
          <View style={{ width: "100%" }}>
            <View style={{ marginBottom: verticalScale(15) }}>
              <Text
                style={[{
                  
                  
                  marginBottom: 6,
                },fonts.ptext]}
              >
                Full Name
              </Text>
              <TextInput
                value={fullname}
                onChangeText={(text) => setFullname(text)}
                style={[{
                  width: "100%",
                  borderRadius: 10,
                  borderWidth: 1.5,
                  borderColor: theme.color.blue,
                 
                  paddingLeft: 20,
                  flex: 1,
                  color: 'black',
                },fonts.h3]}
                placeholder={profiledata?profiledata[0].fullname:'fullname'}
                placeholderTextColor='black'
              />
            </View>
            <View style={{ marginBottom: verticalScale(15) }}>
              <Text
                style={[{
                  
                  marginBottom: 6,
                },fonts.ptext]}
              >
                Email
              </Text>
              <TextInput
                value={email}
                onChangeText={(text) => setEmail(text)}
                style={[{
                  width: "100%",
                  borderRadius: 10,
                  borderWidth: 1.5,
                  borderColor: theme.color.blue,
                  paddingLeft: 20,
                  color: 'black'
                },fonts.h3]}
                placeholder={profiledata?profiledata[0].email:'email'}
                placeholderTextColor='black'
              />
            </View>
            <View style={{ marginBottom: verticalScale(15), backgroundColor: "white" }}>
              <Text
                style={[{
                  marginBottom: 6,
                },fonts.ptext]}
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
                  <Text style={[{ paddingLeft: 9 },fonts.h3]}>{phoneCode?.dial_code}</Text>
                  <Iconify icon="mdi:menu-down" size={18} />
                </View>:null}

                <TextInput
                  value={phoneNumber}
                  onChangeText={(text) => setPhoneNumber(text)}
                  keyboardType="numeric"
                  style={[{  alignItems: "center", flex: 1, color: 'black' },fonts.h3]}
                  placeholderTextColor={"black"}
                  placeholder={profiledata?profiledata[0].phone:'phone number'}
                />
              </Pressable>
            </View>
            <View style={{ marginBottom: verticalScale(15) }}>
              <Text
                style={ [{
                  marginBottom: 6,
                },fonts.ptext]}
              >
                Organization Name
              </Text>
              <TextInput
                value={organization}
                onChangeText={(text) => setOrganization(text)}
                style={[{
                  width: "100%",
                  borderRadius: 10,
                  borderWidth: 1.5,
                  borderColor: theme.color.blue,
            
                  paddingLeft: 20,
                  flex: 1,
                  color: 'black',
                },fonts.h3]}
                placeholder={profiledata?profiledata[0].organization:'organization'}
                placeholderTextColor={'black'}
              />
            </View>
            <View style={{ marginBottom: verticalScale(15) }}>
              <Text
                style={ [{
                  marginBottom: 6,
                },fonts.ptext]}
              >
                License Number
              </Text>
              <TextInput
                value={license}
                onChangeText={(text) => setLicense(text)}
                keyboardType="numeric"
                style={[{
                  width: "100%",
                  borderRadius: 10,
                  borderWidth: 1.5,
                  borderColor: theme.color.blue,
                  paddingLeft: 20,
                  color: 'black',
                },fonts.h3]}
                placeholder={profiledata?profiledata[0].license:'license'}
                placeholderTextColor={'black'}
              />
            </View>
            <View style={{ marginBottom: verticalScale(15) }}>
              <Text
                style={ [{
                  marginBottom: 6,
                },fonts.ptext]}
              >
                TIN
              </Text>
              <TextInput
                value={tin}
                onChangeText={(text) => setTin(text)}
                keyboardType="numeric"
                style={[{
                  width: "100%",
                  borderRadius: 10,
                  borderWidth: 1.5,
                  borderColor: theme.color.blue,
                  paddingLeft: 20,
                  color: 'black',
                },fonts.h3]}
                placeholder={profiledata?profiledata[0].tin:'tin'}
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
              <Text style={[{ color: "white" },fonts.h1]}>
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


const createData =()=> realm.write(() => {realm.create('Name of Schema', {
  //this is an example data you should replace it by your own
   _id:457,
        fullname:"fullname",
         email:"email",
         phonecode:phoneCode?phoneCode.dial_code:'+251',
         phone:"25485664",
         tin:"558228",
  })})