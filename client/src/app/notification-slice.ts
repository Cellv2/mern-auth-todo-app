import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

import { Notification } from "../types/notification.types";
import { setItemNotification } from "./item-slice";

export const initialState: Notification = {
    type: null,
    message: null,
};

export const notificationSlice = createSlice({
    name: "notifications",
    initialState,
    reducers: {
        setNotification: (state, action: PayloadAction<Notification>) => {
            state.type = action.payload.type;
            state.message = action.payload.message;
        },
    },
    extraReducers: (builder) =>
        builder.addCase(setItemNotification, (state, action) => {
            state.message = action.payload.message;
            state.type = action.payload.type;
        }),
});

export const { setNotification } = notificationSlice.actions;

export const notificationSelector = (state: RootState) => state.notifications;

export default notificationSlice.reducer;
