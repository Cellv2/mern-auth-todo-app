import { UserPartial, User } from "../types/user.types";

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

    return request;
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

    return request;
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

export const updateUserPassword = async (
    pwOne: string,
    pwTwo: string,
    token: string
) => {
    const passwordUpdate = { passwordOne: pwOne, passwordTwo: pwTwo };

    const request = await fetch(`/api/user/password/updatePassword`, {
        method: "PUT",
        headers: {
            Authorization: token,
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(passwordUpdate),
    });

    return request;
};

export const createUser = async (
    username: string,
    email: string,
    pwOne: string,
    pwTwo: string
) => {
    const newUser = {
        username: username,
        email: email,
        passwordOne: pwOne,
        passwordTwo: pwTwo,
    };

    const request = await fetch("/api/users/addUser", {
        method: "POST",
        headers: { "Content-Type": "application/json;charset=utf-8" },
        body: JSON.stringify(newUser),
    });

    return request;
};
