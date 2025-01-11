import React from "react";
import { StyleSheet, View, Text, Button, Alert } from "react-native";

const SearchScreen = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Search Screen </Text>
    </View>
  );
};

export default SearchScreen;

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
