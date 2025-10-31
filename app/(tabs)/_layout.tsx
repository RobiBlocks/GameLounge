import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShadowVisible: false,
        headerTintColor: "black",
        headerStyle: {
          backgroundColor: "white",
        },
        tabBarActiveTintColor: "#0088FF",
        tabBarInactiveTintColor: "black",
        tabBarStyle: {
          backgroundColor: "white",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: "GameLounge",
          title: "Home",
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "game-controller" : "game-controller-outline"}
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="addGame"
        options={{
          headerTitle: "Add a New Game",
          tabBarActiveTintColor: "white",
          title: "",
          tabBarIconStyle: {
            position: "absolute",
            top: -20,
            backgroundColor: "#0088FF",
            borderRadius: 20,
            width: 80,
            height: 80,
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
          },
          tabBarIcon: () => (
            <Ionicons name={"add-circle"} color={"white"} size={30} />
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          headerTitle: "About This App",
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={
                focused ? "information-circle" : "information-circle-outline"
              }
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tabs>
  );
}
