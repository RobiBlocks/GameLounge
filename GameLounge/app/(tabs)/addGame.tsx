import Button from "@/components/Button";
import ImageViewer from "@/components/ImageViewer";
import LogoViewer from "@/components/LogoViewer";
import PhotoButton from "@/components/PhotoButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { useSQLiteContext } from "expo-sqlite";
import React, { useEffect, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function AddGameScreen() {
  const [form, setForm] = useState({
    title: "",
    year: "",
    genre: "",
    publisher: "",
  });

  const db = useSQLiteContext();

  const handleSubmit = async () => {
    try {
      if (!form.title || !form.year || !form.genre || !form.publisher) {
        alert("Please fill in all fields");
      }

      await db.runAsync(
        "INSERT INTO games (title, year, genre, publisher) VALUES (?, ?, ?, ?)",
        [form.title, form.year, form.genre, form.publisher]
      );

      alert("Game added successfully");
      setForm({ title: "", year: "", genre: "", publisher: "" });
    } catch (error) {
      console.error("Error adding game: ", error);
      alert("There was an error adding the game");
    }
  };

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    } else {
      alert("You did not select any image.");
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <TextInput
          style={styles.inputTitle}
          onChangeText={(title) => setForm({ ...form, title })}
          placeholder="Enter game title..."
          placeholderTextColor="white"
        />

        <View style={styles.box}>
          <ImageViewer
            imgSource={
              selectedImage ||
              require("../../assets/images/landscape_placeholder.svg")
            }
          />
          <PhotoButton buttonText="Choose an image" onPress={pickImageAsync} />
        </View>

        <View style={styles.box}>
          <LogoViewer
            imgSource={require("../../assets/images/nintendo_Switch_2_logo.png")}
          />
          <LogoViewer
            imgSource={require("../../assets/images/playstation_logo.jpg")}
          />
          <LogoViewer
            imgSource={require("../../assets/images/xbox_logo.png")}
          />
        </View>

        <View style={styles.boxInput}>
          <TextInput
            style={styles.input}
            onChangeText={(year) => setForm({ ...form, year })}
            placeholder="Enter year released..."
            placeholderTextColor="white"
          />
          <TextInput
            style={styles.input}
            onChangeText={(genre) => setForm({ ...form, genre })}
            placeholder="Enter genre..."
            placeholderTextColor="white"
          />
          <TextInput
            style={styles.input}
            onChangeText={(publisher) => setForm({ ...form, publisher })}
            placeholder="Enter publisher..."
            placeholderTextColor="white"
          />
        </View>

        <View style={styles.box}>
          <Button buttonText="bad" />
          <Button buttonText="mid" />
          <Button buttonText="good" />
          <Button buttonText="excellent" />
          <Button buttonText="perfect" />
        </View>

        <Pressable style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Add Game</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    paddingBottom: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#7BB4E3",
  },
  box: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    backgroundColor: "#4E97D1",
    borderColor: "#0088FF",
    borderWidth: 2,
    borderRadius: 10,
    padding: 20,
    margin: 15,
    width: "80%",
  },
  boxInput: {
    alignItems: "center",
    backgroundColor: "#4E97D1",
    borderColor: "#0088FF",
    borderWidth: 2,
    borderRadius: 10,
    padding: 20,
    margin: 15,
    width: "80%",
  },
  title: {
    color: "white",
    fontWeight: "bold",
    marginBottom: 30,
    fontSize: 30,
  },
  input: {
    height: 40,
    backgroundColor: "grey",
    borderColor: "darkgrey",
    borderWidth: 2,
    borderRadius: 10,
    marginTop: 12,
    marginBottom: 12,
    paddingHorizontal: 10,
    width: "95%",
  },
  inputTitle: {
    height: 60,
    borderBottomColor: "white",
    borderBottomWidth: 2,
    marginBottom: 12,
    paddingHorizontal: 10,
    fontSize: 24,
    width: "80%",
  },
  button: {
    marginTop: 20,
    backgroundColor: "#0C2869",
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});
