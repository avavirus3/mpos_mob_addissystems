import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { color, textStyles } from "../../styles/Styles";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const SellProductTopBar = ({
  onCancel,
  onDone,
  label1,
  label2,
  cartNumber,
  activeLabel2
}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.topHeading}>
      <TouchableOpacity
        style={{}}
        /* Cancel Navigation Link Here */
        onPress={onCancel}
      >
        <Text style={[styles.topHeadingText, { color: color.primary }]}>
          Cancel
        </Text>
      </TouchableOpacity>
      <Text style={[styles.topHeadingText, { color: color.normal }]}>
        {label1}
      </Text>
      {cartNumber?.toString() ? (
        <TouchableOpacity
          style={{
            backgroundColor: cartNumber
              ? "rgba(215, 26, 98, 0.10)"
              : color.lightGray,
            borderRadius: 100,
            padding: 8,
            width: 40,
            height: 40
          }}
          onPress={onDone}
        >
          {cartNumber > 0 && (
            <View
              style={{
                position: "absolute",
                right: 1,
                top: -9,
                borderRadius: 50,
                backgroundColor: color.primary,
                width: 22,
                height: 22,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "white", textAlign: "center", marginBottom: 2, marginRight: 1 }}>
                {cartNumber > 0 && cartNumber < 100 ? cartNumber : 99}
              </Text>
            </View>
          )}
          <MaterialCommunityIcons
            name={"cart"}
            size={28}
            color={cartNumber > 0 ? color.primary : color.gray}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={{}} onPress={onDone}>
          <Text style={[styles.topHeadingText, {color: activeLabel2 ? color.primary : color.gray }]}>{label2}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  topHeading: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    // paddingHorizontal: 15,
    // borderWidth: 1
  },
  topHeadingText: {
    // flex: 1,
    fontSize: 20,
    fontWeight: "500",
  },
});

export default SellProductTopBar;
