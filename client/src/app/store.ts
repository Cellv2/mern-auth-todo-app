import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import counterSliceReducer from "./counterSlice";
import userSliceReducer from "./user-slice";
import itemSliceReducer from "./item-slice";

export const store = configureStore({
    reducer: {
        counter: counterSliceReducer,
        user: userSliceReducer,
        items: itemSliceReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;

export type AppThunkPromise<T> = ThunkAction<
    Promise<T>,
    RootState,
    unknown,
    Action<string>
>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
