import { View, Text } from 'react-native'
import React from 'react'

export const TextNormal = ({ style, children, ...rest }) => {
  return (
    <Text {...rest} style={[style, { fontFamily: 'Avenir-Roman' }]}>
      {children}
    </Text>
  )
}
export const TextBold = ({ style, children, ...rest }) => {
  return (
    <Text {...rest} style={[style, { fontFamily: 'Avenir Heavy' }]}>
      {children}
    </Text>
  )
}
