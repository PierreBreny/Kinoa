import { NavigationContainer } from "@react-navigation/native";
import Home from "./screens/Home";
import * as React from 'react';
import Details from "./screens/Details";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "react-native";
import { loadDatabase } from "./db/db";
import Favorites from "./screens/Favorites";

const Stack = createNativeStackNavigator();

export default function App() {


  React.useEffect(() => {
    loadDatabase()
      .then(() => console.log("Database loaded"))
      .catch((err) => console.log(err));
  }, [])

  return (
    <NavigationContainer>
      <StatusBar backgroundColor={'black'} />
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{
          title: 'Kinoa', headerStyle: {
            backgroundColor: 'black'
          }, headerTintColor: "white",
        }} />
        <Stack.Screen name="Details" component={Details} options={{
          title: 'Details', headerStyle: {
            backgroundColor: 'black'
          }, headerTintColor: "white",
        }} />
        <Stack.Screen name="Fvaorites" component={Favorites} options={{
          title: 'Favorites', headerStyle: {
            backgroundColor: 'black'
          }, headerTintColor: "white",
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}