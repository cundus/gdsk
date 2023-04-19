import React from 'react'
import {
  View,
  Text,
  KeyboardAvoidingView,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native'

import { Logo } from '../../assets/icons'
import { BgMenu } from '../../assets/images/background'

import Icon from 'react-native-vector-icons/Ionicons'
// arrow-back

const BeforeOrder = () => {
  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <ImageBackground
        source={BgMenu}
        resizeMode="cover"
        className={classNames.container}>
        <View className={classNames.overlay} />
        <View className={classNames.logo}>
          <Image
            source={Logo}
            style={{ width: 140, height: 90, resizeMode: 'cover' }}
          />
        </View>
        <View className={classNames.header}>
          <TouchableOpacity>
            <Icon name="arrow-back" size={40} color="#000" />
          </TouchableOpacity>
          <Text className={classNames.textHeader}>7 Floor</Text>
        </View>
        <ScrollView
          className={classNames.content}
          showsVerticalScrollIndicator={false}>
          {Array(12)
            .fill(0)
            .map((_, index) => (
              <View key={index} className={classNames.cards}>
                <View>
                  <Text className={classNames.floor}>701 701</Text>
                  <Text style={{ color: '#aaa', fontSize: 15 }}>701</Text>
                </View>
                <Text className={classNames.typeFloor}>Class VIP</Text>
                <View className={classNames.status}>
                  <Text style={{ fontSize: 16, color: '#fff' }}>
                    5 Pending Order
                  </Text>
                </View>
              </View>
            ))}
          <View className={classNames.seeMore}>
            <Icon name="chevron-down" size={28} color="#000" />
            <Text style={{ fontSize: 20, color: '#000' }}>See More</Text>
            <Icon name="chevron-down" size={28} color="#000" />
          </View>
          <View style={{ height: 15 }} />
        </ScrollView>
      </ImageBackground>
    </KeyboardAvoidingView>
  )
}

const classNames = {
  container: 'flex-[1] ',
  overlay: 'absolute top-0 bottom-0 left-0 right-0 bg-white/40',
  logo: 'flex flex-col items-center justify-center',
  header: 'px-4 py-2',
  textHeader: 'text-3xl font-bold text-center color-black uppercase mb-2',
  content: 'flex-[1] bg-[#f1f1f1] rounded-t-3xl px-4 py-2 flex flex-col gap-3 ',
  cards:
    'flex flex-row items-center justify-between bg-white rounded-xl px-4 py-0.5 shadow-{10}',
  floor: 'text-2xl font-bold color-black',
  typeFloor: 'text-2xl font-medium color-[#ed6640]',
  status: 'bg-[#0ba316] rounded-full px-1.5 py-2',
  seeMore: 'flex flex-row items-center justify-center mt-2 gap-2',
}

export default BeforeOrder
