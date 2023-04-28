import {
  View,
  Text,
  ImageBackground,
  Pressable,
  FlatList,
  TouchableNativeFeedback,
  Image,
} from 'react-native'
import React from 'react'
import { BgMenu } from '../../assets/images/background'
import Overlay from '../../components/Overlay'
import { ms } from 'react-native-size-matters'
import { TextBold, TextNormal } from '../../components/Text'
import { useState } from 'react'

const PatientOrderListMenu = () => {
  const [menu, setMenu] = useState(0)
  const [toggleMenu, setToggleMenu] = useState(false)

  const _renderItem = ({ item }) => {
    return (
      <TouchableNativeFeedback
        // onPress={() => handleChoose(item)}
        background={TouchableNativeFeedback.Ripple('#ccc')}>
        <View
          className="flex-[1] justify-end  m-2 "
          style={{ height: ms(150) }}>
          <View
            className=" justify-start bg-white items-center "
            style={{
              height: ms(100),
              elevation: 5,
              borderRadius: ms(10),
              paddingBottom: ms(20),
            }}>
            <View
              style={{
                width: ms(50),
                height: ms(50),
                overflow: 'hidden',
                borderRadius: ms(50),
                marginTop: -ms(30),
                backgroundColor: 'white',
                elevation: 7,
              }}>
              <Image
                source={
                  {
                    // uri: `${auth.serverUrl.replace('api', '')}app/menu/${
                    //   item.image
                    // }`,
                  }
                }
                className="w-full h-full"
              />
            </View>
            <TextBold
              className=""
              style={{ fontSize: ms(13), textAlign: 'center', color: 'black' }}>
              {/* {item.name} */}
            </TextBold>
            <TextBold style={{ fontSize: ms(10) }}>PLACEHOLDER</TextBold>
            <TextNormal style={{ fontSize: ms(10), textAlign: 'center' }}>
              {/* {item.service_client === null ? 0 : item.service_client} */}
            </TextNormal>
          </View>
        </View>
      </TouchableNativeFeedback>
    )
  }

  return (
    <View className="flex-[1]">
      <ImageBackground source={BgMenu} className="flex-[1] ">
        <Overlay color={'bg-white/70'} />

        <View className="flex-row z-[4] justify-center items-end h-full pb-10 px-10">
          <TextBold className="" style={{ fontSize: ms(20), color: 'black' }}>
            PATIENT ORDER - TN TOMMY
          </TextBold>
        </View>
      </ImageBackground>
      <View className="flex-[3]">
        <View className="flex-[1] z-[10] -mt-10 bg-white rounded-3xl">
          <View
            className="border border-gray-100 bg-white"
            style={{
              elevation: 5,
              margin: ms(15),
              borderRadius: ms(10),
              padding: ms(10),
            }}>
            <TextBold
              className={'text-center text-black'}
              style={{
                fontSize: ms(16),
              }}>
              Patient Order
            </TextBold>

            <View className="">
              <TextNormal style={{ fontSize: ms(16), color: 'gray' }}>
                Patient
              </TextNormal>
              <TextNormal
                style={{ fontSize: ms(14), color: 'black', marginLeft: ms(5) }}>
                Tn Tommy
              </TextNormal>
            </View>

            <View className="">
              <TextNormal style={{ fontSize: ms(16), color: 'gray' }}>
                Diagnosa
              </TextNormal>
              <TextNormal
                style={{ fontSize: ms(14), color: 'black', marginLeft: ms(5) }}>
                Penyakit Lambung
              </TextNormal>
            </View>

            <View className="">
              <TextNormal style={{ fontSize: ms(16), color: 'gray' }}>
                Age
              </TextNormal>
              <TextNormal
                style={{ fontSize: ms(14), color: 'black', marginLeft: ms(5) }}>
                27
              </TextNormal>
            </View>
          </View>

          {/* Tab Menu */}
          <View className="flex-row justify-center px-8">
            {[
              'Breakfast',
              'Lunch',
              'Dinner',
              'Morning Snack',
              'Afternoon Snack',
            ].map((item, id) => (
              <TouchableNativeFeedback onPress={() => setMenu(id)} key={id}>
                <View
                  className="flex-1 justify-center items-center border border-green-400"
                  style={{
                    height: ms(30),
                    backgroundColor:
                      menu === id ? 'rgb(34,197,94)' : 'transparent',
                    borderTopLeftRadius: id === 0 ? ms(30) : 0,
                    borderBottomLeftRadius: id === 0 ? ms(30) : 0,
                    borderTopRightRadius: id === 4 ? ms(30) : 0,
                    borderBottomRightRadius: id === 4 ? ms(30) : 0,
                  }}>
                  <TextBold
                    style={{ fontSize: ms(10) }}
                    className={`${
                      menu === id ? 'text-white' : 'text-green-500'
                    } `}>
                    {item}
                  </TextBold>
                </View>
              </TouchableNativeFeedback>
            ))}
          </View>

          {toggleMenu ? (
            <FlatList
              data={[1, 2]}
              keyExtractor={(item, index) => index.toString()}
              renderItem={_renderItem}
              numColumns={4}
            />
          ) : (
            <View className="flex-1">
              <View className="justify-center items-center flex-1">
                <TextBold className="text-gray-400 mb-6 text-lg">
                  You haven't created the order
                </TextBold>
                <TouchableNativeFeedback onPress={() => setToggleMenu(true)}>
                  <View className="px-5 py-3 bg-green-500 rounded-3xl">
                    <TextBold
                      className="text-white "
                      style={{ fontSize: ms(10) }}>
                      Create Order
                    </TextBold>
                  </View>
                </TouchableNativeFeedback>
              </View>
              <View className="flex-[1.5]">
                <TextNormal className="bg-green-500 mb-10 text-center text-3xl text-white">
                  Extra Food
                </TextNormal>
                <View className="justify-center items-center ">
                  <TextBold className="text-gray-400 mb-6 text-lg">
                    You haven't created extra food
                  </TextBold>
                  <TouchableNativeFeedback>
                    <View className="px-5 py-3 bg-green-500 rounded-3xl">
                      <TextBold
                        className="text-white "
                        style={{ fontSize: ms(10) }}>
                        Add extra food
                      </TextBold>
                    </View>
                  </TouchableNativeFeedback>
                </View>
              </View>
            </View>
          )}
        </View>
      </View>
    </View>
  )
}

export default PatientOrderListMenu
