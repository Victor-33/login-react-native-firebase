import React from "react";
import { Text, SafeAreaView, Image, StyleSheet, View } from "react-native";
import { firebase } from '../../config'
import { useEffect } from 'react';
import { useState } from 'react';
import { BackHandler } from 'react-native';
import Logout from "../components/logout";
import { withNavigation } from 'react-navigation';
import { Divider } from "react-native-paper";


function Home() {

  const [user, setUser] = useState({});

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackButton
    );
    return () => backHandler.remove();
  }, []);

  const handleBackButton = () => {
      BackHandler.exitApp();
      return true;
    }

  // console.log(props.route.name);


  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        setUser(user);
        // retrieve user data from firestore
        firebase
          .firestore()
          .collection('users')
          .doc(user.uid)
          .get()
          .then(doc => {
            setUser(doc.data());
          });
      } else {
        // No user is signed in.
        setUser({});
      }
    });
    return unsubscribe;
  }, []);

  return (
    <SafeAreaView>

<Text style={styles.home}>Home</Text>
<Divider color='red' height={2} marginVertical={10} />

<Text style={styles.name}>Hello, {user.name}</Text>
      <Image source={require('../images/React-icon.png')}
        style={{
          width: 90,
          height: 80,
          alignSelf: 'center',
          marginTop: 150,
          marginLeft: 210,
          flexDirection: 'column',
          justifyContent: 'center',
        }} />

      <Image source={require('../images/firebase.png')}
        style={{
          width: 70,
          height: 95,
          alignSelf: 'center',
          marginTop: -90, 
          marginLeft: 10,
          flexDirection: 'column',
          justifyContent: 'center',
        }} />

      <Image source={require('../images/expo-go.png')}
        style={{
          width: 170,
          height: 80,
          alignSelf: 'center',
          marginTop: -86, 
          marginLeft: -200,
          flexDirection: 'column',
          justifyContent: 'center',
        }} />

      {/* <Text style={styles.email}>E-mail: {user.email}</Text> */}

      <Logout />

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  email: {
    fontSize: 20,
    marginTop: 20,
    textAlign: 'center',
  },
  name: {
    fontSize: 16.5,
    marginTop: 5,
    marginLeft: 15,

  },
  home: {
    fontSize: 30,
    marginTop: 40,
    textAlign: 'center',
  },
});

export default withNavigation(Home);