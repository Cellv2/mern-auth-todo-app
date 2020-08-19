import { Notification } from "../types/notification.types";

type EnumLiteralsOf<T extends object> = T[keyof T];

export type Notifications = EnumLiteralsOf<typeof Notifications>;
export const Notifications = Object.freeze({
    UserUpdateSuccess: {
        type: "Success",
        message: "User successfully updated",
    },
    UserUpdateFailed: {
        type: "Error",
        message: "User failed to update! Please try again",
    },
});

type NotificationResponses = "UserUpdateSuccess" | "UserUpdateFailed";
export type NotificationsTwo = keyof typeof NotificationsTwo;
export const NotificationsTwo: {
    [key in NotificationResponses]: Notification;
} = {
    UserUpdateSuccess: {
        type: "Success",
        message: "User successfully updated",
    },
    UserUpdateFailed: {
        type: "Error",
        message: "User failed to update! Please try again",
    },
} as const;

// var x = Notifications.UserUpdateFailed.message
// var x = NotificationsTwo.UserUpdateFailed.message
