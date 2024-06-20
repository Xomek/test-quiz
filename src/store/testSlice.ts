import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Answer {
  questionId: number;
  answer: string | string[];
}

interface TestState {
  currentStep: number;
  answers: Answer[];
}

const initialState: TestState = {
  currentStep: 0,
  answers: [],
};

const testSlice = createSlice({
  name: "test",
  initialState,
  reducers: {
    setAnswer: (state, action: PayloadAction<Answer>) => {
      const index = state.answers.findIndex(
        (ans) => ans.questionId === action.payload.questionId
      );
      if (index !== -1) {
        state.answers[index] = action.payload;
      } else {
        state.answers.push(action.payload);
      }
    },
    nextStep: (state) => {
      state.currentStep += 1;
    },
    setStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
  },
});

export const { setAnswer, nextStep, setStep } = testSlice.actions;
export default testSlice.reducer;
