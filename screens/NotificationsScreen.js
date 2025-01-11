import React from "react";
import { StyleSheet, View, Text, Button, Alert } from "react-native";

const Notifications = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Notifications Screen </Text>
    </View>
  );
};

export default Notifications;

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
