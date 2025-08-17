import React from 'react'
import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  Pressable,
  TouchableNativeFeedback,
  View,
  Alert,
  ImageBackground,
  TextInput,
} from 'react-native'
import { TextBold, TextNormal } from '../../components/Text'
import Icon from 'react-native-vector-icons/FontAwesome'
import { ms } from 'react-native-size-matters'
import { Logo } from '../../assets/icons'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getMenu } from '../../stores/actions/menu'
import { useState } from 'react'
import { useMemo } from 'react'
import { updateCart } from '../../stores/reducers/cart'
import { useFocusEffect } from '@react-navigation/native'
import { useCallback } from 'react'
import IconAD from 'react-native-vector-icons/AntDesign'
import color from '../../utils/color'
import { BgMenu } from '../../assets/images/background'
import Overlay from '../../components/Overlay'
import PopUpOrder from '../../components/PopUpOrder'
import moment from 'moment'

const PAGE_SIZE = 8

const PatientOrderMenu = ({ route, navigation }) => {
  const { type, patient } = route.params
  const { menu, auth, cartPatientOrder } = useSelector(state => state)
  const [page, setPage] = useState(1)
  const [section, setSection] = useState(null)
  const [listMenu, setListMenu] = useState([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [popUp, setPopUp] = useState({
    open: false,
    selectedMenu: {},
    type: '',
  })
  const dispatch = useDispatch()

  const handleChoose = data => {
    setPopUp({ selectedMenu: data, open: true, type })
  }

  useFocusEffect(
    useCallback(() => {
      if (navigation.isFocused()) {
        dispatch(
          getMenu({
            serverUrl: auth.serverUrl,
            clientId: auth.user.selected_client,
            patient: patient,
            meal_time: cartPatientOrder.result.meal_time_id,
            order_patient_detail_id:
              cartPatientOrder.result.order_patient_detail_id,
          }),
        )
      }
    }, []),
  )

  useMemo(() => {
    if (menu.menuData.length > 0) {
      const arrMenu = []
      menu.menuData.map(item => item?.menu?.map(item2 => arrMenu.push(item2)))

      setListMenu(arrMenu.slice(0, 12))
    }
  }, [menu.menuData])

  const handleLoadMore = () => {
    const nextPage = page + 1
    if (menu.menuData.length > 0) {
      const arrMenu = []
      menu.menuData.map(item => item.menu?.map(item2 => arrMenu.push(item2)))
      setPage(nextPage)
      setLoading(true)

      setTimeout(() => {
        setLoading(false)
        setListMenu(arrMenu.slice(0, nextPage * PAGE_SIZE))
      }, 2000)
    }
  }

  const _renderItem = ({ item }) => {
    const isChoosed = cartPatientOrder.result?.menu?.filter(
      menu => menu === item.id,
    )

    return (
      <Pressable
        onPress={() => handleChoose(item)}
        className="justify-end  m-2"
        style={{ height: ms(160), flex: 1 / 4 }}>
        <View>
          <View
            className=" justify-start bg-white items-center "
            style={{
              height: ms(130),
              elevation: 5,
              borderRadius: ms(10),
              paddingBottom: ms(20),
            }}>
            {isChoosed.length > 0 && (
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  right: ms(0),
                  zIndex: 50,
                }}>
                <IconAD
                  name="checkcircle"
                  color={color.GREEN_PRIMARY}
                  size={ms(20)}
                />
              </View>
            )}
            <View
              style={{
                width: ms(60),
                height: ms(60),
                overflow: 'hidden',
                borderRadius: ms(60),
                marginTop: -ms(30),
                backgroundColor: 'white',
                elevation: 7,
                position: 'relative',
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
              className=""
              style={{
                fontSize: ms(12),
                textAlign: 'center',
                color: 'black',
                marginHorizontal: ms(5),
              }}>
              {item.name.length > 14
                ? item.name.substring(0, 15) + '...'
                : item.name}
            </TextBold>
            {/* <TextBold style={{ fontSize: ms(10) }}>PLACEHOLDER</TextBold> */}
            <TextNormal style={{ fontSize: ms(10), textAlign: 'center' }}>
              {item.service_client === null ? 0 : item.service_client.price}
            </TextNormal>
            <TouchableNativeFeedback
              disabled={isChoosed?.length > 0}
              onPress={() => handleChoose(item)}
              background={TouchableNativeFeedback.Ripple('#ccc')}>
              <View
                className={` w-full  justify-center items-center absolute bottom-0 bg-green-600
                ${isChoosed?.length > 0 ? 'bg-green-300' : 'bg-green-600'}`}
                style={{
                  borderRadius: ms(10),
                  height: ms(30),
                }}>
                <TextNormal style={{ color: 'white', fontSize: ms(16) }}>
                  Choose
                </TextNormal>
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
      </Pressable>
    )
  }

  const filterMenu = menus => {
    if (search === '') {
      return menus
    }

    return menus.filter(item =>
      item.name.toLowerCase().includes(search.toLocaleLowerCase()),
    )
  }

  const _renderCategory = ({ item, index }) => {
    const handleCollapse = () => {
      setSection(index === section ? null : index)
    }

    console.log(JSON.stringify(item.name, null, 2), 'menu :' + item.menu.length)

    return (
      filterMenu(item.menu).length > 0 && (
        <View
          className=""
          style={{
            backgroundColor: 'white',
            marginVertical: ms(2),
            elevation: 10,
            borderRadius: ms(10),
            height: 'auto',
            overflow: 'hidden',
          }}>
          <Pressable onPress={() => handleCollapse(index)}>
            <View
              className="flex-row justify-between items-center"
              style={{
                height: ms(40),
                paddingHorizontal: ms(10),
                backgroundColor: color.GREEN_PRIMARY,
              }}>
              <TextBold style={{ fontSize: ms(18), color: 'white' }}>
                {item.name}
              </TextBold>
              <IconAD
                name={index === section ? 'up' : 'down'}
                size={ms(20)}
                color={'white'}
              />
            </View>
          </Pressable>
          {/* <Animated.View
          style={{
            height: animation.interpolate({
              inputRange: [0, 1],
              outputRange: [0, ms(300)]
            })
          }}
        > */}
          {index === section && (
            <FlatList
              data={filterMenu(item.menu)}
              keyExtractor={(item, index) => index.toString()}
              renderItem={_renderItem}
              collapsable
              numColumns={4}
              // ListFooterComponent={
              //   <View style={{ justifyContent: 'center' }}>
              //     <TouchableNativeFeedback>
              //       <View
              //         style={{
              //           margin: ms(5),
              //           justifyContent: 'center',
              //           alignItems: 'center',
              //           backgroundColor: color.GREEN_PRIMARY,
              //         }}>
              //         <TextBold>Additional Menu</TextBold>
              //       </View>
              //     </TouchableNativeFeedback>
              //   </View>
              // }
              columnWrapperStyle={{
                flex: 1 / 4,
                justifyContent: 'flex-start',
              }}
              ListEmptyComponent={<TextBold>No Menu</TextBold>}
            />
          )}
          {/* </Animated.View> */}
        </View>
      )
    )
  }

  return (
    <View className="flex-[1] justify-start">
      <ImageBackground source={BgMenu} style={{ flex: 0.3 }}>
        <View className="z-[5] flex-1 justify-center items-center gap-1">
          <View className="flex-row items-center justify-center mt-3">
            <TextNormal
              style={{
                fontSize: ms(12),
                color: 'white',
                textAlign: 'center',
                paddingHorizontal: ms(5),
                overflow: 'hidden',
                backgroundColor: color.GREEN_PRIMARY,
                borderRadius: ms(5),
              }}>
              {patient?.patient_name} - {patient?.dietCategoryName} (
              {patient?.dietTypeName})
            </TextNormal>
          </View>
          {patient?.remarks && (
            <TextNormal
              style={{
                fontSize: ms(12),
                color: 'white',
                textAlign: 'center',
                overflow: 'hidden',
                width: '80%',
                backgroundColor: color.GREEN_PRIMARY,
                borderRadius: ms(5),
              }}>
              Remarks: {patient?.remarks}
            </TextNormal>
          )}
          <TextBold
            style={{
              fontSize: ms(12),
              color: 'white',
              width: '50%',
              textAlign: 'center',
              overflow: 'hidden',
              backgroundColor: color.GREEN_PRIMARY,
              borderRadius: ms(5),
            }}>
            {
              patient?.order.find(
                item =>
                  item.meal_time_id === cartPatientOrder.result.meal_time_id,
              ).meal_time
            }
          </TextBold>
          <View className="flex-row items-center justify-between mt-3 px-4">
            <TouchableNativeFeedback
              background={TouchableNativeFeedback.Ripple('#ccc')}
              onPress={() => navigation.goBack()}>
              <IconAD name="arrowleft" size={ms(32)} color={'white'} />
            </TouchableNativeFeedback>
            <View className="flex-row bg-white rounded-full justify-start items-center px-3 flex-1 mx-3">
              <IconAD name="search1" size={ms(12)} color={'gray'} />
              <TextInput
                placeholder="Search"
                value={search}
                onChangeText={e => setSearch(e)}
                className="flex-1 ml-2"
              />
            </View>
            <TouchableNativeFeedback
              onPress={() => navigation.navigate('PatientOrderConfirmation')}
              background={TouchableNativeFeedback.Ripple('#ccc')}>
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: color.GREEN_PRIMARY,
                  alignItems: 'center',
                  paddingHorizontal: ms(12),
                  paddingVertical: ms(8),
                  borderRadius: ms(20),
                  elevation: 5,
                }}>
                <IconAD name="shoppingcart" size={ms(18)} color={'white'} />
                <TextBold
                  style={{ fontSize: ms(14), color: 'white', marginLeft: ms(4) }}>
                  {cartPatientOrder.result?.menu?.length}
                </TextBold>
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
        <Overlay color={'bg-green-700/70'} />
      </ImageBackground>

      <View className="flex-[1] px-10">
        {menu.isFetching ? (
          <ActivityIndicator size={'large'} color={'green'} />
        ) : (
          <FlatList
            data={menu.menuData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={_renderCategory}
          />
        )}
      </View>
      <PopUpOrder
        data={{
          ...popUp.selectedMenu,
          image:
            auth.serverUrl.replace('api', '') +
            'app/menu/' +
            popUp.selectedMenu.image,
        }}
        show={popUp.open}
        typeMenu={popUp.type}
        onOrder={() => {}}
        handleClose={() =>
          setPopUp({ open: false, selectedMenu: {}, type: '' })
        }
      />
    </View>
  )
}

export default PatientOrderMenu
