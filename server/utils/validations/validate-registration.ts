import validator from "validator";

type RegistrationData = {
    username: string;
    email: string;
    password: string;
};

type RegistrationErrors = {
    username?: string;
    email?: string;
    password?: string;
};

export type ValidateRegistration = {
    errors: RegistrationErrors;
    isValid: boolean;
};

const validateRegistration = (data: RegistrationData): ValidateRegistration => {
    let errors: RegistrationErrors = {};

    data.username = data.username ?? "";
    data.email = data.email ?? "";
    data.password = data.password ?? "";

    // name checks
    if (!data.username.length) {
        errors.username = "Please enter a name";
    }

    // email checks
    if (!data.email.length) {
        errors.email = "Please enter an email";
    } else if (!validator.isEmail(data.email)) {
        errors.email = "Please enter a valid email";
    }

    // password checks
    if (!data.password.length) {
        errors.password = "Please enter a password";
    }

    // TODO: Add a second password field to check whether the PWs match
    // if !password.length {validator.equals(pw, pw2)}

    return {
        errors,
        isValid: Object.keys(errors).length === 0 && typeof errors === "object",
    };
};

export default validateRegistration;
