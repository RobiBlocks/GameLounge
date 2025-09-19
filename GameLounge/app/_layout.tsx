import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";

export default function RootLayout() {
  return (
    <SQLiteProvider
      databaseName="gameLounge.db"
      onInit={async (db) => {
        try {
          await db.execAsync(`
            CREATE TABLE IF NOT EXISTS games (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              title TEXT,
              year TEXT,
              genre TEXT,
              publisher TEXT
            );
            PRAGMA journal_mode = WAL;
          `);
        } catch (error) {
          console.error('Database initialization error:', error);
        }
      }}
    >
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false }}
        />
      </Stack>
    </SQLiteProvider>
  );
}
