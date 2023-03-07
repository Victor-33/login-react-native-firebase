import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet, Image, Button } from "react-native";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import Axios from "axios";
import { firebase } from '../../config'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../config";
import { createContext, useContext } from 'react';


// export const PhotoUri = createContext();


export default function Upload() {

  const [avatar, setAvatar] = useState();
  const [uri, setUri] = useState('');

  async function imagePickerCall() {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);

      if (status !== "granted") {
        alert("Nós precisamos dessa permissão.");
        return;
      }
    }

    const data = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All
    });

    if (data.canceled) {
      return;
    }

    if (!data.assets) {
      return;
    }

    setAvatar(data);
    setUri(data.assets[0].uri);

  }

  async function UploadPhotoUri() {
    const response = await fetch(uri);
    const blob = await response.blob();
    const docRef = firebase.firestore().collection('photos').doc();
    docRef.set({
        uri
    }).then(() => {
        console.log("Data saved successfully");
    }).catch(error => {
        console.log("Error saving data: ", error);
    });
  }


  return (
    // <PhotoUri.Provider value={uri}>
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={imagePickerCall}>
        <Image
          source={{
            uri: avatar
              ? avatar.assets[0].uri
              : "https://i.pinimg.com/originals/74/32/c0/7432c05285a3833ecf9e4a896e82b0ff.jpg"
          }}
          style={styles.avatar}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={imagePickerCall}>
        <Text style={styles.buttonText}>Selecionar imagem</Text>
      </TouchableOpacity>

    </View>
    // </PhotoUri.Provider> 
  );
}


const styles = StyleSheet.create({
  container: {

    justifyContent: "center",
    alignItems: "center",
    marginTop: 70,

  },
  button: {
    width: 120,
    height: 30,
    borderRadius: 0,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40
  },
  buttonText: {

  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 50

  }
});