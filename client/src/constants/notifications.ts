import { Notification } from '../types/notification.types'
type EnumLiteralsOf<T extends object> = T[keyof T];

// these are placeholders, and may be overridden by the response provided by the server
export type Notifications = EnumLiteralsOf<typeof Notifications>;
export const Notifications: {[key: string]: Notification} = Object.freeze({
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
        message: "User created successfully, please sign in"
    },
    UserAddFailed: {
        type: "Error",
        heading: "User failed to create",
        message: "User creation failed! Please enter details and try again"
    },
    UserLoginSuccess: {
        type: "Success",
        heading: "Success",
        message: "User login successful"
    },
    UserLoginFailed: {
        type: "Error",
        heading: "Login failed",
        message: "Login failed! Please enter details and try again"
    },
    UserDeleteSuccess: {
        type: "Success",
        heading: "User deleted",
        message: "User delete successful"
    },
    UserDeleteFailed: {
        type: "Error",
        heading: "User delete failed",
        message: "User delete failed! Please try again"
    },
    UserPasswordUpdateSuccess: {
        type: "Success",
        heading: "Password updated",
        message: "Your password has been updated"
    },
    UserPasswordUpdateFailed: {
        type: "Error",
        heading: "Password update failed",
        message: "Your password was not updated! Please try again"
    },
    ItemAddToDbSuccess: {
        type: "Success",
        heading: "Item added",
        message: "Item added successfully"
    },
    ItemAddToDbFailed: {
        type: "Error",
        heading: "Item add failed",
        message: "Item creation was not successful! Please try again"
    },
    ItemDeleteFromDbSuccess: {
        type: "Success",
        heading: "Item deleted",
        message: "Item deleted successfully"
    },
    ItemDeleteFromDbFailed: {
        type: "Error",
        heading: "Item delete failed",
        message: "Item failed to delete! Please try again"
    },
    ItemUpdateInDbSuccess: {
        type: "Success",
        heading: "Item updated",
        message: "Item updated successfully"
    },
    ItemUpdateInDbFailed: {
        type: "Error",
        heading: "Item update failed",
        message: "Item failed to update! Please reload and try again"
    },
    ItemFetchFromDbSuccess: {
        type: "Success",
        heading: "Item retreived",
        message: "Item retreived successfully"
    },
    ItemFetchFromDbFailed: {
        type: "Error",
        heading: "Item retreive failed",
        message: "Item was not retreived! Please reload the page"
    },
});