import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Checkbox from "./checkbox";
import * as yup from "yup";
import { useFormik } from "formik"; // useFormik or just Formik
import Validate from "./validate";



export default function FlatButton({ text, onPress }) {

  
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>Continuar</Text>
      </View>
    </TouchableOpacity>
    
    

  );
}


const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "#030303",
    padding: 11,
    marginTop: -245,
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