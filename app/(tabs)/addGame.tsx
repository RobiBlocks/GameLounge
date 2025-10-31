import ImageViewer from "@/components/ImageViewer";
import MultipleSelect from "@/components/MultipleSelect";
import PhotoButton from "@/components/PhotoButton";
import SingleSelect from "@/components/SingleSelect";
import { File, Paths } from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import React, { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function AddGameScreen() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    year: "",
    genre: "",
    publisher: "",
    console: "",
    rating: "",
    imageUri: "",
  });

  const db = useSQLiteContext();

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [newUri, setNewUri] = useState<string | null>(null);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      aspect: [2, 3],
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setSelectedImage(uri);

      const timestamp = new Date().getTime();
      const fileName = `game_image_${timestamp}.jpg`;

      const targetFile = new File(Paths.document, fileName);
      const sourceFile = new File(uri);

      await sourceFile.copy(targetFile);

      setNewUri(targetFile.uri);
    } else {
      alert("You didn't select any image.");
    }
  };

  const handleSubmit = async () => {
    try {
      if (!form.title || !form.year || !form.genre || !form.publisher  || !form.console || !form.rating) {
        alert("Please fill in all fields");
        return;
      }

      await db.runAsync(
        "INSERT INTO games (title, year, genre, publisher, console, rating, imageUri) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [form.title, form.year, form.genre, form.publisher, form.console, form.rating, newUri || null]
      );

      alert("Game added successfully");
      setForm({ title: "", year: "", genre: "", publisher: "", console: "", rating: "", imageUri: "" });
      setSelectedImage(null);
      setNewUri(null);

      router.push("/(tabs)");
    } catch (error) {
      console.error("Error adding game: ", error);
      alert("There was an error adding the game");
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
              require("../../assets/images/placeholder.svg")
            }
          />
          <PhotoButton buttonText="Choose an image" onPress={pickImageAsync} />
        </View>

        <View style={styles.box}>
          <MultipleSelect onSelect={(values) => setForm({ ...form, console: values.join(", ") })} />
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
          <SingleSelect onSelect={(rating) => setForm({ ...form, rating })} />
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
