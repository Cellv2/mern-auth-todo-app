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

export const serverAuthError: AlertSettings = {
    heading: "Nope, server says it doesn't know you!",
    messages: {
        "authError": "Please sign in again and try updating your password again",
    },
    variant: "danger",
};

export const server422: AlertSettings = {
    heading: "Nope, server says 422!",
    messages: {
        "422":
            "This is likely due to the passwords not matching. Please ensure both passwords match and try again",
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

export const serverUnknownError: AlertSettings = {
    heading: "Something went wrong",
    messages: {
        somethingDied: "We're not sure what went wrong, please try again",
    },
    variant: "danger",
};
