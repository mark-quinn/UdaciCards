import { ADD_DECK, ADD_QUESTION } from "../actions";
import { setInitialData } from "../utils/api";

function decks(state = setInitialData(), action) {
  switch (action.type) {
    case ADD_DECK:
      return {
        ...state,
        [action.title]: {
          title: action.title,
          questions: [],
        },
      };
    case ADD_QUESTION:
      const { question, answer, checked } = action.question;
      const { title } = action;

      return {
        ...state,
        [title]: {
          ...state[title],
          questions: [...state[title].questions, { answer, question, correct: checked }],
        },
      };
    default:
      return state;
  }
}

export default decks;
