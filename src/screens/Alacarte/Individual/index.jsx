import { useFocusEffect } from '@react-navigation/native'
import axios from 'axios'
import moment from 'moment/moment'
import React, { useCallback, useState } from 'react'
import {
  Alert,
  ImageBackground,
  KeyboardAvoidingView,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableNativeFeedback,
  View
} from 'react-native'
import { ms, s } from 'react-native-size-matters'
import IconAD from 'react-native-vector-icons/AntDesign'
import { useDispatch, useSelector } from 'react-redux'
import { BgMenu } from '../../../assets/images/background'
import Overlay from '../../../components/Overlay'
import { TextBold } from '../../../components/Text'
import { updateCart } from '../../../stores/reducers/cart'
import DropDownPicker from 'react-native-dropdown-picker'
import color from '../../../utils/color'

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

  //For Dropdown
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Apple', value: 'apple'},
    {label: 'Banana', value: 'banana'}
  ])

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <Modal animationType="fade" transparent={true} visible={false}>
        <View className="flex-[1] bg-black/50 z-[3] justify-center items-center">
          <Text>LOADING</Text>
        </View>
      </Modal>
      <ImageBackground source={BgMenu} style={{ flex: 1 }}>
        <View className='flex-row' style={{ paddingHorizontal: ms(16), marginTop: ms(40)}}>
          <View className='z-[5]' style={{ width: '25%'}}>
            <TouchableNativeFeedback
              background={TouchableNativeFeedback.Ripple('#ccc')}
              onPress={() => navigation.navigate('Home')}>
              <IconAD name='arrowleft' size={ms(34)} color={'white'} />
            </TouchableNativeFeedback>
          </View>
          <View className='z-[5]' style={{ width: '75%'}}>
              <TextBold style={{
                fontSize: ms(22),
                color: 'white',
              }}> INDIVIDUAL GUEST </TextBold>
          </View>
        </View>
        <Overlay color={'bg-green-700/70'} />
        <View>
          <View className='z-[5]' style={styles.form}>
              <TextInput style={styles.input} placeholder='Guest Name'/>
              <TextInput style={styles.input} placeholder='Phone'/>
              <TextInput style={styles.input} placeholder='Location'/>
              <DropDownPicker
                  open={open}
                  value={value}
                  items={items}
                  setOpen={setOpen}
                  setValue={setValue}
                  setItems={setItems}
                  style={styles.input}
              />
              <TextInput style={styles.input} placeholder='Note'/>

              <View style={{ marginTop: ms(20) }}>
                <TouchableNativeFeedback
                background={TouchableNativeFeedback.Ripple('#ccc')}
                // onPress={() => navigation.navigate('Home')}
                >
                <View style={styles.buttonNext}>
                  <Text style={styles.buttonNextText}> NEXT </Text>
                </View>
                </TouchableNativeFeedback>
              </View>
          </View>
        </View>
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
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    marginTop: ms(18),
  },
  input: {
    borderColor: '#ccc',
    borderWidth: ms(1),
    width: '90%',
    height: ms(60),
    padding: s(10),
    fontSize: ms(12),
    backgroundColor: 'rgba(148, 163, 184, 0.3)',
    // margin: ms(1),
    fontFamily: 'Avenir-Roman',
    color: 'black',
    alignSelf: 'center',
    marginTop: ms(5),
    borderRadius: ms(5),
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
  buttonNext: {
    alignItems: 'center',
    width: '100%',
  },
  buttonNextText: {
    color: 'white',
    fontSize: ms(20),
    fontFamily: 'Avenir-Roman',
    backgroundColor: color.GREEN_PRIMARY,
    borderRadius: ms(5),
    width:'50%',
    elevation: 30,
    textAlign: 'center',
    paddingVertical: ms(5),
  },
})

// info login
// febriantoro@brawijaya.com
// abcd_1234
// http://acs.havordigital.com/api
export default AlacarteIndividual
