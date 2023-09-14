import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import OpenAI from "openai";

// Define a type for the slice state, conversation might be extended to conversation array
type ChatMessage = OpenAI.Chat.ChatCompletionMessage;

export interface ChatState {
  waitingOnResponse: boolean;
  messages: ChatMessage[];
}

// Define the initial state using that type
const initialState: ChatState = {
  waitingOnResponse: false,
  messages: [],
};

export const ChatState = createSlice({
  name: "chat",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    waitForResponse: (state) => {
      state.waitingOnResponse = true;
    },
    wakeUp: (state) => {
      state.waitingOnResponse = false;
    },
    appendMessage: (state, action: PayloadAction<ChatMessage>) => {
      state.messages = [...state.messages, action.payload];
    },
    reset: (state) => {
      state.waitingOnResponse = false;
      state.messages = [];
    },
  },
});

export const { waitForResponse, wakeUp, appendMessage, reset } =
  ChatState.actions;

export default ChatState.reducer;
