import { View, Text } from 'react-native'
import React from 'react'
import { ActivityIndicator } from 'react-native'

const Loading = ({ show }) => {
  return <>{show && <ActivityIndicator size={'large'} color="#00ff00" />}</>
}
export default Loading
