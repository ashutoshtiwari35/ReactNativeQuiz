import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react';
import Title from "../components/Title";

const Home = ({ navigation }) => {
  return (
    <View style={ styles.container}>
      <Title mainText="Quizzing" />
      <View style={styles.bannerContainer}>
       <Image source= { require("../assets/Customer.png")}
         style={styles.banner}
       />
      </View>
      <TouchableOpacity onPress = {() => navigation.navigate("Quiz")} style={styles.buttons}>
        <Text style={styles.buttonsText}>Start</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  banner:{
    height: 300,
    width: 300
  },
  bannerContainer:{
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  container:{
    paddingTop: 40,
    paddingHorizontal: 20,
    height: '100%'
  },
  buttons:{
    width: '100%',
    backgroundColor: "#1A759F",
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 30
  },
  buttonsText:{
    fontSize: 24,
    fontWeight: '600',
    color: 'white'
  }
})