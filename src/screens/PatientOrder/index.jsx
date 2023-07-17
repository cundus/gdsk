import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  ImageBackground,
  ActivityIndicator,
  Alert,
  Pressable,
  TouchableNativeFeedback,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { ms } from 'react-native-size-matters'

import { getFloor } from '../../stores/actions/floor'
import { BgLantai, BgMenu } from '../../assets/images/background'
import {
  IconHospital,
  IconHospitaltext,
  LogoAlacarte,
  OrnamentBuilding,
} from '../../assets/icons'
import { TextBold, TextNormal } from '../../components/Text'
import {
  getPatientOrder,
  syncPatientOrder,
  syncPatientOrderExtra,
} from '../../stores/actions/patientOrder'
import { useFocusEffect } from '@react-navigation/native'
import { useCallback } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Icon from 'react-native-vector-icons/FontAwesome'
import IconAD from 'react-native-vector-icons/AntDesign'
import { loading } from '../../stores/reducers/patientOrder'
import Overlay from '../../components/Overlay'
import { TextInput } from 'react-native-gesture-handler'

const countPendingOrder = floor => {
  let num = 0
  floor.room.map(room =>
    room.patient.map(patient =>
      patient.order.map(order =>
        order.detail
          .filter(detail => detail.order_status === 0)
          .map(() => {
            num += 1
            return num
          }),
      ),
    ),
  )

  return num
}

const PatientOrder = ({ navigation }) => {
  const { floor, auth, patientOrder } = useSelector(state => state)
  const dispatch = useDispatch()

  const [state, setState] = useState({
    orderPatient: [],
    orderExtra: [],
  })

  useFocusEffect(
    useCallback(() => {
      dispatch(
        getPatientOrder({
          serverUrl: auth.serverUrl,
          clientId: auth.user.selected_client,
        }),
      )
      getOrderPatientFromStorage()
      getExtraFoodDataFromStorage()
      console.log(JSON.stringify(state.orderPatient, null, 2))
    }, []),
  )

  const syncData = async () => {
    dispatch(loading())
    await dispatch(
      syncPatientOrder({ serverUrl: auth.serverUrl, body: state.orderPatient }),
    )
    await dispatch(
      syncPatientOrderExtra({
        serverUrl: auth.serverUrl,
        body: state.orderExtra,
      }),
    )

    AsyncStorage.multiRemove(['orderPatient', 'orderExtra'])
    setState({
      orderPatient: [],
      orderExtra: [],
    })
    dispatch(loading())
  }

  console.log(JSON.stringify(state.orderPatient, null, 2))

  const _renderItem = ({ item }) => {
    return (
      <TouchableNativeFeedback
      background={TouchableNativeFeedback.Ripple('#ccc')}
        onPress={() =>
          navigation.navigate('PatientOrderListRoom', {
            floor: item,
          })
        }>
        <View style={styles.card}>

          <Text style={[styles.cardText, { color: 'black' }]}>
            {item.floor_name}
          </Text>
          <View className="flex-row space-x-3">
            <View style={styles.rightCard} className='bg-green-600'>
              <Text style={[styles.statusCardText, { color: 'white' }]}>
                {state.orderPatient.length > 0
                  ? state.orderPatient.filter(
                    order => order.floor === item.floor_id,
                  ).length
                  : 0}{' '}
                Unsynced
              </Text>
            </View>
            <View style={styles.rightCard} className='border border-green-600'>
              <Text style={styles.statusCardText} className='text-green-600'>
                {item.pending_order} Pending
              </Text>
            </View>
          </View>
        </View>
      </TouchableNativeFeedback>
    )
  }

  const getOrderPatientFromStorage = async () => {
    try {
      const value = await AsyncStorage.getItem('orderPatient')
      if (value !== null) {
        const data = JSON.parse(value)
        setState({ ...state, orderPatient: data })
      }
    } catch (error) {
      Alert.alert('Error Retrieving Data', error.toString())
    }
  }

  const getExtraFoodDataFromStorage = async () => {
    try {
      const value = await AsyncStorage.getItem('orderExtra')
      if (value !== null) {
        const dataExtraFood = JSON.parse(value)
        setState({ ...state, orderExtra: dataExtraFood })
      }
    } catch (error) {
      Alert.alert('Error Retrieving Data', error.toString())
    }
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={BgMenu} style={{ flex: .2 }}>
        <View className='z-[5] flex-1 justify-center items-center'>
          <TextBold style={{
            fontSize: ms(22),
            color: 'white',
          }}>PATIENT ORDER</TextBold>
          <View className='flex-row space-x-2 items-center justify-center'>
            <TouchableNativeFeedback
              background={TouchableNativeFeedback.Ripple('#ccc')}
              onPress={() => navigation.goBack()}>
              <IconAD name='arrowleft' size={ms(34)} color={'white'} />
            </TouchableNativeFeedback>
            <View className='flex-row bg-white rounded-full justify-start items-center px-3'>
              <IconAD name='search1' size={ms(16)} color={'gray'} />
              <TextInput placeholder='Search' className='w-[70%]' />
            </View>
            <View className='w-5' />
          </View>
        </View>
        <Overlay color={'bg-green-700/70'} />
      </ImageBackground>
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          borderTopLeftRadius: ms(10),
          borderTopRightRadius: ms(10),
        }}>
        <View
          source={BgLantai}
          style={{ zIndex: 4, flex: 1 }}
        >
          <View style={styles.contentContainer}>
           
            {floor.isFetching || patientOrder.isFetching ? (
              <ActivityIndicator size={'large'} color={'#00ff00'} />
            ) : (
              <FlatList
                keyExtractor={(item, index) => index.toString()}
                data={patientOrder.data}
                renderItem={_renderItem}
              />
            )}
          </View>
        </View>
      </View>
    </View>
  )
}

export default PatientOrder

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: '100%',
    zIndex: 1,
  },
  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    backgroundColor: 'rgba(255, 255, 255, .5)',
  },
  contentContainer: {
    flex: 1,
    // marginTop: ms(150),
    // marginHorizontal: ms(60),
    padding: ms(5),
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: ms(5),
    marginHorizontal:ms(5),
    elevation:10,
    backgroundColor:'white',
    paddingHorizontal:ms(10),
    paddingVertical: ms(10),
    borderRadius:ms(5)
  },
  leftCard: {
    backgroundColor: 'white',
    borderRadius: ms(50),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: ms(8),
    paddingHorizontal: ms(9),
    width: ms(120),
    // flex: 1,
  },
  rightCard: {
    borderRadius: ms(50),
    justifyContent: 'center',
    paddingHorizontal: ms(10),
    paddingVertical: ms(2),
    alignItems: 'center',
  },
  cardText: {
    fontSize: ms(16),
    fontFamily: 'Avenir Heavy',
  },
  statusCardText: {
    fontSize: ms(10),
    fontFamily: 'Avenir Heavy',
  },
  title: {
    textAlign: 'center',
    fontSize: ms(14),
    color: 'white',
    fontFamily: 'Avenir Heavy',
  },
})
