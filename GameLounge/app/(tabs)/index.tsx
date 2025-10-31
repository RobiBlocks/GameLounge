import DeleteButton from "@/components/DeleteButton";
import EditButton from "@/components/EditButton";
import { useFocusEffect } from "@react-navigation/native";
import { useSQLiteContext } from "expo-sqlite";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";

type Game = {
  id: number;
  title: string;
  year: number;
  genre: string;
  publisher: string;
  console: string;
  imageUri: string | null;
  rating: string;
};

export default function Index() {
  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const db = useSQLiteContext();

  const loadGames = async () => {
    try {
      const results = await db.getAllAsync(`SELECT * FROM games`);
      setGames(results as Game[]);
    } catch (error) {
      alert("Database error: " + error);
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      console.log("Screen focused, reloading games...");
      loadGames();
    }, [])
  );

  if (isLoading) {
    return <ActivityIndicator size="large" color="#000000ff" />;
  }

  return (
    <FlatList
      data={games}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            {item.imageUri && (
              <Image source={{ uri: item.imageUri }} style={styles.image} />
            )}
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.text}>{item.year}</Text>
            <Text style={styles.text}>{item.publisher}, {item.genre}</Text>
            <Text style={styles.text}>{item.console}</Text>
            <Text style={styles.text}>{item.rating}</Text>
            <DeleteButton gameId={item.id} onDelete={() => loadGames()} />
          </View>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    padding: 10,
    borderRadius: 10,
    flexDirection: "row",
    backgroundColor: "blue",
  },
  imageContainer: {
    maxWidth: "50%",
    margin: 10,
  },
  descriptionContainer: {
    maxWidth: "50%",
    margin: 10,
  },
  title: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  text: {
    color: "white",
    fontSize: 16,
    margin: 2,
  },
  image: {
    width: 125,
    height: 200,
    borderRadius: 10,
  },
});
