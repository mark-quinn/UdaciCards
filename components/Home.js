import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DeckList from "./DeckList";
import NewDeck from "./NewDeck";
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();
function Home() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Decks") {
            iconName = focused ? "ios-list-box" : "ios-list";
          } else if (route.name === "Add Deck") {
            iconName = "ios-add-circle-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Decks" component={DeckList}></Tab.Screen>
      <Tab.Screen name="Add Deck" component={NewDeck}></Tab.Screen>
    </Tab.Navigator>
  );
}

export default Home;
