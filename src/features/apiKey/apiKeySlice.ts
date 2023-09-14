import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
export interface ApiKeyState {
  value: string | null;
}

// Define the initial state using that type
const initialState: ApiKeyState = {
  value: null,
};

export const apiKeySlice = createSlice({
  name: "apiKey",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setApiKey: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
    clearApiKey: (state) => {
      state.value = "";
    },
  },
});

export const { setApiKey, clearApiKey } = apiKeySlice.actions;

export default apiKeySlice.reducer;
