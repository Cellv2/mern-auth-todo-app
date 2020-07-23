import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk, AppThunkPromise } from "./store";
import { AvailableThemes } from "../types/theme.types";
import { User, UserPartial } from "../types/user.types";

import {
    loginUser,
    patchUser,
    updateUserPassword,
    deleteUser,
} from "../api/user.api";
import {
    ApiError,
    ApiResponse,
    UserLoginPayload,
    UserPasswordUpdatePayload,
} from "../types/api.types";

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
        deleteUserSuccess: (state) => {
            state.error = null;
        },
        deleteUserFailed: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
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
                // for in loops do not infer type correctly at the time of coding this
                //@ts-expect-error
                state[property] = action.payload[property as keyof User];
            }

            state.error = null;
        },
        patchUserFailed: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
        updatePasswordSuccess: (state) => {
            console.log("SLICE - STATE SETING");
            state.error = null;
        },
        updatePasswordFailed: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
    },
});

const {
    deleteUserSuccess,
    deleteUserFailed,
    loginUserSuccess,
    loginUserFailed,
    patchUserSuccess,
    patchUserFailed,
    updatePasswordSuccess,
    updatePasswordFailed,
} = userSlice.actions;

export const deleteUserAsync = (): AppThunkPromise<boolean> => async (
    dispatch,
    getState
) => {
    const { isAuthenticated, token } = getState().user;
    if (!isAuthenticated || !token) {
        dispatch(deleteUserFailed("You are not signed in"));
        return false;
    }

    try {
        const deleteRequest = await deleteUser(token);
        if (deleteRequest.result === "failure") {
            const errors = deleteRequest as ApiResponse<ApiError>;
            dispatch(deleteUserFailed(errors.response.message));
            return false;
        }

        dispatch(deleteUserSuccess());
        dispatch(logoutUser());
        return true;
    } catch (err) {
        dispatch(deleteUserFailed(err));
        return false;
    }
};

export const loginUserAsync = (
    credentials: UserLoginPayload
): AppThunkPromise<boolean> => async (dispatch) => {
    try {
        const loginRequest = await loginUser(credentials);
        if (loginRequest.result === "failure") {
            const errors = loginRequest as ApiResponse<ApiError>;
            dispatch(loginUserFailed(errors.response.message));
            return false;
        }

        const user = loginRequest.response as User;
        dispatch(loginUserSuccess(user));
        return true;
    } catch (err) {
        dispatch(loginUserFailed(err));
        return false;
    }
};

export const genericTest = (name: string): AppThunkPromise<boolean> => async (
    dispatch,
    getState
) => {
    console.log("SLICE - BEFORE DISPATCH");
    // https://jsonplaceholder.typicode.com/users/1
    console.log("The name passed in through params is: " + name);
    const user = await fetch("https://jsonplaceholder.typicode.com/usersf/1");
    const userInfo: User = await user.json();
    const username = userInfo.username;
    console.log("The API username is: " + username);

    console.log("SLICE - AFTER DISPATCH");

    if (!user.ok) {
        return false;
    }
    return true;
};

export const updateUserAsync = (update: UserPartial): AppThunk => async (
    dispatch,
    getState
) => {
    const { isAuthenticated, token } = getState().user;
    if (isAuthenticated && token) {
        try {
            const patchRequest = await patchUser(update, token);
            if (patchRequest.result === "failure") {
                const errors = patchRequest as ApiResponse<ApiError>;
                dispatch(patchUserFailed(errors.response.message));
                return;
            }

            const patchedUser = patchRequest.response as User;
            dispatch(patchUserSuccess(patchedUser));
        } catch (err) {
            dispatch(patchUserFailed(err));
        }
    } else {
        dispatch(patchUserSuccess(update));
    }
};

export const updatePasswordAsync = (
    update: UserPasswordUpdatePayload
): AppThunkPromise<boolean> => async (dispatch, getState) => {
    const { isAuthenticated, token } = getState().user;
    if (isAuthenticated && token) {
        try {
            const updateRequest = await updateUserPassword(update, token);
            if (updateRequest?.result === "failure") {
                const errors = updateRequest as ApiResponse<ApiError>;
                dispatch(updatePasswordFailed(errors.response.message));
                return false;
            }
            console.log("PW ASYNC - BEFORE DISPATCH");
            dispatch(updatePasswordSuccess());
            return true;
        } catch (err) {
            dispatch(updatePasswordFailed(err));
            return false;
        }
    }

    return false;
};

export const { updateTheme, logoutUser } = userSlice.actions;

export const themeSelector = (state: RootState) => state.user.theme;
export const isAuthenticatedSelector = (state: RootState) =>
    state.user.isAuthenticated;
export const usernameSelector = (state: RootState) => state.user.username;
export const tokenSelector = (state: RootState) => state.user.token;

export default userSlice.reducer;
