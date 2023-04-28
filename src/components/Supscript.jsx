import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Supscript = () => {
  return (
    <View style={styles.containerSup}>
      <Text style={{ fontSize: 14, lineHeight: 35, fontWeight: '700' }}>
        Rp
      </Text>
    </View>
  )
}

export default Supscript

const styles = StyleSheet.create({
  containerSup: {
    width: 18,
  },
})
