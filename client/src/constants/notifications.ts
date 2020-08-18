import { Notification } from "../types/notification.types";

type EnumLiteralsOf<T extends object> = T[keyof T];

export type Notifications = EnumLiteralsOf<typeof Notifications>;
export const Notifications: { [key: string]: Notification } = Object.freeze({
    UserUpdateSuccess: {
        type: "Success",
        message: "User successfully updated",
    },
    UserUpdateFailed: {
        type: "Error",
        message: "User failed to update! Please try again",
    },
});
