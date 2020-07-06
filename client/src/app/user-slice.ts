import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "./store";
import { AvailableThemes } from "../types/theme.types";

export interface UserState {
    isAuthenticated: boolean;
    theme: AvailableThemes;
}

export const initialState: UserState = {
    isAuthenticated: false,
    theme: "dark",
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
    },
});

export const { updateAuthenticated, updateTheme } = userSlice.actions;

export const themeSelector = (state: RootState) => state.user.theme;
export const isAuthenticatedSelector = (state: RootState) =>
    state.user.isAuthenticated;

export default userSlice.reducer;
