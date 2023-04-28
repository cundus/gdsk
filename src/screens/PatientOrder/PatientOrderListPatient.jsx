import {
  View,
  Text,
  ImageBackground,
  Pressable,
  Image,
  FlatList,
} from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/AntDesign'

import { BgMenu } from '../../assets/images/background'
import Overlay from '../../components/Overlay'
import { IconPending, Logo } from '../../assets/icons'
import { TextBold, TextNormal } from '../../components/Text'
import { ms } from 'react-native-size-matters'

const PatientOrderListPatient = ({ navigation }) => {
  const _renderItem = ({ item }) => {
    return (
      <Pressable>
        <View
          className="flex-row p-5 justify-between items-center border border-gray-100 m-5  bg-white"
          style={{ elevation: 6, borderRadius: ms(10) }}>
          <View>
            <TextBold style={{ fontSize: ms(18), color: 'black' }}>
              NY TIA RESTI
            </TextBold>
            <TextNormal style={{ fontSize: ms(12) }}>Pasien baru</TextNormal>
          </View>

          <View className="flex-row space-x-2">
            <View className="items-end">
              <View className="flex-row items-center">
                {item === 1 ? (
                  <View className="flex-row items-center mr-5">
                    <TextNormal
                      className="text-emerald-500"
                      style={{
                        fontSize: ms(12),
                        marginRight: ms(5),
                      }}>
                      Pending Order
                    </TextNormal>
                    <Image
                      source={IconPending}
                      style={{ width: ms(25), height: ms(25) }}
                    />
                  </View>
                ) : null}
                <View
                  className={
                    'p-2 rounded-xl ' +
                    (item === 1 ? ' bg-lime-500 ' : ' bg-green-600  ')
                  }>
                  <TextNormal style={{ fontSize: ms(12), color: 'white' }}>
                    {item === 1 ? 'Start order' : 'Order finish'}
                  </TextNormal>
                </View>
              </View>
              <TextNormal style={{ fontSize: ms(10) }}>701</TextNormal>
            </View>
            <View
              style={{
                width: ms(18),
                paddingTop: ms(5),
              }}>
              {item === 2 && (
                <Icon
                  name="checkcircle"
                  color="rgb(16,185,129)"
                  size={ms(18)}
                />
              )}
            </View>
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
              701 701 - Class VIP
            </TextBold>
          </View>
          <View className="w-14" />
        </View>
      </ImageBackground>
      <View className="flex-[3]">
        <View className="flex-[1] z-[10] -mt-10 bg-white rounded-3xl">
          <FlatList
            data={[1, 2]}
            keyExtractor={(item, index) => index.toString()}
            renderItem={_renderItem}
          />
        </View>
      </View>
    </View>
  )
}

export default PatientOrderListPatient
