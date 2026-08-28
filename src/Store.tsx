import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slices/UserSlice";
import profileReducer from "./Slices/ProfileSlice";
import filterReducer from "./Slices/FilterSlice";
import sortReducer from "./Slices/sortSlice";
import jwtReducer from "./Slices/JwtSlice";

export default configureStore({
  reducer: {
    jwt: jwtReducer,
    user: userReducer,
    profile: profileReducer,
    filter: filterReducer,
    sort: sortReducer,
  },
});
