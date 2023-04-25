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
} from 'react-native'
import React from 'react'
import { ms } from 'react-native-size-matters'
import { TextBold, TextNormal } from './Text'
import Overlay from './Overlay'
import Icon from 'react-native-vector-icons/AntDesign'
import { useState } from 'react'

const intialValue = {
  size: '',
  quantity: 0,
  replacement: '',
  remark: '',
  tak: '',
}

const PopUpOrder = ({ show, data, onOrder, handleClose, patientData }) => {
  const [form, setForm] = useState(intialValue)

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
    setForm(intialValue)
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
            <View className="flex-[4] z-[10] w-full ">
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
                    }}>
                    PlaceHolder
                  </TextNormal>
                  <View className="w-full">
                    <TextNormal
                      style={{
                        fontSize: ms(16),
                        color: 'black',
                        backgroundColor: '#e2e8f0',
                        textAlign: 'center',
                      }}>
                      Choose Size
                    </TextNormal>
                    <View className="my-3 flex-row justify-evenly">
                      {['Small', 'Medium', 'Large'].map(item => (
                        <Pressable
                          onPress={() => handleChangeForm('size', item)}
                          key={item}>
                          <TextNormal
                            style={{
                              fontSize: ms(14),
                              color: form.size === item ? 'white' : 'black',
                              backgroundColor:
                                form.size === item ? '#16a34a' : 'transparent',
                              padding: ms(5),
                              borderRadius: ms(14),
                            }}>
                            {item}
                          </TextNormal>
                        </Pressable>
                      ))}
                    </View>
                  </View>
                  <View className="w-full">
                    <TextNormal
                      style={{
                        fontSize: ms(16),
                        color: 'black',
                        backgroundColor: '#e2e8f0',
                        textAlign: 'center',
                      }}>
                      QTY
                    </TextNormal>
                    <View className="my-3 flex-row space-x-10 justify-center items-center">
                      <Pressable onPress={() => handleChangeQuantity('minus')}>
                        <View className="border-2 rounded-2xl">
                          <Icon name="minus" size={ms(20)} />
                        </View>
                      </Pressable>
                      <TextNormal style={{ fontSize: ms(20), color: 'black' }}>
                        {form.quantity.toString()}
                      </TextNormal>
                      <Pressable onPress={() => handleChangeQuantity('plus')}>
                        <View className="border-2 rounded-2xl">
                          <Icon name="plus" size={ms(20)} />
                        </View>
                      </Pressable>
                    </View>
                  </View>
                  <View className="w-full items-center">
                    <TextNormal
                      style={{
                        width: '100%',
                        fontSize: ms(16),
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
                        fontSize: ms(14),
                        borderBottomColor: 'black',
                        borderBottomWidth: 1,
                        textAlign: 'center',
                      }}
                    />
                  </View>

                  <View className="w-full items-center">
                    <TextNormal
                      style={{
                        width: '100%',
                        fontSize: ms(16),
                        color: 'black',
                        backgroundColor: '#e2e8f0',
                        textAlign: 'center',
                      }}>
                      Remarks
                    </TextNormal>
                    <TextInput
                      placeholder="Saus Coklatnya agak banyak"
                      style={{
                        width: '80%',
                        color: 'black',
                        fontSize: ms(14),
                        borderBottomColor: 'black',
                        textAlign: 'center',
                        borderBottomWidth: 1,
                      }}
                    />
                  </View>

                  <View className="w-full items-center">
                    <TextNormal
                      style={{
                        width: '100%',
                        fontSize: ms(16),
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
                        fontSize: ms(14),
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