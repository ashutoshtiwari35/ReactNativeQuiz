import { createStackNavigator } from '@react-navigation/stack';
import Home from "../screens/Home.js";
import Quiz from "../screens/Quiz.js";
import Result from "../screens/Result.js";
import React from "react";

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={{headerShown: false}} />
      <Stack.Screen name="Quiz" component={Quiz} options={{headerShown: false}} />
      <Stack.Screen name="Result" component={Result} options={{headerShown: false}} />
    </Stack.Navigator>
  );
}

export default MyStack;