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

// used in case we want to return specific data to the component in an async manner
// e.g. a Promise<boolean> is returned. A user signs in. Only if the sign in was successful, you redirect
export type AppThunkPromise<T> = ThunkAction<
    Promise<T>,
    RootState,
    unknown,
    Action<string>
>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
