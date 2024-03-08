import { createSlice } from "@reduxjs/toolkit";
import { userData } from "../../utils/utilsDTOS";

type AuthState = {
  isAuthenticated: boolean;
  user: userData | null;
};

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

export const authReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logOut: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    }
  },
});
