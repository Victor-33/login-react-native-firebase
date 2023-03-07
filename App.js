// import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppNavigator from './src/navigations/Navigator';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { useState } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes/routes';
import { createStackNavigator } from 'react-navigation-stack';


export default function App() {
  return (


    <NavigationContainer>
      <AppNavigator/>
    </NavigationContainer>
  
    


    // <NavigationContainer>
    //   <Routes />
    // </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});