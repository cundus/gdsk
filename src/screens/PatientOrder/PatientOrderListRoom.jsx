import {
  View,
  Text,
  ImageBackground,
  FlatList,
  Pressable,
  Image,
} from 'react-native'
import React from 'react'
import { BgMenu } from '../../assets/images/background'
import Overlay from '../../components/Overlay'
import { TextBold, TextNormal } from '../../components/Text'
import { ms } from 'react-native-size-matters'
import Icon from 'react-native-vector-icons/AntDesign'
import { Logo } from '../../assets/icons'

const PatientOrderListRoom = ({ navigation }) => {
  const _renderItem = ({ item }) => {
    return (
      <Pressable>
        <View
          className="flex-row p-5 justify-between items-center border border-gray-100 m-5 bg-white"
          style={{ elevation: 6, borderRadius: ms(10) }}>
          <View>
            <TextBold style={{ fontSize: ms(16), color: 'black' }}>
              701 701
            </TextBold>
            <TextNormal style={{ fontSize: ms(12) }}>701</TextNormal>
          </View>
          <TextBold style={{ fontSize: ms(16) }} className="text-amber-700">
            Class VIP
          </TextBold>
          <View className="p-2 bg-green-600 rounded-full">
            <TextNormal style={{ fontSize: ms(14), color: 'white' }}>
              5 Pending Order
            </TextNormal>
          </View>
        </View>
      </Pressable>
    )
  }

  return (
    <View className="flex-[1]">
      <ImageBackground source={BgMenu} className="flex-[1] ">
        <Overlay color={'bg-white/70'} />

        <View className="flex-row z-[4] justify-between items-center px-10">
          <Pressable onPress={() => navigation.goBack()}>
            <Icon name="arrowleft" size={ms(30)} color={'black'} />
          </Pressable>
          <View className="items-center justify-start flex-1  space-y-10 ">
            <Image
              source={Logo}
              resizeMode="contain"
              style={{
                width: ms(120),
                height: ms(70),
              }}
            />
            <TextBold
              style={{
                fontSize: ms(22),
                color: 'black',
              }}>
              7 Floor
            </TextBold>
          </View>
          <View className="w-14" />
        </View>
      </ImageBackground>
      <View className="flex-[3]">
        <View className="flex-[1] z-[10] -mt-10 bg-white rounded-3xl">
          <FlatList
            data={[1]}
            keyExtractor={(item, index) => index.toString()}
            renderItem={_renderItem}
          />
        </View>
      </View>
    </View>
  )
}

export default PatientOrderListRoom
