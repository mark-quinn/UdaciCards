import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import NewDeck from "./components/NewDeck";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";
import middleware from "./middleware";
import Deck from "./components/Deck";
import { setInitialData } from "./utils/api";
import AddQuestion from "./components/AddQuestion";
import Quiz from "./components/Quiz";
import Home from "./components/Home";
import { setLocalNotification } from "./utils/notifications";

const Stack = createStackNavigator();

class App extends React.Component {
  componentDidMount() {
    setInitialData();
    setLocalNotification();
  }

  render() {
    return (
      <Provider store={createStore(reducer, middleware)}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Decks">
            <Stack.Screen name="Decks" component={Home} />
            <Stack.Screen name="New" component={NewDeck} />
            <Stack.Screen name="Deck" component={Deck} />
            <Stack.Screen name="Add" component={AddQuestion} />
            <Stack.Screen name="Quiz" component={Quiz} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}

export default App;
