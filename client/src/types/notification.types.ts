export type NotificationTypes = "Success" | "Error";

export type Notification = {
    type: NotificationTypes | null;
    heading: string | null;
    message: string | null;
};

export type NotificationActions =
    | "UserUpdateSuccess"
    | "UserUpdateFailed"
    | "UserAddSuccess"
    | "UserAddFailed"
    | "UserLoginSuccess"
    | "UserLoginFailed"
    | "UserDeleteSuccess"
    | "UserDeleteFailed"
    | "UserPasswordUpdateSuccess"
    | "UserPasswordUpdateFailed"
    | "ItemAddToDbSuccess"
    | "ItemAddToDbFailed"
    | "ItemDeleteFromDbSuccess"
    | "ItemDeleteFromDbFailed"
    | "ItemUpdateInDbSuccess"
    | "ItemUpdateInDbFailed"
    | "ItemFetchFromDbSuccess"
    | "ItemFetchFromDbFailed"
    | "Server500";
