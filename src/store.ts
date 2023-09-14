import { configureStore } from "@reduxjs/toolkit";
import apiKeyReducer from "@features/apiKey/apiKeySlice";
import chatReducer from "@features/chat/chatSlice";

export const store = configureStore({
  reducer: {
    apiKey: apiKeyReducer,
    chat: chatReducer,
  },
  devTools: process.env.NODE_ENV !== "development" ? false : true,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
