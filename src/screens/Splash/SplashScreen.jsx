import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  StatusBar,
} from 'react-native'
import React, { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch, useSelector } from 'react-redux'
import { BgAuth } from '../../assets/images/background'
import { setLogin, turnOffSplash } from '../../stores/reducers/auth'
import { Logo } from '../../assets/icons'
import { Image } from 'react-native'
import { s, ms, vs } from 'react-native-size-matters'

const SplashScreen = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    const checkUser = async () => {
      const user = await AsyncStorage.getItem('user')
      const url = await AsyncStorage.getItem('serverUrl')
      console.log(user)
      if (user) {
        dispatch(
          setLogin({
            url,
            user: JSON.parse(user),
          }),
        )
      }

      setTimeout(() => {
        dispatch(turnOffSplash())
      }, 1000)
    }

    checkUser()
  }, [])

  return (
    <ImageBackground
      source={BgAuth}
      resizeMode="cover"
      style={styles.container}>
      <StatusBar hidden />
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 3,
        }}>
        <Image source={Logo} alt="logo" style={styles.logo} />
      </View>
      <View style={styles.overlay}></View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    top: 0,
    right: 0,
    // backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 1,
  },
  logo: {
    width: vs(350),
    height: vs(300),
    resizeMode: 'contain',
  },
})

export default SplashScreen
