import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function FlatButton({ text, onPress }) {

    return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>Continue</Text>
      </View>
    </TouchableOpacity>

  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "#030303",
    padding: 11,
    marginTop: -235,
    borderRadius: 10,
    marginHorizontal: 29,
    height: 55,
  },
  buttonText: {
    color: '#fcfcfc',
    textAlign: 'center',
    fontSize: 30,
    marginTop: -5,
    
  }
});