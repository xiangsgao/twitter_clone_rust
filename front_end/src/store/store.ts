import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";

export const store = configureStore({
    reducer: {
        userSlice
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type StoreDisptach = typeof store.dispatch;