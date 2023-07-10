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
  ScrollView,
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
import { updateCart } from '../../../stores/reducers/cart'
import { useFocusEffect } from '@react-navigation/native'
import { useCallback } from 'react'
import axios from 'axios'
import SelectDropdown from 'react-native-select-dropdown'

const AlacarteIndividual = ({ navigation }) => {
  const dispatch = useDispatch()
  const { auth, cart } = useSelector(state => state)
  const [form, setForm] = useState({
    name: '',
    phone: '',
    location: '',
    note: '',
    booking: 0,
  })
  const [data, setData] = useState([])

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = async () => {
    const data = {
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
      note: form.note,
      booking: form.booking,
      menu: [],
      detail: [],
      price: [],
      quantity: [],
      total: [],
      remarks: [],
      grand_total: 0,
      created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
    }

    dispatch(updateCart(data))

    navigation.navigate('AlacarteListMenu')
  }

  useFocusEffect(
    useCallback(() => {
      const getBooking = async () => {
        try {
          const { data } = await axios.get(
            `${auth.serverUrl}/order-alacarte/booking`,
          )

          console.log(data)
          setData(data)
        } catch (error) {
          if (error.response && error.response.data.message) {
            Alert.alert('error retrieving Room ', error.response.data.message)
          } else {
            Alert.alert('error retrieving Room ', error.message)
          }
        }
      }

      getBooking()
    }, []),
  )
  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
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

        <ScrollView style={{ zIndex: 5 }}>
          <View style={styles.content}>
            <View>
              <Image source={Logo} alt="logo" style={styles.logo} />
            </View>
            <View style={{ height: ms(35) }} />
            <View>
              <Image source={LogoAlacarte} alt="logo" style={styles.logo} />
            </View>
            <View style={{ height: ms(35) }} />
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
              <SelectDropdown
                data={data}
                defaultButtonText={'Select Order From'}
                onSelect={(selected, index) => {
                  console.log(selected.id)
                  handleChange('booking', selected.id)
                }}
                // dropdownStyle={styles.input}
                buttonTextStyle={{ color: 'white' }}
                buttonStyle={[styles.input]}
                buttonTextAfterSelection={(selected, idx) => selected.name}
                rowTextForSelection={(item, i) => {
                  return item.name
                }}
              />
              <TextInput
                placeholder="Note"
                onChangeText={text => handleChange('note', text)}
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
            <View style={{ height: ms(20) }}></View>
          </View>
        </ScrollView>
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
    width: ms(250),
    height: ms(120),
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
