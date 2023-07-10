import {
  View,
  Text,
  Modal,
  Image,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  TouchableNativeFeedback,
  ScrollView,
  Alert,
} from 'react-native'
import React from 'react'
import { ms } from 'react-native-size-matters'
import { TextBold, TextNormal } from './Text'
import Overlay from './Overlay'
import Icon from 'react-native-vector-icons/AntDesign'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateCart } from '../stores/reducers/cartPatientOrder'
import { useNavigation } from '@react-navigation/native'

const intialValue = {
  quantity: 0,
  menu_replacement: '',
  remarks: '',
  menu_tak: '',
  order_choices: '',
}

const PopUpOrder = ({
  show,
  data,
  onOrder,
  handleClose,
  patientData,
  typeMenu,
}) => {
  const cartPatientOrder = useSelector(state => state.cartPatientOrder)
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const [form, setForm] = useState(intialValue)
  console.log(JSON.stringify(cartPatientOrder.result, null, 2))
  const handleChangeForm = (name, value) => {
    setForm({ ...form, [name]: value })
  }

  const handleChangeQuantity = type => {
    if (type === 'minus') {
      if (form.quantity !== 0) {
        return setForm({ ...form, quantity: form.quantity - 1 })
      }

      return
    }

    setForm({ ...form, quantity: form.quantity + 1 })
  }

  const handleOnClose = () => {
    setForm(intialValue)
    handleClose()
  }
  const handleOnConfirm = () => {
    let cart = cartPatientOrder.result
    if (typeMenu === 'extra') {
      cart.id = cart.id
      cart.menu_extra_id = data.id
      cart.menu = data
      cart.price = data.service_client !== null ? data.service_client : 0
      cart.quantity = form.quantity
      cart.total = form.quantity * +data.service_client
      cart.remarks = form.remarks

      dispatch(updateCart(cart))

      handleClose()
      return navigation.navigate('PatientOrderConfirmation')
    }

    cart.id = cart.id
    cart.menu_category_id = [...cart.menu_category_id, data.menu_category_id]
    cart.menu_type_id = [...cart.menu_type_id, data.menu_type_id]
    cart.menu = [...cart.menu, data.id]
    cart.detail = [...cart.detail, data]
    cart.order_choices = [...cart.order_choices, form.order_choices]
    cart.remarks = [...cart.remarks, form.remarks]
    cart.menu_tak = [...cart.menu_tak, form.menu_tak]
    cart.menu_replacement = [...cart.menu_replacement, form.menu_replacement]

    Alert.alert(`${data.name} berhasil ditambahkan!`)

    dispatch(updateCart({ ...cart }))

    handleClose()
  }

  return (
    <Modal animationType="slide" transparent={true} visible={show}>
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0, 0, 50, 0.2)',
            justifyContent: 'center',
            alignItems: 'center',
            padding: ms(50),
          }}>
          <View className="bg-white flex-[1] w-full">
            <View className="flex-[1]">
              <Image
                source={{ uri: data.image }}
                resizeMode="cover"
                className="w-full h-full"
              />
              <Overlay color={'bg-green-600/30'} />
            </View>
            <View className="flex-[3] z-[10] w-full ">
              <View
                style={{
                  marginTop: -ms(20),
                  flex: 1,
                  backgroundColor: 'white',
                  borderRadius: ms(20),
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}>
                <ScrollView
                  style={{ flex: 1, width: '100%', marginBottom: 10 }}
                  contentContainerStyle={{
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                  }}>
                  <View
                    className="flex-row justify-between pt-5 px-10 w-full"
                    style={{}}>
                    <View className="w-10" />
                    <TextBold style={{ fontSize: ms(16), color: 'black' }}>
                      {data.name}
                    </TextBold>
                    <Pressable onPress={handleOnClose}>
                      <Icon name="close" size={ms(20)} />
                    </Pressable>
                  </View>
                  <TextNormal
                    style={{
                      fontSize: ms(12),
                    }}></TextNormal>

                  {typeMenu === 'extra' && (
                    <View className="w-full">
                      <TextNormal
                        style={{
                          fontSize: ms(14),
                          color: 'black',
                          backgroundColor: '#e2e8f0',
                          textAlign: 'center',
                        }}>
                        QTY
                      </TextNormal>
                      <View className="my-3 flex-row space-x-10 justify-center items-center">
                        <Pressable
                          onPress={() => handleChangeQuantity('minus')}>
                          <View className="border-2 rounded-xl">
                            <Icon name="minus" size={ms(16)} />
                          </View>
                        </Pressable>
                        <TextNormal
                          style={{ fontSize: ms(16), color: 'black' }}>
                          {form.quantity.toString()}
                        </TextNormal>
                        <Pressable onPress={() => handleChangeQuantity('plus')}>
                          <View className="border-2 rounded-xl">
                            <Icon name="plus" size={ms(16)} />
                          </View>
                        </Pressable>
                      </View>
                    </View>
                  )}
                  <View className="w-full items-center">
                    <TextNormal
                      style={{
                        width: '100%',
                        fontSize: ms(14),
                        color: 'black',
                        backgroundColor: '#e2e8f0',
                        textAlign: 'center',
                      }}>
                      Menu Replacement
                    </TextNormal>
                    <TextInput
                      placeholder="Menu Replacement"
                      style={{
                        width: '80%',
                        color: 'black',
                        fontSize: ms(12),
                        borderBottomColor: 'black',
                        borderBottomWidth: 1,
                        textAlign: 'center',
                        marginBottom: ms(5),
                      }}
                    />
                  </View>

                  <View className="w-full items-center">
                    <TextNormal
                      style={{
                        width: '100%',
                        fontSize: ms(14),
                        color: 'black',
                        backgroundColor: '#e2e8f0',
                        textAlign: 'center',
                      }}>
                      Remarks
                    </TextNormal>
                    <TextInput
                      placeholder="Menu Remarks"
                      style={{
                        width: '80%',
                        color: 'black',
                        fontSize: ms(12),
                        borderBottomColor: 'black',
                        textAlign: 'center',
                        borderBottomWidth: 1,
                        marginBottom: ms(5),
                      }}
                    />
                  </View>

                  <View className="w-full items-center">
                    <TextNormal
                      style={{
                        width: '100%',
                        fontSize: ms(14),
                        color: 'black',
                        backgroundColor: '#e2e8f0',
                        textAlign: 'center',
                      }}>
                      Menu Tak
                    </TextNormal>
                    <TextInput
                      placeholder="Menu Tak"
                      style={{
                        width: '80%',
                        color: 'black',
                        fontSize: ms(12),
                        borderBottomColor: 'black',
                        borderBottomWidth: 1,
                        textAlign: 'center',
                      }}
                    />
                  </View>
                  <TouchableNativeFeedback
                    onPress={handleOnConfirm}
                    background={TouchableNativeFeedback.Ripple('#ccc')}>
                    <View className="mt-5 w-52 bg-green-600 justify-center items-center h-14 rounded-2xl">
                      <TextBold style={{ fontSize: ms(16), color: 'white' }}>
                        Order
                      </TextBold>
                    </View>
                  </TouchableNativeFeedback>
                </ScrollView>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  )
}

export default PopUpOrder
