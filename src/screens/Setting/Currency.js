import { StyleSheet, Text, View, Pressable, ScrollView ,TextInput} from "react-native";
import React, { useState } from "react";
import { verticalScale, scale } from "react-native-size-matters";
import { Iconify } from "react-native-iconify";
import { theme } from "../../styles/stylesheet";
import { fonts } from "../../styles/unistyle";

const RadioButton = ({ name, state, setState, flag }) => {
  //console.log(flag)
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
        {name == "ETB" ? (
          <Iconify icon={"twemoji:flag-ethiopia"} size={20} />
        ) : (
          <Iconify icon={"twemoji:flag-united-states"} size={20} />
        )}
        <Text style={[{ paddingLeft: 10 },fonts.h3]}>{name}</Text>
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
const Currency = ({ navigation }) => {
  const [activeRadio, setActiveRadio] = useState("ETB");
  const flagCurrencyName = [
    { flag: "united-states", language: "Dollar (USA)" },
    { flag: "ethiopia", language: "ETB" },
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
        <Text style={{ fontSize: scale(22), fontWeight: 600 }}>Currency</Text>
        <Pressable></Pressable>
      </View>
      <View style={{}}>
      <View style={{ marginHorizontal: 25,
        backgroundColor: "#F9F7F7",
        height: 61,
        //width: "100%",
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 32,
        marginBottom:verticalScale(10)}}>
        <Iconify icon="ion:search" size={18} color={theme.color.gray}/>
        <TextInput placeholder="Search for currency" style={{fontSize:18,fontWeight:"500"}}/></View>
        <ScrollView>
          {flagCurrencyName.map(({ flag, language }) => (
            <RadioButton
              name={language}
              key={language}
              flag={flag}
              state={activeRadio}
              setState={setActiveRadio}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default Currency;

const styles = StyleSheet.create({});
