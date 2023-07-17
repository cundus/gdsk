import {
  View,
  Text,
  Image,
  Pressable,
  Dimensions,
  StyleSheet,
} from 'react-native'
import React from 'react'
import { ms } from 'react-native-size-matters'
import Icon from 'react-native-vector-icons/'

import {
  IconFood,
  IconHome,
  IconPatient,
  IconPatientOrder,
  IconSetting,
} from '../assets/icons'

const TabBar = ({ state, descriptors, navigation }) => {
  const iconTab = {
    Home: IconHome,
    Alacarte: IconFood,
    Setting: IconSetting,
    PatientOrder: IconPatient,
  }

  return (
    <View
      className="border-t-2 border-t-gray-500 bg-white flex-row justify-evenly px-10 py-3"
      style={{}}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key]
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name

        const isFocused = state.index === index

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          })

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name)
          }
        }

        return (
          <View key={index} style={{ flex: 1 }}>
            <Pressable onPress={onPress}>
              {({ pressed }) => (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    opacity: pressed ? 0.7 : 1,
                  }}>
                  <Image
                    source={iconTab[label]}
                    alt="icon"
                    resizeMode="cover"
                    style={{
                      width:  ms(20),
                      height:  ms(20),
                    }}
                  />

                  <Text
                    style={{
                      fontFamily: 'Avenir-Roman',
                      fontSize: ms(12),
                      color: 'black',
                    }}>
                    {label === 'PatientOrder' ? 'Patient Order' : label}
                  </Text>
                </View>
              )}
            </Pressable>
          </View>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({})

export default TabBar
