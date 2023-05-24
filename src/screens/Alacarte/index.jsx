import {
  View,
  Text,
  Image,
  ImageBackground,
  FlatList,
  Pressable,
  TouchableNativeFeedback,
  ActivityIndicator,
} from 'react-native'
import React, { useCallback } from 'react'
import { ms } from 'react-native-size-matters'
import { TextBold, TextNormal } from '../../components/Text'
import { BgMenu } from '../../assets/images/background'
import { Logo } from '../../assets/icons'
import Overlay from '../../components/Overlay'
import { useDispatch, useSelector } from 'react-redux'
import { useFocusEffect } from '@react-navigation/native'
import { getAlacarteOrder } from '../../stores/actions/alacarte'
import Icon from 'react-native-vector-icons/AntDesign'

const DATA_DUMMY = [
  {
    alacarte_type: 1,
    order_no: '#123123123123',
    user: {
      name: 'Sundus',
    },
    patient: {
      name: 'SUndus Patient',
    },
    floor_name: 'Lantai 8',
    room_no: '6',
  },
  {
    alacarte_type: 2,
    order_no: '#123123123123',
    user: {
      name: 'Sundus',
    },
    guest_name: 'Sundus Individual',
    location: 'garut',
    floor_name: 'Lantai 8',
    room_no: '6',
  },
]

const AlacarteHome = ({ navigation }) => {
  const { auth, alacarteOrder } = useSelector(state => state)
  const { data, error, isFetching } = alacarteOrder
  const dispatch = useDispatch()
  const _renderItem = ({ item }) => {
    return (
      <Pressable
        onPress={() =>
          navigation.navigate('AlacarteDetailOrder', { data: item })
        }>
        <View
          className=" flex-row justify-between bg-white"
          style={{
            elevation: 10,
            borderRadius: ms(5),
            padding: ms(5),
            margin: ms(10),
          }}>
          <View>
            <TextNormal style={{ color: 'black', fontSize: ms(14) }}>
              {item.order_no}
            </TextNormal>
            <TextNormal style={{ fontSize: ms(12) }}>
              Type:{' '}
              {item.ala_carte_type === 1 ? 'Patient Guest' : 'Individual Guest'}
            </TextNormal>
          </View>
          <View className="items-end">
            <TextNormal style={{ fontSize: ms(12), color: 'green' }}>
              {item.ala_carte_type === 1
                ? item?.patient?.name
                : item.guest_name}
            </TextNormal>
            {item.ala_carte_type === 1 && (
              <TextNormal style={{ fontSize: ms(12), color: 'green' }}>
                {item.floor_name} - {item.room_no}
              </TextNormal>
            )}
            {item.ala_carte_type === 2 && (
              <TextNormal style={{ fontSize: ms(12), color: 'green' }}>
                {item.location}
              </TextNormal>
            )}
          </View>
        </View>
      </Pressable>
    )
  }

  useFocusEffect(
    useCallback(() => {
      dispatch(
        getAlacarteOrder({
          serverUrl: auth.serverUrl,
          clientId: auth.user.selected_client,
        }),
      )
    }, []),
  )

  return (
    <View className="flex-[1]">
      <ImageBackground source={BgMenu} className="flex-[1]">
        <View className="z-[2] justify-start items-center pb-7">
          <Image
            source={Logo}
            alt="logo"
            style={{ width: ms(150), height: ms(70) }}
            resizeMode="contain"
          />
          <View className="flex-row justify-center w-full px-10 items-center">
            <Text
              style={{
                fontSize: ms(20),
                fontFamily: 'Avenir Heavy',
                color: 'black',
                textAlign: 'center',
              }}>
              Alacarte Order
            </Text>
          </View>
        </View>
        <Overlay color="bg-white/70" />
      </ImageBackground>
      <View className="flex-[3.5] rounded-t-[40px] -mt-5 z-[5] bg-white">
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple('#ccc')}
          onPress={() => navigation.navigate('AlacarteOption')}>
          <View
            className="bg-green-600 justify-center items-center"
            style={{
              width: ms(50),
              height: ms(50),
              borderRadius: ms(50),
              position: 'absolute',
              bottom: ms(20),
              right: ms(20),
              zIndex: 99,
            }}>
            <Icon name="plus" color="white" size={ms(20)} />
          </View>
        </TouchableNativeFeedback>
        {isFetching ? (
          <ActivityIndicator size={'large'} color={'#00ff00'} />
        ) : data.length < 1 ? (
          <TextBold style={{ textAlign: 'center', fontSize: ms(16) }}>
            There is no history of order
          </TextBold>
        ) : (
          <FlatList
            contentContainerStyle={{
              marginTop: ms(10),
            }}
            keyExtractor={(item, i) => i.toString()}
            data={data}
            renderItem={_renderItem}
          />
        )}
      </View>
    </View>
  )
}

export default AlacarteHome
