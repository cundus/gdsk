import React, { useEffect } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  ImageBackground,
  ActivityIndicator,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { ms } from 'react-native-size-matters'

import { getFloor } from '../../stores/actions/floor'
import { BgLantai, BgMenu } from '../../assets/images/background'
import { LogoAlacarte } from '../../assets/icons'
import { TextBold, TextNormal } from '../../components/Text'

const PatientOrder = ({ navigation }) => {
  const { floor, auth } = useSelector(state => state)
  const dispatch = useDispatch()
  useEffect(() => {
    if (navigation.isFocused()) {
      dispatch(
        getFloor({
          serverUrl: auth.serverUrl,
          clientId: auth.user.selected_client,
        }),
      )
    }
  }, [navigation.isFocused()])

  const _renderItem = ({ item }) => {
    return (
      <View style={styles.card}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('AlacarteListRoom', { data: item })
          }>
          <View style={styles.leftCard}>
            <Text style={[styles.cardText, { color: 'black' }]}>
              {/* {item.name} */}
              Lantai {item}
            </Text>
          </View>
        </TouchableOpacity>
        <View className="flex-row space-x-3">
          <View style={styles.rightCard}>
            <Text style={[styles.statusCardText, { color: 'black' }]}>
              {/* {item.room
                ?.map(item => item.patient.length)
                .reduce((a, b) => a + b, 0)}{' '} */}
              0 Unsynced
            </Text>
          </View>
          <View style={styles.rightCard}>
            <Text style={[styles.statusCardText, { color: 'black' }]}>
              {/* {item.room
                ?.map(item => item.patient.length)
                .reduce((a, b) => a + b, 0)}{' '} */}
              19 Pending
            </Text>
          </View>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={BgMenu} style={{ flex: 1 }}>
        <View style={styles.overlay}></View>
        <View className="flex-[1] -mt-5 justify-center items-center h-full"></View>
      </ImageBackground>
      <View
        style={{
          flex: 4,
          backgroundColor: 'white',
          borderTopLeftRadius: ms(10),
          borderTopRightRadius: ms(10),
          marginTop: -ms(20),
        }}>
        <ImageBackground
          source={BgLantai}
          style={{ zIndex: 4, marginTop: -ms(50), flex: 1 }}
          resizeMode="stretch"
          resizeMethod="resize">
          <View style={styles.contentContainer}>
            <Text style={styles.title}>Patient Order</Text>
            <View className="flex-row justify-around">
              <TextBold className="text-white" style={{ fontSize: ms(14) }}>
                Choose your floor
              </TextBold>
              <TextBold
                className="text-white text-center"
                style={{ fontSize: ms(14) }}>
                Status Order
              </TextBold>
            </View>
            {floor.isFetching ? (
              <ActivityIndicator size={'large'} color={'#00ff00'} />
            ) : (
              <FlatList
                keyExtractor={(item, index) => index.toString()}
                data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                renderItem={_renderItem}
              />
            )}
          </View>
        </ImageBackground>
      </View>
    </View>
  )
}

export default PatientOrder

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: '100%',
    zIndex: 1,
  },
  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    backgroundColor: 'rgba(255, 255, 255, .5)',
  },
  contentContainer: {
    flex: 1,
    marginTop: ms(170),
    marginHorizontal: ms(110),
    marginBottom: ms(95),
    paddingLeft: ms(5),
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: ms(5),
  },
  leftCard: {
    backgroundColor: 'white',
    borderRadius: ms(50),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: ms(8),
    paddingHorizontal: ms(9),
    // flex: 1,
  },
  rightCard: {
    backgroundColor: 'yellow',
    borderRadius: ms(50),
    justifyContent: 'center',
    paddingHorizontal: ms(5),
    alignItems: 'center',
  },
  cardText: {
    fontSize: ms(16),
    fontFamily: 'Avenir Heavy',
  },
  statusCardText: {
    fontSize: ms(10),
    fontFamily: 'Avenir Heavy',
  },
  title: {
    textAlign: 'center',
    fontSize: ms(14),
    color: 'white',
    fontFamily: 'Avenir Heavy',
  },
})
