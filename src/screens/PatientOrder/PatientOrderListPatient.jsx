import {
  View,
  Text,
  ImageBackground,
  Pressable,
  Image,
  FlatList,
  Alert,
  TouchableNativeFeedback,
  TextInput,
} from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/AntDesign'

import { BgMenu } from '../../assets/images/background'
import Overlay from '../../components/Overlay'
import { IconPending, Logo } from '../../assets/icons'
import { TextBold, TextNormal } from '../../components/Text'
import { ms } from 'react-native-size-matters'
import { useEffect } from 'react'
import { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getPatientOrderPatient,
  getPatientOrderRoom,
} from '../../stores/actions/patientOrder'
import axios from 'axios'

const PatientOrderListPatient = ({ route, navigation }) => {
  const { room } = route.params
  const state = useSelector(state => state.auth)
  const [data, setData] = useState([])
  const [search, setSearch] = useState('')

  const filterMenu = menus => {
    if (search === '') {
      return menus
    }
    return menus.filter(menu =>
      menu.patient_name.toLowerCase().includes(search.toLocaleLowerCase()),
    )
  }

  useFocusEffect(
    useCallback(() => {
      const getRoom = async () => {
        try {
          const { data: patientData } = await axios.get(
            `${state.serverUrl}/order-patient/patients?f=${room.floor_id}&r=${room.room_id}&rc=${room.room_class_id}`,
          )

          setData(patientData)
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
    // return item.order.map(order => (
    return (
      <Pressable
        onPress={() =>
          navigation.navigate('PatientOrderDetailOrder', {
            patient: item,
          })
        }>
        <View
          className="flex-row p-5 justify-between items-center border border-gray-100 m-5  bg-white"
          style={{ elevation: 6, borderRadius: ms(10) }}>
          <View>
            <TextBold style={{ fontSize: ms(18), color: 'black' }}>
              {item.patient_name.toUpperCase()}
            </TextBold>
            <TextNormal style={{ fontSize: ms(12) }}>{item.status}</TextNormal>
          </View>

          <View className="flex-row space-x-2">
            <View className="items-end">
              <View className="flex-row items-center">
                {/* {order.detail.filter(detail => +detail.order_status === 0)
                  .length > 0 ? (
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
                      style={{
                        width: ms(25),
                        height: ms(25),
                        resizeMode: 'contain',
                      }}
                    />
                  </View>
                ) : null} */}
                <View
                  // +
                  //   (order.detail.filter(detail => +detail.order_status === 0)
                  //     .length > 0
                  //     ? ' bg-lime-500 '
                  //     : ' bg-green-600  ')
                  className={'p-2 rounded-xl '}>
                  <TextNormal style={{ fontSize: ms(12), color: 'white' }}>
                    {/* {order.detail.filter(detail => detail.order_status === 0)
                      .length > 0
                      ? 'Start order'
                      : 'Order finish'} */}
                  </TextNormal>
                </View>
              </View>
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
          <TextNormal style={{ fontSize: ms(18) }} className="text-green-600">
            {room.room_name}
          </TextNormal>
        </View>
      </Pressable>
    )
    // ))
  }

  return (
    <View className="flex-[1]">
      <ImageBackground source={BgMenu} className="flex-[0.2] ">
        <Overlay color={'bg-green-600/70'} />
        <View className="z-[5] flex-1 justify-center items-center">
          <TextBold
            style={{
              fontSize: ms(22),
              color: 'white',
            }}>
            {room.room_name.toUpperCase()}
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
                placeholder="Search"
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
        <View className="flex-[1] z-[10] bg-white rounded-3xl">
          {data.length > 0 ? (
            <FlatList
              data={filterMenu(data)}
              keyExtractor={(item, index) => index.toString()}
              renderItem={_renderItem}
            />
          ) : (
            <View className="items-center " style={{ marginTop: ms(20) }}>
              <TextBold style={{ fontSize: ms(12) }}>
                There is no patient in this room
              </TextBold>
            </View>
          )}
        </View>
      </View>
    </View>
  )
}

export default PatientOrderListPatient
