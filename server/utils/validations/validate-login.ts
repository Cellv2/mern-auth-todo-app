import validator from "validator";

type LoginData = {
    email: string;
    password: string;
};

type LoginErrors = {
    email?: string;
    password?: string;
};

type ValidateLogin = {
    errors: LoginErrors;
    isValid: boolean;
};

const validateLogin = (data: LoginData): ValidateLogin => {
    let errors: LoginErrors = {};

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

    return {
        errors,
        isValid: Object.keys(errors).length === 0 && typeof errors === "object",
    };
};

export default validateLogin;
