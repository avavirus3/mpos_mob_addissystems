import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { Iconify } from 'react-native-iconify'
import { verticalScale,scale } from 'react-native-size-matters'
import { theme } from '../styles/stylesheet'

const FloatActionButton = () => {
  return (
    <>
       <TouchableOpacity
        style={styles.float}
        onPress={() => console.log('lock')}
      >
        <Iconify icon="mdi:unlocked" size={35} color={"white"} />
      </TouchableOpacity>
    </>
  )
}

export default FloatActionButton

const styles = StyleSheet.create({
    float: {
    height: verticalScale(48),
    elevation: verticalScale(2),
    width: scale(50),
    borderRadius: scale(50),
    backgroundColor: theme.color.blue,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    right: scale(25),
    bottom: verticalScale(60),
},
})