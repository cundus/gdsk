import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableNativeFeedback,
  View,
} from 'react-native'
import React from 'react'
import color from '../../utils/color'
import { TextBold } from '../../components/Text'
import { ms } from 'react-native-size-matters'
import Icon from 'react-native-vector-icons/AntDesign'
import { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useSelector } from 'react-redux'
import { urlValidator } from '../../utils/regexValidator'

const ChangePassword = ({ navigation }) => {
  const auth = useSelector(state => state.auth)
  const [server, setServer] = useState(auth.serverUrl)

  const onSubmit = async () => {
    try {
      if (!urlValidator(server.trim())) {
        return Alert.alert('Login Error', 'Server Url is not a Url')
      }

      await AsyncStorage.setItem('serverUrl', server.trim())
      Alert.alert('Sukses', 'Sukses mengubah alamat server!')
    } catch (error) {
      Alert.alert(error.message)
    }
  }

  return (
    <View className="flex-[1]">
      <View
        className="flex-row justify-between items-center"
        style={{
          padding: ms(10),
          backgroundColor: color.GREEN_PRIMARY,
        }}>
        {/* <View></View> */}
        <TouchableNativeFeedback onPress={() => navigation.goBack()}>
          <Icon name="arrowleft" size={ms(22)} color={'white'} />
        </TouchableNativeFeedback>
        <TextBold style={{ fontSize: ms(16), color: 'white' }}>
          Change Server
        </TextBold>
        <View style={{ width: ms(16) }}></View>
      </View>
      <View className="flex-[1]  items-center pt-10">
        <TextInput
          placeholder="Server url"
          onChangeText={text => setServer(text)}
          value={server}
          style={{
            backgroundColor: 'white',
            width: '70%',
            borderRadius: ms(10),
            padding: ms(10),
            fontSize: ms(12),
            fontFamily: 'Avenir-Roman',
            borderBottomColor: color.GREEN_PRIMARY,
            borderBottomWidth: ms(1),
          }}
        />
        <TouchableNativeFeedback style={{ width: '50%' }} onPress={onSubmit}>
          <View
            style={{
              backgroundColor: color.GREEN_PRIMARY,
              width: ms(100),
              justifyContent: 'center',
              alignItems: 'center',
              padding: ms(5),
              borderRadius: ms(5),
              marginTop: ms(10),
            }}>
            <TextBold style={{ color: 'white', fontSize: ms(14) }}>
              Change
            </TextBold>
          </View>
        </TouchableNativeFeedback>
      </View>
    </View>
  )
}

export default ChangePassword
 
const styles = StyleSheet.create({})
