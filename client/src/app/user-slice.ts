import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState, AppThunk, AppDispatch, AppThunkPromise } from "./store";
import { AvailableThemes } from "../types/theme.types";
import { User, UserPartial } from "../types/user.types";

import { loginUser, patchUser, updateUserPassword } from "../api/user.api";
import {
    ApiError,
    ApiResponse,
    UserLoginPayload,
    UserPasswordUpdatePayload,
} from "../types/api.types";

export interface UserState extends User {
    error: string[] | null;
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
        loginUserFailed: (state, action: PayloadAction<string[]>) => {
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
        patchUserFailed: (state, action: PayloadAction<string[]>) => {
            state.error = action.payload;
        },
        updatePasswordSuccess: (state) => {
            console.log("SLICE - STATE SETING");
            state.error = null;
        },
        updatePasswordFailed: (state, action: PayloadAction<string[]>) => {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        // builder.addCase(
        //     updateUserAsyncTestTestTest.fulfilled,
        //     (state, action) => {
        //         for (const property in action.payload) {
        //             // for in loops do not inter type correctly at the time of coding this
        //             //@ts-expect-error
        //             state[property] = action.payload[property as keyof User];
        //         }
        //         state.error = null;
        //     }
        // );
        // builder.addCase(
        //     updateUserAsyncTestTestTest.rejected,
        //     (state, action) => {
        //         if (action.payload) {
        //             state.error = action.payload;
        //         } else {
        //             state.error = [String(action.error)];
        //         }
        //     }
        // );
    },
});

const {
    loginUserSuccess,
    loginUserFailed,
    patchUserSuccess,
    patchUserFailed,
    updatePasswordSuccess,
    updatePasswordFailed,
} = userSlice.actions;

export const loginUserAsync = (
    credentials: UserLoginPayload
): AppThunk => async (dispatch) => {
    try {
        const loginRequest = await loginUser(credentials);
        if (loginRequest.result === "failure") {
            const errors = loginRequest as ApiResponse<ApiError>;
            dispatch(loginUserFailed(errors.response.message));
            return;
        }

        const user = loginRequest.response as User;
        dispatch(loginUserSuccess(user));
    } catch (err) {
        dispatch(loginUserFailed(err));
    }
};

// https://redux-toolkit.js.org/usage/usage-with-typescript#createasyncthunk
// https://redux-toolkit.js.org/usage/usage-with-typescript#correct-typings-for-the-dispatch-type
// https://www.reddit.com/r/typescript/comments/fo5uvd/redux_toolkit_v130_final_new_createasyncthunk_and/fqm3jiy/
// export const updateUserAsyncTestTestTest = createAsyncThunk<
//     User,
//     UserPartial,
//     { dispatch: AppDispatch; state: RootState; rejectValue: string[] }
// >("users/updatePasswordStatus", async (update: UserPartial, thunkApi) => {
//     const { isAuthenticated, token } = thunkApi.getState().user;

//     if (isAuthenticated && token) {
//         const response = await fetch(`/api/user/profile`, {
//             method: "PATCH",
//             headers: {
//                 Authorization: token,
//                 "Content-Type": "application/json;charset=utf-8",
//             },
//             body: JSON.stringify(update),
//         });

//         if (!response.ok) {
//             // add known error types
//             // return thunkApi.rejectWithValue(await response.json());
//         }

//         return (await response.json()) as User;
//     }

//     return thunkApi.rejectWithValue(["User not signed in"]);
// });

export const genericTest = (name: string): AppThunkPromise<boolean> => async (
    dispatch,
    getState
) => {
    console.log("SLICE - BEFORE DISPATCH");
    // https://jsonplaceholder.typicode.com/users/1
    console.log("The name passed in through params is: " + name);
    const user = await fetch("https://jsonplaceholder.typicode.com/users/1");
    const userInfo: User = await user.json();
    const username = userInfo.username;
    console.log("The API username is: " + username);

    console.log("SLICE - AFTER DISPATCH");

    if (!user.ok) {
        return false;
    }
    return true;
    // return userInfo
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
): AppThunk => async (dispatch, getState) => {
    const { isAuthenticated, token } = getState().user;
    if (isAuthenticated && token) {
        try {
            const updateRequest = await updateUserPassword(update, token);
            if (updateRequest?.result === "failure") {
                dispatch(updatePasswordFailed(updateRequest.response.message));
            }
            console.log("PW ASYNC - BEFORE DISPATCH");
            dispatch(updatePasswordSuccess());
        } catch (err) {
            dispatch(updatePasswordFailed(err));
        }
    }
};

export const { updateTheme, logoutUser } = userSlice.actions;

export const themeSelector = (state: RootState) => state.user.theme;
export const isAuthenticatedSelector = (state: RootState) =>
    state.user.isAuthenticated;
export const usernameSelector = (state: RootState) => state.user.username;
export const tokenSelector = (state: RootState) => state.user.token;

export default userSlice.reducer;
