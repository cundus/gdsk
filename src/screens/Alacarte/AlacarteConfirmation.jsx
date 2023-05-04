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
import { removeItem, updateCart } from '../../stores/reducers/cart'
import { useFocusEffect } from '@react-navigation/native'
import { useCallback } from 'react'

const AlacarteConfirmation = ({ navigation }) => {
  const { cart, auth } = useSelector(state => state)
  const [data, setData] = useState({})
  const [show, setShow] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const dispatch = useDispatch()
  const [selected, setSelected] = useState(null)

  const handlePlus = id => {
    console.log('Handle Plus: ', id)

    let cartOrder = { ...cart.result }
    const itemIdx = cartOrder.detail.findIndex(item => item.id === id)

    if (itemIdx !== -1) {
      cartOrder.quantity[itemIdx] = +cartOrder.quantity[itemIdx] + 1
      cartOrder.total[itemIdx] =
        +cartOrder.quantity[itemIdx] * +cartOrder.price[itemIdx]

      cartOrder.grand_total = cartOrder.total.reduce((a, b) => a + b, 0)

      console.log('Item Idx: ', cartOrder.quantity)
    }

    dispatch(updateCart(cartOrder))
  }

  const handleMinus = id => {
    // setData(prevData =>
    //   prevData.map(item => {
    //     if (item.id === id) {
    //       if (item.qty === 1) {
    //         return item
    //       }
    //       return {
    //         ...item,
    //         qty: item.qty - 1,
    //       }
    //     }
    //     return item
    //   }),
    // )
  }

  const onpressRemove = id => {
    // const selectedData = data.find(item => item.id === id)
    // setSelected(selectedData)
    setShow(true)
    // setData(newData)
  }

  const onRemove = () => {
    // dispatch(
    //   removeItem({
    //     ...selected,
    //   }),
    // )
    setShow(false)
    // setData(prevData => {
    //   return prevData.filter(item => item.id !== selected.id)
    // })
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
              marginTop: ms(-20),
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
          <View className="">
            <TextBold style={{ fontSize: ms(20), color: 'black' }}>
              {item.name}
            </TextBold>
            <TextBold
              style={{ fontSize: ms(18), color: 'black', marginBottom: 10 }}>
              <Supscript /> {data.price[index]}{' '}
              {data.quantity[index] > 1 && (
                <TextNormal>{`x${data.quantity[index]} = ${
                  +data.price[index] * +data.quantity[index]
                }`}</TextNormal>
              )}
            </TextBold>
            <View className="flex-row  items-center space-x-5">
              <Pressable onPress={() => handleMinus(item.id)}>
                <View className="border-2 rounded-xl p-1">
                  <Icon name="minus" size={ms(16)} color="black" />
                </View>
              </Pressable>
              <TextBold style={{ fontSize: ms(16), color: 'black' }}>
                {data.quantity[index]}
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
          <Image
            source={IconDelete}
            resizeMode="contain"
            style={{ width: ms(50), height: ms(50) }}
          />
        </Pressable>
      </View>
    )
  }

  const saveToStorage = async data => {
    try {
      const value = await AsyncStorage.getItem('lastOrder')
      if (value !== null) {
        const lastOrder = JSON.parse(value)
        // lastOrder.captainOrder = data.order_no.toString()
        await AsyncStorage.setItem('lastOrder', JSON.stringify(lastOrder))
      } else {
        const lastOrder = {
          // captainOrder: data.order_no.toString(),
          functionOrder: '',
        }
        await AsyncStorage.setItem('lastOrder', JSON.stringify(lastOrder))
      }
    } catch (error) {
      Alert.alert('Error Retrieving Data', error.toString())
    }
  }

  // console.log('Cart Result: ', cart.result)

  useFocusEffect(
    useCallback(() => {
      setData(cart.result)

      // console.log('Data: ', data)
    }, []),
  )

  return (
    <View className="flex-[1]">
      <ImageBackground source={BgMenu} className="flex-[1]">
        <View className="z-[2] justify-between items-center flex-row px-16">
          <Pressable onPress={() => navigation.goBack()}>
            <Icon name="arrowleft" size={ms(30)} color={'white'} />
          </Pressable>
          <Image
            source={Logo}
            resizeMode="contain"
            alt="logo"
            style={{ width: ms(130), height: ms(90) }}
          />
          <View className="w-20" />
        </View>
        <Overlay color={'bg-green-400/80'} />
      </ImageBackground>
      <View className="flex-[4] rounded-t-3xl bg-white -mt-10 z-10">
        <TextBold
          className="text-center text-black"
          style={{ fontSize: ms(16), marginTop: ms(5) }}>
          ORDER CONFIRMATION
        </TextBold>
        <FlatList
          data={data?.detail}
          keyExtractor={(item, index) => index.toString()}
          renderItem={_renderItem}
        />
        <View>
          <View className="flex-row justify-between px-10 items-center">
            <TextNormal style={{ fontSize: ms(22), color: 'black' }}>
              Total
            </TextNormal>
            <TextBold style={{ fontSize: ms(22), color: 'black' }}>
              <Supscript />
              {data?.quantity?.reduce(
                (a, b, index) => a + b * data?.price[index],
                0,
              )}
            </TextBold>
          </View>
          <View className="flex-row justify-between px-10 items-center mb-5">
            <View className="flex-row items-center space-x-3">
              <Image
                source={IconCart}
                alt="cart"
                style={{ width: ms(20), height: ms(20), resizeMode: 'contain' }}
              />
              <TextNormal style={{ fontSize: ms(20), color: 'black' }}>
                {data?.quantity?.reduce((a, b) => a + b, 0)} item
              </TextNormal>
            </View>
            <TouchableNativeFeedback
              onPress={() => setShowSuccess(true)}
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
        onPress={() => navigation.replace('AlacartePatient')}
      />
    </View>
  )
}

export default AlacarteConfirmation
