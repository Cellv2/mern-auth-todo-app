export type ApiResult = "success" | "failure";
export type ApiError = {
    errorcode: number;
    message: string[];
};
export type ApiResponse<T> = {
    result: ApiResult;
    response: T | ApiError;
};

type UserPasswordPayload = {
    passwordOne: string;
    passwordTwo: string;
};

export type UserPasswordUpdatePayload = UserPasswordPayload & {
    token: string;
};

export type UserCreationPayload = UserPasswordPayload & {
    email: string;
    username: string;
};

