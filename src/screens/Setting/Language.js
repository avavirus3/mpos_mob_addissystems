import { StyleSheet, Text, View, Pressable, FlatList,TextInput } from "react-native";
import React, { useState } from "react";
import { verticalScale, scale } from "react-native-size-matters";
import { Iconify } from "react-native-iconify";
import { theme } from "../../styles/stylesheet";
import {flag } from "../../assets/flagIcons/FlagIcon";
import { getLocales } from "react-native-localize";
import { phoneData } from "../../../data/phonedata";


const RadioButton = ({ name, state, setState, Flag }) => {
  // console.log(flag)
  const flagIcon = phoneData.find((country)=> country.code==Flag)
  return (
    <Pressable
      onPress={() => setState(name)}
      style={{
        marginHorizontal: 25,
        backgroundColor: "#F9F7F7",
        height: 61,
        //width: "100%",
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 32,
        justifyContent: "space-between",
        marginBottom:verticalScale(10)
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {<flagIcon.Flag />}
        <Text style={{ fontSize: 20, paddingLeft: 10 }}>{name}</Text>
      </View>
      {state == name ? (
        <Iconify
          icon="ic:outline-radio-button-checked"
          color={theme.color.primary}
        />
      ) : (
        <Iconify
          icon="ic:round-radio-button-unchecked"
          color={theme.color.gray}
        />
      )}
    </Pressable>
  );
};
const Language = ({ navigation }) => {
  //console.log(getLocales());
  const [activeRadio, setActiveRadio] = useState("English");
  const radioName = ["English", "Amharic", "Arabic"];
  const flagLanguageName = [
    {"countryCode": "US", "isRTL": false, "languageCode": "en", "languageTag": "en-US",languageName:'English'},
    {"countryCode": "ET", "isRTL": false, "languageCode": "am", "languageTag": "am-ET",languageName:'Amharic'}
  ];
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
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
        <Text style={{ fontSize: scale(22), fontWeight: 600 }}>Language</Text>
        <Pressable></Pressable>
      </View>
      <View style={{}}>
      <View style={{
        marginHorizontal: 25,
        backgroundColor: "#F9F7F7",
        height: 61,
        //width: "100%",
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 32,
        marginBottom:verticalScale(10)}}>
        <Iconify icon="ion:search" size={18} color={theme.color.gray}/>
        <TextInput placeholder="Search for language" style={{fontSize:18,fontWeight:"500",flex:1}}/></View>
        <FlatList 
           showsVerticalScrollIndicator={false}
            data={flagLanguageName}
            numColumns={1}
            renderItem={({item})=>(<RadioButton name={item.languageName} state={activeRadio} setState={setActiveRadio} Flag={item.countryCode} />)}
            keyExtractor={(item) => item.languageCode}

        />
      </View>
    </View>
  );
};

export default Language;

const styles = StyleSheet.create({});
