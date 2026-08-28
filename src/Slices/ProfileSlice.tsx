import { createSlice } from "@reduxjs/toolkit";

import { updateProfile } from "../Servicess/ProfileService";

const profileSlice = createSlice({
  name: "profile",
  initialState: {},
  reducers: {
    changeProfile: (state, action) => {
      state = action.payload;
     

      return state;
    },

    setProfile: (state, action) => {
      state = action.payload;

      return state;
    },
  },
});

export const profileAction = profileSlice.actions;

export default profileSlice.reducer;
