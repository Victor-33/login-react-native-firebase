import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function FlatButtonGoogle({ text, onPress }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.button}>
                <Text style={styles.buttonText}>{text}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: 'transparent',
    borderRadius: 4,
    borderWidth: 0.15,
    borderColor: '#BCBCBC',
    padding: 11,
    marginTop: -85,
    marginHorizontal: 29,
    width: '80%',
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 17,
    marginLeft: 40,
  }
});