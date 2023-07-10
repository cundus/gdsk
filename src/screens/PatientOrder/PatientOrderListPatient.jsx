import {
  View,
  Text,
  ImageBackground,
  Pressable,
  Image,
  FlatList,
  Alert,
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
          navigation.navigate('PatientOrderListMenu', {
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
              <TextNormal style={{ fontSize: ms(10) }}>
                {room.room_name}
              </TextNormal>
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
    // ))
  }

  return (
    <View className="flex-[1]">
      <ImageBackground source={BgMenu} className="flex-[1] ">
        <Overlay color={'bg-white/70'} />

        <View className="flex-row z-[4] justify-between items-center px-10">
          <Pressable onPress={() => navigation.goBack()}>
            <Icon name="arrowleft" size={ms(30)} color={'black'} />
          </Pressable>
          <View className="items-center justify-start flex-1 ">
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
              {room.room_name} {room.room_no} - {room.room_class_name}
            </TextBold>
          </View>
          <View className="w-14" />
        </View>
      </ImageBackground>
      <View className="flex-[3]">
        <View className="flex-[1] z-[10] -mt-10 bg-white rounded-3xl">
          {data.length > 0 ? (
            <FlatList
              data={data}
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
