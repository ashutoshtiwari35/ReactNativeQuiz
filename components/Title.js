import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Title = ({ mainText }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{mainText}</Text>
    </View>
  )
}

export default Title

const styles = StyleSheet.create({
  title:{
    fontSize: 36,
    fontWeight: '600'
  },
  container:{
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center'
  }
})