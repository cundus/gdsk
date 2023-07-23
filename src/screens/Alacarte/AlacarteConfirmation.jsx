import React, { useEffect, useMemo, useState } from 'react'
import {
  View,
  Text,
  ImageBackground,
  Image,
  Pressable,
  FlatList,
  Alert,
  TouchableNativeFeedback,
  ScrollView,
  Modal,
} from 'react-native'
import { BgMenu } from '../../assets/images/background'
import Overlay from '../../components/Overlay'
import Icon from 'react-native-vector-icons/AntDesign'
import { ms } from 'react-native-size-matters'
import { IconCart, IconDelete, Logo } from '../../assets/icons'
import { TextBold, TextNormal } from '../../components/Text'
import PopUpConfirmation from '../../components/PopUpConfirmation'
import PopUpSuccess from '../../components/PopUpSuccess'
import Supscript from '../../components/Supscript'
import { useDispatch, useSelector } from 'react-redux'
import {
  decreaseQuantity,
  increaseQuantity,
  removeItem,
  updateCart,
} from '../../stores/reducers/cart'
import { useFocusEffect } from '@react-navigation/native'
import { useCallback } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { submitAlacarteOrder } from '../../stores/actions/alacarte'

const AlacarteConfirmation = ({ navigation }) => {
  const { cart, auth } = useSelector(state => state)
  const [data, setData] = useState({})
  const [show, setShow] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const dispatch = useDispatch()
  const [selected, setSelected] = useState(null)

  const handlePlus = id => {
    dispatch(increaseQuantity({ id }))
  }

  const handleMinus = id => {
    dispatch(decreaseQuantity({ id }))
  }

  const onpressRemove = id => {
    const selectedData = cart.result?.detail.find(item => item.id === id)
    setSelected(selectedData)
    setShow(true)
  }

  const onRemove = () => {
    dispatch(
      removeItem({
        ...selected,
      }),
    )

    setShow(false)
  }

  const _renderItem = ({ item, index }) => {
    // console.log('Render Item: ', item)
    return (
      <View
        className="flex-row m-5 bg-white rounded-xl justify-between px-5 pt-3 pb-4"
        style={{
          elevation: 10,
        }}>
        <View className="flex-row space-x-5">
          <View
            style={{
              width: ms(100),
              height: ms(100),
              overflow: 'hidden',
              borderRadius: ms(100),
              elevation: 5,
              backgroundColor: 'white',
            }}>
            <Image
              source={{
                uri: `${auth.serverUrl.replace('api', '')}app/menu/${
                  item.image
                }`,
              }}
              resizeMode="cover"
              style={{
                width: '100%',
                height: '100%',
              }}
            />
          </View>
          <View className="justify-center">
            <TextBold style={{ fontSize: ms(20), color: 'black', padding: 12 }}>
              {item.name}
            </TextBold>
            <View className="flex-row  items-center space-x-5 p-3">
              <Pressable onPress={() => handleMinus(item.id)}>
                <View className="border-2 rounded-xl p-1">
                  <Icon name="minus" size={ms(16)} color="black" />
                </View>
              </Pressable>
              <TextBold style={{ fontSize: ms(16), color: 'black' }}>
                {cart.result.quantity[index]}
              </TextBold>
              <Pressable onPress={() => handlePlus(item.id)}>
                <View className="border-2 rounded-xl p-1">
                  <Icon name="plus" size={ms(16)} color="black" />
                </View>
              </Pressable>
            </View>
          </View>
        </View>
        <Pressable onPress={() => onpressRemove(item.id)}>
          <View className="rounded-full bg-green-500 p-0.5">
            <Icon name="close" size={ms(16)} color="white" className="p-1" />
          </View>
        </Pressable>
      </View>
    )
  }

  const saveToStorage = async data => {
    try {
      const value = await AsyncStorage.getItem('lastOrder')
      if (value !== null) {
        const lastOrder = JSON.parse(value)
        lastOrder.captainOrder = data.order_no.toString()
        await AsyncStorage.setItem('lastOrder', JSON.stringify(lastOrder))
      } else {
        const lastOrder = {
          captainOrder: data.order_no.toString(),
        }
        await AsyncStorage.setItem('lastOrder', JSON.stringify(lastOrder))
      }

      let order = []
      const savedOrder = await AsyncStorage.getItem('orderAlacarte')
      if (savedOrder !== null) {
        order = JSON.parse(savedOrder)
      }
      order.push(data)
      await AsyncStorage.setItem('orderAlacarte', JSON.stringify(order))
    } catch (error) {
      Alert.alert('Error Retrieving Data', error.toString())
    }
  }

  // console.log('Cart Result: ', cart.result)

  useFocusEffect(
    useCallback(() => {
      // console.log('Data: ', data)
    }, []),
  )

  return (
    <View className="flex-[1]">
      <ImageBackground source={BgMenu} className="flex-[0.13]">
        <View className="z-[2] justify-between flex-row flex-[1] items-center px-8 ">
          <Pressable onPress={() => navigation.goBack()}>
            <Icon name="arrowleft" size={ms(30)} color={'white'} />
          </Pressable>
          <TextBold
            className="text-center text-black"
            style={{ fontSize: ms(18), marginTop: ms(5), color: 'white' }}>
            ORDER CONFIRMATION
          </TextBold>
          <View className="w-20" />
        </View>
        <Overlay color={'bg-green-600/80'} />
      </ImageBackground>
      <View className="flex-[1] bg-white z-10">
        <FlatList
          data={cart.result?.detail}
          keyExtractor={(item, index) => index.toString()}
          renderItem={_renderItem}
        />
        <View className="border-t-8 flex-row justify-between border-green-500 mx-3">
          <View className="justify-between px-10 items-start">
            <TextNormal style={{ fontSize: ms(22), color: 'black' }}>
              Total
            </TextNormal>
            <View className="flex-row items-center space-x-3">
              <Image
                source={IconCart}
                alt="cart"
                style={{ width: ms(20), height: ms(20), resizeMode: 'contain' }}
              />
              <TextNormal style={{ fontSize: ms(20), color: 'black' }}>
                {cart.result?.quantity?.reduce((a, b) => a + b, 0)} item
              </TextNormal>
            </View>
          </View>
          <View className="flex-row justify-between px-10 items-center ">
            <TouchableNativeFeedback
              onPress={async () => {
                if (cart.result.menu.length < 1) {
                  return Alert.alert(
                    'Error',
                    'There is no product added, please add atleast 1 product',
                  )
                }

                dispatch(
                  submitAlacarteOrder({
                    body: cart.result,
                    serverUrl: auth.serverUrl,
                  }),
                )

                setShowSuccess(true)
              }}
              background={TouchableNativeFeedback.Ripple('#ccc')}>
              <View className="bg-green-500  px-10 rounded-xl">
                <TextNormal className="text-white" style={{ fontSize: ms(22) }}>
                  Take Order
                </TextNormal>
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
      </View>
      <PopUpConfirmation
        onConfirm={onRemove}
        onDecline={() => setShow(false)}
        show={show}
        data={selected}
      />
      <PopUpSuccess
        show={showSuccess}
        onPress={() => navigation.replace('AlacarteHome')}
      />
    </View>
  )
}

export default AlacarteConfirmation
