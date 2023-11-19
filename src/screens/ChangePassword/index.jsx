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
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const [visibleNewPass, setVisibleNewPass] = useState(false)
  const [visibleConfirmNewPass, setVisibleConfirmNewPass] = useState(false)

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
          Change Password
        </TextBold>
        <View style={{ width: ms(16) }}></View>
      </View>
      <View className="flex-[1]  items-center pt-10">
        <View className="my-3 w-full items-center">
          <Text className="text-gray-400">New Password</Text>
          <TextInput
            placeholder="Enter Your New Password..."
            onChangeText={text => setNewPassword(text)}
            value={newPassword}
            secureTextEntry={!visibleNewPass}
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
        </View>
        <View className="my-3 w-full items-center">
          <Text className="text-gray-400 ">Confirm New Password</Text>
          <TextInput
            placeholder="Please Confirm Your New Password..."
            onChangeText={text => setConfirmNewPassword(text)}
            value={confirmNewPassword}
            secureTextEntry={!visibleConfirmNewPass}
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
          {confirmNewPassword.length > 1 &&
            confirmNewPassword !== newPassword && (
              <Text className="text-red-500">
                Your Password Confirmation Doesn't Match!
              </Text>
            )}
        </View>
        <TouchableNativeFeedback style={{ width: '50%' }} onPress={onSubmit}>
          <View
            style={{
              backgroundColor: color.GREEN_PRIMARY,
              justifyContent: 'center',
              alignItems: 'center',
              padding: ms(5),
              borderRadius: ms(5),
              marginTop: ms(10),
            }}>
            <TextBold style={{ color: 'white', fontSize: ms(14) }}>
              Change Password
            </TextBold>
          </View>
        </TouchableNativeFeedback>
      </View>
    </View>
  )
}

export default ChangePassword

const styles = StyleSheet.create({})
