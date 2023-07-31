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

const PAGE_SIZE = 8

const PatientOrderMenu = ({ route, navigation }) => {
  const { type } = route.params
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
      <View
        className="justify-end  m-2 "
        style={{ height: ms(200), flex: 1 / 4 }}>
        <View
          className=" justify-start bg-white items-center "
          style={{
            height: ms(160),
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
    // const animation = new Animated.Value(section !== index ? 0 : 1)

    const handleCollapse = () => {
      // Animated.timing(animation, {
      //   toValue: section === index ? 1 : 0,
      //   duration: 300,
      //   useNativeDriver: false
      // }).start()

      setSection(index === section ? null : index)
    }

    return (
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
  }

  return (
    <View className="flex-[1] justify-start">
      <ImageBackground source={BgMenu} style={{ flex: 0.2 }}>
        <View className="z-[5] flex-1 justify-center items-center">
          <TextBold
            style={{
              fontSize: ms(22),
              color: 'white',
            }}>
            SELECT MENU
          </TextBold>
          <View className="flex-row space-x-2 items-center justify-center">
            <TouchableNativeFeedback
              background={TouchableNativeFeedback.Ripple('#ccc')}
              onPress={() => navigation.goBack()}>
              <IconAD name="arrowleft" size={ms(34)} color={'white'} />
            </TouchableNativeFeedback>
            <View className="flex-row bg-white rounded-full justify-start items-center px-3">
              <IconAD name="search1" size={ms(16)} color={'gray'} />
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
        <Overlay color={'bg-green-700/70'} />
      </ImageBackground>

      <View className="flex-[1] px-10">
        <TouchableNativeFeedback
          onPress={() => navigation.navigate('PatientOrderConfirmation')}
          background={TouchableNativeFeedback.Ripple('#ccc')}>
          <View
            style={{
              flexDirection: 'row',
              position: 'absolute',
              bottom: ms(20),
              right: 20,
              backgroundColor: color.GREEN_PRIMARY,
              alignItems: 'center',
              paddingHorizontal: ms(10),
              paddingVertical: ms(5),
              borderRadius: ms(8),
              zIndex: 99,
              elevation: 10,
            }}>
            <IconAD name="shoppingcart" size={ms(20)} color={'white'} />
            <TextBold
              style={{ fontSize: ms(18), color: 'white', marginLeft: ms(5) }}>
              {cartPatientOrder.result.menu?.length}
              Menu Selected
            </TextBold>
          </View>
        </TouchableNativeFeedback>
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
