import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  Pressable,
  Image,
} from 'react-native'
import React from 'react'
import { ms } from 'react-native-size-matters'
import Icon from 'react-native-vector-icons/AntDesign'

import Overlay from '../../../components/Overlay'

import { BgMenu } from '../../../assets/images/background'
import { Logo } from '../../../assets/icons'

const AlacarteListRoom = ({ route, navigation }) => {
  const { data } = route.params

  const _renderItem = ({ item }) => {
    return (
      <Pressable
        onPress={() =>
          navigation.navigate('AlacarteListPatient', { data: item })
        }>
        {({ pressed }) => (
          <View
            style={{
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
              paddingVertical: ms(5),
              paddingHorizontal: ms(10),
              marginBottom: ms(10),
              backgroundColor: 'white',
              elevation: 5,
              borderRadius: ms(10),
              borderWidth: 1,
              borderColor: '#ccc',
              transform: [{ scale: pressed ? 0.99 : 1 }],
            }}>
            <View className="">
              <Text
                style={{
                  color: 'black',
                  fontSize: ms(16),
                  fontFamily: 'Avenir Heavy',
                }}>
                {item.name}
              </Text>
              <Text
                style={{
                  fontSize: ms(16),
                  fontFamily: 'Avenir-Roman',
                }}>
                {item.patient.map(patient => patient.bed).join(',').length > 15
                  ? item.patient
                      .map(patient => patient.bed)
                      .join(',')
                      .substring(15)
                  : item.patient.map(patient => patient.bed).join(',')}
              </Text>
            </View>
            <View>
              <Text
                style={{
                  color: 'green',
                  fontSize: ms(16),
                  fontFamily: 'Avenir-Roman',
                }}>
                {item.patient.length} Patient
              </Text>
            </View>
          </View>
        )}
      </Pressable>
    )
  }

  return (
    <View className="flex-[1]">
      <ImageBackground source={BgMenu} className="flex-[1]">
        <View className="z-[2] justify-between items-center pb-7">
          <Image
            source={Logo}
            alt="logo"
            style={{ width: ms(150), height: ms(70) }}
            resizeMode="contain"
          />
          <View className="flex-row justify-between w-full px-10 items-center">
            <Pressable onPress={() => navigation.goBack()}>
              <Icon name="arrowleft" color={'black'} size={ms(25)} />
            </Pressable>
            <Text
              style={{
                fontSize: ms(20),
                fontFamily: 'Avenir Heavy',
                color: 'black',
              }}>
              {data.name}
            </Text>
            <View />
          </View>
        </View>
        <Overlay color="bg-white/70" />
      </ImageBackground>
      <View className="flex-[3.5] rounded-t-[40px] -mt-5 z-[5] bg-white">
        <FlatList
          contentContainerStyle={{
            marginHorizontal: ms(30),
            marginTop: ms(10),
          }}
          keyExtractor={item => item.id.toString()}
          data={data.room}
          renderItem={_renderItem}
        />
      </View>
    </View>
  )
}

export default AlacarteListRoom

const styles = StyleSheet.create({})
