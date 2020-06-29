import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { TouchableOpacity } from "react-native-gesture-handler";
import { deleteDeck } from "../actions/index";

class Deck extends Component {
  handleNav = (option) => {
    const { navigation, deck } = this.props;
    navigation.navigate(option, { title: deck.title });
  };

  render() {
    const { deck } = this.props;
    const { title, questions } = deck;

    return (
      <View style={styles.container}>
        <View style={styles.deck}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.cards}>{questions.length} cards</Text>
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity onPress={() => this.handleNav("Add")}>
            <Text style={styles.btnAdd}>Add Card</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.handleNav("Quiz")}>
            <Text style={styles.btnStart}>Start Quiz</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

function mapPropsToState(state, { route }) {
  const deck = state[route.params.title];
  return {
    deck,
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  deck: {
    alignContent: "flex-start",
  },
  title: {
    fontWeight: "bold",
    fontSize: 30,
  },
  cards: {
    fontWeight: "300",
    color: "#808080",
    alignSelf: "center",
  },
  btnAdd: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    marginVertical: 10,
    borderRadius: 4,
    backgroundColor: "#000",
    color: "#fff",
    alignSelf: "flex-end",
  },
  btnStart: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    marginBottom: 15,
    borderRadius: 4,
    backgroundColor: "#fff",
    color: "#000",
    alignSelf: "flex-start",
  },
  btnContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default connect(mapPropsToState)(Deck);
