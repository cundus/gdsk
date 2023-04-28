import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableNativeFeedback,
} from 'react-native'
import React from 'react'
import { ms } from 'react-native-size-matters'
import Icon from 'react-native-vector-icons/AntDesign'

import { BgMenu } from '../../assets/images/background'
import Overlay from '../../components/Overlay'
import { IconCart, Logo } from '../../assets/icons'
import { TextBold, TextNormal } from '../../components/Text'
import { FlatList } from 'react-native-gesture-handler'
import color from '../../utils/color'

const PatientOrderConfirmation = () => {
  const _renderItem = ({ item }) => {
    return (
      <View
        style={{
          height: ms(120),
          margin: ms(10),
          justifyContent: 'flex-end',
        }}>
        <View
          style={{
            paddingHorizontal: ms(10),
            height: ms(100),
            flexDirection: 'row',
            justifyContent: 'space-between',
            elevation: 7,
            backgroundColor: 'white',
            borderRadius: ms(10),
          }}>
          <View className="flex-row">
            <View
              style={{
                width: ms(100),
                height: ms(100),
                borderRadius: ms(100),
                backgroundColor: 'white',
                elevation: 5,
                marginTop: -ms(20),
              }}>
              <Image
                source={{}}
                resizeMode="cover"
                style={{ width: '100%', height: '100%' }}
              />
            </View>
            <View>
              <TextBold style={{ fontSize: ms(20), color: 'black' }}>
                Chicken Rice
              </TextBold>
              <TextBold style={{ fontSize: ms(20), color: 'black' }}>
                Rp. 50.000 {item == 2 && 'x 2'}
              </TextBold>
            </View>
          </View>
          <View>
            <Icon name="checkcircle" size={ms(20)} />
          </View>
        </View>
      </View>
    )
  }

  return (
    <View className="flex-1">
      <ImageBackground style={{ flex: 1 }} source={BgMenu} resizeMode="cover">
        <Overlay color={'bg-green-400/70'} />
        <View className="z-[5] justify-center items-center">
          <Image
            source={Logo}
            style={{ width: ms(120), height: ms(80), resizeMode: 'contain' }}
          />
        </View>
      </ImageBackground>
      <View className="flex-[4]">
        <View
          className="flex-1 bg-white rounded-t-[30px]"
          style={{ marginTop: -ms(30), zIndex: 10 }}>
          <TextBold
            style={{ textAlign: 'center', fontSize: ms(14), color: 'black' }}>
            PATIENT ORDER CONFIRMATION
          </TextBold>
          <FlatList
            keyExtractor={(item, id) => id.toString()}
            data={[1, 2, 3]}
            renderItem={_renderItem}
          />
        </View>
        <View className="p-5">
          <View className="flex-row px-10">
            <TextNormal style={{ fontSize: ms(20) }}>Total</TextNormal>
          </View>
          <View className="border-t-4 border-t-green-500" />
          <View className="flex-row px-10 justify-between mt-2">
            <View className="flex-row justify-center items-center space-x-5">
              <Image
                source={IconCart}
                style={{ resizeMode: 'contain', width: ms(30), height: ms(30) }}
              />
              <TextNormal style={{ fontSize: ms(20) }}>6 Item</TextNormal>
            </View>
            <TouchableNativeFeedback>
              <View
                style={{
                  width: ms(150),
                  backgroundColor: color.GREEN_PRIMARY,
                  borderRadius: ms(10),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TextNormal style={{ color: 'white', fontSize: ms(18) }}>
                  Take Order
                </TextNormal>
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
      </View>
    </View>
  )
}

export default PatientOrderConfirmation
