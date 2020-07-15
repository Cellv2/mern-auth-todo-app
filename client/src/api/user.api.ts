import { UserPartial, User } from "../types/user.types";
import {
    ApiError,
    ApiResponse,
    UserPasswordUpdatePayload,
    UserCreationPayload,
} from "../types/api.types";
import { handleResponseErrors } from "../utils/api.utils";

export const loginUser = async (email: string, password: string) => {
    const body = {
        email,
        password,
    };

    const request = await fetch(`/api/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json;charset=utf-8" },
        body: JSON.stringify(body),
    });

    if (!request.ok) {
        return handleResponseErrors(request);
    }

    const response: ApiResponse<User> = {
        result: "success",
        response: await request.json(),
    };

    return response;
};

export const patchUser = async (update: UserPartial, token: string) => {
    const payload = update;

    const request = await fetch(`/api/user/profile`, {
        method: "PATCH",
        headers: {
            Authorization: token,
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(payload),
    });

    if (!request.ok) {
        return handleResponseErrors(request);
    }

    const response: ApiResponse<User> = {
        result: "success",
        response: await request.json(),
    };

    return response;
};

//TODO:
// delete (UserProfile)
// update PW (UserProfile)
// create new user (Register)

export const deleteUser = async (token: string) => {
    const request = await fetch(`/api/user/deleteUser`, {
        method: "DELETE",
        headers: {
            Authorization: token,
        },
    });

    return request;
};

export const updateUserPassword = async (update: UserPasswordUpdatePayload) => {
    const { passwordOne, passwordTwo, token } = update;

    const payload = {
        passwordOne: passwordOne,
        passwordTwo: passwordTwo,
    };

    const request = await fetch(`/api/user/password/updatePassword`, {
        method: "PUT",
        headers: {
            Authorization: token,
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(payload),
    });

    return request;
};

export const createUser = async (newUser: UserCreationPayload) => {
    const payload = newUser;

    const request = await fetch("/api/users/addUser", {
        method: "POST",
        headers: { "Content-Type": "application/json;charset=utf-8" },
        body: JSON.stringify(payload),
    });

    if (!request.ok) {
        const errors: ApiResponse<ApiError> = await request.json();

        return errors;
    }

    const response = await request.json();
    const apiResponse: ApiResponse<User> = {
        result: "success",
        response: response,
    };

    return apiResponse;
};
