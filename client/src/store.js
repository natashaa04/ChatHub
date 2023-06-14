import { configureStore,applyMiddleware } from "@reduxjs/toolkit";
import { userReducer,  allUsersReducer} from "./Reducers/User";


const store = configureStore({
  reducer: {
    user: userReducer.reducer,
    allUsers: allUsersReducer.reducer,
   
  },
});

export default store;