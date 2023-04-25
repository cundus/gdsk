import { View, Text, Modal, Image, TouchableNativeFeedback } from 'react-native'
import React from 'react'
import { ms } from 'react-native-size-matters'
import { IconShocked } from '../assets/icons'
import { TextBold } from './Text'

const PopUpConfirmation = ({ show, onConfirm, onDecline, data }) => {
  return (
    <Modal animationType="slide" transparent={true} visible={show}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0, 200, 50, 0.2)',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          className="bg-white w-full overflow-hidden rounded-3xl items-center justify-evenly"
          style={{ width: ms(300), height: ms(400) }}>
          <Image
            source={IconShocked}
            className="w-full h-1/2"
            resizeMode="contain"
          />
          <TextBold
            style={{
              fontSize: ms(20),
              width: ms(200),
              textAlign: 'center',
              color: 'black',
            }}>
            Are you sure delete food?
          </TextBold>
          <View className="flex-row justify-center  w-full">
            <TouchableNativeFeedback
              background={TouchableNativeFeedback.Ripple('#ccc')}
              onPress={onConfirm}>
              <View className="py-1 px-4 mr-7 bg-green-600 w-32 justify-center items-center rounded-2xl">
                <TextBold style={{ fontSize: ms(18), color: 'white' }}>
                  Yes
                </TextBold>
              </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback
              background={TouchableNativeFeedback.Ripple('#ccc')}
              onPress={onDecline}>
              <View className="py-1 px-4 bg-green-500 w-32 justify-center items-center rounded-2xl">
                <TextBold style={{ fontSize: ms(18), color: 'white' }}>
                  No
                </TextBold>
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default PopUpConfirmation
