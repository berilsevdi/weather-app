import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../scenes/HomeFlow/Home/HomeScreen.component";
import SearchScreen from "../scenes/HomeFlow/Search/SearchScreen.component";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: { backgroundColor: "#fff", height: 60 },
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Hava Durumu") iconName = "home";
          else if (route.name === "Şehir Ara") iconName = "search";
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Hava Durumu" component={HomeScreen} />
      <Tab.Screen name="Şehir Ara" component={SearchScreen} />
    </Tab.Navigator>
  );
};

export default AppNavigator;