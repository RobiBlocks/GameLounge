import { StyleSheet, Text, View } from "react-native";

export default function AddGameScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Add a New Game</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "green",
  },
  text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  }
});
