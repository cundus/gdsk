import React from 'react'
import { ImageBackground } from 'react-native'
import { View, Text, StyleSheet } from 'react-native'
import { BgAlacarte } from '../../assets/images/background'
import {
  IconIndividual,
  IconPatientGuest,
  LogoAlacarte,
  LogoWhite,
} from '../../assets/icons'
import { Image } from 'react-native'
import { ms } from 'react-native-size-matters'
import { TouchableOpacity } from 'react-native'

const AlacarteHome = () => {
  return (
    <ImageBackground source={BgAlacarte} style={styles.container}>
      <Image source={LogoAlacarte} style={styles.alacarte} />
      <View style={styles.optionContainer}>
        <TouchableOpacity style={styles.optionButton}>
          <Image source={IconPatientGuest} style={styles.optionButtonImage} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton}>
          <Image source={IconIndividual} style={styles.optionButtonImage} />
        </TouchableOpacity>
      </View>
      <Image source={LogoWhite} style={styles.logo} />
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: ms(10),
  },
  alacarte: {
    width: '50%',
    height: '30%',
    resizeMode: 'contain',
  },
  optionContainer: {
    width: '80%',
    height: '30%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  optionButton: {
    width: '40%',
    backgroundColor: '#f1f5f9',
    margin: ms(10),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: ms(50),
  },
  optionButtonImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  logo: {
    width: '50%',
    height: '30%',
    resizeMode: 'contain',
  },
})

export default AlacarteHome
