import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View, Linking, Button } from 'react-native';
import MyStack from './navigation';

export default function App() {
  return (
     <NavigationContainer>
       <MyStack />
     </NavigationContainer>
    // <View>
    //   <Text style={styles.resume}>
    //     Download my
    //     <Text> </Text>
    //     <Text
    //       style={styles.link1}
    //       onPress={() =>
    //         Linking.openURL("https://www.vipulsingh.in.net/VipulResume.pdf")
    //       }
    //     >
    //       resume
    //     </Text>
    //     <Text> </Text>
    //     from here.
    //   </Text>
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingHorizontal: 16,
  },
});
