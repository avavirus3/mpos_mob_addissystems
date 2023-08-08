import { StyleSheet, Text, View, Pressable, TextInput } from "react-native";
import React from "react";
import { Iconify } from "react-native-iconify";
import { verticalScale, scale } from "react-native-size-matters";
import { theme } from "../../styles/stylesheet";

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
        <Text style={{ fontSize: scale(22), fontWeight: 600 }}>
          Change Password
        </Text>
        <View style={{ marginHorizontal: scale(25) }}></View>
      </View>
      <View style={{ marginHorizontal: scale(25) }}>
        <View style={{ marginBottom: verticalScale(15) }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 500,
              height: 25,
              marginBottom: 6,
              color:"#cacaca"
            }}
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
              fontSize: 18,
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
                fontSize: 18,
              }}
              placeholder="New Password"
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
              color:"#cacaca",
            }}
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
              fontSize: 18,
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
                fontSize: 18,
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
              <Text style={{ color: "white", fontSize: 22, fontWeight: 600 }}>
                Save
              </Text>
            </Pressable>
      </View>
    </View>
  );
};

export default ChangePasswordScreen;

const styles = StyleSheet.create({});
