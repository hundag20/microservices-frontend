import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth";
import uiSlice from "./ui";
import sbSlice from "./sidebar";
import featureSlice from "./feature";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    ui: uiSlice.reducer,
    sb: sbSlice.reducer,
    feature: featureSlice.reducer,
  },
});
export default store;
