import { StyleSheet, Text, View } from "react-native";
import MultipleSelect from "@/components/MultipleSelect";

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>About This App</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "red",
  },
  text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  }
});
