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

const countPendingOrder = room => {
  let num = 0

  room.patient.map(patient =>
    patient.order.map(order =>
      order.detail
        .filter(detail => detail.order_status === 0)
        .map(() => {
          num += 1
          return num
        }),
    ),
  )

  return num
}

const PatientOrderListRoom = ({ route, navigation }) => {
  const { data } = route.params

  const _renderItem = ({ item }) => {
    return (
      <Pressable
        onPress={() =>
          navigation.navigate('PatientOrderListPatient', {
            data: item,
            floor: data,
          })
        }>
        <View
          className="flex-row p-5 justify-between items-center border border-gray-100 m-5 bg-white"
          style={{ elevation: 6, borderRadius: ms(10) }}>
          <View className="flex-1">
            <TextBold style={{ fontSize: ms(16), color: 'black' }}>
              {item.name} {item.room_no}
            </TextBold>
            <TextNormal style={{ fontSize: ms(12) }}>
              {item.bed.length > 15
                ? item.bed.substring(0, 15) + '...'
                : item.bed.length}
            </TextNormal>
          </View>
          <TextBold
            style={{ fontSize: ms(14) }}
            className="flex-1 text-amber-700">
            {item.room_class.name}
          </TextBold>
          <View className="py-2 px-4 bg-green-600 rounded-full">
            <TextNormal style={{ fontSize: ms(12), color: 'white' }}>
              {countPendingOrder(item)} Pending Order
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
          <View className="items-center justify-start flex-1">
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
              {data.name}
            </TextBold>
          </View>
          <View className="w-14" />
        </View>
      </ImageBackground>
      <View className="flex-[3]">
        <View className="flex-[1] z-[10] -mt-10 bg-white rounded-3xl">
          <FlatList
            data={data.room}
            keyExtractor={(item, index) => index.toString()}
            renderItem={_renderItem}
          />
        </View>
      </View>
    </View>
  )
}

export default PatientOrderListRoom
