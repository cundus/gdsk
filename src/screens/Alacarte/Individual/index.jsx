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
import { BgAuth } from '../../../assets/images/background'
import { Logo, LogoAlacarte } from '../../../assets/icons'
import { Alert } from 'react-native'
import { KeyboardAvoidingView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../../stores/actions/auth'
import { useEffect } from 'react'
import { s, ms, vs } from 'react-native-size-matters'
import moment from 'moment/moment'

const AlacarteIndividual = ({ navigation }) => {
  const dispatch = useDispatch()
  const { auth } = useSelector(state => state)
  const [form, setForm] = useState({ name: '', phone: '', location: '' })

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = async () => {
    const data = {
      order_no: `${Number(
        `${moment().format('YYMMDD')}${String(`000${auth.user.id}`).slice(
          -3,
        )}0001`,
      )}`,
      ala_carte_type: 2,
      guest_name: form.name,
      phone: form.phone,
      location: form.location,
      client_id: auth.user.selected_client,
      user_id: auth.user.id,
      user: {
        id: auth.user.id,
        name: auth.user.name,
      },
      menu: [],
      detail: [],
      price: [],
      quantity: [],
      total: [],
      remarks: [],
      grand_total: 0,
      created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
    }

    navigation.navigate('AlacarteListMenu', { data })
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <Modal animationType="fade" transparent={true} visible={false}>
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
          <View>
            <Image source={LogoAlacarte} alt="logo" style={styles.logo} />
          </View>
          <View style={styles.form}>
            <TextInput
              placeholder="Guest Name"
              onChangeText={text => handleChange('name', text)}
              style={styles.input}
              placeholderTextColor={'#ccc'}
              returnKeyType="next"
            />
            <TextInput
              placeholder="Phone"
              onChangeText={text => handleChange('phone', text)}
              style={styles.input}
              placeholderTextColor={'#ccc'}
              returnKeyType="next"
              keyboardType="phone-pad"
            />
            <TextInput
              placeholder="Location"
              onChangeText={text => handleChange('location', text)}
              style={styles.input}
              placeholderTextColor={'#ccc'}
              returnKeyType="next"
            />
            <TouchableNativeFeedback
              onPress={handleSubmit}
              background={TouchableNativeFeedback.Ripple('#65a30d')}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>REGISTER</Text>
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
    width: ms(300),
    height: ms(150),
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
export default AlacarteIndividual
