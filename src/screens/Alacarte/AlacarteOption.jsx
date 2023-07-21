import React from 'react'
import { ImageBackground, StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native'
import { ms } from 'react-native-size-matters'
import { BgAlacarte } from '../../assets/images/background'
import color from '../../utils/color'
import IconAD from 'react-native-vector-icons/AntDesign'
import IconFA from 'react-native-vector-icons/FontAwesome'

const AlacarteOption = ({ navigation }) => {
  return (
    <ImageBackground source={BgAlacarte} style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText}>
          A L A   C A R T E
        </Text>
        <View style={styles.border}></View>
      </View>
      <View style={styles.optionContainer}>
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple('#ccc')}
          onPress={() => navigation.navigate('AlacartePatient')}>
          <View style={styles.optionButton}>
            <IconAD name='adduser' size={ms(35)} color={color.GREEN_PRIMARY}/>
            <Text style={styles.optionButtonText}>Patient Guest</Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple('#ccc')}
          onPress={() => navigation.navigate('AlacarteIndividual')}>
          <View style={styles.optionButton}>
            <IconFA name='user-circle' size={ms(35)} color={color.GREEN_PRIMARY}/>
            <Text style={styles.optionButtonText}>Individual Guest</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
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
    padding: ms(10),
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  optionButton: {
    width: '100%',
    height: '10%',
    margin: ms(10),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: ms(5),
    backgroundColor: 'white',
    elevation: 40,
    flexDirection: 'row'
  },
  optionButtonImage: {
    width: '100%',
    height: '70%',
    resizeMode: 'contain',
  },
  optionButtonText: {
    fontSize: ms(15),
    fontFamily: 'Avenir Heavy',
    fontSize: ms(20),
    marginHorizontal: ms(10),
    color: color.GREEN_PRIMARY,
  },
  logo: {
    width: '50%',
    height: '30%',
    resizeMode: 'contain',
  },
  title: {
    marginTop: ms(20),
  },
  titleText: {
    color: 'white',
    fontWeight: '500',
    fontSize: ms(18),
    letterSpacing: ms(2),
    marginHorizontal: ms(10),
  },
  border: {
    borderColor: 'white',
    borderBottomWidth: ms(4),
    borderRadius: ms(10),
    marginTop: ms(14),
  }
})

export default AlacarteOption
