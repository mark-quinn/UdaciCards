import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { CheckBox } from "react-native-elements";
import { addQuestion } from "../actions";
import { addCardToDeck } from "../utils/api";

class AddQuestion extends Component {
  state = {
    question: "",
    answer: "",
    checked: false,
  };

  handleTextChange = (name) => {
    return (text) => {
      this.setState({ [name]: text });
    };
  };

  handleSubmit = () => {
    const { question, answer, checked } = this.state;
    const { dispatch, deck, navigation } = this.props;

    if (question && answer) {
      dispatch(addQuestion(deck.title, { question, answer, checked }));
      addCardToDeck(deck.title, { question, answer }).then(() => {
        this.setState({ question: "", answer: "" });
        navigation.navigate("Deck", deck.title);
      });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          onChangeText={this.handleTextChange("question")}
          placeholder="Ask a question"
          value={this.state.question}
        />
        <TextInput
          style={styles.input}
          onChangeText={this.handleTextChange("answer")}
          placeholder="Answer"
          value={this.state.answer}
        />
        <CheckBox
          title="Answer is true?"
          checked={this.state.checked}
          onPress={() => this.setState({ checked: !this.state.checked })}
          containerStyle={{ backgroundColor: "#F0F0F0" }}
        />
        <TouchableOpacity onPress={this.handleSubmit}>
          <Text style={styles.btn}>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignContent: "center",
    alignItems: "center",
    paddingTop: 20,
  },
  input: {
    height: 40,
    borderColor: "#000",
    borderWidth: 1,
    marginVertical: 5,
  },
  btn: {
    padding: 10,
    backgroundColor: "#000",
    color: "#fff",
  },
});

function mapStateToProps(state, { route }) {
  const deck = state[route.params.title];
  return {
    deck,
  };
}

export default connect(mapStateToProps)(AddQuestion);
