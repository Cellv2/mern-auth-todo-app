export type ApiResult = "success" | "failure";
export type ApiError = {
    errorcode: number;
    message: string;
};
export type ApiResponse<T> = {
    result: ApiResult;
    response: T | ApiError;
};

export type UserPasswordUpdatePayload = {
    passwordOne: string;
    passwordTwo: string;
};

export type UserCreationPayload = {
    email: string;
    passwordOne: string;
    passwordTwo: string;
    username: string;
};

export type UserLoginPayload = {
    email: string;
    password: string;
};
