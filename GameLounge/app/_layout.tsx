import { Stack } from "expo-router";
import { LogBox } from "react-native";

LogBox.ignoreAllLogs();

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false }}
      />
    </Stack>
  );
}
