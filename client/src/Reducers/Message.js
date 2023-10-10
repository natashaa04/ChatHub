import {  createSlice } from "@reduxjs/toolkit";
const initialState = {};


// Add Message reducer
const addMessageReducer = createSlice({
    name: 'addMessage',
    initialState,
    reducers: {
      sendMessageRequest: (state) => {
        state.loading = true;
      },
      sendMessageSuccess: (state, action) => {
        state.loading = false;
        state.responseMessage = action.payload;
      },
      sendMessageFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
      removeSendMessageError: (state) => {
        state.error = null;
      },
      removeSendMessageMessage: (state) => {
        state.responseMessage = null;
      },
    },
  });
  
  // Get Messages reducer
  const getMessagesReducer = createSlice({
    name: 'getMessages',
    initialState,
    reducers: {
      getMessagesRequest: (state) => {
        state.loading = true;
      },
      getMessagesSuccess: (state, action) => {
        state.loading = false;
        state.messages = action.payload;
      },
      getMessagesFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
      removeGetMessagesError: (state) => {
        state.error = null;
      },
      removeGetMessagesMessage: (state) => {
        state.ResponseMessage = null;
      },
    },
  });
  
  // Get Conversations reducer
  const getConversationsReducer = createSlice({
    name: 'getConversations',
    initialState,
    reducers: {
      getConversationsRequest: (state) => {
        state.loading = true;
      },
      getConversationsSuccess: (state, action) => {
        state.loading = false;
        state.conversations = action.payload;
      },
      getConversationsFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
      removeGetConversationsError: (state) => {
        state.error = null;
      },
      removeGetConversationsMessage: (state) => {
        state.responseMessage = null;
      },
    },
  });
  
  // Get Suggestions reducer
  const getSuggestionsReducer = createSlice({
    name: 'suggestions',
    initialState,
    reducers: {
      getSuggestionsRequest: (state) => {
        state.loading = true;
      },
      getSuggestionsSuccess: (state, action) => {
        state.loading = false;
        state.suggestions = action.payload;
      },
      getSuggestionsFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
      removeGetSuggestionsError: (state) => {
        state.error = null;
      },
      removeGetSuggestionsMessage: (state) => {
        state.responseMessage = null;
      },
    },
  });
  
  // Export the actions of each reducer
  export const {
    sendMessageRequest,
    sendMessageSuccess,
    sendMessageFailure,
    removeSendMessageError,
    removeSendMessageMessage,
  } = addMessageReducer.actions;
  
  export const {
    getMessagesRequest,
    getMessagesSuccess,
    getMessagesFailure,
    removeGetMessagesError,
    removeGetMessagesMessage,
  } = getMessagesReducer.actions;
  
  export const {
    getConversationsRequest,
    getConversationsSuccess,
    getConversationsFailure,
    removeGetConversationsError,
    removeGetConversationsMessage,
  } = getConversationsReducer.actions;
  
  export const {
    getSuggestionsRequest,
    getSuggestionsSuccess,
    getSuggestionsFailure,
    removeGetSuggestionsError,
    removeGetSuggestionsMessage,
  } = getSuggestionsReducer.actions;
  
  // Export the reducers
  export { addMessageReducer, getMessagesReducer, getConversationsReducer, getSuggestionsReducer }  