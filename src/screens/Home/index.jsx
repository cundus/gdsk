import { View, Text } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { StyleSheet } from 'react-native'
import Header from '../../components/Header'
import { BgMenu } from '../../assets/images/background'
import { ScrollView } from 'react-native'
import { ms } from 'react-native-size-matters'
import { Image } from 'react-native'
import { IconProfile } from '../../assets/icons'

const Home = () => {
  const { user } = useSelector(state => state.auth)
  return (
    <View style={styles.container}>
      <View
        style={{
          zIndex: 1
        }}>
        <Header img={BgMenu}>
          <View className="flex-[1] -mt-5 justify-center items-center h-full">
            <Text
              style={{
                fontSize: ms(40),
                color: 'black',
                fontFamily: 'Avenir Heavy'
              }}>
              Home
            </Text>
            <Image
              source={IconProfile}
              style={{
                width: ms(120),
                height: ms(120),
                resizeMode: 'contain'
              }}
            />
          </View>
        </Header>
      </View>
      <View style={styles.content}>
        <ScrollView>
          <View style={styles.itemInfo}>
            <Text style={styles.itemInfoTitle}>EMAIL:</Text>
            <Text style={styles.itemInfoText}>{user.email}</Text>
          </View>
          <View style={styles.itemInfo}>
            <Text style={styles.itemInfoTitle}>ROLE:</Text>
            <Text style={styles.itemInfoText}>{user.role.name}</Text>
          </View>
          <View style={styles.itemInfo}>
            <Text style={styles.itemInfoTitle}>NAME:</Text>
            <Text style={styles.itemInfoText}>{user.name}</Text>
          </View>
          <View style={styles.itemInfo}>
            <Text style={styles.itemInfoTitle}>NIK:</Text>
            <Text style={styles.itemInfoText}>{user.nik}</Text>
          </View>
          <View style={styles.itemInfo}>
            <Text style={styles.itemInfoTitle}>POSITION:</Text>
            <Text style={styles.itemInfoText}>{user.position}</Text>
          </View>
        </ScrollView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    backgroundColor: 'white',
    flex: 1,
    zIndex: 2,
    overflow: 'hidden',
    height: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingHorizontal: ms(50)
  },
  itemInfo: {
    backgroundColor: '#e5e7eb',
    padding: ms(10),
    borderRadius: ms(10),
    margin: ms(2)
  },
  itemInfoText: {
    fontSize: ms(14),
    fontFamily: 'Avenir-Roman'
  },
  itemInfoTitle: {
    fontSize: ms(20),
    color: 'black',
    fontFamily: 'Avenir-Roman'
  }
})

export default Home
