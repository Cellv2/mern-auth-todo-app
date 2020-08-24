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
    | "UserAddFailedEmailInUse"
    | "UserLoginSuccess"
    | "UserLoginFailed"
    | "UserLoginFailedEmailNotFound"
    | "UserLoginFailedPasswordIncorrect"
    | "UserDeleteSuccess"
    | "UserDeleteFailed"
    | "UserPasswordUpdateSuccess"
    | "UserPasswordUpdateFailed"
    | "UserPasswordUpdateFailedPasswordsDoNotMatch"
    | "UserNotLoggedIn"
    | "UserNotAuthorized"
    | "UserForbidden"
    | "ItemAddToDbSuccess"
    | "ItemAddToDbFailed"
    | "ItemDeleteFromDbSuccess"
    | "ItemDeleteFromDbFailed"
    | "ItemUpdateInDbSuccess"
    | "ItemUpdateInDbFailed"
    | "ItemFetchFromDbSuccess"
    | "ItemFetchFromDbFailed"
    | "Server500"
    | "GenericCatchAllError";
