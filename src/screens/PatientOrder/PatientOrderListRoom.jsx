import {
  View,
  Text,
  ImageBackground,
  FlatList,
  Pressable,
  Image,
  Alert,
  TouchableNativeFeedback,
  TextInput,
} from 'react-native'
import React from 'react'
import { BgMenu } from '../../assets/images/background'
import Overlay from '../../components/Overlay'
import { TextBold, TextNormal } from '../../components/Text'
import { ms } from 'react-native-size-matters'
import Icon from 'react-native-vector-icons/AntDesign'
import { Logo } from '../../assets/icons'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { useCallback } from 'react'
import { getPatientOrderRoom } from '../../stores/actions/patientOrder'
import { useEffect } from 'react'
import axios from 'axios'

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
  const { floor } = route.params
  const state = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const [data, setData] = useState([])
  const [search, setSearch] = useState('')
  const filterMenu = menus => {
    if (search === '') {
      return menus
    }
    return menus.filter(menu =>
      menu.room_name.toLowerCase().includes(search.toLocaleLowerCase()),
    )
  }
  useFocusEffect(
    useCallback(() => {
      const getRoom = async () => {
        try {
          const { data } = await axios.get(
            `${state.serverUrl}/order-patient/rooms?f=${floor.floor_id}`,
          )

          setData(data)
        } catch (error) {
          if (error.response && error.response.data.message) {
            Alert.alert('error retrieving Room ', error.response.data.message)
          } else {
            Alert.alert('error retrieving Room ', error.message)
          }
        }
      }

      getRoom()
    }, []),
  )

  const _renderItem = ({ item }) => {
    return (
      <Pressable
        onPress={() =>
          navigation.navigate('PatientOrderListPatient', {
            room: item,
          })
        }>
        <View
          className="flex-row p-5 justify-between items-center border border-gray-100 m-5 bg-white"
          style={{ elevation: 6, borderRadius: ms(10) }}>
          <View className="flex-1">
            <TextBold style={{ fontSize: ms(16), color: 'black' }}>
              {item.room_name} {item.room_no}
            </TextBold>
            <TextNormal style={{ fontSize: ms(12) }}>
              {item.bed.length > 15
                ? item.bed.substring(0, 15) + '...'
                : item.bed.length}
            </TextNormal>
          </View>
          <TextBold
            style={{ fontSize: ms(14) }}
            className="flex-1 text-green-600">
            {item.room_class_name}
          </TextBold>
          <View className="py-2 px-4 bg-green-600 rounded-full">
            <TextNormal style={{ fontSize: ms(12), color: 'white' }}>
              Pending Order
            </TextNormal>
          </View>
        </View>
      </Pressable>
    )
  }

  return (
    <View className="flex-[1]">
      <ImageBackground source={BgMenu} className="flex-[0.2] ">
        <Overlay color={'bg-green-700/70'} />
        <View className="z-[5] flex-1 justify-center items-center">
          <TextBold
            style={{
              fontSize: ms(26),
              color: 'white',
            }}>
            {floor.floor_name.toUpperCase()}
          </TextBold>
          <View className="flex-row space-x-2 items-center justify-center">
            <TouchableNativeFeedback
              background={TouchableNativeFeedback.Ripple('#ccc')}
              onPress={() => navigation.goBack()}>
              <Icon name="arrowleft" size={ms(34)} color={'white'} />
            </TouchableNativeFeedback>
            <View className="flex-row bg-white rounded-full justify-start items-center px-3">
              <Icon name="search1" size={ms(16)} color={'gray'} />
              <TextInput
                placeholder="Search Nomor Order"
                value={search}
                onChangeText={e => setSearch(e)}
                className="w-[70%]"
              />
            </View>
            <View className="w-5" />
          </View>
        </View>
      </ImageBackground>
      <View className="flex-[1]">
        <View className="flex-[1] z-[10] bg-white ">
          <FlatList
            data={filterMenu(data)}
            keyExtractor={(item, index) => index.toString()}
            renderItem={_renderItem}
          />
        </View>
      </View>
    </View>
  )
}

export default PatientOrderListRoom
