import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import { userReducer, allUsersReducer } from "./Reducers/User";
import {
  addMessageReducer,
  getMessagesReducer,
  getConversationsReducer,
  getSuggestionsReducer,
} from "./Reducers/Message";

const store = configureStore({
  reducer: {
    user: userReducer.reducer,
    allUsers: allUsersReducer.reducer,
    addMessage: addMessageReducer.reducer,
    getMessages: getMessagesReducer.reducer,
    getConversations: getConversationsReducer.reducer,
    suggestions: getSuggestionsReducer.reducer,
  },
  // Other store configuration options (middleware, enhancers, etc.) can be added here
});

export default store;
