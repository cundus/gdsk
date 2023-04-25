import { View, Text, Modal, TouchableNativeFeedback } from 'react-native'
import React from 'react'
import { ms } from 'react-native-size-matters'
import { TextBold } from './Text'
import Icon from 'react-native-vector-icons/AntDesign'

const PopUpSuccess = ({ onPress, show }) => {
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
          <Icon name="checkcircleo" size={ms(50)} color={'black'} />
          <TextBold
            style={{
              fontSize: ms(20),
              width: ms(200),
              textAlign: 'center',
              color: 'black',
            }}>
            Your order is successfully!
          </TextBold>
          <View className="flex-row justify-center w-full">
            <TouchableNativeFeedback
              background={TouchableNativeFeedback.Ripple('#ccc')}
              onPress={onPress}>
              <View className="py-1 px-10 bg-yellow-500  justify-center items-center rounded-2xl">
                <TextBold style={{ fontSize: ms(18), color: 'white' }}>
                  Let's see your order
                </TextBold>
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default PopUpSuccess
