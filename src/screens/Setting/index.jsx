import { View, Text } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useDispatch } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { logout } from '../../stores/reducers/auth'
import { ms } from 'react-native-size-matters'
import { useState } from 'react'
import PopUpSuccess from '../../components/PopUpSuccess'
import { TextBold } from '../../components/Text'
import color from '../../utils/color'
import Icon from 'react-native-vector-icons/AntDesign'

const Setting = ({ navigation }) => {
  const [show, setShow] = useState(false)

  const dispatch = useDispatch()
  const handleLogout = async () => {
    try {
      await AsyncStorage.multiRemove(['user', 'serverUrl'])
      dispatch(logout())
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View className="flex-1 justify-center items-center">
      <TouchableOpacity onPress={() => navigation.navigate('ChangeServer')}>
        <View
          style={{
            width: ms(200),
            height: 50,
            backgroundColor: color.GREEN_PRIMARY,
            justifyContent: 'space-between',
            alignItems: 'center',
            borderRadius: ms(10),
            flexDirection: 'row',
            paddingHorizontal: ms(10),
            marginBottom: ms(10),
          }}>
          <View style={{ width: ms(10) }} />
          <TextBold
            style={{
              fontSize: ms(14),
              color: 'white',
            }}>
            Change Server
          </TextBold>
          <Icon name="logout" size={ms(16)} color="white" />
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleLogout}>
        <View
          style={{
            width: ms(200),
            height: 50,
            backgroundColor: color.GREEN_PRIMARY,
            justifyContent: 'space-between',
            alignItems: 'center',
            borderRadius: ms(10),
            flexDirection: 'row',
            paddingHorizontal: ms(10),
          }}>
          <View style={{ width: ms(10) }} />
          <TextBold
            style={{
              fontSize: ms(14),
              color: 'white',
            }}>
            Logout
          </TextBold>
          <Icon name="logout" size={ms(16)} color="white" />
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default Setting
