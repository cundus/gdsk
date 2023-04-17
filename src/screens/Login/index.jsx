import React, { useState } from 'react'
import {
  View,
  Text,
  ImageBackground,
  StatusBar,
  Image,
  TextInput,
  TouchableNativeFeedback,
  Modal
} from 'react-native'
import { BgAuth } from '../../assets/images/background'
import { Logo } from '../../assets/icons'
import { Alert } from 'react-native'
import { emailValidator, urlValidator } from '../../utils/regexValidator'
import { KeyboardAvoidingView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../../stores/actions/auth'
import { useEffect } from 'react'

const Login = () => {
  const dispatch = useDispatch()
  const { error, isFetching } = useSelector(state => state.auth)

  const [form, setForm] = useState({ email: '', password: '', serverUrl: '' })

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = async () => {
    if (form.email.trim() === '' || form.password.trim() === '') {
      Alert.alert('Login Error', 'Please input your Email and Password!')
    } else if (!emailValidator(form.email.trim())) {
      Alert.alert('Login Error', 'Please input a valid email address!')
    } else if (form.serverUrl.trim()) {
      if (urlValidator(form.serverUrl.trim())) {
        //  this.props.submitLogin(email, password, serverTemp)
        dispatch(loginUser(form))
      } else {
        Alert.alert('Login Error', 'Server Url is not a Url')
      }
    } else {
      Alert.alert('Login Error', 'Please input your Server Url')
    }
  }

  useEffect(() => {
    if (error) {
      Alert.alert('Error', error)
    }
  }, [error])

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <Modal animationType="slide" transparent={true} visible={isFetching}>
        <View className="flex-[1] bg-black/50 z-[3]">
          <Text>LOADING</Text>
        </View>
      </Modal>
      <ImageBackground
        source={BgAuth}
        resizeMode="cover"
        className={classNames.container}>
        <StatusBar hidden />
        <View className={classNames.content}>
          <View>
            <Image source={Logo} alt="logo" className={classNames.logo} />
          </View>
          <View className={classNames.form}>
            <TextInput
              placeholder="E-Mail"
              onChangeText={text => handleChange('email', text)}
              className={classNames.input}
              placeholderTextColor={'#ccc'}
            />
            <TextInput
              placeholder="Password"
              secureTextEntry
              onChangeText={text => handleChange('password', text)}
              className={classNames.input}
              placeholderTextColor={'#ccc'}
            />
            <TextInput
              placeholder="Server"
              onChangeText={text => handleChange('serverUrl', text)}
              className={classNames.input}
              placeholderTextColor={'#ccc'}
            />
            <TouchableNativeFeedback
              onPress={handleSubmit}
              background={TouchableNativeFeedback.Ripple('#65a30d')}>
              <View className={classNames.button}>
                <Text className={classNames.buttonText}>LOGIN</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
          <View className="h-32"></View>
        </View>
        <View className={classNames.overlay}></View>
      </ImageBackground>
    </KeyboardAvoidingView>
  )
}

const classNames = {
  container: 'flex-[1] ',
  overlay: 'absolute top-0 bottom-0 left-0 right-0  bg-black/50 z-[1]',
  content: 'flex-[1] z-[2] justify-between items-center ',
  logo: 'pt-10',
  form: 'w-1/2',
  input:
    'border border-[#ccc] bg-gray-600/60 w-full text-white px-5 h-20 text-xl font-bold',
  button:
    'bg-lime-500 w-full h-20 justify-center items-center rounded-lg mt-5 shadow',
  buttonText: 'text-white text-xl font-bold'
}

export default Login
