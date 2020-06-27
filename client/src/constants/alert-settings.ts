import { AlertSettings } from "../types/alerts.types";

export const signInError: AlertSettings = {
    heading: "We couldn't sign you in",
    messages: {
        invalidToken:
            "You do not seem to be signed in - Please sign in again and try updating your password again",
    },
    variant: "danger",
};

export const pwIsEmpty: AlertSettings = {
    heading: "Password is empty",
    messages: {
        pwsNotMatching:
            "Please ensure that both passwords have a value and try again",
    },
    variant: "warning",
};

export const pwsNotMatching: AlertSettings = {
    heading: "The passwords do not match",
    messages: {
        pwsNotMatching: "Please ensure that both passwords match and try again",
    },
    variant: "warning",
};

export const server401: AlertSettings = {
    heading: "Nope, server says 401!",
    messages: {
        "401": "Please sign in again and try updating your password again",
    },
    variant: "danger",
};

export const server500: AlertSettings = {
    heading: "Nope, server says 500!",
    messages: {
        "500": "Something went wrong, please try again later",
    },
    variant: "danger",
};

export const serverPasswordUpdated: AlertSettings = {
    heading: "Password updated!",
    messages: {
        pwUpdated: "Password has been updated successfully",
    },
    variant: "success",
};
