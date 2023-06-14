import {  createSlice } from "@reduxjs/toolkit";
const initialState = {};

 const userReducer = createSlice({
    name:'user',
    initialState,
    reducers:{
  LoginRequest: (state) => {
    state.loading = true;
  },
  LoginSuccess: (state, action) => {
    state.loading = false;
    state.user = action.payload;
    state.isAuthenticated = true;
    state.error = null;
  },
  LoginFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = false;
  },

  RegisterRequest: (state) => {
    state.loading = true;
  },
  RegisterSuccess: (state, action) => {
    state.loading = false;
    state.user = action.payload;
    state.isAuthenticated = true;
    state.error = null;
  },
  RegisterFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = false;
  },

  LoadUserRequest: (state) => {
    state.loading = true;
  },
  LoadUserSuccess: (state, action) => {
    state.loading = false;
    state.user = action.payload;
    state.isAuthenticated = true;
    state.error = null;
  },
  LoadUserFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = false;
  },

  LogoutUserRequest: (state) => {
    state.loading = true;
  },
  LogoutUserSuccess: (state) => {
    state.loading = false;
    state.user = null;
    state.isAuthenticated = false;
  },
  LogoutUserFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = true;
  },
  removeUserError:(state)=>{
    state.error=null;
  },
  removeUserMessage:(state)=>{
state.message=null;
  }
},
});



const allUsersReducer = createSlice({
    name:'allUser',
    initialState,
    reducers:{
  allUsersRequest: (state) => {
    state.loading = true;
  },
  allUsersSuccess: (state, action) => {
    state.loading = false;
    state.users = action.payload;
  },
  allUsersFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  removeAllUsersError:(state)=>{
    state.error=null;
  },
  removeAllUsersMessage:(state)=>{
  state.message=null;
  }


},
});




export const {LoginRequest,
    LoginSuccess,
    LoginFailure,
    RegisterRequest,
    RegisterSuccess,
    RegisterFailure,
    LoadUserRequest,
    LoadUserSuccess,
   
    LoadUserFailure,
    LogoutUserRequest,
    LogoutUserSuccess,
    LogoutUserFailure,
    removeUserError,
    removeUserMessage
  }=userReducer.actions;

  export const {
    allUsersRequest,
    allUsersSuccess,
    allUsersFailure,
    removeAllUsersError,
    removeAllUsersMessage
  }=allUsersReducer.actions;

  export {userReducer,allUsersReducer}
 