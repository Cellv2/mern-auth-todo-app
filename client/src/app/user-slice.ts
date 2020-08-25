import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk, AppThunkPromise } from "./store";
import { AvailableThemes } from "../types/theme.types";
import { User, UserPartial } from "../types/user.types";

import {
    addUser,
    loginUser,
    patchUser,
    updateUserPassword,
    deleteUser,
} from "../api/user.api";

import {
    UserCreationPayload,
    UserLoginPayload,
    UserPasswordUpdatePayload,
} from "../types/api.types";
import { Notification } from "../types/notification.types";
import { Notifications } from "../constants/notifications";

export interface UserState extends User {
    notification: Notification | null;
}

export const initialState: UserState = {
    isAuthenticated: false,
    theme: "dark",
    username: null,
    token: null,
    notification: null,
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
        },
        patchUserSuccess: (state, action: PayloadAction<UserPartial>) => {
            for (const property in action.payload) {
                // for in loops do not infer type correctly at the time of coding this
                //@ts-expect-error
                state[property] = action.payload[property as keyof User];
            }
        },
        setUserNotification: (state, action: PayloadAction<Notification>) => {
            console.log(action.payload);
            state.notification = action.payload;
        },
    },
});

export const {
    updateTheme,
    logoutUser,
    setUserNotification,
} = userSlice.actions;

const { loginUserSuccess, patchUserSuccess } = userSlice.actions;

export const addUserAsync = (
    newUser: UserCreationPayload
): AppThunkPromise<boolean> => async (dispatch, getState) => {
    try {
        const createRequest = await addUser(newUser);
        if (!createRequest.ok) {
            const response = (await createRequest.json()) as Notification;
            dispatch(setUserNotification(response));
            return false;
        }

        dispatch(setUserNotification(Notifications.UserAddSuccess));
        return true;
    } catch (err) {
        dispatch(setUserNotification(Notifications.GenericCatchAllError));
        return false;
    }
};

export const deleteUserAsync = (): AppThunkPromise<boolean> => async (
    dispatch,
    getState
) => {
    const { isAuthenticated, token } = getState().user;
    if (!isAuthenticated || !token) {
        dispatch(setUserNotification(Notifications.UserNotLoggedIn));
        return false;
    }

    try {
        const deleteRequest = await deleteUser(token);
        if (!deleteRequest.ok) {
            const response = (await deleteRequest.json()) as Notification;
            dispatch(setUserNotification(response));
            return false;
        }

        dispatch(setUserNotification(Notifications.UserDeleteSuccess));
        dispatch(logoutUser());
        return true;
    } catch (err) {
        dispatch(setUserNotification(Notifications.GenericCatchAllError));
        return false;
    }
};

export const loginUserAsync = (
    credentials: UserLoginPayload
): AppThunkPromise<boolean> => async (dispatch) => {
    try {
        const loginRequest = await loginUser(credentials);
        const response = await loginRequest.json();
        if (!loginRequest.ok) {
            dispatch(setUserNotification(response));
            return false;
        }

        dispatch(loginUserSuccess(response));
        return true;
    } catch (err) {
        dispatch(setUserNotification(Notifications.GenericCatchAllError));
        return false;
    }
};

export const updateUserAsync = (update: UserPartial): AppThunk => async (
    dispatch,
    getState
) => {
    const { isAuthenticated, token } = getState().user;

    // we do not return early via !isAuthed || !token as we also need to update this if we are not signed in at all (for themes)
    if (isAuthenticated && token) {
        try {
            const patchRequest = await patchUser(update, token);
            if (!patchRequest.ok) {
                const response = (await patchRequest.json()) as Notification;
                dispatch(setUserNotification(response));
            }

            const patchedUser = (await patchRequest.json()) as User;
            dispatch(patchUserSuccess(patchedUser));
            dispatch(setUserNotification(Notifications.UserUpdateSuccess));
        } catch (err) {
            dispatch(setUserNotification(Notifications.GenericCatchAllError));
        }
    } else {
        dispatch(patchUserSuccess(update));
    }
};

export const updatePasswordAsync = (
    update: UserPasswordUpdatePayload
): AppThunkPromise<boolean> => async (dispatch, getState) => {
    const { isAuthenticated, token } = getState().user;
    if (!isAuthenticated || !token) {
        dispatch(setUserNotification(Notifications.UserNotLoggedIn));
        return false;
    }

    try {
        const updateRequest = await updateUserPassword(update, token);
        if (!updateRequest.ok) {
            const response = (await updateRequest.json()) as Notification;
            dispatch(setUserNotification(response));
            return false;
        }

        dispatch(setUserNotification(Notifications.UserPasswordUpdateSuccess));
        return true;
    } catch (err) {
        dispatch(setUserNotification(Notifications.GenericCatchAllError));
        return false;
    }
};

export const themeSelector = (state: RootState) => state.user.theme;
export const isAuthenticatedSelector = (state: RootState) =>
    state.user.isAuthenticated;
export const usernameSelector = (state: RootState) => state.user.username;
export const tokenSelector = (state: RootState) => state.user.token;

export default userSlice.reducer;
