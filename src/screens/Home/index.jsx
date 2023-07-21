import { View, Text, ImageBackground } from 'react-native'
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
      <ImageBackground source={BgMenu} style={{flex:.2,}}  resizeMode='cover' >
        <View className='absolute top-0 left-0 bottom-0 right-0 bg-green-500/80'>

        </View>
      </ImageBackground>
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
    paddingHorizontal: ms(50),
    paddingTop:ms(20)
  },
  itemInfo: {
    backgroundColor: '#e5e7eb',
    padding: ms(10),
    borderRadius: ms(10),
    margin: ms(2)
  },
  itemInfoText: {
    fontSize: ms(12),
    fontFamily: 'Avenir Heavy',
  },
  itemInfoTitle: {
    fontSize: ms(16),
    color: 'black',
    fontFamily: 'Avenir-Roman'
  }
})

export default Home
