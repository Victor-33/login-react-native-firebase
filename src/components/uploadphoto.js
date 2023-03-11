import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet, Image } from "react-native";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";


export default function Upload() {

  const [avatar, setAvatar] = useState();
  const [uri, setUri] = useState('');

  async function imagePickerCall() {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);

      if (status !== "granted") {
        alert("We need this permission.");
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

  return (
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
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 50
  },
});
