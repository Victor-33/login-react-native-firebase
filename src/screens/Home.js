import React from "react";
import { Text, View, SafeAreaView, Touchable } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { firebase } from '../../config'
import { useEffect } from 'react';
import { useState } from 'react';
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from '@react-navigation/native';
import { BackHandler } from 'react-native';
import LogoutWrapper from "../components/logout";
import Logout from "../components/logout";
import { createStackNavigator } from "react-navigation-stack";
import { withNavigation } from 'react-navigation';



function Home(props)  {

  const [user, setUser] = useState({});

// block return screen after logout
useEffect(() => {
  const backHandler = BackHandler.addEventListener(
    'hardwareBackPress',
    handleBackButton
  );
  return () => backHandler.remove();
}, []);

const handleBackButton = () => {
  if (props.route.name === 'Home' && props.navigation.isFocused()) {
    BackHandler.exitApp();
    return true;
  }
  return false;
};


  console.log(props.route.name);


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
    <View>

      <Logout />


      <Text>{user.name}</Text>
      <Text>{user.email}</Text>
    </View>
    )
}

export default withNavigation(Home);