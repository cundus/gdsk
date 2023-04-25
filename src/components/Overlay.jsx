import { View, Text } from 'react-native'
import React from 'react'

const Overlay = ({ color }) => {
  return (
    <View
      className={
        'absolute bottom-0 left-0 right-0 top-0 z-[1] ' +
        (color ? color : 'bg-white/50')
      }></View>
  )
}

export default Overlay
