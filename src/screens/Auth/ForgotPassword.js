import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { theme } from '../../styles/stylesheet'

const ForgotPassword = ({navigation}) => {
  return (
    <View style={{flex:1,backgroundColor:theme.color.white}}>
      <Text>ForgotPassword</Text>
    </View>
  )
}

export default ForgotPassword

const styles = StyleSheet.create({})