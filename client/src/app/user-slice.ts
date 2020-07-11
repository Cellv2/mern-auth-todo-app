import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "./store";
import { AvailableThemes } from "../types/theme.types";
import { User } from "../types/user.types";

import { loginUser } from "../api/user.api";

export interface UserState extends User {
    error: string | null;
}

export const initialState: UserState = {
    isAuthenticated: false,
    theme: "dark",
    username: null,
    token: null,
    error: null,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        updateAuthenticated: (state, action: PayloadAction<boolean>) => {
            state.isAuthenticated = action.payload;
        },
        updateTheme: (state, action: PayloadAction<AvailableThemes>) => {
            state.theme = action.payload;
        },
        updateUsername: (state, action: PayloadAction<string | null>) => {
            state.username = action.payload;
        },
        updateToken: (state, action: PayloadAction<string | null>) => {
            state.token = action.payload;
        },
        loginUserSuccess: (state, action: PayloadAction<User>) => {
            state.isAuthenticated = true;
            state.theme = action.payload.theme;
            state.token = action.payload.token;
            state.username = action.payload.username;
            state.error = null;
        },
        loginUserFailed: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
    },
});

const { loginUserSuccess, loginUserFailed } = userSlice.actions;

export const loginUserAsync = (
    email: string,
    password: string
): AppThunk => async (dispatch) => {
    try {
        const user = await loginUser(email, password);
        dispatch(loginUserSuccess(user));
    } catch (err) {
        dispatch(loginUserFailed(err));
    }
};

export const {
    updateAuthenticated,
    updateTheme,
    updateUsername,
    updateToken,
} = userSlice.actions;

export const themeSelector = (state: RootState) => state.user.theme;
export const isAuthenticatedSelector = (state: RootState) =>
    state.user.isAuthenticated;
export const usernameSelector = (state: RootState) => state.user.username;
export const tokenSelector = (state: RootState) => state.user.token;

export default userSlice.reducer;
