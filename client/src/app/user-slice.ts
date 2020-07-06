import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "./store";
import { AvailableThemes } from "../types/theme.types";

export interface UserState {
    isAuthenticated: boolean;
    theme: AvailableThemes;
    username: string | null;
}

export const initialState: UserState = {
    isAuthenticated: false,
    theme: "dark",
    username: null,
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
    },
});

export const { updateAuthenticated, updateTheme, updateUsername } = userSlice.actions;

export const themeSelector = (state: RootState) => state.user.theme;
export const isAuthenticatedSelector = (state: RootState) =>
    state.user.isAuthenticated;
export const usernameSelector = (state: RootState) => state.user.username;

export default userSlice.reducer;
