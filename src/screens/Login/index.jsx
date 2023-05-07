import React, { useState } from 'react'
import {
  View,
  Text,
  ImageBackground,
  StatusBar,
  Image,
  TextInput,
  TouchableNativeFeedback,
  Modal,
  StyleSheet,
  Dimensions,
} from 'react-native'
import { BgAuth } from '../../assets/images/background'
import { Logo } from '../../assets/icons'
import { Alert } from 'react-native'
import { emailValidator, urlValidator } from '../../utils/regexValidator'
import { KeyboardAvoidingView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { getServerUrl, loginUser } from '../../stores/actions/auth'
import { useEffect } from 'react'
import { s, ms, vs } from 'react-native-size-matters'
import { isLandscape } from '../../utils/dimensions'
import { useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native'

const Login = () => {
  const dispatch = useDispatch()
  const { error, isFetching, serverUrl } = useSelector(state => state.auth)

  const [form, setForm] = useState({
    email: '',
    password: '',
    serverUrl: '',
  })
  const [serverExist, setServerExist] = useState(false)

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

  useFocusEffect(
    useCallback(() => {
      dispatch(getServerUrl())
      if (serverUrl) {
        setServerExist(true)
        setForm({ ...form, serverUrl })
      }

      if (error) {
        Alert.alert('Error', error)
      }
    }, [error, serverUrl]),
  )

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <Modal animationType="fade" transparent={true} visible={isFetching}>
        <View className="flex-[1] bg-black/50 z-[3] justify-center items-center">
          <Text>LOADING</Text>
        </View>
      </Modal>
      <ImageBackground
        source={BgAuth}
        resizeMode="cover"
        style={styles.container}>
        <StatusBar hidden />
        <View style={styles.content}>
          <View>
            <Image source={Logo} alt="logo" style={styles.logo} />
          </View>
          <View style={styles.form}>
            <TextInput
              placeholder="E-Mail"
              onChangeText={text => handleChange('email', text)}
              style={styles.input}
              placeholderTextColor={'#ccc'}
            />
            <TextInput
              placeholder="Password"
              secureTextEntry
              onChangeText={text => handleChange('password', text)}
              style={styles.input}
              placeholderTextColor={'#ccc'}
            />

            {!serverExist ? (
              <TextInput
                placeholder="Server"
                onChangeText={text => handleChange('serverUrl', text)}
                style={styles.input}
                placeholderTextColor={'#ccc'}
              />
            ) : null}

            <TouchableNativeFeedback
              onPress={handleSubmit}
              background={TouchableNativeFeedback.Ripple('#65a30d')}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>LOGIN</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
          <View style="h-32"></View>
        </View>
        <View style={styles.overlay}></View>
      </ImageBackground>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    top: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 1,
  },
  content: {
    flex: 1,
    zIndex: 2,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    width: isLandscape ? vs(250) : vs(350),
    height: isLandscape ? vs(150) : vs(300),
    resizeMode: 'contain',
  },
  form: {
    width: '50%',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: ms(1),
    width: '100%',
    padding: s(5),
    fontSize: ms(12),
    backgroundColor: 'rgba(148, 163, 184, 0.3)',
    margin: ms(1),
    fontFamily: 'Avenir-Roman',
    color: 'white',
  },
  button: {
    width: '100%',
    height: ms(30),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(132, 204, 22, 1)',
    marginTop: ms(10),
    borderRadius: ms(3),
  },
  buttonText: {
    color: 'white',
    fontSize: ms(12),
    fontFamily: 'Avenir-Roman',
  },
})

// info login
// febriantoro@brawijaya.com
// abcd_1234
// http://acs.havordigital.com/api
export default Login
