import { Notification, NotificationActions } from "../types/notification.types";
type EnumLiteralsOf<T extends object> = T[keyof T];

// these are placeholders, and may be overridden by the response provided by the server
export type Notifications = EnumLiteralsOf<typeof Notifications>;
export const Notifications: {
    [key in NotificationActions]: Notification;
} = Object.freeze({
    UserUpdateSuccess: {
        type: "Success",
        heading: "Update success",
        message: "User successfully updated",
    },
    UserUpdateFailed: {
        type: "Error",
        heading: "Update failed",
        message: "User failed to update! Please try again",
    },
    UserAddSuccess: {
        type: "Success",
        heading: "User created",
        message: "User created successfully, please sign in",
    },
    UserAddFailed: {
        type: "Error",
        heading: "User failed to create",
        message: "User creation failed! Please enter details and try again",
    },
    UserAddFailedEmailInUse: {
        type: "Error",
        heading: "Login failed",
        message: "That email looks to be in use! Did you mean to log in?",
    },
    UserGetProfileFailed: {
        type: "Error",
        heading: "Profile fetch failed",
        message: "The profile failed to load! Please try again",
    },
    UserLoginSuccess: {
        type: "Success",
        heading: "Success",
        message: "User login successful",
    },
    UserLoginFailed: {
        type: "Error",
        heading: "Login failed",
        message: "Login failed! Please enter details and try again",
    },
    UserLoginFailedEmailNotFound: {
        type: "Error",
        heading: "Login failed",
        message:
            "Sorry, we couldn't find that email! Did you mean to register?",
    },
    UserLoginFailedPasswordIncorrect: {
        type: "Error",
        heading: "Login failed",
        message:
            "Oops! Looks like you put your password in wrong, please try again",
    },
    UserDeleteSuccess: {
        type: "Success",
        heading: "User deleted",
        message: "User delete successful",
    },
    UserDeleteFailed: {
        type: "Error",
        heading: "User delete failed",
        message: "User delete failed! Please try again",
    },
    UserPasswordUpdateSuccess: {
        type: "Success",
        heading: "Password updated",
        message: "Your password has been updated",
    },
    UserPasswordUpdateFailed: {
        type: "Error",
        heading: "Password update failed",
        message: "Your password was not updated! Please try again",
    },
    UserPasswordUpdateFailedPasswordsDoNotMatch: {
        type: "Error",
        heading: "Password update failed",
        message: "The entered passwords do not match! Please try again",
    },
    UserNotLoggedIn: {
        type: "Error",
        heading: "Not signed in",
        message: "You are not signed in! Please sign in and try again",
    },
    UserNotAuthorized: {
        type: "Error",
        heading: "Not authorized",
        message: "You are not authorized. Please sign in and try again",
    },
    UserNotFound: {
        type: "Error",
        heading: "User not found",
        message: "The user was not found. Please refresh and try again",
    },
    UserForbidden: {
        type: "Error",
        heading: "Forbidden",
        message:
            "You are forbidden to access this resource. Please sign in and try again",
    },
    ItemAddToDbSuccess: {
        type: "Success",
        heading: "Item added",
        message: "Item added successfully",
    },
    ItemAddToDbFailed: {
        type: "Error",
        heading: "Item add failed",
        message: "Item creation was not successful! Please try again",
    },
    ItemDeleteFromDbSuccess: {
        type: "Success",
        heading: "Item deleted",
        message: "Item deleted successfully",
    },
    ItemDeleteFromDbFailed: {
        type: "Error",
        heading: "Item delete failed",
        message: "Item failed to delete! Please try again",
    },
    ItemUpdateInDbSuccess: {
        type: "Success",
        heading: "Item updated",
        message: "Item updated successfully",
    },
    ItemUpdateInDbFailed: {
        type: "Error",
        heading: "Item update failed",
        message: "Item failed to update! Please reload and try again",
    },
    ItemFetchFromDbSuccess: {
        type: "Success",
        heading: "Item retreived",
        message: "Item retreived successfully",
    },
    ItemFetchFromDbFailed: {
        type: "Error",
        heading: "Item retreive failed",
        message: "Item was not retreived! Please reload the page",
    },
    Server500: {
        type: "Error",
        heading: "Error 500",
        message: "Internal Server Error, please try again later",
    },
    GenericCatchAllError: {
        type: "Error",
        heading: "Error",
        message: "Sorry, something went wrong. Please retry the action",
    },
});
