import { createContext, useReducer } from "react";

export const TypeContext = createContext();
const content = [
  "Hello",
  "Sahil",
  "I",
  "am",
  "here",
  "It",
  "is",
  "raining",
  "heavily",
];

function typeReducer(state, action) {
  switch (action.type) {
    case "UPDATE_CURRENT_INDEX": {
      if (state.currentIndex == state.words.length - 1) {
        return { ...state, isComplete: true, endTime: Date.now() };
      }

      if (state.rightIndex === state.currentIndex) {
        return {
          ...state,
          leftIndex: state.leftIndex + 4,
          rightIndex: state.rightIndex + 4,
          currentWord: state.words[state.currentIndex + 1],
          currentIndex: state.currentIndex + 1,
        };
      }
      return {
        ...state,
        currentWord: state.words[state.currentIndex + 1],
        currentIndex: state.currentIndex + 1,
      };
    }
    case "UPDATE_R&L_INDEX": {
      if (rightIndex + 4 >= state.words.length) {
        rightIndex = state.words.length - 1;
      }
      return {
        ...state,
        leftIndex: state.leftIndex + 4,
        rightIndex: state.rightIndex + 4,
      };
    }

    case "VALIDATE_WORDS": {
      const inputWord = action.payload.inputWord.trim();
      if (inputWord !== state.currentWord) {
        return { ...state, wrongCount: state.wrongCount + 1 };
      }
    }

    case "SET_START_TIME": {
      return { ...state, startTime: action.payload.startTime };
    }

    default:
      return state;
  }
}

export function TypeContextProvider({ children }) {
  const [state, dispatch] = useReducer(typeReducer, {
    startTime: 1,
    endTime: 0,
    words: content,
    currentWord: content[0],
    currentIndex: 0,
    rightIndex: 3,
    leftIndex: 0,
    wrongCount: 0,
    isComplete: false,
  });

  const values = {
    startTime: state.startTime,
    endTime: state.endTime,
    words: state.words,
    currentWord: state.currentWord,
    currentIndex: state.currentIndex,
    rightIndex: state.rightIndex,
    leftIndex: state.leftIndex,
    wrongCount: state.wrongCount,
    isComplete: state.isComplete,
    updateCurrentIndex: () => dispatch({ type: "UPDATE_CURRENT_INDEX" }),
    validateWords: (inputWord) =>
      dispatch({ type: "VALIDATE_WORDS", payload: { inputWord: inputWord } }),
    setStartTime: (startTime) =>
      dispatch({ type: "SET_START_TIME", payload: { startTime: startTime } }),
  };

  return <TypeContext.Provider value={values}>{children}</TypeContext.Provider>;
}
