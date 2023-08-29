import { StyleSheet, Text, View, Pressable, TextInput } from "react-native";
import React from "react";
import { Iconify } from "react-native-iconify";
import { verticalScale, scale } from "react-native-size-matters";
import { theme } from "../../styles/stylesheet";
import i18n from "../../language/i18n";
import { fonts } from "../../styles/unistyle";
const ChangePasswordScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
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
        <Text style={[fonts.h1]}>
          {i18n.t("changepassword")}
        </Text>
        <View style={{ marginHorizontal: scale(25) }}></View>
      </View>
      <View style={{ marginHorizontal: scale(25) }}>
        <View style={{ marginBottom: verticalScale(15) }}>
          <Text
            style={[{
          
              height: 25,
              marginBottom: 6,
              color:"#cacaca"
            },fonts.ptext]}
          >
            New Password
          </Text>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              borderRadius: 10,
              borderWidth: 1.5,
              borderColor: theme.color.blue,
              paddingLeft: 20,
              alignItems: "center",
            }}
          >
            <Iconify
              icon="material-symbols:lock-outline"
              size={18}
              color={"#cacaca"}
            />
            <TextInput
              style={{
                fontSize: 16,
                color:'black'
              }}
              placeholder="New Password"
            />
          </View>
        </View>
        <View style={{ marginBottom: verticalScale(15) }}>
          <Text
            style={[{
              height: 25,
              marginBottom: 6,
              color:"#cacaca",
            },fonts.ptext]}
          >
            Comfirm Password
          </Text>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              borderRadius: 10,
              borderWidth: 1.5,
              borderColor: theme.color.blue,
              paddingLeft: 20,
              alignItems: "center",
            }}
          >
            <Iconify
              icon="material-symbols:lock-outline"
              size={18}
              color={"#cacaca"}
            />
            <TextInput
              style={{
                fontSize: 16,
                color:'black'
              }}
              placeholder="Comfirm Password"
            />
          </View>
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
              <Text style={[{ color: "white", },fonts.h1]}>
                Save
              </Text>
            </Pressable>
      </View>
    </View>
  );
};

export default ChangePasswordScreen;

const styles = StyleSheet.create({});
