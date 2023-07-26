import {
  View,
  Text,
  ImageBackground,
  Pressable,
  FlatList,
  TouchableNativeFeedback,
  Image,
  Dimensions,
  Alert,
  TextInput,
} from 'react-native'
import React from 'react'
import moment from 'moment/moment'
import { BgMenu } from '../../assets/images/background'
import Overlay from '../../components/Overlay'
import { ms } from 'react-native-size-matters'
import { TextBold, TextNormal } from '../../components/Text'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getMenu, getMenuExtra } from '../../stores/actions/menu'
import PopUpOrder from '../../components/PopUpOrder'
import { IconDelivery } from '../../assets/icons'
import Icon from 'react-native-vector-icons/AntDesign'
import FAIcon from 'react-native-vector-icons/FontAwesome'
import color from '../../utils/color'
import { useFocusEffect } from '@react-navigation/native'
import { useCallback } from 'react'
import { updateCart } from '../../stores/reducers/cartPatientOrder'

const { width } = Dimensions.get('window')

const PatientOrderDetailOrder = ({ route, navigation }) => {
  const { patient } = route.params
  const { floor, auth, patientOrder, menu, cartPatientOrder } = useSelector(
    state => state,
  )

  const dispatch = useDispatch()
  const [tabMenu, setTabMenu] = useState({})
  const [toggleMenu, setToggleMenu] = useState('')
  const [search, setSearch] = useState('')
  const [popUp, setPopUp] = useState({
    open: false,
    selectedMenu: {},
    type: '',
  })
  const handleCreateOrder = val => {
    if (Object.keys(tabMenu).length < 1) {
      return Alert.alert('Warning', 'Harus Pilih Meal Time!')
    }

    // setToggleMenu(val)
    if (val === 'order') {
      dispatch(
        updateCart({
          id: tabMenu.order_patient_detail_id,
          floor: patient.floor_id,
          room: patient.room_id,
          menu_type_id: [],
          menu_category_id: [],
          menu: [],
          detail: [],
          order_choices: [],
          remarks: [],
          menu_tak: [],
          menu_replacement: [],
          created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
        }),
      )
    } else if (val === 'extra') {
      dispatch(
        updateCart({
          meal_time_id: tabMenu.meal_time_id,
          client_id: auth.user.selected_client,
          user_id: auth.user.id,
          patient_id: patient.patient_id,
          menu_extra_id: 0,
          menu: {},
          price: 0,
          quantity: 0,
          total: 0,
          remarks: '',
          created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
        }),
      )
    }

    navigation.navigate(
      val === 'extra' ? 'PatientOrderMenuExtra' : 'PatientOrderMenu',
      {
        meal_time: tabMenu.meal_time_id,
        type: val,
      },
    )
  }

  const _renderItem = ({ item }) => {
    let existed = false
    if (toggleMenu === 'order') {
      existed = cartPatientOrder.result?.menu?.find(menu => menu === item.id)
    }

    return (
      <TouchableNativeFeedback
        onPress={() =>
          existed
            ? null
            : setPopUp({ selectedMenu: item, open: true, type: toggleMenu })
        }
        background={TouchableNativeFeedback.Ripple('white')}>
        <View
          className="justify-end"
          style={{
            height: ms(150),
            flex: 1,
            margin: ms(5),
          }}>
          <View
            className=" justify-start bg-white items-center "
            style={{
              height: ms(100),
              elevation: 5,
              borderRadius: ms(10),
              paddingBottom: ms(20),
            }}>
            {existed && (
              <FAIcon
                name="check-circle"
                size={ms(16)}
                color={color.GREEN_PRIMARY}
                style={{
                  position: 'absolute',
                  right: 0,
                  top: 0,
                }}
              />
            )}
            <View
              style={{
                width: ms(50),
                height: ms(50),
                overflow: 'hidden',
                borderRadius: ms(50),
                marginTop: -ms(30),
                backgroundColor: 'white',
                elevation: 7,
              }}>
              <Image
                source={{
                  uri: `${auth.serverUrl.replace('api', '')}app/menu/${
                    item.image
                  }`,
                }}
                className="w-full h-full"
              />
            </View>
            <TextBold
              className="mt-2"
              style={{ fontSize: ms(10), textAlign: 'center', color: 'black' }}>
              {item.name}
            </TextBold>
            <TextNormal style={{ fontSize: ms(10) }}>
              {item.description ? item.description : '1 Porsi'}
            </TextNormal>
            <TextNormal style={{ fontSize: ms(10), textAlign: 'center' }}>
              {item.service_client === null ? 0 : item.service_client.price}
            </TextNormal>
          </View>
        </View>
      </TouchableNativeFeedback>
    )
  }

  useFocusEffect(
    useCallback(() => {
      if (navigation.isFocused()) {
        dispatch(
          getMenu({
            serverUrl: auth.serverUrl,
            clientId: auth.user.selected_client,
          }),
        )
        dispatch(
          getMenuExtra({
            serverUrl: auth.serverUrl,
            clientId: auth.user.selected_client,
          }),
        )
      }

      return () => {
        setTabMenu(0)
        setToggleMenu('')
        setPopUp({ open: false, selectedMenu: {}, type: '' })
      }
    }, []),
  )

  return (
    <View className="flex-[1]">
      <ImageBackground source={BgMenu} style={{ flex: 0.2 }}>
        <View className="flex-row z-50 flex-1 space-x-2 px-10 items-center justify-between">
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple('#ccc')}
            onPress={() => navigation.goBack()}>
            <Icon name="arrowleft" size={ms(34)} color={'white'} />
          </TouchableNativeFeedback>
          <TextBold
            style={{
              fontSize: ms(22),
              color: 'white',
            }}>
            PATIENT ORDER
          </TextBold>

          <View className="w-5" />
        </View>
        <Overlay color="bg-green-700/70" />
      </ImageBackground>
      <View className="flex-[1]">
        <View className="flex-[1] z-[10] bg-white rounded-3xl">
          <View
            className="border border-gray-100 bg-white"
            style={{
              elevation: 5,
              margin: ms(15),
              borderRadius: ms(10),
              padding: ms(5),
            }}>
            <TextBold
              className={'text-center text-black'}
              style={{
                fontSize: ms(16),
              }}>
              Patient Order
            </TextBold>
            <View className="flex-row justify-between items-center">
              <View className="">
                <TextNormal style={{ fontSize: ms(16), color: 'gray' }}>
                  Patient
                </TextNormal>
                <TextNormal
                  style={{
                    fontSize: ms(14),
                    color: 'black',
                    marginLeft: ms(5),
                  }}>
                  {patient.patient_name}
                </TextNormal>
              </View>
              <View className="">
                <TextNormal style={{ fontSize: ms(16), color: 'gray' }}>
                  Age
                </TextNormal>
                <TextNormal
                  style={{
                    fontSize: ms(14),
                    color: 'black',
                    marginLeft: ms(5),
                  }}>
                  {moment().diff(patient.patient_dob, 'year')}
                </TextNormal>
              </View>
            </View>

            <View className="">
              <TextNormal style={{ fontSize: ms(16), color: 'gray' }}>
                Diagnosa
              </TextNormal>
              <TextNormal
                style={{
                  fontSize: ms(14),
                  color: 'black',
                  marginLeft: ms(5),
                }}>
                {patient.patient_diagnosis}
              </TextNormal>
            </View>
          </View>

          {/* Tab Menu */}
          <View className="flex-row justify-center px-8">
            {patient?.order?.map((item, id) => (
              <TouchableNativeFeedback
                onPress={() => setTabMenu(item)}
                key={id}>
                <View
                  className="flex-1 justify-center items-center border border-green-400"
                  style={{
                    height: ms(30),
                    backgroundColor:
                      tabMenu.meal_time_id === item.meal_time_id
                        ? 'rgb(34,197,94)'
                        : 'transparent',
                    borderTopLeftRadius: id === 0 ? ms(30) : 0,
                    borderBottomLeftRadius: id === 0 ? ms(30) : 0,
                    borderTopRightRadius:
                      id === patient.order.length - 1 ? ms(30) : 0,
                    borderBottomRightRadius:
                      id === patient.order.length - 1 ? ms(30) : 0,
                  }}>
                  <TextBold
                    style={{ fontSize: ms(8) }}
                    className={`${
                      tabMenu.meal_time_id === item.meal_time_id
                        ? 'text-white'
                        : 'text-green-500'
                    } text-center`}>
                    {item.meal_time}
                  </TextBold>
                </View>
              </TouchableNativeFeedback>
            ))}
          </View>

          {toggleMenu ? (
            <>
              <FlatList
                data={
                  toggleMenu === 'order'
                    ? menu.menuData.reduce((result, item) => {
                        result.push(...item.menu)

                        return result
                      }, [])
                    : menu.menuExtra
                }
                keyExtractor={(item, index) => index.toString()}
                renderItem={_renderItem}
                numColumns={4}
                contentContainerStyle={{
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                }}
              />
              <View
                className={`bg-green-500 flex-row justify-between items-center w-[90%] rounded-full mx-auto mb-5`}>
                <View className="flex-row space-x-5 px-10 h-full items-center">
                  <Image
                    alt="icon"
                    source={IconDelivery}
                    style={{
                      width: ms(20),
                      height: '100%',
                      resizeMode: 'contain',
                      tintColor: 'white',
                    }}
                  />
                  <TextNormal style={{ fontSize: ms(14), color: 'white' }}>
                    {cartPatientOrder.result?.menu?.length} Food Item
                  </TextNormal>
                </View>

                <TouchableNativeFeedback
                  onPress={() =>
                    navigation.navigate('PatientOrderConfirmation')
                  }>
                  <View
                    className="flex-row  items-center h-full space-x-10 rounded-full bg-green-700"
                    style={{ paddingLeft: ms(10) }}>
                    <TextNormal
                      style={{
                        color: 'white',
                        fontSize: ms(12),
                        width: ms(50),
                        textAlign: 'center',
                      }}>
                      Order Now
                    </TextNormal>
                    <Icon name="doubleright" color={'white'} size={ms(20)} />
                  </View>
                </TouchableNativeFeedback>
              </View>
            </>
          ) : (
            <View className="flex-1">
              <View className="justify-center items-center flex-1">
                <TextBold className="text-gray-400 mb-6 text-lg">
                  You haven't created the order
                </TextBold>
                <TouchableNativeFeedback
                  onPress={() => handleCreateOrder('order')}>
                  <View className="px-5 py-3 bg-green-500 rounded-3xl">
                    <TextBold
                      className="text-white "
                      style={{ fontSize: ms(10) }}>
                      Create Order
                    </TextBold>
                  </View>
                </TouchableNativeFeedback>
              </View>
              <View className="flex-[1.5]">
                <TextNormal className="bg-green-500 mb-10 text-center text-3xl text-white">
                  Extra Food
                </TextNormal>
                <View className="justify-center items-center ">
                  <TextBold className="text-gray-400 mb-6 text-lg">
                    You haven't created extra food
                  </TextBold>
                  <TouchableNativeFeedback
                    onPress={() => handleCreateOrder('extra')}>
                    <View className="px-5 py-3 bg-green-500 rounded-3xl">
                      <TextBold
                        className="text-white "
                        style={{ fontSize: ms(10) }}>
                        Add extra food
                      </TextBold>
                    </View>
                  </TouchableNativeFeedback>
                </View>
              </View>
            </View>
          )}
        </View>
      </View>
    </View>
  )
}

export default PatientOrderDetailOrder
