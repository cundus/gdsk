import React, { useEffect, useMemo, useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  ImageBackground,
  ActivityIndicator,
  TouchableNativeFeedback,
  Alert,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { ms } from 'react-native-size-matters'

import { getFloor } from '../../../stores/actions/floor'
import { BgLantai, BgMenu } from '../../../assets/images/background'
import {
  IconHospital,
  IconHospitaltext,
  LogoAlacarte,
  OrnamentBuilding,
} from '../../../assets/icons'
import IconAD from 'react-native-vector-icons/AntDesign'

import Header from '../../../components/Header'
import { TextBold } from '../../../components/Text'
import { useFocusEffect } from '@react-navigation/native'
import { useCallback } from 'react'
import Overlay from '../../../components/Overlay'
import color from '../../../utils/color'
import { updateCart } from '../../../stores/reducers/cart'
import moment from 'moment'

const AlacartePatient = ({ navigation }) => {
  const { floor, auth } = useSelector(state => state)
  const dispatch = useDispatch()
  useFocusEffect(
    useCallback(() => {
      if (navigation.isFocused()) {
        dispatch(
          getFloor({
            serverUrl: auth.serverUrl,
            clientId: auth.user.selected_client,
          }),
        )
      }
    }, []),
  )

  const handleCart = item => {
    if (Object.keys(item).length < 1) {
      return Alert.alert('Failed', 'Please Choose a Patient!')
    }

    const data = {
      ala_carte_type: 1,
      floor_name: item.floor_name,
      room_no: item.room_no,
      patient_id: item.id,
      patient: {
        name: item.name,
        floor_name: item.floor_name,
        room_no: item.room_no,
        bed: item.bed,
      },
      client_id: auth.user.selected_client,
      user_id: auth.user.id,
      user: {
        id: auth.user.id,
        name: auth.user.name,
      },
      menu: [],
      detail: [],
      price: [],
      quantity: [],
      total: [],
      remarks: [],
      order_choices: [],
      grand_total: 0,
      created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
    }

    dispatch(updateCart(data))

    navigation.navigate('AlacarteListMenu')
  }

  const [form, setForm] = useState({
    floor: {},
    room: {},
    patient: {},
  })

  const _renderFloor = ({ item }) => {
    const isChoosed = form.floor?.id === item?.id
    return (
      <TouchableNativeFeedback
        onPress={() => setForm(prev => ({ ...prev, floor: item }))}
        background={TouchableNativeFeedback.Ripple('#ccc')}>
        <View style={[styles.card, isChoosed ? styles.selectedCard : null]}>
          <Text
            style={[
              styles.cardText,
              { color: isChoosed ? 'white' : color.GREEN_PRIMARY },
            ]}>
            {item.name}
          </Text>
        </View>
      </TouchableNativeFeedback>
    )
  }
  const _renderRoom = ({ item }) => {
    const isChoosed = form.room?.id === item?.id
    return (
      <TouchableNativeFeedback
        onPress={() => setForm(prev => ({ ...prev, room: item }))}
        background={TouchableNativeFeedback.Ripple('#ccc')}>
        <View style={[styles.card, isChoosed ? styles.selectedCard : null]}>
          <Text
            style={[
              styles.cardText,
              { color: isChoosed ? 'white' : color.GREEN_PRIMARY },
            ]}>
            {item.name}
          </Text>
        </View>
      </TouchableNativeFeedback>
    )
  }
  const _renderPatient = ({ item }) => {
    const isChoosed = form.patient?.id === item.id
    return (
      <TouchableNativeFeedback
        onPress={() => setForm(prev => ({ ...prev, patient: item }))}
        background={TouchableNativeFeedback.Ripple('#ccc')}>
        <View style={[styles.card, isChoosed ? styles.selectedCard : null]}>
          <Text
            style={[
              styles.cardText,
              { color: isChoosed ? 'white' : color.GREEN_PRIMARY },
            ]}>
            {item.room_no}-{item.bed} {item.name}
          </Text>
        </View>
      </TouchableNativeFeedback>
    )
  }
  return (
    <View style={styles.container}>
      <ImageBackground source={BgMenu} style={{ flex: 0.2 }}>
        <View className="z-[5] flex-1 px-10 flex-row justify-between items-center">
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple('#ccc')}
            onPress={() => navigation.goBack()}>
            <IconAD name="arrowleft" size={ms(34)} color={'white'} />
          </TouchableNativeFeedback>
          <TextBold
            style={{
              fontSize: ms(22),
              color: 'white',
            }}>
            CREATE ALA CARTE
          </TextBold>
          <View className="w-5" />
        </View>
        <Overlay color={'bg-green-700/70'} />
      </ImageBackground>
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
        }}>
        <View className="p-2 border border-gray-400 mx-3 mt-2 rounded-md">
          <View className="flex-row justify-between items-center mb-2">
            <TextBold style={{ fontSize: ms(18), color: 'black' }}>
              FLOOR
            </TextBold>
            <IconAD name="right" size={ms(20)} color={color.GREEN_PRIMARY} />
          </View>
          <FlatList
            data={floor.floorData}
            renderItem={_renderFloor}
            horizontal
            keyExtractor={(item, id) => id.toString()}
            alwaysBounceHorizontal
          />
        </View>
        <View className="p-2 border border-gray-400 mx-3 mt-2 rounded-md">
          <View className="flex-row justify-between items-center mb-2">
            <TextBold style={{ fontSize: ms(18), color: 'black' }}>
              ROOM
            </TextBold>
            <IconAD name="right" size={ms(20)} color={color.GREEN_PRIMARY} />
          </View>
          <FlatList
            data={form.floor?.room}
            renderItem={_renderRoom}
            horizontal
            keyExtractor={(item, id) => id.toString()}
            alwaysBounceHorizontal
          />
        </View>
        <View className="p-2 border border-gray-400 mx-3 my-2 rounded-md">
          <View className="flex-row justify-between items-center mb-2">
            <TextBold style={{ fontSize: ms(18), color: 'black' }}>
              PATIENT
            </TextBold>
            <IconAD name="right" size={ms(20)} color={color.GREEN_PRIMARY} />
          </View>
          <FlatList
            data={form.room?.patient}
            renderItem={_renderPatient}
            horizontal
            keyExtractor={(item, id) => id.toString()}
            alwaysBounceHorizontal
            ListEmptyComponent={<Text className="text-lg">No Patient</Text>}
          />
        </View>
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple('#ccc')}
          onPress={() => handleCart(form.patient)}>
          <View
            style={{
              backgroundColor: color.GREEN_PRIMARY,
              width: '50%',
              alignSelf: 'center',
              borderRadius: ms(7),
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              paddingVertical: ms(5),
            }}>
            <TextBold className="text-xl text-white">NEXT</TextBold>
          </View>
        </TouchableNativeFeedback>
      </View>
    </View>
  )
}

export default AlacartePatient

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
    backgroundColor: 'rgba(34, 150,70, .6)',
  },
  contentContainer: {
    flex: 1,
    marginTop: ms(150),
    marginHorizontal: ms(60),
    padding: ms(10),
    backgroundColor: '#046a33',
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: ms(5),
    padding: ms(5),
    borderWidth: 2,
    borderRadius: ms(5),
    borderColor: color.GREEN_PRIMARY,
  },
  selectedCard: {
    backgroundColor: color.GREEN_PRIMARY,
  },
  selectedCardText: {
    color: 'white',
  },

  cardText: {
    fontSize: ms(14),
    fontFamily: 'Avenir Heavy',
  },
  title: {
    textAlign: 'center',
    marginTop: ms(10),
    fontSize: ms(20),
    color: 'white',
    fontFamily: 'Avenir Heavy',
  },
})
