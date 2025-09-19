import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function Index() {
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const db = useSQLiteContext();

  const loadGames = async () => {
    try {
      const results = await db.getAllAsync(`SELECT * FROM games`);
      setGames(results);
    } catch (error) {
      alert("Database error: " + error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadGames();
  }, []);

  if (isLoading) {
    return <ActivityIndicator size="large" color="#000000ff" />;
  }

  return (
    <FlatList
      data={games}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.container}>
          <Text style={styles.text}>{item.title}</Text>
          <Text style={styles.text}>{item.year}</Text>
          <Text style={styles.text}>{item.genre}</Text>
          <Text style={styles.text}>{item.publisher}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "blue",
  },
  text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 5,
  },
});
