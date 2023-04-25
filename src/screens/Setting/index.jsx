import { View, Text } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useDispatch } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { logout } from '../../stores/reducers/auth'
import { ms } from 'react-native-size-matters'
import { useState } from 'react'
import PopUpSuccess from '../../components/PopUpSuccess'

const Setting = () => {
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
    <View>
      <Text>Setting</Text>
      <TouchableOpacity onPress={handleLogout}>
        <View
          style={{
            width: '100%',
            height: 50,
            backgroundColor: 'green',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>LOGOUT</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setShow(true)}>
        <View
          style={{
            width: '100%',
            height: 50,
            backgroundColor: 'green',
            justifyContent: 'center',
            alignItems: 'center',
            margin: ms(10),
          }}>
          <Text className="text-white text-3xl">popup success</Text>
        </View>
      </TouchableOpacity>
      <PopUpSuccess show={show} onPress={() => setShow(false)} />
    </View>
  )
}

export default Setting
