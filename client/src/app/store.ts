import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import counterSliceReducer from "./counterSlice";
import userSliceReducer from "./user-slice";

export const store = configureStore({
    reducer: {
        counter: counterSliceReducer,
        user: userSliceReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
