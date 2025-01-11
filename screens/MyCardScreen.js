import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";

const MyCardScreen = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>MyCard Screen</Text>
    </View>
  );
};

export default MyCardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 24,
  },
});
