export const ADD_DECK = "ADD_DECK";
export const ADD_QUESTION = "ADD_QUESTION";
export const DELETE_DECK = "DELETE_DECK";

export function addDeck(title) {
  return {
    type: ADD_DECK,
    title,
  };
}

export function deleteDeck(title) {
  return {
    type: DELETE_DECK,
    title,
  };
}

export function addQuestion(title, question) {
  return {
    type: ADD_QUESTION,
    title,
    question,
  };
}
