import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import counterSliceReducer from "./counterSlice";

export const store = configureStore({
    reducer: {
        counter: counterSliceReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;