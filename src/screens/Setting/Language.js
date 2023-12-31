import { StyleSheet, Text, View, Pressable, FlatList,TextInput } from "react-native";
import React, { useState } from "react";
import { verticalScale, scale } from "react-native-size-matters";
import { Iconify } from "react-native-iconify";
import { theme } from "../../styles/stylesheet";
import { getLocales } from "react-native-localize";
import { phoneData } from "../../../data/phonedata";
import i18n  from '../../language/i18n';
import { fonts } from "../../styles/unistyle";
import { black } from "react-native-paper/lib/typescript/styles/themes/v2/colors";


const Language = ({ navigation }) => {
  //console.log(i18n.locale)
  
  const flagLanguageName = [
    {"countryCode": "US", "isRTL": false, "languageCode": "en", "languageTag": "en-US",languageName:'English'},
    {"countryCode": "ET", "isRTL": false, "languageCode": "am", "languageTag": "am-ET",languageName:'Amharic'}
  ];
  const [activeRadio, setActiveRadio] = useState(flagLanguageName.find((i)=>i.languageCode==i18n.locale).languageName);
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
        <Text style={[fonts.h1]}>{i18n.t('language')}</Text>
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
        <TextInput placeholder="Search for language" style={[{flex:1,color:"black"},fonts.h3]}/></View>
        <FlatList
           showsVerticalScrollIndicator={false}
            data={flagLanguageName}
            numColumns={1}
            renderItem={({item})=>(<RadioButton langCode={item.languageCode} navigation={navigation} name={item.languageName} state={activeRadio} setState={setActiveRadio} Flag={item.countryCode} />)}
            keyExtractor={(item) => item.languageTag}

        />
      </View>
    </View>
  );
};

export default Language;

const styles = StyleSheet.create({});
const RadioButton = ({ name, state, setState, Flag,langCode,navigation }) => {
  // console.log(flag)
  const flagIcon = phoneData.find((country)=> country.code==Flag)
  const changeLanguage = () => {
    i18n.locale = langCode;
    setState(name)
      navigation.goBack()
  };
  return (
    <Pressable
      onPress={changeLanguage }
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
        <Text style={[{ paddingLeft: 10 },fonts.ptext]}>{name}</Text>
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