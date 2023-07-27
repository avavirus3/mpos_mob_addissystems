import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { color } from "../../styles/Styles";

const Button = ({ label, theme, onPress, height, btnBG, navigation }) => {
  const styles = StyleSheet.create({
    btnContainer: {
      width: "100%",
      marginVertical: 10,
      alignItems: "center",
      justifyContent: "center",
    },
    btn: {
      alignItems: "center",
      justifyContent: "center",
      height: height ? height : 66,
      width: "100%",
      borderRadius: 10,
    },
    btnLabel: {
      color: "#fff",
      textAlign: "center",
      fontSize: 18,
      fontWeight: '600',
      textTransform: "uppercase",
    },
  });
  // console.log(Theme)
  if (theme && theme === "primary") {
    return (
      <View style={[styles.btnContainer]}>
        <TouchableOpacity
          style={[
            styles.btn,
            { backgroundColor: btnBG ? btnBG : color.primary },
          ]}
          onPress={onPress}
        >
          <Text style={[styles.btnLabel]}>{label}</Text>
        </TouchableOpacity>
      </View>
    );
  }
  if (theme && theme === "secondary") {
    return (
      <View style={[styles.btnContainer]}>
        <TouchableOpacity
          style={[
            styles.btn,
            {
              borderWidth: 2,
              borderColor: btnBG ? btnBG : color.primary,
            },
          ]}
          onPress={onPress}
        >
          <Text
            style={[
              styles.btnLabel,
              { color: btnBG ? btnBG : color.primary },
            ]}
          >
            {label}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={[styles.btnContainer]}>
      <TouchableOpacity
        style={[
          styles.btn,
          { backgroundColor: btnBG ? btnBG : "#fff" },
        ]}
        onPress={onPress}
      >
        <Text style={styles.btnLabel}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Button;
