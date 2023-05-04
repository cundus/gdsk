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
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { updateCart } from '../../stores/reducers/cartPatientOrder'

const PatientOrderConfirmation = ({}) => {
  const navigation = useNavigation()
  const cart = useSelector(state => state.cartPatientOrder)
  const dispatch = useDispatch()

  const _renderItem = ({ item, idx }) => {
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
                overflow: 'hidden',
              }}>
              <Image
                source={{ uri: item?.image }}
                resizeMode="cover"
                style={{ width: '100%', height: '100%' }}
              />
            </View>
            <View className="ml-10">
              <TextBold style={{ fontSize: ms(16), color: 'black' }}>
                {item?.name}
              </TextBold>
              <TextBold style={{ fontSize: ms(16), color: 'black' }}>
                Rp.
                {item?.service_client === null ? 0 : item?.service_client}
              </TextBold>
            </View>
          </View>
          <View className="mt-5">
            <Icon name="checkcircle" size={ms(20)} />
          </View>
        </View>
      </View>
    )
  }

  const submit = async () => {
    await saveDataToStorage(cart.result)
    navigation.navigate('PatientOrderHome')
    dispatch(updateCart({}))
  }

  const saveDataToStorage = async data => {
    try {
      let order = []
      if (!Array.isArray(cart.result.menu)) {
        const savedOrder = await AsyncStorage.getItem('orderExtra')
        if (savedOrder !== null) {
          order = JSON.parse(savedOrder)
        }
        order.push(data)
        await AsyncStorage.setItem('orderExtra', JSON.stringify(order))
      } else {
        const savedOrder = await AsyncStorage.getItem('orderPatient')
        if (savedOrder !== null) {
          order = JSON.parse(savedOrder)
        }
        const elementsIndex = order.findIndex(element => element.id === data.id)
        if (elementsIndex === -1) {
          order.push(data)
          await AsyncStorage.setItem('orderPatient', JSON.stringify(order))
        } else {
          const newArray = [...order]
          newArray[elementsIndex] = { ...data }
          await AsyncStorage.setItem('orderPatient', JSON.stringify(newArray))
        }
      }
    } catch (error) {
      Alert.alert('Error Saving Data', error)
    }
  }

  const totalPrice = () => {
    if (Array.isArray(cart.result.menu)) {
      return cart.result.detail.reduce(
        (a, b) => (a + b.service_client !== null ? +b.service_client : 0),
        0,
      )
    }

    return cart.result.total
  }

  const dataToRender = () => {
    if (Array.isArray(cart.result.menu)) {
      return cart.result.detail
    }

    return [cart.result.menu]
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
            data={dataToRender()}
            renderItem={_renderItem}
          />
        </View>
        <View className="p-5">
          <View className="flex-row px-10 justify-between items-center">
            <TextNormal style={{ fontSize: ms(20) }}>Total</TextNormal>
            <TextNormal style={{ fontSize: ms(20) }}>{totalPrice()}</TextNormal>
          </View>
          <View className="border-t-4 border-t-green-500" />
          <View className="flex-row px-10 justify-between mt-2">
            <View className="flex-row justify-center items-center space-x-5">
              <Image
                source={IconCart}
                style={{ resizeMode: 'contain', width: ms(30), height: ms(30) }}
              />
              <TextNormal style={{ fontSize: ms(20) }}>
                {cart.result?.menu?.length} Item
              </TextNormal>
            </View>
            <TouchableNativeFeedback onPress={submit}>
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
