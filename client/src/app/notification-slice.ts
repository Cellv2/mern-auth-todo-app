import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

import { Notification } from "../types/notification.types";
import { setItemNotification } from "./item-slice";
import { setUserNotification } from "./user-slice";

export const initialState: Notification = {
    type: null,
    heading: null,
    message: null,
};

// TODO: Fix notification not showing if the same error is generated twice in a row
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
        builder
            .addCase(setItemNotification, (state, action) => {
                state.message = action.payload.message;
                state.heading = action.payload.heading ?? action.payload.type;
                state.type = action.payload.type;
            })
            .addCase(setUserNotification, (state, action) => {
                const { message, heading, type } = action.payload;
                // const validatedMessage = validateMessage(message);
                // state.message = validatedMessage;
                state.message = message;
                state.heading = heading ?? type;
                state.type = type;
            }),
});

// TODO: Fix up API returns to actually have a uniform return structure
// really, we shouldn't need this, but I really should have planned stuff out way better
const validateMessage = (message: unknown) => {
    switch (typeof message) {
        case "string": {
            return message;
        }
        case "object": {
            return Object.values(message as object)[0];
        }
        default: {
            return String(message);
        }
    }
};

export const { setNotification } = notificationSlice.actions;

export const notificationMessageSelector = (state: RootState) =>
    state.notifications.message;
export const notificationTypeSelector = (state: RootState) =>
    state.notifications.type;
export const notificationHeadingSelector = (state: RootState) =>
    state.notifications.heading;

export default notificationSlice.reducer;
