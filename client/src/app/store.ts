import { configureStore } from "@reduxjs/toolkit";

import counterSliceReducer from "./counterSlice";

export const store = configureStore({
    reducer: {
        counter: counterSliceReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
