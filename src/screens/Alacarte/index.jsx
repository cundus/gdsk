import {
  View,
  Text,
  Image,
  ImageBackground,
  FlatList,
  Pressable,
  TouchableNativeFeedback,
  ActivityIndicator,
  TextInput,
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
            padding: ms(10),
            margin: ms(5),
          }}>
          <View>
            <TextNormal style={{ color: 'black', fontSize: ms(18), fontWeight: '700' }}>
              #{item.order_no}
            </TextNormal>
            <TextNormal style={{ fontSize: ms(12), fontWeight: '700' }}>
              Type:{' '}
              {item.ala_carte_type === 1 ? 'Patient Guest' : 'Individual Guest'}
            </TextNormal>
          </View>
          <View className="items-end">
            <TextBold style={{ fontSize: ms(12), color: 'green', }}>
              {item.ala_carte_type === 1
                ? item?.patient?.name
                : item.guest_name}
            </TextBold>
            {item.ala_carte_type === 1 && (
              <TextBold style={{ fontSize: ms(12), color: 'green', }}>
                {item.floor_name} - {item.room_no}
              </TextBold>
            )}
            {item.ala_carte_type === 2 && (
              <TextBold style={{ fontSize: ms(12), color: 'green', }}>
                {item.location}
              </TextBold>
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
      <ImageBackground source={BgMenu} className="flex-[0.2]" >
        <View className='z-[5] flex-1 justify-center items-center'>
          <TextBold style={{
            fontSize: ms(26),
            color: 'white',
          }}>A L A  C A R T E</TextBold>
          <View className='flex-row space-x-2 items-center justify-center'>
            <TouchableNativeFeedback
              background={TouchableNativeFeedback.Ripple('#ccc')}
              onPress={() => navigation.navigate('Home')}>
              <Icon name='arrowleft' size={ms(34)} color={'white'} />
            </TouchableNativeFeedback>
            <View className='flex-row bg-white rounded-full justify-start items-center px-3'>
              <Icon name='search1' size={ms(16)} color={'gray'} />
              <TextInput placeholder='Search' className='w-[70%]' />
            </View>
            <View className='w-5' />
          </View>
        </View>
        <Overlay color="bg-green-600/70" />
      </ImageBackground>
      <View className="flex-[1] z-[5] bg-white ">
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
            overflow:'hidden'
          }}>
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple('#ccc')}
            style={{
              borderRadius: '100%'
            }}
            onPress={() => navigation.navigate('AlacarteOption')}>
            <View
              className="bg-green-600 justify-center items-center"
              style={{
                width: ms(50),
                height: ms(50),
                borderRadius: ms(50),
                zIndex: 99,
              }}>
              <Icon name="plus" color="white" size={ms(20)} />
            </View>
          </TouchableNativeFeedback>
        </View>
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
              paddingBottom: ms(10)
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
