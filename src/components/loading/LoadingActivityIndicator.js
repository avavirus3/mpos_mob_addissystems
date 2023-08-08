import { View, ActivityIndicator } from 'react-native'
import React from 'react'

const LoadingActivityIndicator = ({size}) => {
  return (
    <View style={{flex: 1, borderWidth: 1}}>
      <ActivityIndicator size={size} />
    </View>
  )
}

export default LoadingActivityIndicator