import { View, Text } from 'react-native'
import React from 'react'
import { ImageBackground, Dimensions } from 'react-native'
import { StyleSheet } from 'react-native'
// import { windowHeight } from '../utils/dimensions'

const { height, width } = Dimensions.get('window')

const Header = ({ img, children }) => {
  return (
    <ImageBackground style={styles.container} source={img}>
      <View style={styles.content}>{children}</View>
      <View style={styles.decoration} className="rounded-t-full"></View>
      <View style={styles.overlay}></View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: height / 3,
  },
  decoration: {
    width: '100%',
    height: '10%',
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 2,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    top: 0,
    right: 0,
    backgroundColor: 'rgba(255,255,255,0.5)',
    zIndex: 1,
  },
  content: {
    zIndex: 3,
    flex: 1,
  },
})

export default Header
