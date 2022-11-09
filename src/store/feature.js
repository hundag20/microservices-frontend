import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = { feature: "" };

const featureSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    switch: (state, action) => {
      state.feature = action.payload.feature;
    },
    clear: (state) => {
      state.feature = "";
    },
  },
});
export default featureSlice;
export const featureActions = featureSlice.actions;
