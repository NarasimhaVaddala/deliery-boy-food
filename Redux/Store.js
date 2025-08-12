import { configureStore } from "@reduxjs/toolkit";
import ProfileSlice from "./Slices/ProfileSlice";

export default configureStore({
  reducer: {
    profile: ProfileSlice,
  },
});
