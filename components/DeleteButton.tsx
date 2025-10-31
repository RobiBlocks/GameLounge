import { useSQLiteContext } from "expo-sqlite";
import { Pressable, StyleSheet, Text } from "react-native";

type Props = {
  gameId: number;
  onDelete?: () => void;
};

export default function Button({ gameId, onDelete }: Props) {
  const db = useSQLiteContext();

  const deleteGame = async () => {
    try {
      await db.runAsync(`DELETE FROM games WHERE id = ?`, [gameId]);
      alert("Game deleted successfully");
      if (onDelete) {
        onDelete();
      }
    } catch (error) {
      alert("Database error: " + error);
    }
  };
  
  return (
    <Pressable style={styles.button} onPress={deleteGame}>
      <Text style={styles.buttonText}>Delete</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "red",
    borderColor: "darkgrey",
    position: "absolute",
    width: 90,
    left: 100,
    bottom: 0,
    borderWidth: 2,
    borderRadius: 10,
    padding: 15,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
