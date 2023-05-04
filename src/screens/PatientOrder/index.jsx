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
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { ms } from 'react-native-size-matters'

import { getFloor } from '../../stores/actions/floor'
import { BgLantai, BgMenu } from '../../assets/images/background'
import { LogoAlacarte } from '../../assets/icons'
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
    }, []),
  )

  const syncData = async () => {
    await dispatch(syncPatientOrder(state.orderPatient))
    await dispatch(syncPatientOrderExtra(state.orderPatient))
  }

  const _renderItem = ({ item }) => {
    return (
      <View style={styles.card}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('PatientOrderListRoom', { data: item })
          }>
          <View style={styles.leftCard}>
            <Text style={[styles.cardText, { color: 'black' }]}>
              {item.name}
            </Text>
          </View>
        </TouchableOpacity>
        <View className="flex-row space-x-3">
          <View style={styles.rightCard}>
            <Text style={[styles.statusCardText, { color: 'black' }]}>
              {state.orderPatient.length > 0
                ? state.orderPatient.filter(order => order.floor === item.id)
                    .length
                : 0}{' '}
              Unsynced
            </Text>
          </View>
          <View style={styles.rightCard}>
            <Text style={[styles.statusCardText, { color: 'black' }]}>
              {countPendingOrder(item)} Pending
            </Text>
          </View>
        </View>
      </View>
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
      <ImageBackground source={BgMenu} style={{ flex: 1 }}>
        <View style={styles.overlay}></View>
        <View className="flex-[1] -mt-5 justify-center items-center h-full"></View>
      </ImageBackground>
      <View
        style={{
          flex: 4,
          backgroundColor: 'white',
          borderTopLeftRadius: ms(10),
          borderTopRightRadius: ms(10),
          marginTop: -ms(20),
        }}>
        <ImageBackground
          source={BgLantai}
          style={{ zIndex: 4, marginTop: -ms(50), flex: 1 }}
          resizeMode="stretch"
          resizeMethod="resize">
          <View style={styles.contentContainer}>
            <View className="flex-row justify-between items-center px-5">
              <View style={{ width: ms(20) }} />
              <Text style={styles.title}>Patient Order</Text>
              <Pressable onPress={syncData}>
                <Icon name="refresh" color={'white'} size={ms(20)} />
              </Pressable>
            </View>
            <View className="flex-row justify-around">
              <TextBold className="text-white" style={{ fontSize: ms(14) }}>
                Choose your floor
              </TextBold>
              <TextBold
                className="text-white text-center"
                style={{ fontSize: ms(14) }}>
                Status Order
              </TextBold>
            </View>
            {floor.isFetching ? (
              <ActivityIndicator size={'large'} color={'#00ff00'} />
            ) : (
              <FlatList
                keyExtractor={(item, index) => index.toString()}
                data={patientOrder.data}
                renderItem={_renderItem}
              />
            )}
          </View>
        </ImageBackground>
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
    marginTop: ms(170),
    marginHorizontal: ms(110),
    marginBottom: ms(100),
    paddingLeft: ms(5),
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: ms(5),
    marginHorizontal: ms(10),
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
    backgroundColor: 'yellow',
    borderRadius: ms(50),
    justifyContent: 'center',
    paddingHorizontal: ms(5),
    alignItems: 'center',
  },
  cardText: {
    fontSize: ms(10),
    fontFamily: 'Avenir Heavy',
  },
  statusCardText: {
    fontSize: ms(8),
    fontFamily: 'Avenir Heavy',
  },
  title: {
    textAlign: 'center',
    fontSize: ms(14),
    color: 'white',
    fontFamily: 'Avenir Heavy',
  },
})
