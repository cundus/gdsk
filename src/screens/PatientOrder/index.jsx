import React, { useState } from 'react'
import {
  ActivityIndicator,
  Alert,
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native'
import { ms } from 'react-native-size-matters'
import { useDispatch, useSelector } from 'react-redux'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'
import { useCallback } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import IconAD from 'react-native-vector-icons/AntDesign'
import IconFA from 'react-native-vector-icons/FontAwesome'
import { BgLantai, BgMenu } from '../../assets/images/background'
import Overlay from '../../components/Overlay'
import { TextBold } from '../../components/Text'
import {
  getPatientOrder,
  syncPatientOrder,
  syncPatientOrderExtra,
} from '../../stores/actions/patientOrder'
import { loading } from '../../stores/reducers/patientOrder'
import color from '../../utils/color'
import { updateCart } from '../../stores/reducers/cartPatientOrder'

const PatientOrder = ({ navigation }) => {
  const { floor, auth, patientOrder } = useSelector(state => state)
  const dispatch = useDispatch()
  console.log(JSON.stringify(patientOrder, null, 2))

  const [state, setState] = useState({
    orderPatient: [],
    orderExtra: [],
  })
  const [search, setSearch] = useState('')
  const filterMenu = menus => {
    if (search === '') {
      return menus
    }
    return menus.filter(menu =>
      menu.floor_name.toLowerCase().includes(search.toLocaleLowerCase()),
    )
  }

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
    dispatch(
      getPatientOrder({
        serverUrl: auth.serverUrl,
        clientId: auth.user.selected_client,
      }),
    )
  }

  const _renderItem = ({ item }) => {
    console.log(
      state.orderPatient.filter(order => order.floor === item.floor_id).length,
      state,
      item.floor_id,
    )
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
            <View style={styles.rightCard} className="bg-green-600">
              <Text style={[styles.statusCardText, { color: 'white' }]}>
                {state.orderPatient.length > 0
                  ? state.orderPatient.filter(
                      order => order.floor === item.floor_id,
                    ).length
                  : 0}{' '}
                Unsynced
              </Text>
            </View>
            <View style={styles.rightCard} className="border border-green-600">
              <Text style={styles.statusCardText} className="text-green-600">
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
        console.log(data)
        setState(prev => ({ ...prev, orderPatient: data }))
        dispatch(updateCart(data))
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
        setState(prev => ({ ...prev, orderExtra: dataExtraFood }))
      }
    } catch (error) {
      Alert.alert('Error Retrieving Data', error.toString())
    }
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={BgMenu} style={{ flex: 0.2 }}>
        <View className="z-[5] flex-1 justify-center items-center">
          <TextBold
            style={{
              fontSize: ms(22),
              color: 'white',
            }}>
            PATIENT ORDER
          </TextBold>
          <View className="flex-row space-x-2 items-center justify-center">
            <TouchableNativeFeedback
              background={TouchableNativeFeedback.Ripple('#ccc')}
              onPress={() => navigation.navigate('Home')}>
              <IconAD name="arrowleft" size={ms(34)} color={'white'} />
            </TouchableNativeFeedback>
            <View className="flex-row bg-white rounded-full justify-start items-center px-3">
              <IconAD name="search1" size={ms(16)} color={'gray'} />
              <TextInput
                placeholder="Search"
                onChangeText={e => setSearch(e)}
                className="w-[70%]"
              />
            </View>
            <View className="w-5" />
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
        <View style={{ flex: 1 }}>
          <View style={styles.contentContainer}>
            {floor.isFetching || patientOrder.isFetching ? (
              <ActivityIndicator size={'large'} color={'#00ff00'} />
            ) : (
              <FlatList
                keyExtractor={(item, index) => index.toString()}
                data={filterMenu(patientOrder.data)}
                renderItem={_renderItem}
              />
            )}
          </View>
          <View
            style={{
              zIndex: 99,
              width: ms(50),
              height: ms(50),
              borderRadius: ms(50),
              position: 'absolute',
              bottom: ms(20),
              right: ms(20),
              backgroundColor: color.GREEN_PRIMARY,
              justifyContent: 'center',
              alignItems: 'center',
              overflow: 'hidden',
            }}>
            <TouchableNativeFeedback
              onPress={syncData}
              disabled={floor.isFetching || patientOrder.isFetching}
              background={TouchableNativeFeedback.Ripple('#ccc')}>
              <View
                style={{
                  zIndex: 99,
                  width: ms(50),
                  height: ms(50),
                  borderRadius: ms(50),
                  backgroundColor: color.GREEN_PRIMARY,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <IconFA name="refresh" size={ms(30)} color={'white'} />
              </View>
            </TouchableNativeFeedback>
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
    marginHorizontal: ms(5),
    elevation: 10,
    backgroundColor: 'white',
    paddingHorizontal: ms(10),
    paddingVertical: ms(15),
    borderRadius: ms(10),
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
