import { useSQLiteContext } from "expo-sqlite";
import { Pressable, StyleSheet, Text } from "react-native";

type Props = {
  gameId: number;
  onEdit?: () => void;
};

export default function Button({ gameId, onEdit }: Props) {
  const db = useSQLiteContext();

  const editGame = async () => {};
  
  return (
    <Pressable style={styles.button} onPress={editGame}>
      <Text style={styles.buttonText}>Edit</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "orange",
    borderColor: "darkgrey",
    position: "absolute",
    width: 80,
    bottom: 10,
    borderWidth: 2,
    borderRadius: 10,
    padding: 15,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
});
