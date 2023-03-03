import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Title from "../components/Title";
import { useState } from 'react';
import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';

const Result = ({ navigation, route }) => {
  const {score} = route.params
  const [finalScore, setFinalScore] = useState();

  const html = `
  <html>
  <body>
  <h1> Your Final Score is:</h1>
  <h2> ${score}</h2>
  <h2>${ score > 30 ?  "😆 Awesome, you have passed" : "😠 Well Try"}</h2>
  </body>
  </html>
  `;

  let generatePdf = async() =>{
    const file = await printToFileAsync({
      html: html,
      base64: false
    });

    await shareAsync(file.uri);
  }
  return (
    <View style={ styles.container}>
    <Title mainText="Quizzing" />
    <Text style={styles.scoreValue}>{ score }</Text>
    <View style={styles.bannerContainer}>
      { score > 30 ?  <Image source= { require("../assets/Winners.png")}
       style={styles.banner}
     />
    :
    <Image source= { require("../assets/Looser.png")}
    style={styles.banner}
  />}
    </View>
    <TouchableOpacity style={styles.button} onPress={generatePdf}>
        <Text style={styles.buttonText}>Generate Final Score</Text>
      </TouchableOpacity>
    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Home")}>
        <Text style={styles.buttonText}>Go To Home</Text>
      </TouchableOpacity>
  </View>
  )
}


export default Result

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
  button:{
    width: '100%',
    backgroundColor: "#1A759F",
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 30
  },
  buttonText:{
    fontSize: 24,
    fontWeight: '600',
    color: 'white'
  },
  scoreValue:{
    fontSize: 24,
    fontWeight: '800',
    alignSelf: 'center'
  }
})