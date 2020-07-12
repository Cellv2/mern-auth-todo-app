import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "./store";
import { AvailableThemes } from "../types/theme.types";
import { User, UserPartial } from "../types/user.types";

import { loginUser, patchUser } from "../api/user.api";

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
        updateTheme: (state, action: PayloadAction<AvailableThemes>) => {
            state.theme = action.payload;
        },
        logoutUser: (state) => {
            state.isAuthenticated = false;
            state.token = null;
            state.username = null;
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
        patchUserSuccess: (state, action: PayloadAction<UserPartial>) => {
            for (const property in action.payload) {
                // for in loops do not inter type correctly at the time of coding this
                //@ts-expect-error
                state[property] = action.payload[property as keyof User];
            }

            state.error = null;
        },
        patchUserFailed: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
    },
});

const {
    loginUserSuccess,
    loginUserFailed,
    patchUserSuccess,
    patchUserFailed,
} = userSlice.actions;

export const loginUserAsync = (
    email: string,
    password: string
): AppThunk => async (dispatch) => {
    try {
        const loginRequest = await loginUser(email, password);
        if (!loginRequest.ok) {
            throw new Error("Login failed");
        }
        const user: User = await loginRequest.json();

        dispatch(loginUserSuccess(user));
    } catch (err) {
        dispatch(loginUserFailed(err));
    }
};

export const updateUserAsync = (update: UserPartial): AppThunk => async (
    dispatch,
    getState
) => {
    const { isAuthenticated, token } = getState().user;
    if (isAuthenticated && token) {
        try {
            const patchRequest = await patchUser(update, token);
            if (!patchRequest.ok) {
                throw new Error("Update failed");
            }
            const patchedUser: User = await patchRequest.json();

            dispatch(patchUserSuccess(patchedUser));
        } catch (err) {
            dispatch(patchUserFailed(err));
        }
    } else {
        dispatch(patchUserSuccess(update));
    }
};

export const { updateTheme, logoutUser } = userSlice.actions;

export const themeSelector = (state: RootState) => state.user.theme;
export const isAuthenticatedSelector = (state: RootState) =>
    state.user.isAuthenticated;
export const usernameSelector = (state: RootState) => state.user.username;
export const tokenSelector = (state: RootState) => state.user.token;

export default userSlice.reducer;
