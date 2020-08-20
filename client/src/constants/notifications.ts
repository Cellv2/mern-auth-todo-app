type EnumLiteralsOf<T extends object> = T[keyof T];

export type Notifications = EnumLiteralsOf<typeof Notification>;
export const Notifications = Object.freeze({
    UserUpdateSuccess: {
        type: "Success",
        message: "User successfully updated",
    },
    UserUpdateFailed: {
        type: "Error",
        message: "User failed to update! Please try again",
    },
    UserAddSuccess: {},
    UserAddFailed: {},
    UserLoginSuccess: {},
    UserLoginFailed: {},
    UserDeleteSuccess: {},
    UserDeleteFailed: {},
    UserPasswordUpdateSuccess: {},
    UserPasswordUpdateFailed: {},
    ItemAddToDbSuccess: {},
    ItemAddToDbFailed: {},
    ItemDeleteFromDbSuccess: {},
    ItemDeleteFromDbFailed: {},
    ItemUpdateInDbSuccess: {},
    ItemUpdateInDbFailed: {},
    ItemFetchFromDbSuccess: {},
    ItemFetchFromDbFailed: {},
});
