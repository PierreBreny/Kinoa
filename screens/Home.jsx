import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Favorites from "./Favorites";
import * as React from "react";
import Popular from "./Popular";

const Tab = createMaterialTopTabNavigator();

export default function Home() {
  return (
    <Tab.Navigator
      initialRouteName="Popular"
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarLabelStyle: { fontSize: 12 },
        tabBarStyle: { backgroundColor: "black" },
      }}
    >
      <Tab.Screen
        name="Popular"
        component={Popular}
        options={{ tabBarLabel: "Popular" }}
      />
      <Tab.Screen
        name="Favorites"
        component={Favorites}
        options={{ tabBarLabel: "Favorites" }}
      />
    </Tab.Navigator>
  );
}
