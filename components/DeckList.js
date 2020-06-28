import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

class DeckList extends Component {
  handlePress = (title) => {
    const { navigation } = this.props;
    navigation.navigate("Deck", { title });
  };

  render() {
    const { decks } = this.props;
    return (
      <View style={styles.container}>
        {decks.map((deck) => (
          <View key={deck.title} style={styles.deck}>
            <TouchableOpacity
              name={deck.title}
              onPress={() => this.handlePress(deck.title)}
              style={{ alignItems: "center" }}
            >
              <Text style={styles.title}>{deck.title}</Text>
              <Text style={styles.cards}>{deck.questions.length} cards</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  deck: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#B8B8B8",
    marginHorizontal: 15,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
  },
  cards: {
    fontWeight: "300",
    color: "#808080",
  },
});

function mapStateToProps(state) {
  return {
    decks: Object.values(state),
  };
}

export default connect(mapStateToProps)(DeckList);
