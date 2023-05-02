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
import { addItem } from '../../stores/reducers/cart'
import PopUpOrder from '../../components/PopUpOrder'
import { useFocusEffect } from '@react-navigation/native'
import { useCallback } from 'react'

const PAGE_SIZE = 8

const ListMenu = ({ route, navigation }) => {
  const { data } = route.params
  const { menu, auth, cart } = useSelector(state => state)
  const [page, setPage] = useState(1)
  const [listMenu, setListMenu] = useState([])
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  const handleChoose = data => {
    let isExist = false

    cart?.data?.find(item => {
      if (item.id === data.id) {
        isExist = true
        return Alert.alert('Item already exist in cart')
      }
    })
    if (isExist) return
    dispatch(
      addItem({
        ...data,
      }),
    )
    navigation.navigate('AlacarteConfirmation')
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
      menu.menuData.map(item => item.menu?.map(item2 => arrMenu.push(item2)))

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
    return (
      <View className="flex-[1] justify-end  m-2 " style={{ height: ms(200) }}>
        <View
          className=" justify-start bg-white items-center "
          style={{
            height: ms(160),
            elevation: 5,
            borderRadius: ms(10),
            paddingBottom: ms(20),
          }}>
          <View
            style={{
              width: ms(80),
              height: ms(80),
              overflow: 'hidden',
              borderRadius: ms(80),
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
            className=""
            style={{ fontSize: ms(13), textAlign: 'center', color: 'black' }}>
            {item.name}
          </TextBold>
          <TextBold style={{ fontSize: ms(10) }}>PLACEHOLDER</TextBold>
          <TextNormal style={{ fontSize: ms(10), textAlign: 'center' }}>
            {item.service_client === null ? 0 : item.service_client}
          </TextNormal>
          <TouchableNativeFeedback
            onPress={() => handleChoose(item)}
            background={TouchableNativeFeedback.Ripple('#ccc')}>
            <View
              className="bg-green-600 w-full  justify-center items-center absolute bottom-0"
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

  return (
    <View className="flex-[1] justify-start">
      <View className="bg-green-600 my-5 px-10 py-2 flex-row justify-between items-center">
        <Pressable onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={ms(20)} color="white" />
        </Pressable>

        <TextBold className="text-white" style={{ fontSize: ms(18) }}>
          Ala Carte
        </TextBold>
        <View />
      </View>
      <View className="justify-center items-center">
        <Image
          source={Logo}
          style={{ width: ms(120), height: ms(90), resizeMode: 'contain' }}
        />
      </View>
      <View className="flex-[1]">
        {menu.isFetching ? (
          <ActivityIndicator size={'large'} color={'green'} />
        ) : (
          <FlatList
            data={listMenu}
            keyExtractor={(item, index) => index.toString()}
            renderItem={_renderItem}
            numColumns={4}
            // onEndReached={handleLoadMore}
            ListFooterComponent={
              loading ? (
                <View style={{ marginVertical: ms(10) }}>
                  <ActivityIndicator size={'large'} color="green" />
                </View>
              ) : (
                <TouchableNativeFeedback onPress={handleLoadMore}>
                  <View className="flex-row my-5 justify-center space-x-5 items-center">
                    <Icon name="chevron-down" size={ms(12)} />
                    <TextBold style={{ fontSize: ms(12) }}>See More</TextBold>
                    <Icon name="chevron-down" size={ms(12)} />
                  </View>
                </TouchableNativeFeedback>
              )
            }
          />
        )}
      </View>
    </View>
  )
}

export default ListMenu
