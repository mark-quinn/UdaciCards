import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

class Quiz extends Component {
  state = {
    currentQuestion: 0,
    correctAnswers: 0,
    totalQuestions: this.props.questions.length,
    displayAnswer: false,
  };

  handleToggle = () => {
    const { displayAnswer } = this.state;

    this.setState({
      displayAnswer: !displayAnswer,
    });
  };

  handleAnswer = (choice) => {
    const { questions } = this.props;
    const { currentQuestion } = this.state;
    const question = questions[currentQuestion];
    const answer = choice === "Correct" ? true : false;

    this.setState((prevState) => ({
      currentQuestion: ++prevState.currentQuestion,
      correctAnswers:
        answer === question.correct
          ? ++prevState.correctAnswers
          : prevState.correctAnswers,
    }));
  };

  handleReset = () => {
    this.setState({
      currentQuestion: 0,
      correctAnswers: 0,
    });
  };

  render() {
    const { deck, questions } = this.props;
    const {
      currentQuestion,
      totalQuestions,
      displayAnswer,
      correctAnswers,
    } = this.state;

    if (questions.length === 0) {
      return (
        <View style={styles.container}>
          <Text style={styles.empty}>Sorry! This Deck has no questions</Text>
        </View>
      );
    }

    if (currentQuestion === totalQuestions) {
      const score = (correctAnswers / totalQuestions) * 100;
      return (
        <View style={styles.container}>
          <Text style={styles.completed}>
            You completed the {deck.title} quiz!
          </Text>
          <Text style={styles.score}>You scored {score}% </Text>
          <TouchableOpacity onPress={this.handleReset}>
            <Text style={styles.btnCorrect}>Try again?</Text>
          </TouchableOpacity>
        </View>
      );
    }

    const question = questions[currentQuestion];

    return (
      <View style={styles.container}>
        <Text style={{ alignSelf: "flex-start" }}>
          {currentQuestion + 1} / {totalQuestions}
        </Text>
        <Text style={styles.text}>
          {displayAnswer ? question.answer : question.question}
        </Text>
        <TouchableOpacity onPress={this.handleToggle}>
          <Text style={styles.toggle}>
            {displayAnswer ? "Show Question" : "Show Answer"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.handleAnswer("Correct")}>
          <Text style={styles.btnCorrect}>Correct</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.handleAnswer("Incorrect")}>
          <Text style={styles.btnIncorrect}>Incorrect</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontWeight: "bold",
    fontSize: 35,
    textAlign: "center",
    marginHorizontal: 15,
  },
  toggle: {
    color: "#8B0000",
    marginVertical: 10,
  },
  btnCorrect: {
    color: "#fff",
    backgroundColor: "#008000",
    paddingHorizontal: 30,
    paddingVertical: 10,
    marginVertical: 5,
    borderRadius: 4,
    alignSelf: "flex-end",
    textAlign: "center",
  },
  btnIncorrect: {
    color: "#fff",
    backgroundColor: "#8B0000",
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 4,
    alignSelf: "flex-end",
    textAlign: "center",
  },
  completed: {
    fontSize: 30,
    fontWeight: "bold",
    marginHorizontal: 10,
    textAlign: "center",
  },
  score: {
    fontSize: 20,
    textAlign: "center",
  },
  empty: {
    fontSize: 20,
    fontStyle: "italic",
    textAlign: "center",
    marginHorizontal: 10,
  },
});

function mapStateToProps(state, { route }) {
  const deck = state[route.params.title];
  return {
    deck,
    questions: deck.questions,
  };
}

export default connect(mapStateToProps)(Quiz);
