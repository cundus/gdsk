import {
  View,
  Text,
  ImageBackground,
  TouchableNativeFeedback,
} from 'react-native'
import React from 'react'
import { BgMenu } from '../../assets/images/background'
import { TextBold, TextNormal } from '../../components/Text'
import { ms } from 'react-native-size-matters'
import moment from 'moment'
import { FlatList } from 'react-native-gesture-handler'
import Supscript from '../../components/Supscript'
import Icon from 'react-native-vector-icons/AntDesign'

const DetailOrder = ({ route, navigation }) => {
  const { data } = route.params
  console.log(JSON.stringify(data, 0, 2))
  return (
    <ImageBackground
      source={BgMenu}
      style={{ flex: 1 }}
      className=" items-center justify-center">
      <View
        className="bg-green-500/70"
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        }}
      />
      <TextBold style={{ color: 'white', fontSize: ms(18) }}>
        Detail Order
      </TextBold>
      <View
        style={{
          backgroundColor: 'white',
          width: '90%',
          height: '70%',
          padding: ms(10),
        }}>
        <TextBold
          style={{
            color: 'black',
            fontSize: ms(16),
            textAlign: 'center',
          }}>
          {data.order_no}
        </TextBold>

        <View className="mt-10">
          <TextNormal
            style={{
              color: 'black',
              fontSize: ms(16),
            }}>
            {data.ala_carte_type === 1 ? data.patient.name : data.guest_name}
          </TextNormal>
          <TextNormal style={{ color: 'green', fontSize: ms(10) }}>
            {moment(data.created_at).format('D MMM YYYY')}
          </TextNormal>
        </View>
        <View className="mt-10 flex-[1]">
          <FlatList
            keyExtractor={(item, i) => i.toString()}
            data={data.menu}
            renderItem={({ item, index }) => (
              <View className="flex-row justify-between items-center">
                <TextNormal style={{ fontSize: ms(16) }}>
                  {item.menu.name} {item.quantity > 1 && `x ${item.quantity}`}
                </TextNormal>
                <TextNormal style={{ fontSize: ms(16), color: 'black' }}>
                  <Supscript />
                  {item.total}
                </TextNormal>
              </View>
            )}
          />
        </View>
        <View className="flex-[1] flex-row">
          <View className="flex-[1] justify-between">
            <TextBold style={{ color: 'black', fontSize: ms(16) }}>
              Grand Total
            </TextBold>
            <View>
              <TextBold style={{ fontSize: ms(20), color: 'black' }}>
                <Supscript /> {data.menu.reduce((a, b) => a + b.total, 0)}
              </TextBold>
              <View className="border-b-2 border-b-green-500"></View>
            </View>
            <TouchableNativeFeedback onPress={() => navigation.goBack()}>
              <View
                className="flex-row  items-center space-x-5 bg-green-500"
                style={{
                  width: ms(100),
                  paddingHorizontal: ms(5),
                  paddingVertical: ms(5),
                  borderRadius: ms(5),
                }}>
                <Icon name="arrowleft" color="white" size={ms(18)} />
                <TextNormal
                  style={{
                    fontSize: ms(16),
                    color: 'white',
                    textAlign: 'center',
                  }}>
                  Back
                </TextNormal>
              </View>
            </TouchableNativeFeedback>
          </View>
          <ImageBackground
            source={require('../../assets/icons/ornament_alacarte.png')}
            className="flex-[1]"></ImageBackground>
        </View>
      </View>
    </ImageBackground>
  )
}

export default DetailOrder
