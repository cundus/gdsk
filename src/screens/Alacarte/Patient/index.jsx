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

import { getFloor } from '../../../stores/actions/floor'
import { BgLantai, BgMenu } from '../../../assets/images/background'
import { LogoAlacarte } from '../../../assets/icons'

import Header from '../../../components/Header'

const AlacartePatient = ({ navigation }) => {
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
              {item.name}
            </Text>
          </View>
        </TouchableOpacity>
        <View style={styles.rightCard}>
          <Text style={[styles.cardText, { color: 'black' }]}>
            {item.room
              ?.map(item => item.patient.length)
              .reduce((a, b) => a + b, 0)}{' '}
            Patient
          </Text>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={BgMenu} style={{ flex: 0.3 }}>
        <View style={styles.overlay}></View>
        <View className="flex-[1] -mt-5 justify-center items-center h-full">
          <Image
            source={LogoAlacarte}
            style={{
              width: ms(120),
              height: ms(120),
              resizeMode: 'contain',
            }}
          />
        </View>
      </ImageBackground>
      <ImageBackground
        source={BgLantai}
        style={[styles.container, { zIndex: 4 }]}
        resizeMode="cover"
        resizeMethod="resize">
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Patient Order</Text>
          <Text style={styles.title}>Choose your floor</Text>
          {floor.isFetching ? (
            <ActivityIndicator size={'large'} color={'#00ff00'} />
          ) : (
            <FlatList
              keyExtractor={item => item.id.toString()}
              data={floor.floorData}
              renderItem={_renderItem}
            />
          )}
        </View>
      </ImageBackground>
    </View>
  )
}

export default AlacartePatient

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
    backgroundColor: 'rgba(34, 150,70, .6)',
  },
  contentContainer: {
    flex: 1,
    marginTop: ms(130),
    marginHorizontal: ms(110),
    marginBottom: ms(55),
    paddingLeft: ms(10),
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
    width: ms(100),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: ms(10),
    // flex: 1,
  },
  rightCard: {
    backgroundColor: '#2cb863',
    borderRadius: ms(50),
    width: ms(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: {
    fontSize: 30,
    fontFamily: 'Avenir Heavy',
  },
  title: {
    textAlign: 'center',
    fontSize: ms(20),
    color: 'white',
    fontFamily: 'Avenir Heavy',
  },
})
