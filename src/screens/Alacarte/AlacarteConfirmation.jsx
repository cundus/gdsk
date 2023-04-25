import React, { useState } from 'react'
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

const EXAMPLE_DATA = [
  {
    id: 1,
    img: 'https://kurio-img.kurioapps.com/20/05/23/200f4d33-802b-4a43-a113-489e3bec9fcd.jpg',
    name: 'Bubur Ayam',
    qty: 1,
    harga: 30000,
  },
  {
    id: 2,
    img: 'https://kurio-img.kurioapps.com/20/05/23/200f4d33-802b-4a43-a113-489e3bec9fcd.jpg',
    name: 'Bubur Ayam',
    qty: 1,
    harga: 30000,
  },
  {
    id: 3,
    img: 'https://kurio-img.kurioapps.com/20/05/23/200f4d33-802b-4a43-a113-489e3bec9fcd.jpg',
    name: 'Bubur Ayam',
    qty: 1,
    harga: 30000,
  },
  {
    id: 4,
    img: 'https://kurio-img.kurioapps.com/20/05/23/200f4d33-802b-4a43-a113-489e3bec9fcd.jpg',
    name: 'Bubur Ayam',
    qty: 1,
    harga: 30000,
  },
]

const AlacarteConfirmation = ({ navigation }) => {
  const [data, setData] = useState(EXAMPLE_DATA)
  const [show, setShow] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [selected, setSelected] = useState(null)

  const handlePlus = id => {
    setData(prevData =>
      prevData.map(item => {
        if (item.id === id) {
          return {
            ...item,
            qty: item.qty + 1,
          }
        }
        return item
      }),
    )
  }
  const handleMinus = id => {
    setData(prevData =>
      prevData.map(item => {
        if (item.id === id) {
          if (item.qty === 1) {
            return item
          }
          return {
            ...item,
            qty: item.qty - 1,
          }
        }
        return item
      }),
    )
  }

  const onpressRemove = id => {
    // const newData = data.filter(item => item.id !== id)
    const selectedData = data.find(item => item.id === id)
    setSelected(selectedData)

    setShow(true)

    // setData(newData)
  }

  const onRemove = () => {
    const newData = data.filter(item => item.id !== selected.id)
    setData(newData)
    setShow(false)
  }

  const _renderItem = ({ item }) => {
    return (
      <View
        className="flex-row m-5 bg-white rounded-xl justify-between px-5 py-3"
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
              source={{ uri: item.img }}
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
            <TextBold style={{ fontSize: ms(18), color: 'black' }}>
              {item.harga}{' '}
              {item.qty > 1 && (
                <TextNormal>{`x${item.qty} = ${
                  +item.harga * +item.qty
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
                {item.qty}
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
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={_renderItem}
        />
        <View>
          <View className="flex-row justify-between px-10 items-center">
            <TextNormal style={{ fontSize: ms(22), color: 'black' }}>
              Total
            </TextNormal>
            <TextBold style={{ fontSize: ms(22), color: 'black' }}>
              Rp.{data.reduce((a, b) => a + b.harga * b.qty, 0)}
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
                {data.reduce((a, b) => a + b.qty, 0)} item
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
